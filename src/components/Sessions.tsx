import { getUpcomingSessions, getPastSessions } from "../data/sessions";
import SessionCard from "./SessionCard";

export default function Sessions() {
  const upcomingSessions = getUpcomingSessions();
  const pastSessions = getPastSessions();

  return (
    <section
      id="sessions"
      className="py-20 bg-brand-cream relative overflow-hidden"
    >
      {/* Decorative background icons */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <img
          src="/Hangover sessions-11.png"
          alt=""
          className="absolute top-10 left-10 w-32 h-32 rotate-12"
        />
        <img
          src="/Hangover sessions-13.png"
          alt=""
          className="absolute top-1/4 right-20 w-40 h-40 -rotate-6"
        />
        <img
          src="/Hangover sessions-15.png"
          alt=""
          className="absolute bottom-1/3 left-1/4 w-24 h-24 rotate-45"
        />
        <img
          src="/Hangover sessions-17.png"
          alt=""
          className="absolute bottom-20 right-1/3 w-32 h-32 -rotate-12"
        />
        <img
          src="/Hangover sessions-19.png"
          alt=""
          className="absolute top-1/2 right-10 w-28 h-28 rotate-6"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Upcoming Sessions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join us at Hyde Park Book Club for our next intimate live
                performances. Doors open at 10:30am. It's free entry!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingSessions.map((session) => (
                <SessionCard
                  key={session.slug}
                  session={session}
                  variant="upcoming"
                />
              ))}
            </div>
          </div>
        )}

        {/* Archive */}
        <div id="archive">
          <div className="text-center mb-12 relative">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img
                src="/Hangover sessions-11.png"
                alt=""
                className="w-16 h-16 opacity-60"
              />
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
                Session Archive
              </h2>
              <img
                src="/Hangover sessions-13.png"
                alt=""
                className="w-16 h-16 opacity-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pastSessions.map((session) => (
              <SessionCard
                key={session.slug}
                session={session}
                variant="archive"
              />
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
      </div>
    </section>
  );
}
