import { useState } from "react";
import { getUpcomingSessions } from "../data/sessions";

export default function Sessions() {
  const upcomingSessions = getUpcomingSessions().slice(0, 2); // Only next 2
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (slug: string) => {
    setFailedImages((prev) => new Set(prev).add(slug));
  };

  // Filter out sessions with no poster or a poster image that failed to load
  const validSessions = upcomingSessions.filter(
    (session) => session.poster && !failedImages.has(session.slug),
  );

  // Nothing upcoming (or every poster failed to load) - hide the section entirely
  if (validSessions.length === 0) {
    return null;
  }

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
                src={session.poster}
                alt={`${session.artist} - ${session.displayDate}`}
                className="w-full max-w-md rounded-lg shadow-xl"
                onError={() => handleImageError(session.slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
