/* ==========================================================================
   JUST4P PRODUCTION — Booking Enquiry Validation, Submission & WhatsApp Flow
   ========================================================================== */

(function () {
  "use strict";

  function initBookingForm() {
    var form = document.getElementById("bookingForm");
    if (!form) return;

    var serviceSelect = document.getElementById("service");
    var alertBanner = document.getElementById("bookingFormAlert");
    var formWrapper = document.getElementById("bookingFormContainer");
    var successPanel = document.getElementById("bookingSuccessPanel");
    var directWhatsAppBtn = document.getElementById("directWhatsAppBtn");
    var submitBtn = document.getElementById("submitBookingBtn");

    // Populate capabilities select options dynamically
    if (serviceSelect && window.SITE_CONFIG && window.SITE_CONFIG.allCapabilities) {
      serviceSelect.innerHTML = window.SITE_CONFIG.allCapabilities
        .map(function (cap) {
          return '<option value="' + cap + '">' + cap + "</option>";
        })
        .join("");
    }

    // Pre-select service from ?service= query parameter
    var urlParams = new URLSearchParams(window.location.search);
    var requestedService = urlParams.get("service");
    if (requestedService && serviceSelect) {
      var match = Array.from(serviceSelect.options).find(function (opt) {
        return opt.value.toLowerCase() === requestedService.toLowerCase();
      });
      if (match) {
        serviceSelect.value = match.value;
      }
    }

    function readValues() {
      return {
        fullName: (document.getElementById("fullName").value || "").trim(),
        phone: (document.getElementById("phone").value || "").trim(),
        email: (document.getElementById("email").value || "").trim(),
        service: document.getElementById("service").value || "",
        eventDate: document.getElementById("eventDate").value || "",
        eventLocation: (document.getElementById("eventLocation").value || "").trim(),
        guestCount: (document.getElementById("guestCount").value || "").trim(),
        budgetRange: document.getElementById("budgetRange").value || "",
        projectDetails: (document.getElementById("projectDetails").value || "").trim()
      };
    }

    function buildSummaryMessage(data, refId) {
      var lines = [
        "Hello JUST4P PRODUCTION" + (refId ? " (Ref: " + refId + ")" : "") + ",",
        "Service Enquiry: " + (data.service || "Creative Production"),
        "Name: " + (data.fullName || "Not provided"),
        "Phone: " + (data.phone || "Not provided"),
        "Email: " + (data.email || "Not provided"),
        "Event Date: " + (data.eventDate || "Flexible"),
        "Location: " + (data.eventLocation || "TBD"),
        data.guestCount ? "Guests: " + data.guestCount : "",
        data.budgetRange ? "Budget Range: " + data.budgetRange : "",
        data.projectDetails ? "Project Notes: " + data.projectDetails : ""
      ].filter(Boolean);
      return lines.join("\n");
    }

    function syncWhatsAppLink() {
      if (!directWhatsAppBtn || !window.buildWhatsAppUrl) return;
      var data = readValues();
      directWhatsAppBtn.setAttribute(
        "href",
        window.buildWhatsAppUrl(buildSummaryMessage(data))
      );
    }

    form.addEventListener("input", function (e) {
      if (e.target && e.target.classList) {
        e.target.classList.remove("is-invalid");
      }
      if (alertBanner) alertBanner.classList.add("d-none");
      syncWhatsAppLink();
    });

    syncWhatsAppLink();

    function validateField(id, isValid, message) {
      var input = document.getElementById(id);
      var errorEl = document.getElementById(id + "Error");
      if (!input) return true;
      if (!isValid) {
        input.classList.add("is-invalid");
        if (errorEl) errorEl.textContent = message;
        return false;
      } else {
        input.classList.remove("is-invalid");
        if (errorEl) errorEl.textContent = "";
        return true;
      }
    }

    function validateAll(data) {
      var ok = true;
      ok =
        validateField(
          "fullName",
          data.fullName.length >= 2,
          "Please enter your full name."
        ) && ok;

      var phoneDigits = data.phone.replace(/\D/g, "");
      ok =
        validateField(
          "phone",
          phoneDigits.length >= 7 && phoneDigits.length <= 16,
          "Please enter a valid phone or WhatsApp number."
        ) && ok;

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      ok =
        validateField(
          "email",
          emailOk,
          "Please enter a valid email address."
        ) && ok;

      ok =
        validateField(
          "service",
          data.service.length > 0,
          "Please select a service."
        ) && ok;

      ok =
        validateField(
          "eventDate",
          data.eventDate.length > 0,
          "Please choose your target shoot or event date."
        ) && ok;

      ok =
        validateField(
          "eventLocation",
          data.eventLocation.length >= 2,
          "Please enter the event city or venue."
        ) && ok;

      ok =
        validateField(
          "projectDetails",
          data.projectDetails.length >= 10,
          "Please share at least 10 characters about your project or vision."
        ) && ok;

      return ok;
    }

    function showReceiptPanel(data, refId, backendSent) {
      formWrapper.classList.add("d-none");
      successPanel.classList.remove("d-none");

      var titleEl = document.getElementById("successHeading");
      var refEl = document.getElementById("successRefBadge");
      var noteEl = document.getElementById("successNoticeText");
      var waConfirmBtn = document.getElementById("successWhatsAppBtn");
      var mailConfirmBtn = document.getElementById("successEmailBtn");

      if (refEl) {
        refEl.textContent = "ENQUIRY PREPARED · REF " + refId;
      }
      if (titleEl) {
        titleEl.textContent = "Thank you, " + data.fullName + ".";
      }
      if (noteEl) {
        noteEl.textContent = backendSent
          ? "Your enquiry details were submitted to our studio desk. Please note that event dates remain open until availability is reviewed and confirmed by our producer."
          : "Your enquiry summary has been validated and prepared (no automated mail server is connected in static mode). Send it directly via WhatsApp or Email below—event dates are not reserved until confirmed by our producer.";
      }

      var summaryText = buildSummaryMessage(data, refId);
      if (waConfirmBtn && window.buildWhatsAppUrl) {
        waConfirmBtn.setAttribute("href", window.buildWhatsAppUrl(summaryText));
      }
      if (mailConfirmBtn && window.SITE_CONFIG) {
        var subject = encodeURIComponent(
          "Shoot Enquiry (" + refId + "): " + data.service + " — " + data.fullName
        );
        var body = encodeURIComponent(summaryText);
        mailConfirmBtn.setAttribute(
          "href",
          "mailto:" + window.SITE_CONFIG.email + "?subject=" + subject + "&body=" + body
        );
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = readValues();

      if (!validateAll(data)) {
        if (alertBanner) {
          alertBanner.textContent =
            "Please complete all required fields highlighted below before sending your enquiry.";
          alertBanner.classList.remove("d-none");
        }
        return;
      }

      var refId = "J4P-" + Date.now().toString(36).toUpperCase();
      var endpoint =
        window.SITE_CONFIG && window.SITE_CONFIG.bookingEndpoint
          ? window.SITE_CONFIG.bookingEndpoint.trim()
          : "";

      if (endpoint) {
        submitBtn.disabled = true;
        submitBtn.textContent = "SENDING ENQUIRY...";

        fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(Object.assign({ referenceId: refId }, data))
        })
          .then(function (res) {
            if (!res.ok) throw new Error("Server error");
            showReceiptPanel(data, refId, true);
          })
          .catch(function () {
            if (alertBanner) {
              alertBanner.textContent =
                "The automated enquiry endpoint could not be reached. You can send your enquiry immediately using the WhatsApp button below.";
              alertBanner.classList.remove("d-none");
            }
          })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = "SEND BOOKING ENQUIRY";
          });
      } else {
        showReceiptPanel(data, refId, false);
      }
    });

    var resetBtn = document.getElementById("resetBookingFormBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        form.reset();
        successPanel.classList.add("d-none");
        formWrapper.classList.remove("d-none");
        syncWhatsAppLink();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initBookingForm);
})();
