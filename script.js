// Configuration
const config = {
  // IMPORTANT: Replace with your YouTube Data API v3 key
  // Get one from: https://console.cloud.google.com/apis/credentials
  youtubeApiKey: "YOUR_YOUTUBE_API_KEY_HERE",

  // Replace with your YouTube channel ID
  // Find it in your YouTube channel's About section
  youtubeChannelId: "YOUR_CHANNEL_ID_HERE",

  // Fallback video ID if API fails
  fallbackVideoId: "dQw4w9WgXcQ", // Replace with your actual fallback video ID
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
  const upcomingArtists = [
    {
      name: "Sarah Mitchell",
      date: "January 26, 2025",
      bio: "Leeds-based singer-songwriter Sarah Mitchell crafts intimate folk melodies that explore themes of home, belonging, and the Yorkshire landscape. Her delicate fingerpicking style and haunting vocals have earned comparisons to Laura Marling and Nick Drake.",
      image:
        "https://via.placeholder.com/400x300/f0f0f0/666666?text=Sarah+Mitchell",
    },
    {
      name: "The Velvet Ghosts",
      date: "February 2, 2025",
      bio: "Psychedelic indie duo bringing dreamy soundscapes and hypnotic rhythms to Sunday mornings. Their blend of shoegaze and folk creates an otherworldly atmosphere perfect for a hangover cure.",
      image:
        "https://via.placeholder.com/400x300/f0f0f0/666666?text=The+Velvet+Ghosts",
    },
    {
      name: "Marcus King",
      date: "February 9, 2025",
      bio: "Jazz-influenced guitarist and vocalist Marcus King brings smooth grooves and soulful melodies. His performances blend contemporary R&B with classic jazz standards, creating a perfect Sunday morning vibe.",
      image:
        "https://via.placeholder.com/400x300/f0f0f0/666666?text=Marcus+King",
    },
  ];

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

// Load latest YouTube video
async function loadLatestVideo() {
  const videoContainer = document.getElementById("latestVideo");

  try {
    // Skip API call if no key is provided
    if (config.youtubeApiKey === "YOUR_YOUTUBE_API_KEY_HERE") {
      throw new Error("YouTube API key not configured");
    }

    // Fetch latest video from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
        `key=${config.youtubeApiKey}&` +
        `channelId=${config.youtubeChannelId}&` +
        `part=snippet,id&` +
        `order=date&` +
        `maxResults=1&` +
        `type=video`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      embedVideo(videoId);
    } else {
      throw new Error("No videos found");
    }
  } catch (error) {
    console.error("Error loading latest video:", error);
    // Use fallback video
    embedVideo(config.fallbackVideoId);
  }
}

// Embed YouTube video
function embedVideo(videoId) {
  const videoContainer = document.getElementById("latestVideo");
  videoContainer.innerHTML = `
              <iframe 
                  src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" 
                  title="YouTube video player" 
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
});
