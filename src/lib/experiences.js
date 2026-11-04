export const GAMES = [
  { name: 'Cruising USA', category: 'Adventure', icon: '↗', description: 'Hit the road and explore an open-road driving adventure.', url: 'https://mrimagemakers.github.io/CrusingUSA/' },
  { name: 'First Flight', category: 'Simulation', icon: '✈', description: 'Take the controls in a browser flight simulator.', url: 'https://mrimagemakers.github.io/FirstFlight/ar.html' },
  { name: 'World of Coasters', category: 'Simulation', icon: '∞', description: 'Explore a world built around roller-coaster thrills.', url: 'https://mrimagemakers.github.io/WorldofCoasters' },
  { name: 'Turn Up Music', category: 'Music & VR', icon: '♫', description: 'Step into the Turn Up Music VR radio experience.', url: 'https://turnupmusic.online' },
  { name: "Nia’s VR World", category: 'Adventure', icon: '✧', description: 'Discover Nia’s world of exploration and imagination.', url: 'https://mrimagemakers.github.io/NiasVRWorld/' },
  { name: 'Success Brand VR', category: 'Music & VR', icon: '◇', description: 'Explore the Success Brand virtual experience.', url: 'https://mrimagemakers.github.io/SuccessBrandVR/' },
];
export const LEGACY = 'https://www.pengamepublishing.com';
export const VENTURES = [
  ['Coloring Odyssey', 'Discover coloring books and make room for everyday creativity.', '/publications'],
  ['Bright Minds Explorers', 'Stories that spark curiosity, imagination, and discovery.', '/publications'],
  ['Changing the Channel', 'Explore emotional intelligence and personal growth.', 'https://pengamepublishing.myshopify.com/products/changing-the-channel'],
  ['Bright Minds Academy', 'Explore the existing Bright Minds Explorers Academy program.', `${LEGACY}/services/our-products/pengame-u/bright-minds-explorers-academy`],
  ['PG Leadership Academy', 'Explore leadership, purpose, and personal development.', '/leadership-academy'],
  ['PenGame Prison Book Program', 'Connect with the existing prison publishing program and its participation information.', `${LEGACY}/services/our-products/prison-publishing-program`],
];
export function resolveBookCode(value, origin, pathname, books) {
  try {
    const url = new URL(value);
    if (url.origin !== origin || url.pathname !== pathname) return null;
    const id = url.searchParams.get('book');
    return books.find(book => book.id === id) || null;
  } catch { return null; }
}
