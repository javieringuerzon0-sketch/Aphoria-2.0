import React from 'react';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
  className?: string;
};

function swapExt(url: string, newExt: string): string {
  // Replace the last image extension with newExt (e.g., .webp, .avif)
  const [base, query] = url.split('?');
  const withoutExt = base.replace(/\.(avif|webp|jpeg|jpg|png)$/i, '');
  const ext = newExt.startsWith('.') ? newExt : `.${newExt}`;
  const path = withoutExt + ext;
  return query ? `${path}?${query}` : path;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, ...rest }) => {
  const baseSrc = src.split('?')[0];
  const hasExt = /\.(avif|webp|jpeg|jpg|png|gif)$/i.test(baseSrc);
  const loading = (rest as any).loading ?? 'lazy';
  const decoding = (rest as any).decoding ?? 'async';

  // Skip <picture> for external URLs, unrecognized extensions, or .original files (no avif/webp variants exist)
  const isExternal = src.startsWith('http://') || src.startsWith('https://');
  const isOriginal = baseSrc.includes('.original.');
  if (!hasExt || isExternal || isOriginal) {
    return <img src={src} alt={alt} className={className} loading={loading} decoding={decoding} {...rest} />;
  }

  const avif = swapExt(src, '.avif');
  const webp = swapExt(src, '.webp');
  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} className={className} loading={loading} decoding={decoding} {...rest} />
    </picture>
  );
};

export default OptimizedImage;
