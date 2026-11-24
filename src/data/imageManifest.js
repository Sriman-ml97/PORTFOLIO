/**
 * Central Image Manifest for SRIMAN B. Portfolio
 * Catalogs all visual assets, source websites, photographer attributions, and license classifications.
 * 
 * Rules:
 * - Personal photographs are marked as type: "personal_actual"
 * - Stock / concept visuals are marked as type: "illustrative_concept"
 */

export const IMAGE_MANIFEST = {
  // Personal Photographs (Authentic user work and identity)
  personal: [
    {
      id: "sriman-portrait",
      path: "/images/sriman-portrait.jpg",
      category: "Personal Identity",
      type: "personal_actual",
      alt: "Sriman B. — Professional studio portrait in black suit and white shirt",
      source: "Uploaded by Sriman B.",
      photographer: "Sriman B. Personal Archive",
      license: "All Rights Reserved © Sriman B."
    },
    {
      id: "sriman-cinematographer",
      path: "/images/sriman-cinematographer.png",
      category: "Personal Identity / Cinematography",
      type: "personal_actual",
      alt: "Sriman B. — Full-body portrait holding cinema camera with mounted flash",
      source: "Uploaded by Sriman B.",
      photographer: "Sriman B. Personal Archive",
      license: "All Rights Reserved © Sriman B."
    },
    {
      id: "sriman-editorial",
      path: "/images/sriman-editorial.jpg",
      category: "Personal Photography",
      type: "personal_actual",
      alt: "Sriman B. — Editorial 35mm film photograph with vintage automobile",
      source: "Uploaded by Sriman B.",
      photographer: "Sriman B. Personal Archive",
      license: "All Rights Reserved © Sriman B."
    }
  ],

  // Full-Stack Engineering Visuals (Illustrative concept imagery)
  fullstack: [
    {
      id: "workstation-code",
      path: "/images/projects/fullstack/workstation-code.jpg",
      category: "Full Stack Development",
      type: "illustrative_concept",
      alt: "Full-stack code editor and distributed architecture development setup",
      source: "Unsplash",
      photographer: "Ilya Pavlov (@ilyapavlov)",
      sourceUrl: "https://unsplash.com/photos/sample-code-ide",
      license: "Unsplash License (Free for commercial and personal use)"
    },
    {
      id: "dashboard-analytics",
      path: "/images/projects/fullstack/dashboard-analytics.jpg",
      category: "Full Stack Development",
      type: "illustrative_concept",
      alt: "Minimal real-time telemetry and metrics analytics dashboard",
      source: "Unsplash",
      photographer: "Luke Chesser (@lukechesser)",
      sourceUrl: "https://unsplash.com/photos/dashboard-analytics",
      license: "Unsplash License (Free for commercial and personal use)"
    },
    {
      id: "developer-setup",
      path: "/images/projects/fullstack/developer-setup.jpg",
      category: "Full Stack Development",
      type: "illustrative_concept",
      alt: "Modern creative coding desk setup and web application engineering workstation",
      source: "Unsplash",
      photographer: "Christopher Gower (@cgower)",
      sourceUrl: "https://unsplash.com/photos/developer-workspace",
      license: "Unsplash License (Free for commercial and personal use)"
    }
  ],

  // AI & Machine Learning Visuals (Illustrative concept imagery)
  aiMl: [
    {
      id: "neural-network",
      path: "/images/projects/ai-ml/neural-network.jpg",
      category: "AI & Machine Learning",
      type: "illustrative_concept",
      alt: "Deep learning neural network topology and mathematical latent graph",
      source: "Unsplash",
      photographer: "Google DeepMind (@googledeepmind)",
      sourceUrl: "https://unsplash.com/photos/neural-network",
      license: "Unsplash License (Free for commercial and personal use)"
    },
    {
      id: "computer-vision",
      path: "/images/projects/ai-ml/computer-vision.jpg",
      category: "AI & Machine Learning",
      type: "illustrative_concept",
      alt: "Computer vision spatial vectors and dynamic procedural wave simulation",
      source: "Unsplash",
      photographer: "Milad Fakurian (@fakurian)",
      sourceUrl: "https://unsplash.com/photos/computational-wave",
      license: "Unsplash License (Free for commercial and personal use)"
    }
  ],

  // Autonomous Robotics Visuals (Illustrative concept imagery)
  robotics: [
    {
      id: "guide-robot-concept",
      path: "/images/projects/robotics/guide-robot-concept.jpg",
      category: "Autonomous Robotics",
      type: "illustrative_concept",
      alt: "Autonomous indoor guide robot hardware chassis and spatial perception testbed",
      source: "Unsplash",
      photographer: "Alex Knight (@agk42)",
      sourceUrl: "https://unsplash.com/photos/autonomous-robot",
      license: "Unsplash License (Free for commercial and personal use)"
    },
    {
      id: "lidar-navigation",
      path: "/images/projects/robotics/lidar-navigation.jpg",
      category: "Autonomous Robotics",
      type: "illustrative_concept",
      alt: "Robotic LiDAR sensor scanning and autonomous SLAM navigation",
      source: "Unsplash",
      photographer: "Possessed Photography (@possessedphotography)",
      sourceUrl: "https://unsplash.com/photos/robot-lidar-chassis",
      license: "Unsplash License (Free for commercial and personal use)"
    }
  ],

  // Cinematography & Video Editing Visuals
  cinematography: [
    {
      id: "camera-rig",
      path: "/images/cinematography/camera-rig.jpg",
      category: "Cinematography",
      type: "illustrative_concept",
      alt: "Professional cinematographer operating 35mm cinema camera rig on set",
      source: "Unsplash",
      photographer: "Kal Visuals (@kalvisuals)",
      sourceUrl: "https://unsplash.com/photos/cinematographer-on-set",
      license: "Unsplash License (Free for commercial and personal use)"
    },
    {
      id: "editing-suite",
      path: "/images/cinematography/editing-suite.jpg",
      category: "Video Editing",
      type: "illustrative_concept",
      alt: "Professional video editing workstation with multi-track timeline and color grading",
      source: "Unsplash",
      photographer: "Jakob Owens (@jakobowens1)",
      sourceUrl: "https://unsplash.com/photos/video-editing-timeline",
      license: "Unsplash License (Free for commercial and personal use)"
    },
    {
      id: "anamorphic-lens",
      path: "/images/cinematography/anamorphic-lens.jpg",
      category: "Cinematography",
      type: "illustrative_concept",
      alt: "Anamorphic 35mm optical cinema lens and aperture elements",
      source: "Unsplash",
      photographer: "Unsplash Curated (@unsplash)",
      sourceUrl: "https://unsplash.com/photos/cinema-lens",
      license: "Unsplash License (Free for commercial and personal use)"
    },
    {
      id: "film-set",
      path: "/images/cinematography/film-set.jpg",
      category: "Cinematography",
      type: "illustrative_concept",
      alt: "Behind the scenes film production clapperboard and studio lights",
      source: "Unsplash",
      photographer: "Denise Jans (@denisejans_nl)",
      sourceUrl: "https://unsplash.com/photos/film-set-production",
      license: "Unsplash License (Free for commercial and personal use)"
    }
  ],

  // Photography & Editorial Stills
  photography: [
    {
      id: "tokyo-architecture",
      path: "/images/photography/tokyo-architecture.jpg",
      category: "Photography",
      type: "illustrative_concept",
      alt: "Tokyo brutalist architectural monolith in high-contrast light and shadow",
      source: "Unsplash",
      photographer: "Ryoji Iwata (@ryoji__iwata)",
      sourceUrl: "https://unsplash.com/photos/tokyo-architecture",
      license: "Unsplash License (Free for commercial and personal use)"
    }
  ],

  // Textures & Light Overlays
  textures: [
    {
      id: "anamorphic-light-leak",
      path: "/images/textures/anamorphic-light-leak.jpg",
      category: "Texture",
      type: "illustrative_concept",
      alt: "Subtle anamorphic cinematic light leaks and warm optical flares",
      source: "Unsplash",
      photographer: "Billy Huynh (@billy_huy)",
      sourceUrl: "https://unsplash.com/photos/anamorphic-bokeh",
      license: "Unsplash License (Free for commercial and personal use)"
    }
  ]
};
