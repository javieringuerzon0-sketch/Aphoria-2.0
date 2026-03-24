import React, { useState, useRef, useEffect } from 'react';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
  className?: string;
  /** Base64 LQIP data-URI for blur-up placeholder */
  lqip?: string;
};

/**
 * Swap the file extension, preserving query strings.
 * goldmask-original.png → goldmask-original.webp
 */
function swapExt(url: string, newExt: string): string {
  const [base, query] = url.split('?');
  const withoutExt = base.replace(/\.(png|jpg|jpeg)$/i, '');
  const ext = newExt.startsWith('.') ? newExt : `.${newExt}`;
  const p = withoutExt + ext;
  return query ? `${p}?${query}` : p;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, lqip, style, ...rest }) => {
  const baseSrc = src.split('?')[0];
  const hasImageExt = /\.(jpeg|jpg|png)$/i.test(baseSrc);
  const isAlreadyModern = /\.(avif|webp|gif|svg)$/i.test(baseSrc);
  const loading = (rest as any).loading ?? 'lazy';
  const decoding = (rest as any).decoding ?? 'async';

  const isExternal = src.startsWith('http://') || src.startsWith('https://');

  // For images already in modern formats or non-image files → plain img
  if (isAlreadyModern || (!hasImageExt && !isExternal)) {
    return <img src={src} alt={alt} className={className} loading={loading} decoding={decoding} style={style} {...rest} />;
  }

  // Blur-up LQIP state
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  // Build optimized source paths — simple extension swap
  // The optimize script only generates .webp/.avif if they're SMALLER than original.
  // If the file doesn't exist (404), the browser silently falls through to the next <source>.
  const avifSrc = swapExt(src, '.avif');
  const webpSrc = swapExt(src, '.webp');

  const pictureElement = (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={webpSrc} type="image/webp" />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        style={{
          ...style,
          ...(lqip ? { opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' } : {}),
        }}
        {...rest}
      />
    </picture>
  );

  if (lqip) {
    return (
      <span style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', ...(style?.width ? { width: style.width } : {}) }}>
        <img
          src={lqip}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />
        {pictureElement}
      </span>
    );
  }

  return pictureElement;
};

export default OptimizedImage;
