# The Hangover Sessions

![The Hangover Sessions Logo](public/logo.png)

> Free entry live sessions on Sunday mornings at Hyde Park Book Club, Leeds.

A modern, responsive website for The Hangover Sessions - intimate filmed live performances featuring emerging and established artists. Built with Vite, vanilla JavaScript, and modern CSS practices.

## 🎵 About

The Hangover Sessions showcases acoustic live performances in an intimate setting every other Sunday morning. Our website features upcoming sessions, artist information, newsletter signup, and a complete archive of past performances.

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/james-vardy/the-hangover-sessions.git
   cd the-hangover-sessions
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000` (or the port shown in terminal)
   - The site will automatically reload when you make changes

## 📁 Project Structure

```
the-hangover-sessions/
├── public/                     # Static assets served from root
│   ├── artists/               # Artist photos
│   ├── *.png, *.jpg          # Logos and images
│   └── favicon.ico
├── src/                       # Source code
│   ├── data/                  # JSON data files
│   │   ├── artists.json       # Upcoming artists data
│   │   └── archive.json       # Past sessions archive
│   ├── scripts/               # JavaScript modules
│   │   ├── archive.js         # Archive functionality
│   │   ├── artists.js         # Artist loading logic
│   │   ├── config.js          # Configuration constants
│   │   └── mailjet.js         # Email integration
│   ├── styles/                # CSS files
│   │   ├── main.css           # Main stylesheet
│   │   └── variables.css      # CSS custom properties
│   └── main.js                # Main entry point
├── dist/                      # Built files (generated)
├── index.html                 # Main HTML file
├── vite.config.js            # Vite configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 🛠️ Development

### Available Scripts

| Command               | Description                              |
| --------------------- | ---------------------------------------- |
| `npm run dev`         | Start development server with hot reload |
| `npm run build`       | Build for production                     |
| `npm run preview`     | Preview production build locally         |
| `npm run clean`       | Remove built files                       |
| `npm run build:clean` | Clean and build                          |

### Development Workflow

1. **Make changes** to files in `src/` or root-level files
2. **See changes instantly** in your browser (hot reload enabled)
3. **Add new artists** by editing `src/data/artists.json`
4. **Update archive** by editing `src/data/archive.json`
5. **Style changes** go in `src/styles/main.css` or `variables.css`

### Adding New Artists

Edit `src/data/artists.json`:

```json
{
  "name": "Artist Name",
  "date": "2025-12-31",
  "displayDate": "December 31, 2025",
  "bio": "Artist biography and description...",
  "image": "/artists/artist-photo.jpg",
  "website": "https://artist-website.com",
  "spotify": "https://open.spotify.com/artist/...",
  "instagram": "https://www.instagram.com/artist/"
}
```

**Image Requirements:**

- Place images in `public/artists/`
- Recommended size: 400x400px
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### Configuration

Key configuration files:

- **`src/scripts/config.js`** - YouTube playlist ID, API keys
- **`vite.config.js`** - Build settings, dev server options
- **`package.json`** - Dependencies and scripts

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

This creates optimized files in `dist/`:

- Minified and compressed JavaScript/CSS
- Optimized images and assets
- Cache-busting filenames

### Deployment Options

**Static Hosting (Recommended):**

- Netlify, Vercel, GitHub Pages
- Simply upload the `dist/` folder

**Traditional Web Server:**

- Apache, Nginx
- Serve files from `dist/` directory

### Environment Variables

Create `.env` file for sensitive data:

```env
VITE_YOUTUBE_API_KEY=your_api_key_here
VITE_MAILJET_API_KEY=your_mailjet_key
```

## 🔧 Technical Stack

- **Build Tool:** Vite 6.3.5
- **Language:** Vanilla JavaScript (ES6+ modules)
- **Styling:** Modern CSS with custom properties
- **Email:** Mailjet API integration
- **Hosting:** Static site compatible
- **Icons:** Custom SVG icons

### Code Style

- Use modern JavaScript (ES6+)
- Follow existing naming conventions
- Keep functions small and focused
- Comment complex logic
- Test changes in multiple browsers

## 📧 Contact & Support

- **Website:** [thehangoversessions.co.uk](https://thehangoversessions.co.uk)
- **Developer:** James Vardy ([james@lamplightdigital.co.uk](mailto:james@lamplightdigital.co.uk))
- **Issues:** [GitHub Issues](https://github.com/james-vardy/the-hangover-sessions/issues)

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
