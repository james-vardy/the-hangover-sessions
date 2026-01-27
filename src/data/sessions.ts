export type Session = {
  slug: string;
  artist: string;
  date: string; // ISO format: YYYY-MM-DD
  displayDate: string;
  venue?: string;
  youtubeUrl?: string;
  bandcampUrl?: string;
  spotifyReleaseUrl?: string;
  songs?: string[];
  sessionNotes?: string;
};

// All sessions - sorted by date on the frontend
export const sessions: Session[] = [
  // === UPCOMING SESSIONS (poster-based display) ===
  {
    slug: "finn-shannon",
    artist: "Finn Shannon",
    date: "2026-01-18",
    displayDate: "January 18, 2026",
    venue: "Hyde Park Book Club",
  },
  {
    slug: "troutflies",
    artist: "Troutflies",
    date: "2026-01-25",
    displayDate: "January 25, 2026",
    venue: "Hyde Park Book Club",
  },
  {
    slug: "regtown-special",
    artist: "Regtown Special - Small Distractions Club",
    date: "2026-02-01",
    displayDate: "February 1, 2026",
    venue: "Hyde Park Book Club",
  },
  {
    slug: "tidetied",
    artist: "TIDETIED",
    date: "2026-02-22",
    displayDate: "February 22, 2026",
    venue: "Hyde Park Book Club",
  },
  {
    slug: "since-torino",
    artist: "Since Torino",
    date: "2026-03-01",
    displayDate: "March 1, 2026",
    venue: "Hyde Park Book Club",
  },
  {
    slug: "speedway-star",
    artist: "Speedway Star",
    date: "2026-03-15",
    displayDate: "March 15, 2026",
    venue: "Hyde Park Book Club",
  },
  {
    slug: "tbc-april-12",
    artist: "TBC",
    date: "2026-04-12",
    displayDate: "April 12, 2026",
    venue: "Hyde Park Book Club",
  },
  {
    slug: "tbc-april-26",
    artist: "TBC",
    date: "2026-04-26",
    displayDate: "April 26, 2026",
    venue: "Hyde Park Book Club",
  },
  {
    slug: "troutflies-may",
    artist: "Troutflies",
    date: "2026-05-10",
    displayDate: "May 10, 2026",
    venue: "Hyde Park Book Club",
  },
  {
    slug: "tbc-may-24",
    artist: "TBC",
    date: "2026-05-24",
    displayDate: "May 24, 2026",
    venue: "Hyde Park Book Club",
  },
  // === PAST SESSIONS (archive with YouTube) ===
  {
    slug: "april-tapes",
    artist: "April Tapes",
    date: "2025-01-12",
    displayDate: "January 12, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=zSjw__q0klM",
    songs: ["Wasted", "Weeds"],
    sessionNotes:
      "April Tapes beautifully stripped back away from their usual garage/grunge rock sound showcasing two unreleased tracks. I love hearing them in an acoustic setting, as the focus on Bethan and Max's gorgeous vocal harmonies.",
  },
  {
    slug: "eszter-vida",
    artist: "Eszter Vida",
    date: "2025-01-19",
    displayDate: "January 19, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=XbKLtm4oFkA",
    songs: ["(Is This My) Last Night with You?", "Paper Rounds"],
    sessionNotes:
      "Eszter's band picked out some books from the Hyde Park Book Club's collection to represent their character. Eszter loved Gods, Gangsters, and Honour, while Joseph Barron picked Masters of Sex.",
  },
  {
    slug: "the-tallulahs",
    artist: "The Tallulahs",
    date: "2025-01-26",
    displayDate: "January 26, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=80xm8Uu4InY",
    songs: ["I wrote this song", "The Falling Down"],
    sessionNotes:
      "The Tallulahs brought their distinctive Matlock Bath sound to Leeds, sharing insights into their writing process and family band dynamics.",
  },
  {
    slug: "cal-jamie-substandards",
    artist: "Cal + Jamie (Substandards)",
    date: "2025-02-02",
    displayDate: "February 2, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=WLZDpxi5BCY",
    songs: [
      "Hangover Sessions Theme",
      "I went to the market...",
      "The night's almost over",
    ],
  },
  {
    slug: "bank-details",
    artist: "Bank Details",
    date: "2025-02-16",
    displayDate: "February 16, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=FdBz8uYqnyA",
    songs: ["Speak when spoken to", "Machine Grows"],
  },
  {
    slug: "rhiannon-hope",
    artist: "Rhiannon Hope",
    date: "2025-02-23",
    displayDate: "February 23, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=ATbwbJSZr2Q",
    songs: ["All Things, Rising and Returning", "Indulge"],
  },
  {
    slug: "normal-village",
    artist: "Normal Village",
    date: "2025-03-09",
    displayDate: "March 9, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=V0cF_FHFlwg",
    songs: ["Bunny", "Remain in Plight"],
  },
  {
    slug: "rushbonds",
    artist: "Rushbonds",
    date: "2025-03-23",
    displayDate: "March 23, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=BvKBfQv37mE",
  },
  {
    slug: "ponzo",
    artist: "Ponzo",
    date: "2025-04-06",
    displayDate: "April 6, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=-MjbBrRD8xM",
    songs: ["City", "Don't Stare"],
  },
  {
    slug: "elwell",
    artist: "elwell",
    date: "2025-04-27",
    displayDate: "April 27, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=NPz6G-i0HGY",
    songs: ["Let me out, let me back", "Go Faster"],
  },
  {
    slug: "joe-barron",
    artist: "Joe Barron",
    date: "2025-05-04",
    displayDate: "May 4, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=rOTFPVGoPI0",
    songs: ["Living in the shade", "Untitled"],
  },
  {
    slug: "francesca-cullen",
    artist: "Francesca Cullen",
    date: "2025-05-11",
    displayDate: "May 11, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=koBg6lc4aBU",
  },
  {
    slug: "sam-king",
    artist: "Sam King",
    date: "2025-08-01",
    displayDate: "August 1, 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=mJj9IDYqBVA",
  },
];

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
