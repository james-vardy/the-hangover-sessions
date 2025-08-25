import { config } from "./config.js";

// Load upcoming artists from external JSON file
export async function loadUpcomingArtists() {
  const artistsGrid = document.getElementById("artistsGrid");

  try {
    const response = await fetch("data/artists.json");
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
export function loadLatestVideo() {
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
