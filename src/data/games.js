// Single source for the Games & XR shelf (home page + /games).
// To add a title: copy an entry, give it a unique `id`, pick a `motif`
// from src/components/games/GameCover.jsx, and list the ways to play.
//
// platforms: "browser" | "vr" | "ar" | "horizon"
// status:    "live" | "coming"

export const PLATFORMS = {
  browser: "Browser",
  vr: "VR headset",
  ar: "Phone AR",
  horizon: "Horizon Worlds",
};

export const GAMES = [
  {
    id: "world-of-coasters",
    title: "World of Coasters",
    tagline: "Ride themed roller coasters around the world and beyond it.",
    description:
      "A VR coaster park with themed worlds linked from one central hub. Start with the Great Wall Run, Galactic Gravity, and Atlantis Deep Dive.",
    url: "https://mrimagemakers.github.io/WorldofCoasters/",
    platforms: ["browser", "vr"],
    status: "live",
    motif: "loop",
    ground: "#1B1446",
    featured: true,
  },
  {
    id: "cruising-usa",
    title: "Cruising USA",
    tagline: "Take the wheel on a 3D road trip across America.",
    description:
      "A 3D driving game you can play on your phone, your computer, or in a headset.",
    url: "https://mrimagemakers.github.io/CrusingUSA/",
    platforms: ["browser", "vr"],
    status: "live",
    motif: "road",
    ground: "#3A1A12",
    featured: true,
  },
  {
    id: "first-flight",
    title: "First Flight",
    tagline: "Learn to fly, then explore careers in aviation.",
    description:
      "An aviation learning simulator and careers hub, with an AR mode for phones.",
    url: "https://mrimagemakers.github.io/FirstFlight/ar.html",
    platforms: ["browser", "vr", "ar"],
    status: "live",
    motif: "flight",
    ground: "#0E2C4A",
    featured: true,
  },
  {
    id: "great-outdoors",
    title: "Great Outdoors Adventure",
    tagline: "Drive the backcountry and spot wildlife along the way.",
    description: "A driving and wildlife game set in open country. Play in your browser, in a VR headset, or in AR on your phone.",
    url: "https://mrimagemakers.github.io/GreatOutdoorsAdventure/",
    platforms: ["browser", "vr", "ar"],
    status: "live",
    motif: "peaks",
    ground: "#143424",
    featured: true,
  },
  {
    id: "nias-world",
    title: "Nia’s Number Garden World",
    tagline: "Step into the Number Garden from the Bright Minds Explorers book.",
    description:
      "A 3D learning world for young readers, with Nia and her friends from Nia & the Number Garden.",
    url: "https://mrimagemakers.github.io/NiasVRWorld/",
    platforms: ["browser", "vr", "ar"],
    status: "live",
    motif: "garden",
    ground: "#0F3B36",
    book: { title: "Nia & the Number Garden", url: "https://niasnumbergarden.shop" },
    featured: true,
  },
  {
    id: "ravenbrook",
    title: "Ravenbrook Manor",
    tagline: "Survive the night in the town from Halloween Haunts.",
    description:
      "A multiplayer survival-horror world in Meta Horizon Worlds, based on the Halloween Haunts coloring book. Ages 18+.",
    url: "https://horizon.meta.com/world/10163428610499954/",
    platforms: ["horizon", "vr"],
    status: "live",
    motif: "manor",
    ground: "#24112A",
    rating: "18+",
    book: {
      title: "Halloween Haunts",
      url: "https://www.amazon.com/Halloween-Haunts-Spooky-Coloring-Adventure/dp/B0CKS6DVFM",
    },
    featured: true,
  },
  {
    id: "turn-up-music",
    title: "Turn Up Music",
    tagline: "Internet radio with a VR lounge to listen and relax.",
    description: "Stream stations, share music, and hang out in the VR lounge.",
    url: "https://turnupmusic.online",
    platforms: ["browser", "vr"],
    status: "live",
    motif: "wave",
    ground: "#2A0F33",
  },
  {
    id: "storyscape-xr",
    title: "StoryScape XR",
    tagline: "Read, watch, and play inside virtual rooms.",
    description:
      "Enjoy ebooks, flipbooks, video, music, and games in immersive reading spaces.",
    url: "https://storyscapexr.com",
    platforms: ["browser", "vr", "ar"],
    status: "live",
    motif: "pages",
    ground: "#13294B",
  },
  {
    id: "rap-iq-city",
    title: "Rap IQ City",
    tagline: "Test your hip-hop knowledge and earn Beat Coins.",
    description: "A hip-hop trivia game. Score 800+ Beat Coins in All City mode.",
    url: "https://claude.ai/public/artifacts/192a190c-d963-4445-aeaa-8d6ec6945248",
    platforms: ["browser"],
    status: "live",
    motif: "mic",
    ground: "#3B2A0A",
  },
  {
    id: "porch-war",
    title: "Porch War",
    tagline: "A neighborhood showdown from the PenGame studio.",
    description: "Plays in your browser on phone or computer.",
    url: "https://mrimagemakers.github.io/PorchWar/",
    platforms: ["browser"],
    status: "live",
    motif: "porch",
    ground: "#2B1D10",
  },
  {
    id: "hues-got-flow",
    title: "Hue’s Got Flow: The Coloring Odyssey",
    tagline: "Paint the city back to life with Hue’s Golden Magic Pen.",
    description:
      "A browser game based on the hip-hop coloring book. In development.",
    url: "https://www.amazon.com/Hues-Got-Flow-Hip-Hop-Coloring/dp/B0CFDKNZXZ",
    urlLabel: "Get the book",
    platforms: ["browser"],
    status: "coming",
    motif: "pen",
    ground: "#0B2A3F",
  },
];
