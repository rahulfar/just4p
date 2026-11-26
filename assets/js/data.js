/* ==========================================================================
   JUST4P PRODUCTION — Centralized Brand, Portfolio & Testimonials Data
   Update images, videos, contact info, or testimonials in this single file.
   ========================================================================== */

window.SITE_CONFIG = {
  brandName: "JUST4P PRODUCTION",
  email: "studio@just4pproduction.com",
  phoneDisplay: "+91 95285 20854",
  phoneHref: "tel:+919528520854",
  whatsappNumber: "919528520854",
  location: "Available Worldwide · Destination & Studio Productions",
  instagramUrl: "https://instagram.com/just4pproduction",
  youtubeUrl: "https://youtube.com/@just4pproduction",
  // Optional: Paste a Formspree / Web3Forms / custom backend URL to enable direct server email delivery.
  bookingEndpoint: "",
  allCapabilities: [
    "Professional Photography",
    "Wedding Photography",
    "Pre-Wedding Photography",
    "Birthday Party Photography",
    "Event Photography",
    "Professional Videography",
    "Wedding Cinematography",
    "Podcast Recording and Production",
    "Video Editing",
    "Reels and Short-Form Video Editing",
    "Promotional Videos",
    "Product Photography",
    "Commercial Photography",
    "Other Creative Production Services"
  ]
};

window.buildWhatsAppUrl = function (customMessage) {
  var msg =
    customMessage ||
    "Hello JUST4P PRODUCTION, I would like to enquire about booking a creative shoot or production.";
  return (
    "https://wa.me/" +
    window.SITE_CONFIG.whatsappNumber +
    "?text=" +
    encodeURIComponent(msg)
  );
};

window.PORTFOLIO_CATEGORIES = [
  "All",
  "Wedding",
  "Pre-Wedding",
  "Birthday",
  "Events",
  "Cinematic Videos",
  "Commercial Photography",
  "Podcast"
];

window.PORTFOLIO_ITEMS = [
  {
    id: "wed-heritage-arches",
    title: "Golden Hour Beneath Sandstone Arches",
    subtitle: "Editorial Wedding Story",
    category: "Wedding",
    mediaType: "image",
    src: "assets/images/service-wedding.jpg",
    alt: "Bride and groom walking beneath carved sandstone arches at sunset",
    aspectClass: "ratio-4x5",
    year: "2026",
    location: "Heritage Courtyard",
    featuredOnHome: true
  },
  {
    id: "vid-wedding-cinema-reel",
    title: "Twilight Vows — Cinema Showreel",
    subtitle: "4K Wedding Cinematography",
    category: "Cinematic Videos",
    mediaType: "video",
    src: "assets/images/portfolio-cinema-wedding.jpg",
    videoSrc: "assets/videos/wedding-cinema-reel.mp4",
    alt: "Wedding cinematography showreel featuring bride and groom in golden courtyard light",
    aspectClass: "ratio-16x10",
    year: "2026",
    location: "Destination Estate",
    featuredOnHome: true
  },
  {
    id: "prewed-coastal-dusk",
    title: "Cliffs at Blue Hour",
    subtitle: "Destination Pre-Wedding",
    category: "Pre-Wedding",
    mediaType: "image",
    src: "assets/images/service-prewedding.jpg",
    alt: "Couple in warm beige coat and dark tailored suit on misty coastal cliffs",
    aspectClass: "ratio-4x5",
    year: "2026",
    location: "Coastal Overlook",
    featuredOnHome: true
  },
  {
    id: "comm-botanical-atelier",
    title: "Nocturne Glass & Brass",
    subtitle: "Luxury Product Campaign",
    category: "Commercial Photography",
    mediaType: "image",
    src: "assets/images/service-commercial.jpg",
    alt: "Luxury fragrance bottle and brushed brass watch on basalt stone",
    aspectClass: "ratio-4x5",
    year: "2026",
    location: "JUST4P Studio",
    featuredOnHome: true
  },
  {
    id: "pod-executive-series",
    title: "Founders Unscripted — Season Set",
    subtitle: "Multi-Cam Video Podcast",
    category: "Podcast",
    mediaType: "video",
    src: "assets/images/service-podcast.jpg",
    videoSrc: "assets/videos/podcast-video-reel.mp4",
    alt: "Acoustic wood-slat podcast studio with broadcast microphones and cinema camera",
    aspectClass: "ratio-4x5",
    year: "2026",
    location: "Soundstage A",
    featuredOnHome: true
  },
  {
    id: "bday-champagne-soiree",
    title: "Candlelit Milestone Soirée",
    subtitle: "Private Birthday Coverage",
    category: "Birthday",
    mediaType: "image",
    src: "assets/images/service-events.jpg",
    alt: "Guests raising crystal champagne coupes at an intimate candlelit birthday dinner",
    aspectClass: "ratio-4x5",
    year: "2026",
    location: "Private Conservatory",
    featuredOnHome: true
  },
  {
    id: "evt-live-gala-stage",
    title: "Encore Night & Live Stage",
    subtitle: "Corporate & Cultural Event",
    category: "Events",
    mediaType: "image",
    src: "assets/images/portfolio-events-1.jpg",
    alt: "Dramatic live stage beams and audience silhouette at an evening event",
    aspectClass: "ratio-16x10",
    year: "2026",
    location: "Grand Pavilion",
    featuredOnHome: true
  },
  {
    id: "vid-commercial-grade",
    title: "Atelier Brand Motion & Grade",
    subtitle: "Commercial Video & Color Suite",
    category: "Cinematic Videos",
    mediaType: "video",
    src: "assets/images/service-editing.jpg",
    videoSrc: "assets/videos/commercial-brand-reel.mp4",
    alt: "Commercial motion reel and color grading reference suite",
    aspectClass: "ratio-4x5",
    year: "2026",
    location: "Post-Production Suite",
    featuredOnHome: true
  },
  {
    id: "wed-candid-viewfinder",
    title: "The First Look Frame",
    subtitle: "Documentary Wedding Coverage",
    category: "Wedding",
    mediaType: "image",
    src: "assets/images/portfolio-wedding-1.jpg",
    alt: "Black and white viewfinder framing of bride and groom holding hands",
    aspectClass: "ratio-3x4",
    year: "2026",
    location: "Private Estate",
    featuredOnHome: false
  },
  {
    id: "prewed-horizon-silhouette",
    title: "Amber Horizon Silhouette",
    subtitle: "Pre-Wedding Sunset Session",
    category: "Pre-Wedding",
    mediaType: "image",
    src: "assets/images/portfolio-prewedding-1.jpg",
    alt: "Romantic couple silhouette against a dramatic sunset sky",
    aspectClass: "ratio-16x10",
    year: "2026",
    location: "Shoreline Pier",
    featuredOnHome: false
  },
  {
    id: "bday-champagne-toast",
    title: "Gold Foil & Vintage Toast",
    subtitle: "Birthday Celebration",
    category: "Birthday",
    mediaType: "image",
    src: "assets/images/portfolio-birthday-1.jpg",
    alt: "Champagne service and celebration glassware at an evening birthday gathering",
    aspectClass: "ratio-16x10",
    year: "2026",
    location: "Lounge Salon",
    featuredOnHome: false
  },
  {
    id: "comm-editorial-lookbook",
    title: "Chiaroscuro Fashion Study",
    subtitle: "Editorial Commercial Portrait",
    category: "Commercial Photography",
    mediaType: "image",
    src: "assets/images/portfolio-commercial-2.jpg",
    alt: "High-contrast fashion editorial portrait in warm directional light",
    aspectClass: "ratio-3x4",
    year: "2026",
    location: "Daylight Loft",
    featuredOnHome: false
  },
  {
    id: "pod-broadcast-arm",
    title: "Warmth in Every Frequency",
    subtitle: "Podcast Studio Acoustics",
    category: "Podcast",
    mediaType: "image",
    src: "assets/images/podcast-studio-wide.jpg",
    alt: "Studio broadcast microphone suspended on matte black boom arm against amber backdrop",
    aspectClass: "ratio-3x4",
    year: "2026",
    location: "JUST4P Audio Room",
    featuredOnHome: false
  },
  {
    id: "wed-courtyard-reception",
    title: "Midnight Courtyard Dance",
    subtitle: "Wedding Reception Feature",
    category: "Wedding",
    mediaType: "image",
    src: "assets/images/experience-wedding-wide.jpg",
    alt: "Newlywed couple dancing under string lights in an architectural stone courtyard",
    aspectClass: "ratio-16x10",
    year: "2026",
    location: "Palace Courtyard",
    featuredOnHome: false
  }
];

window.REEL_CARDS = [
  {
    id: "wedding-reel",
    category: "Wedding Cinema & Highlights",
    title: "Twilight Vows Showreel",
    description:
      "Anamorphic motion pacing, natural ambience, and warm filmic color grading.",
    poster: "assets/images/portfolio-cinema-wedding.jpg",
    videoSrc: "assets/videos/wedding-cinema-reel.mp4",
    specs: "4K · 24fps · Cinema LUT"
  },
  {
    id: "commercial-reel",
    category: "Commercial & Promotional",
    title: "Atelier Product Motion",
    description:
      "High-retention brand cuts, rhythmic editing, and editorial visual polish.",
    poster: "assets/images/service-editing.jpg",
    videoSrc: "assets/videos/commercial-brand-reel.mp4",
    specs: "16:9 & 9:16 · Color Suite"
  },
  {
    id: "podcast-reel",
    category: "Podcast & Short-Form Reels",
    title: "Multi-Cam Studio Cutdowns",
    description:
      "Dynamic multi-angle switching engineered for YouTube, Reels, and Shorts.",
    poster: "assets/images/service-podcast.jpg",
    videoSrc: "assets/videos/podcast-video-reel.mp4",
    specs: "Multi-Cam · Mastered Audio"
  }
];

/**
 * Genuine client testimonials only.
 * Leave empty until verified client reviews are added — no fabricated names, ratings, or quotes.
 */
window.TESTIMONIALS_DATA = [];
