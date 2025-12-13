import { useState } from "react";
import type { Session } from "../data/sessions";
import RSVPModal from "./RSVPModal";

interface SessionCardProps {
  session: Session;
  variant?: "upcoming" | "archive";
}

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

// Calculate countdown text for upcoming sessions
function getCountdownText(dateString: string): string {
  const sessionDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  sessionDate.setHours(0, 0, 0, 0);

  const diffTime = sessionDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today!";
  } else if (diffDays === 1) {
    return "Tomorrow";
  } else if (diffDays < 7) {
    return `${diffDays} days`;
  } else {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "1 week" : `${weeks} weeks`;
  }
}

export default function SessionCard({
  session,
  variant = "archive",
}: SessionCardProps) {
  const isUpcoming = variant === "upcoming";
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  // For archive sessions, use YouTube thumbnail if available
  const thumbnailUrl =
    !isUpcoming && session.youtubeUrl
      ? getYouTubeThumbnail(session.youtubeUrl)
      : session.image;

  const handleCardClick = () => {
    if (session.youtubeUrl && !isUpcoming) {
      window.open(session.youtubeUrl, "_blank");
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const content = (
    <div
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
        session.youtubeUrl && !isUpcoming ? "cursor-pointer" : ""
      }`}
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={
            imageError ? "/fallback-image.png" : thumbnailUrl || session.image
          }
          alt={session.artist}
          className={`w-full h-full ${
            imageError ? "object-contain p-8" : "object-cover"
          } group-hover:scale-105 transition-transform duration-500`}
          loading="lazy"
          onError={handleImageError}
        />
        {session.youtubeUrl && !isUpcoming && (
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
        {!session.youtubeUrl && !isUpcoming && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <p className="text-white text-sm font-medium px-4 text-center">
              YouTube video coming soon
            </p>
          </div>
        )}
        {isUpcoming && (
          <div className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full">
            {getCountdownText(session.date)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-brand-dark">{session.artist}</h3>
        <p className="text-brand-green font-medium text-sm">
          {session.displayDate}
        </p>

        {/* Only show venue for upcoming sessions */}
        {isUpcoming && session.venue && (
          <p className="text-gray-500 text-sm mt-2 flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {session.venue}
          </p>
        )}

        {/* Only show bio for upcoming sessions */}
        {isUpcoming && session.bio && (
          <p className="text-gray-600 text-sm line-clamp-3 mt-2">
            {session.bio}
          </p>
        )}

        {/* Release links for archive sessions */}
        {!isUpcoming && (session.bandcampUrl || session.spotifyReleaseUrl) && (
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

        {/* Social Links for upcoming */}
        {isUpcoming &&
          (session.instagram || session.spotify || session.website) && (
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
              {session.instagram && (
                <a
                  href={session.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-orange transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {session.spotify && (
                <a
                  href={session.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-green transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </a>
              )}
              {session.website && (
                <a
                  href={session.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-dark transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          )}

        {/* RSVP Button for upcoming sessions */}
        {isUpcoming && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowRSVPModal(true);
            }}
            className="w-full mt-4 bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            RSVP for this session
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {content}
      {isUpcoming && (
        <RSVPModal
          session={session}
          isOpen={showRSVPModal}
          onClose={() => setShowRSVPModal(false)}
        />
      )}
    </>
  );
}
