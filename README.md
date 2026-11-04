# PenGame Publishing website

React/Vite source for PenGame Publishing: book catalog, Bright Minds Explorers, leadership titles, and StoryScape XR, Turn Up Music, and Nia's Number Garden links.

## Development

```bash
npm install
npm run dev
npm run build
```

The public site does not require Base44 authentication. The contact form opens the visitor's email client; use a form service for in-browser submissions. Book purchases link to Shopify and some images are externally hosted.

## Deployment

The GitHub Actions workflow builds and publishes to GitHub Pages on pushes to `main`. In repository **Settings → Pages**, choose **GitHub Actions** as the source.

Test the Pages URL before changing the DNS for `pengamepublishing.com`. Preserve the existing email DNS records, and keep Webador active until the new website has been verified.
