export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-cream text-brand-dark py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo / Brand */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-2">The Hangover Sessions</h3>
            <p className="text-gray-600 text-sm">
              Sunday mornings at Hyde Park Book Club, Leeds
            </p>
          </div>

          {/* Partners & Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {/* Partner Logos */}
            <a
              href="https://www.hydeparkbookclub.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Hyde Park Book Club"
            >
              <img
                src="/book-club-logo.png"
                alt="Hyde Park Book Club"
                className="h-8 w-auto"
              />
            </a>
            <a
              href="https://www.privateregcords.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Private Regcords"
            >
              <img
                src="/regcords-logo.png"
                alt="Private Regcords"
                className="h-8 w-auto"
              />
            </a>

            {/* Text Links */}
            <a
              href="https://www.instagram.com/evanjmartinproductions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-orange transition-colors text-sm"
            >
              Evan J. Martin Productions
            </a>
            <a
              href="https://www.instagram.com/d.k.s.capture"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-orange transition-colors text-sm"
            >
              D.K.S.Capture
            </a>

            {/* Social Icons */}
            <a
              href="https://www.youtube.com/@HangoverSessions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-orange transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/thehangoversessions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-orange transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://privateregcords.bandcamp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-orange transition-colors"
              aria-label="Private Regcords"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-gray-600 text-sm">
          <p>© {currentYear} The Hangover Sessions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
