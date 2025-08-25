// Load archive episodes from external JSON file
export async function loadArchiveEpisodes() {
  const archiveGrid = document.getElementById("archiveGrid");

  try {
    const response = await fetch("data/archive.json");
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
