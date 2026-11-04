# PenGame Publishing website

React/Vite source for PenGame Publishing: book catalog, Bright Minds Explorers, leadership titles, and StoryScape XR, Turn Up Music, and Nia's Number Garden links.

## Development

```bash
npm ci
npm run dev
npm test
npm run lint
npm run build
```

The public site does not require Base44 authentication. The contact form opens the visitor's email client; use a form service for in-browser submissions. Book purchases link to Shopify and some images are externally hosted.

## Deployment

The GitHub Actions workflow builds and publishes to GitHub Pages on pushes to `main`. In repository **Settings → Pages**, choose **GitHub Actions** as the source.

The workflow sets `VITE_BASE_PATH=/PengamePublishing/` for repository Pages hosting. Local development and root-domain builds default to `/`. Router and asset paths share this setting so nested routes can load the generated `404.html` fallback. No CNAME or DNS changes are included.

The last existing deployment (run 41823990767, November 4, 2026) built successfully but failed at `actions/configure-pages`: the Pages site was not found. Enable Pages with GitHub Actions as the source before retrying deployment. The connected GitHub integration cannot change repository administration settings.

## Immersive experience

- Home offers an explicitly enabled, lazy-loaded Three.js book sculpture. Drag to orbit; use Pause motion to stop animation. Reduced-motion preference starts it paused. Rendering skips hidden tabs and offscreen scenes, caps pixel density, and releases graphics resources on exit. The default static artwork and normal links work without WebGL or XR.
- Compatible HTTPS browsers expose Enter AR / Enter VR after WebXR capability detection. AR shows a floating sculpture; it does not perform hit testing, surface placement, or book-cover tracking. Real-device camera and headset testing remains necessary.
- `/games` contains six external experiences with category filters. Success Brand VR uses the case-sensitive URL `https://mrimagemakers.github.io/SuccessBrandVR/`. External game availability and XR behavior are controlled by those sites.
- `/book-experiences` generates downloadable QR codes for every catalog entry. Print a code generated at the final deployed URL, scan it with a phone camera, and open the matching companion synopsis and purchase link. Built-in camera decoding uses BarcodeDetector where QR support exists; other browsers can use the phone’s camera app or paste the companion URL. Unknown origins, routes, and book IDs are rejected. Camera frames stay local and tracks stop on navigation, tab hiding, or Stop camera.
- This is a QR companion demo, not cover recognition. Book-specific AR scenes, marker tracking, and narrated media require separate assets and implementation. StoryScape XR is an external destination, not an embedded book-specific AR scene.

## Preserved destinations

The existing catalog, Shopify/Amazon purchase URLs, leadership page, cookies page, Rap IQ City, StoryScape XR, Turn Up Music, and Nia’s Number Garden remain. Home includes Coloring Odyssey, Bright Minds Explorers, Changing the Channel, Bright Minds Academy, PG Leadership Academy, and the PenGame Prison Book Program. Existing Webador routes are linked for prison publishing, author and musician services, submissions, internships, PenGame U, the AR/VR zone, and the blog. These links continue to depend on the existing site being available.

## Cover assets

`public/covers/nia-deluxe.jpg` is the actual Deluxe Edition cover retrieved from Amazon’s product-image endpoint for ASIN B0HKG8PCQC. The cover itself identifies the edition and author. The new catalog entry links to the user-supplied Amazon listing; no unverified price or edition specifications are asserted. Other local covers were retrieved from the publisher’s existing Shopify image URLs: Changing the Channel and Leo the Lost Language Lion. The three floating books use local sRGB cover textures, avoiding third-party image CORS dependencies in WebGL. Background texture is lightweight CSS.

