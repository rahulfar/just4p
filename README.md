# JUST4P PRODUCTION — Photography & Creative Production Website

Built with **HTML5, CSS3, JavaScript (ES5/ES6), and Bootstrap 5.3**.

## Structure

- **Pages (Root):**
  - `index.html` — Homepage (Hero, Brand Intro, 7 Services, Masonry Portfolio + Lightbox, Why Choose Us, Wedding Experience, Podcast Studio, Video Editing Reels, Honest Testimonials Policy, CTA, Footer)
  - `about.html` — About Us & Creative Philosophy
  - `services.html` — Complete Services Overview
  - `wedding-photography.html` — Wedding Photography
  - `pre-wedding-photography.html` — Pre-Wedding Photography
  - `event-birthday-photography.html` — Birthday & Event Photography
  - `videography.html` — Cinematic Videography & Wedding Films
  - `podcast-production.html` — Podcast Studio & Video Production
  - `video-editing.html` — Video Editing, Color Grading & Reels
  - `commercial-product-photography.html` — Commercial & Product Photography
  - `portfolio.html` — Full Filterable Masonry Photo & Video Portfolio
  - `contact.html` — 9-Field Booking Enquiry Form & Studio Concierge
- **Assets:**
  - `assets/css/style.css` — Luxury design system (`#101010`, `#1A1A1A`, `#F7F5F0`, `#D8CBB8`, `#B99A68`, `#E9E9E9`)
  - `assets/js/data.js` — Brand contact details, WhatsApp/booking endpoint config, portfolio items, video reels, and genuine testimonials list
  - `assets/js/main.js` — Sticky navbar, scroll-reveal observer, parallax, video reel player, and testimonials renderer
  - `assets/js/portfolio.js` — Portfolio category filtering and Bootstrap Lightbox modal (images + MP4 playback + keyboard navigation)
  - `assets/js/booking.js` — Client validation, optional webhook/Formspree endpoint submission, WhatsApp prefill, and email draft fallback
  - `assets/images/` & `assets/videos/` — Photography and cinema showreel media

## Running Locally

Open `index.html` directly or serve via any static server:

```bash
python3 -m http.server 8080
```
