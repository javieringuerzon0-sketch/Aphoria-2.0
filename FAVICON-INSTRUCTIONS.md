# Favicon & Icons Setup Instructions

## Required Icons to Generate

Para generar todos los favicons e iconos necesarios, necesitas crear una imagen cuadrada de tu logo (preferiblemente 1024x1024px o mayor) y usar una herramienta como [Favicon Generator](https://realfavicongenerator.net/) o [Favicon.io](https://favicon.io/).

### Iconos Requeridos:

#### Standard Favicons
- `favicon.ico` (16x16, 32x32, 48x48 - multi-size)
- `favicon-16x16.png`
- `favicon-32x32.png`

#### Android Chrome Icons
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

#### Apple Touch Icons
- `apple-touch-icon-57x57.png`
- `apple-touch-icon-60x60.png`
- `apple-touch-icon-72x72.png`
- `apple-touch-icon-76x76.png`
- `apple-touch-icon-114x114.png`
- `apple-touch-icon-120x120.png`
- `apple-touch-icon-144x144.png`
- `apple-touch-icon-152x152.png`
- `apple-touch-icon-180x180.png`

#### Microsoft Tiles
- `mstile-144x144.png`

#### Social Media Images
- `og-image.jpg` (1200x630px) - Para Open Graph/Facebook
- `twitter-image.jpg` (1200x600px) - Para Twitter Cards

#### Screenshots (Optional para PWA)
- `screenshot-mobile.png` (750x1334px)
- `screenshot-desktop.png` (1920x1080px)

## Pasos Rápidos:

1. **Visita**: https://realfavicongenerator.net/
2. **Sube tu logo** (recomendado: 1024x1024px, fondo transparente)
3. **Configura opciones**:
   - iOS: Background color #F5F3EF
   - Android: Background color #F5F3EF
   - Windows: Tile color #F5F3EF
4. **Genera** y descarga el paquete
5. **Extrae** todos los archivos en la carpeta `/public/`
6. **Listo!** - Los tags ya están configurados en index.html

## Brand Colors (Para Iconos)

- Background: `#F5F3EF`
- Primary Green: `#0F3B2E`
- Gold: `#C6A15B`
- Black: `#111111`

## Ubicación de Archivos

Todos los iconos deben ir en la carpeta:
```
/public/
  ├── favicon.ico
  ├── favicon-16x16.png
  ├── favicon-32x32.png
  ├── android-chrome-192x192.png
  ├── android-chrome-512x512.png
  ├── apple-touch-icon-*.png
  ├── mstile-144x144.png
  ├── og-image.jpg
  ├── twitter-image.jpg
  ├── site.webmanifest (✅ Ya creado)
  ├── robots.txt (✅ Ya creado)
  └── sitemap.xml (✅ Ya creado)
```

## Testing

Después de agregar los iconos, verifica:

1. **Favicon en browser**: Abre la web y verifica el favicon en la pestaña
2. **Apple touch icon**: Agrega a home screen en iOS
3. **Android PWA**: Agrega a home screen en Android
4. **Social sharing**: Prueba compartir en Facebook/Twitter para ver og-image
5. **Google Rich Results**: https://search.google.com/test/rich-results

## Herramientas Recomendadas

- **Favicon Generator**: https://realfavicongenerator.net/ (Recomendado)
- **Favicon.io**: https://favicon.io/
- **ImageMagick**: Para conversión por lote
- **Squoosh**: https://squoosh.app/ (Para comprimir imágenes)

## SEO Testing Tools

- Google Search Console: https://search.google.com/search-console
- Google Rich Results Test: https://search.google.com/test/rich-results
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Schema.org Validator: https://validator.schema.org/
