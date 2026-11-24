# SRIMAN B. — Premium Cinematic Editorial Portfolio

A production-quality personal portfolio website crafted for **SRIMAN B.** — Creative Technologist & Visual Storyteller. 

Built with an editorial aesthetic inspired by independent film studios, creative agencies, and modern typography-led digital experiences.

---

## 🎨 Creative Direction & Visual Identity

- **Name:** SRIMAN B.
- **Identities:**
  1. `01 — DEVELOPER`: Full Stack Development & Distributed Systems
  2. `02 — INNOVATOR`: AI, Autonomous Robotics (ROS 2), SLAM & Perception
  3. `03 — VISUAL STORYTELLER`: Cinematography, Video Editing & 35mm Photography
- **Color Palette:**
  - Background: Warm Off-White (`#F2F0E9`)
  - Typography: Charcoal Black (`#171717`)
  - Accent: Muted Cinematic Red (`#A33A32`)
  - Secondary: Warm Grey (`#5E5B55` / `#E8E5DD`)
  - Dark Cinematic Accents: Film Black (`#121212`)
- **Typography:**
  - Primary Sans: `Space Grotesk`
  - Editorial Serif: `Playfair Display`
  - Technical Monospace: `DM Mono`
  - Neutral Body: `Inter`

---

## 🛠 Technology Stack

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** & Modern CSS Custom Properties
- **Motion for React** (`motion/react`)
- **GSAP 3** + **ScrollTrigger** + **@gsap/react** (`useGSAP`)
- **Lucide React** & Custom SVG Monograms

---

## 📁 Project Architecture

```
sriman_portfolio/
├── public/
│   ├── favicon.svg               # Editorial studio monogram favicon
│   ├── videos/
│   │   └── showreel.mp4          # Cinematic video background & modal reel
│   └── images/
│       ├── hero-poster.jpg       # Video poster fallback & thumbnail
│       ├── portrait.jpg          # Editorial portrait placeholder (4:5)
│       ├── project-1.jpg         # Autonomous Vision Hub project frame
│       ├── project-2.jpg         # Neural Studio Interface project frame
│       ├── project-3.jpg         # Kinetic Sensor Suite project frame
│       ├── robotics.jpg          # Autonomous Guide Robot showcase frame
│       ├── cinema-1.jpg          # Tokyo Monoliths visual story frame
│       ├── cinema-2.jpg          # Shadows & Silicon documentary frame
│       ├── cinema-3.jpg          # Fragments of Motion editing reel frame
│       └── cinema-4.jpg          # Raw Horizon photography frame
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Minimal editorial navigation & availability pill
│   │   ├── Hero.jsx              # Fullscreen cinematic video hero & typography reveal
│   │   ├── About.jsx             # Two-column editorial layout & philosophy
│   │   ├── Projects.jsx          # "Things I've Built" full-stack showcase
│   │   ├── Robotics.jsx          # Featured Guide Robot (ROS 2, Nav2, SLAM)
│   │   ├── VisualStories.jsx     # Cinematography & video editing masonry gallery
│   │   ├── VideoModal.jsx        # Fullscreen cinema video player modal
│   │   ├── Contact.jsx           # "Have an Idea? Let's Create It." & transmissions
│   │   ├── Footer.jsx            # Minimal studio footer with live year
│   │   ├── CustomCursor.jsx      # Fluid viewfinder dot & ring cursor
│   │   └── SocialIcons.jsx       # SVG icons for GitHub, LinkedIn, Instagram
│   ├── data/
│   │   └── projects.js           # Central configuration for all data and media
│   ├── hooks/
│   │   └── useScrollAnimations.js# GSAP & ScrollTrigger setup & reduced-motion checks
│   ├── App.jsx                   # Core application root orchestrator
│   ├── index.css                 # Global design system & typography tokens
│   └── main.jsx                  # React application entry point
├── package.json
└── vite.config.js
```

---

## 🚀 How to Run the Website

### Development Server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

---

## 🔄 How to Customize & Replace Personal Assets

All personal data, links, and media paths are centralized in **`src/data/projects.js`**:

1. **Personal Information & Links:**
   - Open `src/data/projects.js`
   - Update `email`, `socials.github`, `socials.linkedin`, `socials.instagram`.
2. **Personal Showreel Video:**
   - Replace `public/videos/showreel.mp4` with your personal reel or clip.
   - Replace `public/images/hero-poster.jpg` with a poster frame from your video.
3. **Portrait Image:**
   - Replace `public/images/portrait.jpg` with your own portrait photo (recommended ratio: 4:5).
4. **Project Images & Details:**
   - Swap images in `public/images/project-1.jpg`, `project-2.jpg`, `project-3.jpg`.
   - Update titles, descriptions, and GitHub links in `src/data/projects.js`.
5. **Robotics Hardware & Simulation Photos:**
   - Replace `public/images/robotics.jpg` with actual photos or Gazebo screenshots of your Guide Robot.
6. **Cinematography & Visual Stories:**
   - Replace `public/images/cinema-1.jpg` through `cinema-4.jpg` with your personal frame grabs and stills.
