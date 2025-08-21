# The Hangover Sessions

A modern, responsive website for The Hangover Sessions - intimate live music performances e## Customization

### Managing Upcoming Artists

There are now **five powerful ways** to manage upcoming artists:

#### Option 1: PocketBase (Recommended - Fastest & Most Powerful)

Self-hosted database with beautiful admin UI and real-time updates.

- ⚡ **Lightning fast**: Sub-50ms response times
- 🎨 **Beautiful admin UI**: Built-in web interface + custom admin panel
- 🔄 **Real-time updates**: Live WebSocket updates
- 🔐 **Secure**: Built-in authentication and permissions
- 💰 **Free**: Self-hosted, no API limits
- 📱 **Mobile-friendly**: Manage from anywhere
- 🎯 **Archive management**: Seamlessly move artists to archive with video links

See `POCKETBASE_SETUP.md` for complete setup instructions.

#### Option 2: Google Sheets (Best for Non-Technical Users)

Use Google Sheets as your database - edit like a spreadsheet, see changes instantly on your website!

- ✅ Real-time collaboration
- ✅ No file management
- ✅ Visual interface
- ✅ Archive management included

See `GOOGLE_SETUP.md` for complete setup instructions.

#### Option 3: Google Drive Files (Best for Developers)

Store JSON files in Google Drive for more control over data structure.

- ✅ JSON format flexibility
- ✅ Version control through Drive
- ✅ Can store additional assets

#### Option 4: Edit JSON File (Simple Local Option)

Edit `artists.json` directly for local development:

```json
{
  "name": "Artist Name",
  "date": "Performance Date",
  "bio": "Artist biography",
  "image": "https://image-url.com/artist.jpg",
  "website": "https://artist-website.com",
  "spotify": "https://spotify.com/artist",
  "instagram": "https://instagram.com/artist"
}
```

#### Option 5: Management Script

Run the interactive Python script:

```bash
python3 manage_artists.py
```

### Archive Management

When using Google Sheets or Google Drive, you can also manage an archive of past performances:

- **Automatic Archive Section**: Past performances appear in a dedicated section
- **Video Integration**: Direct links to YouTube videos with play overlays
- **Social Links**: Website, Spotify, Instagram for each past artist
- **Visual Timeline**: Chronological display of all past sessions

### Other Customizationsg at Hyde Park Book Club in Leeds.

## About

The Hangover Sessions brings together emerging artists and music lovers for unique acoustic sessions in the heart of Leeds. Our Sunday morning performances provide the perfect soundtrack for recovery while discovering new talent in an intimate setting.

## Features

- **Responsive Design**: Mobile-first approach that works seamlessly across all devices
- **Latest Session Video**: Automatically loads the most recent performance from YouTube
- **Upcoming Artists**: Dynamic showcase of scheduled performers with bios and dates
- **Contact Form**: Easy demo submission for artists wanting to perform
- **Partner Showcases**: Featuring logos and links to collaborators
- **Session Schedule**: Clear timeline of Sunday morning events
- **Accessibility**: Screen reader friendly with ARIA labels and semantic HTML

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: Clean, dependency-free interactivity
- **YouTube API Integration**: For fetching latest performance videos

## Brand Guidelines

### Color Palette

Our visual identity draws inspiration from Hyde Park Book Club's warm, welcoming aesthetic:

| Color Name           | Hex Code  | Usage                         |
| -------------------- | --------- | ----------------------------- |
| **Primary Text**     | `#1a1a1a` | Main text, headings           |
| **Secondary Text**   | `#666666` | Subtitles, descriptions       |
| **HPBC Green**       | `#4a5d3a` | Logo, footer, submit buttons  |
| **Warm Orange**      | `#d4822a` | Accent color, hover states    |
| **Cream Background** | `#f4f1e8` | Section backgrounds, cards    |
| **White**            | `#ffffff` | Main background, card content |
| **Warm Border**      | `#d4c5a9` | Borders, dividers             |

### Typography

- **Font Family**: System font stack (SF Pro, Segoe UI, Roboto, etc.)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)

### Logo Assets

- `assets/book-club-logo.png` - Hyde Park Book Club logo
- `assets/regcords-logo.png` - Private Records label logo

## Getting Started

### Prerequisites

- A modern web browser
- Python 3 (for local development server)
- Optional: YouTube Data API key for live video fetching

### Local Development

1. Clone or download the project files
2. Navigate to the project directory:

   ```bash
   cd the-hangover-sessions
   ```

3. Start a local server:

   ```bash
   python3 -m http.server 8000
   ```

4. Open your browser to `http://localhost:8000`

### Configuration

#### YouTube Integration

To enable automatic latest video fetching:

1. Get a YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find your YouTube channel ID
3. Update `script.js`:
   ```javascript
   const config = {
     youtubeApiKey: "YOUR_ACTUAL_API_KEY",
     youtubeChannelId: "YOUR_ACTUAL_CHANNEL_ID",
     fallbackVideoId: "YOUR_FALLBACK_VIDEO_ID",
   };
   ```

#### Contact Form

To enable the contact form:

1. Sign up for a form service (e.g., [Formspree](https://formspree.io/))
2. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST"></form>
   ```

## File Structure

```
the-hangover-sessions/
├── index.html                    # Main website
├── admin.html                    # Admin panel for PocketBase
├── styles.css                    # All CSS styling
├── script.js                     # Core JavaScript functionality
├── artists.json                  # Local artists data (fallback)
├── manage_artists.py             # Artist management script
├── pocketbase-integration.js     # PocketBase backend (recommended)
├── google-sheets-integration.js  # Google Sheets backend option
├── google-drive-integration.js   # Google Drive backend option
├── POCKETBASE_SETUP.md          # PocketBase setup guide (recommended)
├── GOOGLE_SETUP.md              # Google integration setup guide
├── assets/                      # Images and logos
│   ├── book-club-logo.png
│   └── regcords-logo.png
└── README.md                    # This file
```

## Customization

### Adding New Artists

Update the `upcomingArtists` array in `script.js`:

```javascript
const upcomingArtists = [
  {
    name: "Artist Name",
    date: "Performance Date",
    bio: "Artist biography and description",
    image: "https://placeholder-image-url.com",
  },
];
```

### Updating Content

- **Hero Section**: Edit the text in the `.hero` section of `index.html`
- **Schedule**: Modify the `.schedule-timeline` items in `index.html`
- **Partners**: Add or edit `.link-card` items in the Links section

## Performance

- **Lightweight**: No external dependencies or frameworks
- **Fast Loading**: Optimized images and minimal HTTP requests
- **SEO Friendly**: Semantic HTML with proper meta tags
- **Progressive Enhancement**: Works without JavaScript enabled

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Contributing

1. Make your changes in a local copy
2. Test thoroughly across different devices and browsers
3. Ensure accessibility standards are maintained
4. Submit your improvements

## License

© 2024 The Hangover Sessions. All rights reserved.

## Contact

- **Instagram**: [@thehangoversessions](https://www.instagram.com/thehangoversessions/)
- **YouTube**: [@thehangoversessions](https://www.youtube.com/@thehangoversessions)
- **Venue**: [Hyde Park Book Club](https://hydeparkbookclub.co.uk)

---

_"Doors open at 10:00, music starts flowing, and hangovers start healing."_
