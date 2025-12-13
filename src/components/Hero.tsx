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
