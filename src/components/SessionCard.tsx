import { useState } from "react";
import type { Session } from "../data/sessions";

// Extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

// Get YouTube thumbnail URL
function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

export default function SessionCard({ session }: { session: Session }) {
  const [imageError, setImageError] = useState(false);

  // Use YouTube thumbnail if available
  const thumbnailUrl = session.youtubeUrl
    ? getYouTubeThumbnail(session.youtubeUrl)
    : null;

  const handleCardClick = () => {
    if (session.youtubeUrl) {
      window.open(session.youtubeUrl, "_blank");
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
        session.youtubeUrl ? "cursor-pointer" : ""
      }`}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={
            imageError
              ? "/fallback-image.png"
              : thumbnailUrl || "/fallback-image.png"
          }
          alt={session.artist}
          className={`w-full h-full ${
            imageError ? "object-contain p-8" : "object-cover"
          } group-hover:scale-105 transition-transform duration-500`}
          loading="lazy"
          onError={handleImageError}
        />
        {session.youtubeUrl && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
        {!session.youtubeUrl && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <p className="text-white text-sm font-medium px-4 text-center">
              YouTube video coming soon
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-brand-dark">{session.artist}</h3>
        <p className="text-brand-green font-medium text-sm">
          {session.displayDate}
        </p>

        {/* Release links */}
        {(session.bandcampUrl || session.spotifyReleaseUrl) && (
          <div className="flex gap-3 mt-3">
            {session.bandcampUrl && (
              <a
                href={session.bandcampUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 18.75l7.437-13.5h16.563l-7.438 13.5z" />
                </svg>
                Bandcamp
              </a>
            )}
            {session.spotifyReleaseUrl && (
              <a
                href={session.spotifyReleaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#1DB954]/90 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Spotify
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
