# Mindful Astitva — React conversion

This project converts the supplied single-page HTML website into a React app powered by Vite. The original page content, styles, inline SVG artwork, embedded image data, responsive breakpoints, fonts, and motion styling are retained. The existing interactions are initialized in React's `useEffect` and cleaned up on unmount.

## Requirements
- Node.js 20.19+ or 22.12+ recommended for current Vite releases
- npm

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Project structure
- `src/App.jsx` — React page wrapper and interaction lifecycle
- `src/site-content.html` — original body markup, preserved as HTML
- `src/site.css` — original stylesheet
- `src/main.jsx` — React entry point
- `index.html` — Vite document shell and SEO/social metadata

## Before launch
The source HTML contains a launch note that calls out the placeholder `hello@mindfulastitva.com`; confirm and replace it if it appears in the contact content. Verify the practice's contact details, fees, credentials, testimonials, crisis resources, and business hours before publishing. The corporate enquiry form opens WhatsApp, matching the original behavior; it does not submit to a server.
