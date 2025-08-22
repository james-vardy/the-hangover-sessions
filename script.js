// Configuration
const config = {
  // YouTube playlist ID for all episodes (latest to oldest)
  youtubePlaylistId: "PLCx0x8eol06rECBpKMYshqzME6agyYR3x",
};

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

// Load upcoming artists from external JSON file
async function loadUpcomingArtists() {
  const artistsGrid = document.getElementById("artistsGrid");

  try {
    const response = await fetch("./artists.json");
    const allArtists = await response.json();

    // Get current date for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    // Filter upcoming artists (dates in future or today)
    const upcomingArtists = allArtists
      .filter((artist) => {
        // Handle both old format (displayDate) and new format (date)
        const artistDate = new Date(artist.date);
        return artistDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date ascending
      .slice(0, 3); // Take only the next 3

    if (upcomingArtists.length === 0) {
      artistsGrid.innerHTML =
        '<p class="no-upcoming">No upcoming sessions scheduled. Check back soon!</p>';
      return;
    }

    upcomingArtists.forEach((artist) => {
      const artistCard = document.createElement("div");
      artistCard.className = "artist-card";

      // Use displayDate if available, otherwise format the date
      const displayDate = artist.displayDate || formatDate(artist.date);

      // Build social links if they exist
      let socialLinks = "";
      if (artist.website)
        socialLinks += `<a href="${artist.website}" target="_blank" rel="noopener noreferrer">Website</a> `;
      if (artist.spotify)
        socialLinks += `<a href="${artist.spotify}" target="_blank" rel="noopener noreferrer">Spotify</a> `;
      if (artist.instagram)
        socialLinks += `<a href="${artist.instagram}" target="_blank" rel="noopener noreferrer">Instagram</a>`;

      artistCard.innerHTML = `
        <img src="${artist.image}" alt="${artist.name}" class="artist-image">
        <div class="artist-date">${displayDate}</div>
        <h3 class="artist-name">${artist.name}</h3>
        <p class="artist-bio">${artist.bio}</p>
        ${socialLinks ? `<div class="artist-social">${socialLinks}</div>` : ""}
      `;
      artistsGrid.appendChild(artistCard);
    });
  } catch (error) {
    console.error("Error loading artists:", error);
    // Fallback to hardcoded data if JSON fails
    loadFallbackArtists();
  }
}

// Helper function to format date nicely
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// Fallback function with original hardcoded data
function loadFallbackArtists() {
  const upcomingArtists = [];

  const artistsGrid = document.getElementById("artistsGrid");
  upcomingArtists.forEach((artist) => {
    const artistCard = document.createElement("div");
    artistCard.className = "artist-card";
    artistCard.innerHTML = `
      <img src="${artist.image}" alt="${artist.name}" class="artist-image">
      <div class="artist-date">${artist.date}</div>
      <h3 class="artist-name">${artist.name}</h3>
      <p class="artist-bio">${artist.bio}</p>
    `;
    artistsGrid.appendChild(artistCard);
  });
}

// Load YouTube playlist
function loadLatestVideo() {
  const videoContainer = document.getElementById("latestVideo");

  // Embed the playlist (will show latest video first by default)
  videoContainer.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/videoseries?list=${config.youtubePlaylistId}&rel=0&modestbranding=1" 
      title="The Hangover Sessions - Latest Episode" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadUpcomingArtists();
  loadLatestVideo();
  loadArchiveEpisodes();
  initializeMailingListPopup();
});

// Load archive episodes from external JSON file
async function loadArchiveEpisodes() {
  const archiveGrid = document.getElementById("archiveGrid");

  try {
    const response = await fetch("./archive.json");
    const episodes = await response.json();

    // Sort by date descending (newest first)
    episodes.sort((a, b) => new Date(b.date) - new Date(a.date));

    episodes.forEach((episode) => {
      const archiveCard = document.createElement("div");
      archiveCard.className = "archive-card";

      // Create songs list only if there are songs
      const songsList = episode.songs
        .map((song) => `<li>${song}</li>`)
        .join("");

      // Check if we should show songs section
      const songsSection =
        episode.songs && episode.songs.length > 0
          ? `
          <div class="archive-section">
            <h4>Songs Performed:</h4>
            <ul class="songs-list">
              ${songsList}
            </ul>
          </div>`
          : "";

      // Check if we should show session notes section
      const sessionNotesSection =
        episode.sessionNotes && episode.sessionNotes.trim() !== ""
          ? `
          <div class="archive-section">
            <h4>Session Notes:</h4>
            <p class="archive-sessionNotes">${episode.sessionNotes}</p>
          </div>`
          : "";

      // Extract YouTube video ID from URL and use YouTube thumbnail
      function getYouTubeThumbnail(videoUrl) {
        // Extract video ID from various YouTube URL formats
        const regex =
          /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = videoUrl.match(regex);

        if (match && match[1]) {
          // Use maxresdefault for highest quality, fallback to hqdefault if not available
          return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
        }

        // Fallback to logo if no valid YouTube URL
        return "./assets/logo-min.png";
      }

      const thumbnailSrc =
        episode.thumbnail && episode.thumbnail.trim() !== ""
          ? episode.thumbnail
          : getYouTubeThumbnail(episode.videoUrl);

      archiveCard.innerHTML = `
        <div class="archive-image-container">
          <a href="${
            episode.videoUrl
          }" target="_blank" rel="noopener noreferrer" class="video-link">
            <img src="${thumbnailSrc}" alt="${
        episode.artist
      }" class="archive-image" onerror="this.src='https://img.youtube.com/vi/${
        episode.videoUrl.match(
          /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        )?.[1]
      }/hqdefault.jpg'; if(this.onerror) { this.onerror=null; this.src='./assets/logo-min.png'; }">
            <div class="play-overlay">▶</div>
          </a>
        </div>
        <div class="archive-content">
          <div class="archive-date">${episode.displayDate}</div>
          <h3 class="archive-name">${episode.artist}</h3>
          
          ${songsSection}
          
          ${sessionNotesSection}
          
          <div class="archive-actions">
            <a href="${
              episode.videoUrl
            }" target="_blank" rel="noopener noreferrer" class="watch-button">
              Watch Full Session
            </a>
          </div>
        </div>
      `;
      archiveGrid.appendChild(archiveCard);
    });
  } catch (error) {
    console.error("Error loading archive episodes:", error);
    // Show error message
    archiveGrid.innerHTML =
      '<p class="archive-error">Unable to load archive episodes. Please try again later.</p>';
  }
}

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
      alert("Please enter a valid email address.");
      return;
    }

    // Here you would normally send the data to your mailing list service
    // Using Mailjet for newsletter signup
    handleNewsletterSubmission(email, name);
  });

  async function handleNewsletterSubmission(email, name) {
    if (window.MailjetHandler) {
      const result = await window.MailjetHandler.handleNewsletterSignup(
        email,
        name
      );
      if (result.success) {
        showSuccessMessage();
        localStorage.setItem("hasSeenMailingListPopup", "true");
        closeModal();
      } else {
        alert(result.message);
      }
    } else {
      // Fallback if Mailjet isn't configured
      showSuccessMessage();
      localStorage.setItem("hasSeenMailingListPopup", "true");
      closeModal();
    }
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
      <h3>Thanks for joining!</h3>
      <p>🎵 You're now part of The Hangover Sessions community!</p>
      <p>We'll keep you updated on upcoming sessions and new artists.</p>
      <button class="newsletter-submit" onclick="document.getElementById('closeModal').click()">
        Continue Browsing
      </button>
    `;
  }
}

// Contact Form Handler
document.addEventListener("DOMContentLoaded", function () {
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

      // Show loading state
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Handle submission
      if (window.MailjetHandler) {
        const result = await window.MailjetHandler.handleContactForm(formData);

        if (result.success) {
          // Show success message
          contactForm.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
              <h3 style="color: var(--hpbc-green); margin-bottom: 1rem;">✓ Demo Submitted!</h3>
              <p>Thanks ${formData.name}! We've received your demo and will get back to you soon.</p>
              <p style="margin-top: 1rem;"><a href="#" onclick="location.reload()">Submit Another Demo</a></p>
            </div>
          `;
        } else {
          alert(result.message);
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      } else {
        // Fallback - you can replace this with a simple mailto or other service
        alert(
          "Mailjet not configured. Please set up your Mailjet credentials."
        );
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});
