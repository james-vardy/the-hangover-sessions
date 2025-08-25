// Import styles
import "./styles/main.css";

// Import functionality
import { loadUpcomingArtists, loadLatestVideo } from "./scripts/artists.js";
import { loadArchiveEpisodes } from "./scripts/archive.js";
import { MailjetHandler } from "./scripts/mailjet.js";

// Mobile menu toggle
document
  .getElementById("mobileMenuToggle")
  .addEventListener("click", function () {
    document.getElementById("navMenu").classList.toggle("active");
  });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      // Close mobile menu if open
      document.getElementById("navMenu").classList.remove("active");
    }
  });
});

// Mailing List Popup Functionality
function initializeMailingListPopup() {
  const modal = document.getElementById("mailingListModal");
  const closeBtn = document.getElementById("closeModal");
  const form = document.querySelector(".newsletter-form");

  // Check if user has already seen the popup
  const hasSeenPopup = localStorage.getItem("hasSeenMailingListPopup");

  // Show popup after 10 seconds if user hasn't seen it
  if (!hasSeenPopup) {
    setTimeout(() => {
      showModal();
    }, 10000); // 10 seconds delay
  }

  // Close modal when clicking X
  closeBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const email = document.getElementById("newsletter-email").value;
    const name = document.getElementById("newsletter-name").value;

    // Basic email validation
    if (!isValidEmail(email)) {
      showModalError("Please enter a valid email address.");
      return;
    }

    // Show loading state
    showModalLoading();

    // Handle newsletter signup
    handleNewsletterSubmission(email, name);
  });

  async function handleNewsletterSubmission(email, name) {
    const result = await MailjetHandler.handleNewsletterSignup(email, name);
    if (result.success) {
      showSuccessMessage();
      localStorage.setItem("hasSeenMailingListPopup", "true");
      setTimeout(() => closeModal(), 3000); // Auto-close after 3 seconds
    } else {
      showModalError(result.message);
    }
  }

  function showModalLoading() {
    const submitBtn = form.querySelector(".newsletter-submit");
    submitBtn.textContent = "Joining...";
    submitBtn.disabled = true;

    // Remove any existing error messages
    const existingError = modal.querySelector(".modal-error");
    if (existingError) {
      existingError.remove();
    }
  }

  function showModalError(message) {
    const submitBtn = form.querySelector(".newsletter-submit");
    submitBtn.textContent = "Join the Sessions";
    submitBtn.disabled = false;

    // Remove existing error if any
    const existingError = modal.querySelector(".modal-error");
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "modal-error";
    errorDiv.textContent = message;

    // Insert error before submit button
    const formGroups = form.querySelectorAll(".form-group");
    const lastFormGroup = formGroups[formGroups.length - 1];
    lastFormGroup.insertAdjacentElement("afterend", errorDiv);
  }

  function showModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = ""; // Restore scrolling
    localStorage.setItem("hasSeenMailingListPopup", "true");
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showSuccessMessage() {
    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = `
      <h3>🎵 Welcome to the Sessions!</h3>
      <p>Thanks for joining The Hangover Sessions community!</p>
      <p>We'll keep you updated on upcoming sessions, new artists, and exclusive content.</p>
      <div class="success-animation">✓</div>
      <p style="font-size: 0.9em; color: #666; margin-top: 1.5rem;">This window will close automatically...</p>
    `;
  }
}

// Standalone Newsletter Form Functionality
function initializeStandaloneNewsletter() {
  const form = document.querySelector(".standalone-newsletter-form");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const email = document.getElementById("standalone-newsletter-email").value;
    const name = document.getElementById("standalone-newsletter-name").value;

    // Basic validation
    if (!isValidEmail(email)) {
      showNewsletterError("Please enter a valid email address.");
      return;
    }

    // Show loading state
    showNewsletterLoading();

    // Handle submission
    const result = await MailjetHandler.handleNewsletterSignup(email, name);

    if (result.success) {
      showNewsletterSuccess();
    } else {
      showNewsletterError(result.message);
    }
  });

  function showNewsletterLoading() {
    const submitBtn = form.querySelector(".newsletter-signup-btn");
    submitBtn.textContent = "Joining...";
    submitBtn.disabled = true;

    // Remove existing messages
    const existingMessages = form.querySelectorAll(
      ".newsletter-error, .newsletter-success"
    );
    existingMessages.forEach((msg) => msg.remove());
  }

  function showNewsletterError(message) {
    const submitBtn = form.querySelector(".newsletter-signup-btn");
    submitBtn.textContent = "Join the Sessions";
    submitBtn.disabled = false;

    // Remove existing messages
    const existingMessages = form.querySelectorAll(
      ".newsletter-error, .newsletter-success"
    );
    existingMessages.forEach((msg) => msg.remove());

    // Add error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "newsletter-error";
    errorDiv.textContent = message;

    // Insert before disclaimer
    const disclaimer = form.querySelector(".newsletter-disclaimer");
    disclaimer.parentNode.insertBefore(errorDiv, disclaimer);
  }

  function showNewsletterSuccess() {
    const formContainer = document.querySelector(".newsletter-form-container");
    formContainer.innerHTML = `
      <div class="newsletter-success">
        <h3>🎵 Welcome to the Sessions!</h3>
        <div class="success-animation">✓</div>
        <p>Thanks for joining The Hangover Sessions community!</p>
        <p>We'll keep you updated on upcoming sessions, new artists, and exclusive content.</p>
      </div>
    `;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Contact Form Handler
function initializeContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        demo: document.getElementById("demo").value,
        message: document.getElementById("message").value,
      };

      // Check if newsletter opt-in is checked
      const newsletterOptIn =
        document.getElementById("newsletter-opt-in").checked;

      // Show loading state
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Handle contact form submission
      const contactResult = await MailjetHandler.handleContactForm(formData);

      // If newsletter opt-in is checked, also subscribe to newsletter
      let newsletterResult = { success: true }; // Default to success if not opting in
      if (newsletterOptIn) {
        newsletterResult = await MailjetHandler.handleNewsletterSignup(
          formData.email,
          formData.name
        );
      }

      if (contactResult.success) {
        // Show success message
        let successMessage = `
          <div style="text-align: center; padding: 2rem;">
            <h3 style="color: var(--hpbc-green); margin-bottom: 1rem;">✓ Demo Submitted!</h3>
            <p>Thanks ${formData.name}! We've received your demo and will get back to you soon.</p>
        `;

        if (newsletterOptIn) {
          if (newsletterResult.success) {
            successMessage += `<p style="color: var(--hpbc-green);">🎵 You've also been added to our mailing list!</p>`;
          } else {
            successMessage += `<p style="color: #dc2626;">Demo submitted successfully, but there was an issue with the mailing list signup.</p>`;
          }
        }

        successMessage += `<p style="margin-top: 1rem;"><a href="#" onclick="location.reload()">Submit Another Demo</a></p></div>`;

        contactForm.innerHTML = successMessage;
      } else {
        alert(contactResult.message);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadUpcomingArtists();
  loadLatestVideo();
  loadArchiveEpisodes();
  initializeMailingListPopup();
  initializeStandaloneNewsletter();
  initializeContactForm();
});
