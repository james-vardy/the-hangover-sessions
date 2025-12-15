function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function BandcampIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-brand-dark text-white overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero/video.MP4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Logo centered over video */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pb-24 md:pb-32">
        <img
          src="/logo.png"
          alt="The Hangover Sessions"
          className="w-80 md:w-96 lg:w-[28rem] drop-shadow-2xl"
        />

        {/* Social buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6">
          <a
            href="https://www.youtube.com/@hangoversessions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-cream/90 hover:bg-brand-cream text-brand-dark px-3 py-2 md:px-4 md:py-2.5 rounded transition-all duration-300 hover:scale-105"
          >
            <YouTubeIcon className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm md:text-base font-medium">
              Watch on YouTube
            </span>
          </a>
          <a
            href="https://thehangoversessions.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-cream/90 hover:bg-brand-cream text-brand-dark px-3 py-2 md:px-4 md:py-2.5 rounded transition-all duration-300 hover:scale-105"
          >
            <BandcampIcon className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm md:text-base font-medium">
              Listen on Bandcamp
            </span>
          </a>
        </div>

        <p className="mt-6 text-center text-white/90 text-lg md:text-xl max-w-xl font-light drop-shadow-lg">
          Intimate Sunday-morning live sessions, recorded in front of an
          audience at{" "}
          <a
            href="https://www.hydeparkbookclub.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand-orange transition-colors"
          >
            Hyde Park Book Club
          </a>
          . Curated by{" "}
          <a
            href="https://www.privateregcords.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand-orange transition-colors"
          >
            Private Regcords
          </a>
          .
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#sessions"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20 cursor-pointer hover:text-white transition-colors"
        aria-label="Scroll to sessions"
      >
        <svg
          className="w-6 h-6 text-white/70 hover:text-white transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>
    </section>
  );
}
