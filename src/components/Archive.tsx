import { getPastSessions } from "../data/sessions";
import SessionCard from "./SessionCard";

export default function Archive() {
  const pastSessions = getPastSessions();

  return (
    <section
      id="archive"
      className="py-20 bg-brand-cream relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/bg-assets/drum.png"
              alt=""
              className="w-16 h-16 hidden sm:block"
            />
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Session Archive
            </h2>
            <img
              src="/bg-assets/sax.png"
              alt=""
              className="w-16 h-16 hidden sm:block"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pastSessions.map((session) => (
            <SessionCard key={session.slug} session={session} />
          ))}
        </div>

        {/* YouTube CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@HangoverSessions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-orange/80 font-semibold text-lg transition-colors"
          >
            View all on YouTube
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
