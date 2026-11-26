/* ==========================================================================
   JUST4P PRODUCTION — Global Interactions, Scroll Reveals, Reels & Testimonials
   ========================================================================== */

(function () {
  "use strict";

  // 1. Sticky Transparent-to-Solid Navbar
  function initNavbarScroll() {
    var nav = document.getElementById("mainNavbar");
    if (!nav) return;

    function updateNav() {
      if (window.scrollY > 36) {
        nav.classList.add("navbar-scrolled");
      } else {
        nav.classList.remove("navbar-scrolled");
      }
    }

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
  }

  // 2. Scroll Reveal Animations using IntersectionObserver
  function initScrollReveals() {
    var items = document.querySelectorAll(".reveal-up");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  // 3. Subtle Parallax on Hero or Feature Media
  function initParallax() {
    var els = document.querySelectorAll("[data-parallax]");
    if (!els.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    function onScroll() {
      var scrollY = window.scrollY;
      els.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax") || "0.15");
        var rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          el.style.transform = "translate3d(0, " + (scrollY * speed * 0.25).toFixed(1) + "px, 0)";
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // 4. Video Reel Cards (Section 9 & Videography / Editing Pages)
  function initVideoReels() {
    var container = document.getElementById("video-reel-grid");
    if (!container || !window.REEL_CARDS) return;

    container.innerHTML = window.REEL_CARDS.map(function (reel) {
      return (
        '<div class="col-12 col-lg-4">' +
        '  <div class="reel-card">' +
        '    <div class="position-relative ratio-16x9 bg-black overflow-hidden">' +
        '      <video class="w-100 h-100 object-fit-cover reel-video" src="' +
        reel.videoSrc +
        '" poster="' +
        reel.poster +
        '" muted loop playsinline preload="metadata"></video>' +
        '      <button type="button" class="reel-play-overlay" data-reel-id="' +
        reel.id +
        '" aria-label="Play ' +
        reel.title +
        '">' +
        '        <span class="reel-play-circle">' +
        '          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>' +
        "        </span>" +
        '        <span class="tracking-eyebrow" style="font-size:0.62rem;">Play Preview Reel</span>' +
        "      </button>" +
        "    </div>" +
        '    <div class="p-4">' +
        '      <div class="d-flex align-items-center justify-content-between mb-2">' +
        '        <span class="text-muted-gold tracking-eyebrow" style="font-size:0.62rem;">' +
        reel.category +
        "</span>" +
        '        <span class="text-soft-beige opacity-75" style="font-size:0.68rem;">' +
        reel.specs +
        "</span>" +
        "      </div>" +
        '      <h3 class="font-display fs-3 text-warm-white mb-2">' +
        reel.title +
        "</h3>" +
        '      <p class="text-soft-beige opacity-75 small mb-0">' +
        reel.description +
        "</p>" +
        "    </div>" +
        "  </div>" +
        "</div>"
      );
    }).join("");

    container.addEventListener("click", function (e) {
      var btn = e.target.closest(".reel-play-overlay");
      if (!btn) return;

      var wrapper = btn.parentElement;
      var video = wrapper.querySelector("video");
      if (!video) return;

      // Pause any other playing reels
      container.querySelectorAll("video").forEach(function (v) {
        if (v !== video) {
          v.pause();
          v.controls = false;
          var otherOverlay = v.parentElement.querySelector(".reel-play-overlay");
          if (otherOverlay) otherOverlay.classList.remove("d-none");
        }
      });

      btn.classList.add("d-none");
      video.controls = true;
      video.play().catch(function () {});
    });
  }

  // 5. Genuine-Only Testimonials Section
  function initTestimonials() {
    var container = document.getElementById("testimonials-container");
    if (!container) return;

    var list = window.TESTIMONIALS_DATA || [];
    if (list.length > 0) {
      container.innerHTML =
        '<div class="row g-4">' +
        list
          .map(function (item) {
            return (
              '<div class="col-12 col-md-4">' +
              '  <blockquote class="border border-subtle-light bg-white bg-opacity-75 p-4 p-lg-5 h-100 d-flex flex-column justify-content-between mb-0">' +
              '    <p class="font-editorial fst-italic fs-5 text-obsidian">"' +
              item.quote +
              '"</p>' +
              '    <footer class="mt-4 pt-3 border-top border-subtle-light">' +
              '      <div class="fw-semibold text-obsidian">' +
              item.clientName +
              "</div>" +
              '      <div class="text-obsidian opacity-75 tracking-eyebrow" style="font-size:0.62rem;">' +
              item.projectType +
              " · " +
              item.verifiedDate +
              "</div>" +
              "    </footer>" +
              "  </blockquote>" +
              "</div>"
            );
          })
          .join("") +
        "</div>";
      return;
    }

    // Honest empty state — no fake customer names, ratings, or quotes
    container.innerHTML =
      '<div class="border border-subtle-light bg-soft-beige-soft p-4 p-sm-5">' +
      '  <div class="row align-items-center g-4">' +
      '    <div class="col-12 col-lg-8">' +
      '      <p class="tracking-eyebrow text-muted-gold mb-2">Verified Reviews Policy</p>' +
      '      <h3 class="font-display fs-2 text-obsidian mb-3">Only Genuine Client Stories Are Published Here</h3>' +
      '      <p class="text-obsidian opacity-75 mb-0">' +
      "        At JUST4P PRODUCTION, we never fabricate customer names, star ratings, or placeholder reviews. " +
      "        Verified testimonials from couples, founders, and brand partners are published here as productions conclude. " +
      "        Request full wedding galleries or private commercial screeners during your consultation." +
      "      </p>" +
      "    </div>" +
      '    <div class="col-12 col-lg-4 text-lg-end">' +
      '      <a href="contact.html#booking-form" class="btn-dark-luxury">' +
      "        <span>Request Private Screener</span>" +
      "        <span>&#8599;</span>" +
      "      </a>" +
      "    </div>" +
      "  </div>" +
      "</div>";
  }

  // 6. Hydrate Dynamic WhatsApp Concierge Links & Floating Call/WhatsApp Dock
  function initWhatsAppLinks() {
    if (!window.buildWhatsAppUrl) return;
    document.querySelectorAll("[data-whatsapp-link]").forEach(function (el) {
      el.setAttribute("href", window.buildWhatsAppUrl());
    });
  }

  function initFloatingActions() {
    if (!window.SITE_CONFIG || !window.buildWhatsAppUrl) return;
    if (document.getElementById("j4pFloatingActions")) return;

    var dock = document.createElement("div");
    dock.id = "j4pFloatingActions";
    dock.className = "j4p-floating-actions";
    dock.setAttribute("aria-label", "Quick Call and WhatsApp Contact");

    var phoneHref = window.SITE_CONFIG.phoneHref || "tel:+919528520854";
    var phoneDisplay = window.SITE_CONFIG.phoneDisplay || "+91 95285 20854";
    var whatsappHref = window.buildWhatsAppUrl();

    dock.innerHTML =
      '<a href="' +
      phoneHref +
      '" class="j4p-fab j4p-fab-call" aria-label="Call JUST4P PRODUCTION at ' +
      phoneDisplay +
      '">' +
      '  <span class="j4p-fab-label">Call ' +
      phoneDisplay +
      "</span>" +
      '  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' +
      "  </svg>" +
      "</a>" +
      '<a href="' +
      whatsappHref +
      '" target="_blank" rel="noopener noreferrer" class="j4p-fab j4p-fab-whatsapp" aria-label="Chat on WhatsApp with JUST4P PRODUCTION">' +
      '  <span class="j4p-fab-label">WhatsApp Us</span>' +
      '  <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.34.14 11.91c0 2.1.55 4.15 1.59 5.95L0 24l6.31-1.65a11.86 11.86 0 0 0 5.74 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.46-8.42ZM12.06 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.52-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.44 9.88-9.9 9.88Zm5.43-7.41c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.12 3.24 5.14 4.54.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/>' +
      "  </svg>" +
      "</a>";

    document.body.appendChild(dock);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavbarScroll();
    initScrollReveals();
    initParallax();
    initVideoReels();
    initTestimonials();
    initWhatsAppLinks();
    initFloatingActions();
  });
})();
