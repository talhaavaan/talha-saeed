# Talha Portfolio — Setup Guide

## Install & Run

```bash
npm install
npm run dev
```

## New Dependencies Added
- `framer-motion` — powers the hero overlay animations
- `lucide-react` — social icons in the hero

## Folder Structure for Videos

Place your video files exactly here:

```
public/
  assets/
    brands/
      1.mp4       ← your brands showreel
    restaurant/
      1.mp4       ← your restaurant video
    films/
      1.mp4       ← your films/cinematic edit
```

The VideoSection component automatically looks for `1.mp4` in each folder.
If the file isn't there yet, it shows a placeholder — no errors.

## What Changed

### Hero
- Three.js starfield/nebula background kept
- MinimalistHero component overlaid on top with framer-motion entrance animations
- Nav, portrait, social icons, and big text animate in on load

### Services (updated)
- Meta Ads
- Shopify Store Management
- Airbnb Listing & Handling
- Web Development & Design
- Graphic Design & Videography
- Google Ads
- Content Strategy
- Brand Identity
- Creative Direction

### Layout
- Removed boxy cards — services now use a borderless grid with hairline dividers
- Contact form uses underline-only inputs for a clean feel
- Portfolio grid uses 1px gaps (flush, no rounded corners)
- Fluid scroll feel throughout

### No Emojis
- All emojis removed from services, tools, footer, chatbot, contact links
- Replaced with text abbreviations (IG, YT, WA, @) and SVG icons

### Testimonials
- Fixed to 10 real-sounding reviews
- 4 columns with proper content distribution
- No emojis

## Components
- `src/components/HeroSection.jsx` — Three.js + MinimalistHero overlay
- `src/components/ui/minimalist-hero.jsx` — Reusable animated hero layout
- `src/components/VideoSection.jsx` — 3-column video preview grid
- `src/components/Testimonials3D.jsx` — Scrolling 3D testimonial marquee
- `src/App.jsx` — Main app with all sections
- `src/index.css` — Full stylesheet
