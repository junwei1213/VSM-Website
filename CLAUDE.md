# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

**GoVeggie Malaysia** landing page website - a single-page responsive site for the Vegetarian Society of Malaysia's restaurant finder app.

- **Tech stack**: Vanilla HTML, CSS, JavaScript (no build step)
- **Hosting**: Static site (GitHub Pages / Hostinger)
- **Production URL**: `https://goveggiemalaysia.cloud`

## Architecture

```
VSM-Website/
  index.html          # Single-page landing (all sections)
  images/
    logo.png           # Official VSM logo
    hero-food.png      # AI-generated hero illustration
    about-community.png # AI-generated community illustration
    restaurant-scene.png # AI-generated restaurant photo
```

## Key Design Decisions

- **No framework** - vanilla HTML/CSS/JS for maximum performance and simplicity
- **Single file** - all CSS and JS inline in index.html for zero-dependency deployment
- **No emojis** - SVG icons used throughout instead of emoji characters
- **Green color palette** - based on `--green-600: #16a34a` as primary brand color
- **Inter font** - loaded from Google Fonts
- **Scroll animations** - IntersectionObserver-based fade-in on feature cards and stats

## Sections

1. Nav (sticky, blur backdrop)
2. Hero (headline, stats, food illustration, floating cards)
3. Features (6 cards, 3-col grid, SVG icons)
4. How It Works (3 steps)
5. Impact Stats (dark green background)
6. About VSM (community illustration + values)
7. For Restaurant Owners (vendor CTA)
8. Download CTA (App Store + Google Play links)
9. Footer (4-col layout)

## External Links

- App Store: `https://apps.apple.com/my/app/goveggie-malaysia/id1183783738`
- Google Play: `https://play.google.com/store/apps/details?id=com.dwhka.msiafoodlog`
- Facebook Group: `https://www.facebook.com/groups/781347675284086/`
- API Base: `https://goveggiemalaysia.cloud/api`

## Related Repos

- `junwei1213/VSM-App` - Flutter mobile app
- `VSM-Admin` - React admin panel
- `VSM-Backend` - FastAPI backend

## Development

No build step required. Open `index.html` directly or serve:

```bash
python3 -m http.server 8080
```

## Style Guide

- Use CSS custom properties (`:root` variables) for colors
- Mobile-first responsive breakpoints at 900px and 480px
- SVG icons inline, stroke-based, using `var(--green-600)` color
- No emoji characters - use SVG or text only
