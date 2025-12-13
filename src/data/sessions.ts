export type Session = {
  slug: string;
  artist: string;
  date: string; // ISO format: YYYY-MM-DD
  displayDate: string;
  venue?: string;
  image: string;
  youtubeUrl?: string;
  bandcampUrl?: string;
  spotifyReleaseUrl?: string;
  bio?: string;
  songs?: string[];
  sessionNotes?: string;
  website?: string;
  spotify?: string;
  instagram?: string;
};

// All sessions - sorted by date on the frontend
export const sessions: Session[] = [
  {
    slug: "romy-taylor",
    artist: "Romy Taylor",
    date: "2025-09-21",
    displayDate: "September 21, 2025",
    venue: "Hyde Park Book Club",
    image: "/artists/romy-taylor.webp",
    bio: "Leeds-based singer Romy Taylor mixes contemporary jazz instrumentals with heartfelt lyrics and vocals into epic ballads and groovy tunes. Taking inspiration from artists like Nai Palm, Lucy Rose, Björk and Minnie Riperton, make sure you catch her stripped sound for a special session.",
    website: "https://linktr.ee/romytaylor",
    spotify: "https://open.spotify.com/artist/7hwxe1biG7DJxyco5ecLKT",
    instagram: "https://www.instagram.com/romytaylorr/",
  },
  {
    slug: "michael-cable",
    artist: "Vehicle",
    date: "2025-09-27",
    displayDate: "September 27, 2025",
    venue: "Hyde Park Book Club",
    image: "/artists/michael-cable.jpeg",
    bio: "Local legend Michael Cable of Vehicle fame, brings his witty musings to a special Saturday edition of The Hangover Sessions.",
    instagram: "https://www.instagram.com/_mcable/",
  },
  {
    slug: "drury-hill",
    artist: "Drury Hill",
    date: "2025-09-28",
    displayDate: "September 28, 2025",
    venue: "Hyde Park Book Club",
    image: "/artists/drury-hill.jpg",
    bio: "Nottingham soft rock outfit Drury Hill, named after a famous medieval Nottingham street, bring beautiful songwriting with male/female dual vocals.",
    instagram: "https://www.instagram.com/druryhillhq/",
  },
  {
    slug: "lula",
    artist: "Lula",
    date: "2025-10-12",
    displayDate: "October 12, 2025",
    venue: "Hyde Park Book Club",
    image: "/artists/lula.jpg",
  },
  {
    slug: "nylon-nysehi",
    artist: "Nylon Nysehi",
    date: "2025-10-26",
    displayDate: "October 26, 2025",
    venue: "Hyde Park Book Club",
    image: "/artists/nylon-nysehi.jpg",
  },
  {
    slug: "green-gardens",
    artist: "Green Gardens",
    date: "2025-11-02",
    displayDate: "November 2, 2025",
    venue: "Hyde Park Book Club",
    image: "/artists/green-gardens.jpg",
  },
  {
    slug: "beb",
    artist: "Beb",
    date: "2025-11-30",
    displayDate: "November 30, 2025",
    venue: "Hyde Park Book Club",
    image: "/artists/beb.jpg",
  },
  {
    slug: "finn-shannon",
    artist: "Finn Shannon",
    date: "2026-01-18",
    displayDate: "January 18, 2026",
    venue: "Hyde Park Book Club",
    image: "/artists/finn-shannon.jpg",
  },
  {
    slug: "lobjectif",
    artist: "L'Objectif",
    date: "2026-01-25",
    displayDate: "January 25, 2026",
    venue: "Hyde Park Book Club",
    image: "/artists/lobjectif.jpg",
  },
  {
    slug: "regtown-special",
    artist: "Regtown Special - Small Distractions Book Club",
    date: "2026-02-01",
    displayDate: "February 1, 2026",
    venue: "Hyde Park Book Club",
    image: "/artists/regtown-special.jpg",
  },
  {
    slug: "tidetied",
    artist: "TideTied",
    date: "2026-02-15",
    displayDate: "February 15, 2026",
    venue: "Hyde Park Book Club",
    image: "/artists/tidetied.avif",
  },
  {
    slug: "since-torino",
    artist: "Since Torino",
    date: "2026-03-01",
    displayDate: "March 1, 2026",
    venue: "Hyde Park Book Club",
    image: "/artists/sincetorino.jpg",
  },
  {
    slug: "speedway-star",
    artist: "Speedway Star",
    date: "2026-03-15",
    displayDate: "March 15, 2026",
    venue: "Hyde Park Book Club",
    image: "/artists/speedway-star.jpeg",
  },
  {
    slug: "tbc-april-12",
    artist: "TBC",
    date: "2026-04-12",
    displayDate: "April 12, 2026",
    venue: "Hyde Park Book Club",
    image: "/logo.png",
  },
  {
    slug: "tbc-april-26",
    artist: "TBC",
    date: "2026-04-26",
    displayDate: "April 26, 2026",
    venue: "Hyde Park Book Club",
    image: "/logo.png",
  },
  {
    slug: "troutflies",
    artist: "Troutflies",
    date: "2026-05-10",
    displayDate: "May 10, 2026",
    venue: "Hyde Park Book Club",
    image: "/artists/troutflies.jpg",
  },
  {
    slug: "tbc-may-24",
    artist: "TBC",
    date: "2026-05-24",
    displayDate: "May 24, 2026",
    venue: "Hyde Park Book Club",
    image: "/logo.png",
  },
  {
    slug: "april-tapes",
    artist: "April Tapes",
    date: "2025-01-12",
    displayDate: "January 12, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/april-tapes.jpg",
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
    venue: "Hyde Park Book Club",
    image: "/images/sessions/eszter-vida.jpg",
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
    venue: "Hyde Park Book Club",
    image: "/images/sessions/the-tallulahs.jpg",
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
    venue: "Hyde Park Book Club",
    image: "/images/sessions/substandards.jpg",
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
    venue: "Hyde Park Book Club",
    image: "/images/sessions/bank-details.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=FdBz8uYqnyA",
    songs: ["Speak when spoken to", "Machine Grows"],
  },
  {
    slug: "rhiannon-hope",
    artist: "Rhiannon Hope",
    date: "2025-02-23",
    displayDate: "February 23, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/rhiannon-hope.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=ATbwbJSZr2Q",
    songs: ["All Things, Rising and Returning", "Indulge"],
  },
  {
    slug: "normal-village",
    artist: "Normal Village",
    date: "2025-03-09",
    displayDate: "March 9, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/normal-village.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=V0cF_FHFlwg",
    songs: ["Bunny", "Remain in Plight"],
  },
  {
    slug: "rushbonds",
    artist: "Rushbonds",
    date: "2025-03-23",
    displayDate: "March 23, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/rushbonds.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=BvKBfQv37mE",
  },
  {
    slug: "ponzo",
    artist: "Ponzo",
    date: "2025-04-06",
    displayDate: "April 6, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/ponzo.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=-MjbBrRD8xM",
    songs: ["City", "Don't Stare"],
  },
  {
    slug: "elwell",
    artist: "elwell",
    date: "2025-04-27",
    displayDate: "April 27, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/elwell.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=NPz6G-i0HGY",
    songs: ["Let me out, let me back", "Go Faster"],
  },
  {
    slug: "joe-barron",
    artist: "Joe Barron",
    date: "2025-05-04",
    displayDate: "May 4, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/joe-barron.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=rOTFPVGoPI0",
    songs: ["Living in the shade", "Untitled"],
  },
  {
    slug: "francesca-cullen",
    artist: "Francesca Cullen",
    date: "2025-05-11",
    displayDate: "May 11, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/francesca-cullen.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=koBg6lc4aBU",
  },
  {
    slug: "sam-king",
    artist: "Sam King",
    date: "2025-08-01",
    displayDate: "August 1, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/sam-king.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=mJj9IDYqBVA",
  },
  {
    slug: "lucy-robinson",
    artist: "Lucy Robinson",
    date: "2025-07-13",
    displayDate: "July 13, 2025",
    venue: "Hyde Park Book Club",
    image: "/images/sessions/lucy-robinson.jpg",
    youtubeUrl: "",
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
    .filter((s) => new Date(s.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get the latest session with a YouTube video
export const latestSession = getPastSessions().find((s) => s.youtubeUrl);
