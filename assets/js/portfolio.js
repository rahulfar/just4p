/* ==========================================================================
   JUST4P PRODUCTION — Interactive Portfolio Filter, Masonry & Lightbox Modal
   ========================================================================== */

(function () {
  "use strict";

  function initPortfolio() {
    var root = document.getElementById("portfolio-section-root");
    if (!root || !window.PORTFOLIO_ITEMS || !window.PORTFOLIO_CATEGORIES) return;

    var mode = root.getAttribute("data-mode") || "full";
    var filterBar = document.getElementById("portfolio-filter-bar");
    var galleryGrid = document.getElementById("portfolio-masonry-grid");
    var modalEl = document.getElementById("portfolioLightboxModal");
    if (!filterBar || !galleryGrid || !modalEl) return;

    var activeCategory = "All";
    var currentItems = [];
    var activeIndex = 0;

    var modalTitle = modalEl.querySelector("#lightboxTitle");
    var modalMeta = modalEl.querySelector("#lightboxMeta");
    var modalSubtitle = modalEl.querySelector("#lightboxSubtitle");
    var modalCounter = modalEl.querySelector("#lightboxCounter");
    var modalMediaSlot = modalEl.querySelector("#lightboxMediaSlot");
    var prevBtn = modalEl.querySelector("#lightboxPrev");
    var nextBtn = modalEl.querySelector("#lightboxNext");

    var bsModal = window.bootstrap ? new window.bootstrap.Modal(modalEl) : null;

    function getFilteredItems() {
      var list = window.PORTFOLIO_ITEMS;
      if (mode === "home" && activeCategory === "All") {
        return list.filter(function (item) {
          return item.featuredOnHome;
        });
      }
      if (activeCategory === "All") {
        return list;
      }
      return list.filter(function (item) {
        return item.category === activeCategory;
      });
    }

    function renderFilters() {
      filterBar.innerHTML = window.PORTFOLIO_CATEGORIES.map(function (cat) {
        var isActive = cat === activeCategory;
        return (
          '<button type="button" class="portfolio-filter-btn' +
          (isActive ? " active" : "") +
          '" data-category="' +
          cat +
          '" role="tab" aria-selected="' +
          (isActive ? "true" : "false") +
          '">' +
          cat +
          "</button>"
        );
      }).join("");
    }

    function renderGallery() {
      currentItems = getFilteredItems();

      galleryGrid.innerHTML = currentItems
        .map(function (item, idx) {
          var badgeHtml =
            item.mediaType === "video"
              ? '<span class="portfolio-media-pill">&#9654; Film</span>'
              : '<span class="portfolio-media-pill opacity-75">&#10530; View</span>';

          return (
            '<article class="portfolio-item-card" data-idx="' +
            idx +
            '" tabindex="0" role="button" aria-label="Open ' +
            item.title +
            ' in lightbox">' +
            '  <div class="' +
            item.aspectClass +
            ' position-relative">' +
            '    <img src="' +
            item.src +
            '" alt="' +
            item.alt +
            '" loading="lazy" />' +
            '    <div class="portfolio-overlay">' +
            badgeHtml +
            "      <div>" +
            '        <p class="tracking-eyebrow text-muted-gold mb-1" style="font-size:0.62rem;">' +
            item.category +
            " · " +
            item.year +
            "</p>" +
            '        <h3 class="font-display fs-3 text-warm-white mb-1">' +
            item.title +
            "</h3>" +
            '        <p class="small text-soft-beige opacity-75 mb-0">' +
            item.subtitle +
            " — " +
            item.location +
            "</p>" +
            "      </div>" +
            "    </div>" +
            "  </div>" +
            "</article>"
          );
        })
        .join("");
    }

    function updateModalContent() {
      var item = currentItems[activeIndex];
      if (!item) return;

      modalMeta.textContent = item.category + " · " + item.location;
      modalTitle.textContent = item.title;
      modalSubtitle.textContent = item.subtitle;
      modalCounter.textContent = activeIndex + 1 + " / " + currentItems.length;

      if (item.mediaType === "video" && item.videoSrc) {
        modalMediaSlot.innerHTML =
          '<div class="ratio ratio-16x9 bg-black w-100" style="max-width:920px;">' +
          '  <video src="' +
          item.videoSrc +
          '" poster="' +
          item.src +
          '" controls autoplay playsinline class="w-100 h-100"></video>' +
          "</div>";
      } else {
        modalMediaSlot.innerHTML =
          '<img src="' +
          item.src +
          '" alt="' +
          item.alt +
          '" class="img-fluid" style="max-height:70vh; object-fit:contain;" />';
      }
    }

    function openLightbox(index) {
      activeIndex = index;
      updateModalContent();
      if (bsModal) bsModal.show();
    }

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".portfolio-filter-btn");
      if (!btn) return;
      activeCategory = btn.getAttribute("data-category") || "All";
      renderFilters();
      renderGallery();
    });

    galleryGrid.addEventListener("click", function (e) {
      var card = e.target.closest(".portfolio-item-card");
      if (!card) return;
      var idx = parseInt(card.getAttribute("data-idx") || "0", 10);
      openLightbox(idx);
    });

    galleryGrid.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        var card = e.target.closest(".portfolio-item-card");
        if (!card) return;
        e.preventDefault();
        var idx = parseInt(card.getAttribute("data-idx") || "0", 10);
        openLightbox(idx);
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (!currentItems.length) return;
        activeIndex = (activeIndex - 1 + currentItems.length) % currentItems.length;
        updateModalContent();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (!currentItems.length) return;
        activeIndex = (activeIndex + 1) % currentItems.length;
        updateModalContent();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (!modalEl.classList.contains("show")) return;
      if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
      if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
    });

    // Pause video playback cleanly when modal closes
    modalEl.addEventListener("hidden.bs.modal", function () {
      var video = modalMediaSlot.querySelector("video");
      if (video) {
        video.pause();
      }
      modalMediaSlot.innerHTML = "";
    });

    renderFilters();
    renderGallery();
  }

  document.addEventListener("DOMContentLoaded", initPortfolio);
})();
