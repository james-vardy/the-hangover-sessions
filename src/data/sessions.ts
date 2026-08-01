export type Session = {
  slug: string;
  artist: string;
  date: string; // ISO format: YYYY-MM-DD
  displayDate: string;
  venue?: string;
  poster?: string; // path to uploaded poster image (upcoming sessions)
  youtubeUrl?: string;
  bandcampUrl?: string;
  spotifyReleaseUrl?: string;
  songs?: string[];
  sessionNotes?: string;
};

// Raw entry as edited via the CMS - everything except the derived fields below
type SessionEntry = Omit<Session, "slug" | "displayDate">;

function slugFromPath(filePath: string): string {
  return filePath.split("/").pop()!.replace(/\.json$/, "");
}

function formatDisplayDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Each session lives in its own file under content/sessions/, edited via the
// Sveltia CMS admin UI (/admin). Whether a session is "upcoming" or "past" is
// derived from its date below, not from where it's filed.
const sessionEntries = import.meta.glob<SessionEntry>(
  "/content/sessions/*.json",
  { eager: true, import: "default" },
);

export const sessions: Session[] = Object.entries(sessionEntries).map(
  ([filePath, entry]) => ({
    ...entry,
    slug: slugFromPath(filePath),
    displayDate: formatDisplayDate(entry.date),
  }),
);

// Helper to get upcoming vs past sessions
export function getUpcomingSessions(limit: number = 6): Session[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return sessions
    .filter((s) => new Date(s.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export function getPastSessions(): Session[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return sessions
    .filter((s) => new Date(s.date) < today && s.youtubeUrl)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
