import { useState } from "react";
import { getUpcomingSessions, Session } from "../data/sessions";

// Convert ISO date (YYYY-MM-DD) to poster filename format (dd-mm-yyyy.png)
function getPosterPath(session: Session): string {
  const [year, month, day] = session.date.split("-");
  return `/posters/${day}-${month}-${year}.png`;
}

export default function Sessions() {
  const upcomingSessions = getUpcomingSessions().slice(0, 2); // Only next 2
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (slug: string) => {
    setFailedImages((prev) => new Set(prev).add(slug));
  };

  // Filter out sessions with failed poster images
  const validSessions = upcomingSessions.filter(
    (session) => !failedImages.has(session.slug),
  );

  return (
    <section
      id="sessions"
      className="pt-20 pb-10 bg-brand-cream relative overflow-hidden"
    >
      {/* Decorative background icons */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/bg-assets/drum.png"
          alt=""
          className="absolute top-10 left-10 w-32 h-32 rotate-12 hidden md:block opacity-70"
        />
        <img
          src="/bg-assets/sax.png"
          alt=""
          className="absolute bottom-20 right-10 w-40 h-40 -rotate-6 hidden lg:block opacity-70"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Upcoming Sessions */}
        {validSessions.length > 0 && (
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

            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              {validSessions.map((session) => (
                <img
                  key={session.slug}
                  src={getPosterPath(session)}
                  alt={`${session.artist} - ${session.displayDate}`}
                  className="w-full max-w-md rounded-lg shadow-xl"
                  onError={() => handleImageError(session.slug)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
