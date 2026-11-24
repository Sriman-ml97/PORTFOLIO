/**
 * Portfolio Data for SRIMAN B.
 * Editorial Creative Studio & Developer Portfolio
 * Central source for the portfolio's personal identity and links.
 */

export const PERSONAL_INFO = {
  name: "SRIMAN B.",
  role: "Creative Technologist / Visual Storyteller",
  tagline: "IDEAS INTO EXPERIENCES.",
  supportingText: "FULL STACK × AI × ROBOTICS × VISUAL STORYTELLING",
  location: "",
  status: "",
  email: "sman771960@gmail.com",
  socials: {
    github: "https://github.com/Sriman-ml97",
    linkedin: "https://www.linkedin.com/in/sriman-b-493409373",
    instagram: "https://www.instagram.com/sri.man_offl?bqrl=MXRmdDNzM3VhdTdlaw==",
  },
  portrait: "/images/sriman-portrait.jpg",
  cinematographerImage: "/images/sriman-cinematographer.png",
  editorialPortrait: "/images/sriman-editorial.jpg",
  heroVideo: "/videos/showreel.mp4",
  heroPoster: "/images/hero-poster.jpg",
  bioPhilosophy: {
    kicker: "01 // PHILOSOPHY",
    heading: "CURIOUS BY NATURE. CREATIVE BY DESIGN.",
    subheading: "Bridging the gap between engineering rigor and cinematic emotion.",
    paragraphs: [
      "I am an aspiring creative technologist and visual storyteller obsessed with where autonomous logic meets aesthetic craft. My work spans from writing distributed full-stack systems and developing ROS 2 robotics simulations to framing 35mm film stills and sculpting rhythm on the editing timeline.",
      "Rather than treating engineering and filmmaking as separate disciplines, I treat them as two lenses for the same ambition: turning abstract ideas into tangible, unforgettable experiences that move people."
    ],
    disciplines: [
      { id: "01", name: "Full-Stack Web Engineering", detail: "React, Node.js, WebGL, High-Performance Architectures" },
      { id: "02", name: "AI & Autonomous Robotics", detail: "ROS 2, Python, Nav2, Computer Vision, Simulation" },
      { id: "03", name: "Cinematography & Visual Stories", detail: "Direction, 35mm Frame Composition, Color Grading" },
      { id: "04", name: "Video Editing & Sound Design", detail: "Dynamic Pacing, Match Cutting, Auditory Landscapes" }
    ]
  }
};

export const PROJECTS = [
  {
    id: "vision-hub",
    number: "01",
    title: "Autonomous Vision Hub",
    category: "Full Stack / AI",
    year: "2026",
    description: "Distributed telemetry and edge computing platform that ingests real-time multi-camera video streams, applies on-the-fly inference, and renders low-latency 60fps WebGL telemetry feeds.",
    tags: ["React", "Vite", "Node.js", "WebSockets", "Python", "OpenCV"],
    metrics: "< 45ms Latency · Multi-Stream Sync",
    image: "/images/projects/fullstack/dashboard-analytics.jpg",
    imageType: "illustrative_concept",
    github: "https://github.com/Sriman-ml97",
    liveDemo: null,
    featured: true
  },
  {
    id: "neural-studio",
    number: "02",
    title: "Neural Studio Interface",
    category: "Creative Dev / Audio-Visual",
    year: "2025",
    description: "An editorial digital synthesizer that visualizes audio wave frequencies into interactive shaders and kinetic typography with micro-gesture feedback.",
    tags: ["React", "Motion", "GSAP", "Web Audio API", "WebGL"],
    metrics: "Sub-16ms Frame Times · Kinetic Shader Pipeline",
    image: "/images/projects/ai-ml/neural-network.jpg",
    imageType: "illustrative_concept",
    github: "https://github.com/Sriman-ml97",
    liveDemo: null,
    featured: true
  },
  {
    id: "kinetic-sensor-suite",
    number: "03",
    title: "Kinetic Sensor Suite",
    category: "Full Stack / Embedded Systems",
    year: "2025",
    description: "High-throughput dashboard connecting field hardware sensors via MQTT and Redis, rendering real-time vector graphs and fault diagnosis in mission-critical environments.",
    tags: ["TypeScript", "React", "FastAPI", "MQTT", "Redis", "Tailwind"],
    metrics: "10,000+ points/sec Ingestion · Anomaly Detection",
    image: "/images/projects/fullstack/workstation-code.jpg",
    imageType: "illustrative_concept",
    github: "https://github.com/Sriman-ml97",
    liveDemo: null,
    featured: false
  }
];

export const ROBOTICS_PROJECT = {
  kicker: "02 // INNOVATION & AUTONOMY",
  title: "Autonomous Guide Robot",
  tagline: "Intelligent Navigation, Obstacle Avoidance & Human-Robot Interaction.",
  overview: "Developed as an autonomous indoor service and guidance robot engineered using ROS 2 (Robot Operating System 2) and Python. The robot dynamically navigates human-dense hallways, builds real-time SLAM spatial maps, and delivers polite, voice-guided interactive assistance.",
  image: "/images/projects/robotics/guide-robot-concept.jpg",
  imageType: "illustrative_concept",
  techStack: [
    { name: "ROS 2", role: "Middleware, Node Graph & Inter-Process Comm" },
    { name: "Python", role: "Behavior Trees, Logic & Sensor Interfacing" },
    { name: "Nav2", role: "Costmap Generation, Path Planning & Recovery" },
    { name: "LIDAR SLAM", role: "Sub-centimeter Simultaneous Mapping" },
    { name: "Gazebo", role: "Physics & Dynamic Environment Simulation" },
    { name: "AI Vision & Voice", role: "Multi-Modal Human Interaction & Voice Prompts" }
  ],
  objectives: [
    {
      step: "01",
      title: "Real-Time Spatial SLAM",
      detail: "Generates high-precision 2D/3D occupancy grid maps using planar LIDAR scan matching combined with wheel odometry and IMU fusion."
    },
    {
      step: "02",
      title: "Dynamic Collision Avoidance",
      detail: "Implements adaptive Nav2 local planners that compute safety deceleration zones when pedestrians or obstacles abruptly enter the path."
    },
    {
      step: "03",
      title: "Human-Centric Interaction",
      detail: "Integrated multi-modal assistance: responsive visual feedback on a mounted touch display synchronized with natural audio guidance cues."
    },
    {
      step: "04",
      title: "Simulation to Reality",
      detail: "Rigorously validated inside Gazebo simulation environments before deployment onto physical differential-drive robotics hardware."
    }
  ],
  specs: [
    { label: "Architecture", val: "ROS 2 Humble / Iron" },
    { label: "Navigation Framework", val: "Nav2 Behavior Trees" },
    { label: "Localization Accuracy", val: "± 2.5 cm" },
    { label: "Sensor Suite", val: "360° LIDAR, Stereo Depth, IMU, Encoders" }
  ]
};

export const VISUAL_STORIES = [
  {
    id: "cinema-01",
    index: "01",
    title: "Tokyo Monoliths",
    category: "Cinematography",
    role: "Director of Photography · Colorist",
    specs: "Anamorphic 35mm Emulation · DaVinci Resolve",
    description: "A contemplative architectural study of brutalist concrete silhouettes contrasted against neon rain reflections.",
    thumbnail: "/images/photography/tokyo-architecture.jpg",
    imageType: "illustrative_concept",
    videoSrc: "/videos/showreel.mp4",
    duration: "02:45"
  },
  {
    id: "cinema-02",
    index: "02",
    title: "Shadows & Silicon",
    category: "Documentary Film",
    role: "Director · Lead Editor",
    specs: "4K UHD · Premiere Pro · Original Score",
    description: "An intimate short documentary tracing the parallel hands of traditional craftsmen and robotic arm technicians.",
    thumbnail: "/images/cinematography/camera-rig.jpg",
    imageType: "illustrative_concept",
    videoSrc: "/videos/showreel.mp4",
    duration: "04:12"
  },
  {
    id: "cinema-03",
    index: "03",
    title: "Fragments of Motion",
    category: "Video Editing",
    role: "Editor · Sound Designer",
    specs: "Kinetic Cut · Dynamic Sound Design",
    description: "High-cadence editorial commercial reel built on micro-second match cuts and physical camera whip pans.",
    thumbnail: "/images/cinematography/editing-suite.jpg",
    imageType: "illustrative_concept",
    videoSrc: "/videos/showreel.mp4",
    duration: "01:30"
  },
  {
    id: "cinema-04",
    index: "04",
    title: "Raw Horizon & Street Stills",
    category: "Photography & Editorial",
    role: "Photographer · Director",
    specs: "35mm Medium Format · Kodak Gold Tone",
    description: "Personal portraiture and cinematic road series examining transient moments, human gestures, and vintage automotive reflections.",
    thumbnail: "/images/sriman-editorial.jpg",
    imageType: "personal_actual",
    videoSrc: "/videos/showreel.mp4",
    duration: "Photo Essay"
  }
];
