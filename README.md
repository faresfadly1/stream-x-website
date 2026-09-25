StreamX - Intelligent Media Streaming Platform
🎬 A Netflix-inspired streaming web application built with pure frontend technologies. StreamX offers an immersive entertainment experience with modern design, interactive features, and smart content discovery.
✨ Features
🎥 Modern Streaming Interface: Dark theme UI with responsive design

📱 Interactive Content Browsing: Movie/TV show carousels with hover effects

🤖 AI Recommendation System: Personalized content suggestions

👥 Watch Together: Social viewing with synchronized playback

⚖️ Legal movie search: public-domain full films play directly in a synchronized room; a larger title catalogue can point viewers to official streaming, rental, and purchase options.

🔍 Detailed Movie Information: Modals with cast, crew, trailers, and stats

👤 User Authentication Flow: Sign-in/sign-up simulation

✨ Visual Effects: Animated particle background, smooth transitions

🛠️ Tech Stack
Frontend: HTML5, CSS3, JavaScript (ES6+)
Styling: Custom CSS with animations, Flexbox/Grid
Icons: Font Awesome 6.4.0
Hosting: GitHub Pages
Version Control: Git/GitHub

🚀 Live Demo
🌐 Live Website: https://faresfadly1.github.io/stream-x-website/

## Legal movie catalogue setup

The built-in Watch Together search includes verified public-domain full films, which can be played and synchronized for every member of a room. To search a broad catalogue of film titles and open official viewing options, create a TMDB API Read Access Token and add it to the Render service as `TMDB_READ_ACCESS_TOKEN`.

The token stays on the server and is never sent to visitors. Copyrighted titles open their official provider options; StreamX does not proxy, embed, or redistribute them. Each viewer needs their own subscription, rental, or purchase where required.

📁 Project Structure
stream-x-website/
├── index.html          # Landing/Authentication page
├── movies.html         # Main movies browsing interface
├── tvshows.html        # TV shows catalog
├── watchtogether.html  # Social viewing feature
├── ai-recommender.html # AI-powered recommendations
├── signin.html         # User sign-in page
├── signup.html         # User registration page
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── assets/             # Images and media
└── README.md           # This file

🎯 Key Pages
Landing Page - Welcome screen with trial offer

Movies Page - Browse latest releases and top-rated films

TV Shows Page - Television series catalog

Watch Together - Social viewing experience

AI Recommender - Personalized content suggestions

Authentication - Sign-in/sign-up flows

🎨 Design Highlights
Dark Theme Interface: Reduces eye strain for extended viewing

Responsive Layout: Adapts to mobile, tablet, and desktop screens

Interactive Elements: Hover effects, smooth transitions, animations

Visual Hierarchy: Clear typography and intuitive navigation

Color Scheme: Dark backgrounds with red accents (#e50914)
