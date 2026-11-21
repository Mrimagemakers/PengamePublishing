import * as THREE from 'three';

// Brand colours shared by the hero scene and the AR model.
export const NAVY = 0x0a1730;
export const NAVY_LIGHT = 0x1b335f;
export const GOLD = 0xd9a53a;
export const GOLD_LIGHT = 0xf2d27a;
export const CREAM = 0xf6ecd4;
export const HOLO_BLUE = 0x8fb4ff;

const PAGE_W = 2.05;
const PAGE_D = 2.84;

// A page surface that dips into the gutter at the spine, like a real open book.
function curvedPage(side) {
  const geo = new THREE.PlaneGeometry(PAGE_W, PAGE_D, 24, 1);
  geo.rotateX(-Math.PI / 2);
  geo.translate((side * PAGE_W) / 2, 0, 0);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const u = Math.min(Math.abs(pos.getX(i)) / PAGE_W, 1);
    pos.setY(i, 0.205 - 0.075 * Math.pow(1 - u, 4));
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Builds an open book lying flat, pages up, spine along the z axis.
 * About 4.4 units wide and 3 deep; the top of the pages sits near y = 0.2.
 * Pass page textures to print the pages; without them the pages are plain cream
 * (used for the AR export, which runs in Node without a canvas).
 */
export function buildOpenBook({ leftPage = null, rightPage = null, edgeLines = true } = {}) {
  const book = new THREE.Group();
  book.name = 'PenGameBook';

  const coverMat = new THREE.MeshStandardMaterial({ color: NAVY_LIGHT, metalness: 0.35, roughness: 0.45 });
  const blockMat = new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.9, emissive: GOLD, emissiveIntensity: 0.04 });
  const goldMat = new THREE.MeshStandardMaterial({ color: GOLD, metalness: 0.85, roughness: 0.3, emissive: GOLD, emissiveIntensity: 0.25 });
  const glowMat = new THREE.MeshStandardMaterial({ color: GOLD_LIGHT, emissive: GOLD_LIGHT, emissiveIntensity: 1.6 });

  [-1, 1].forEach((side) => {
    const half = new THREE.Group();
    half.rotation.z = side * 0.1; // pages open in a gentle V

    const cover = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.07, 3), coverMat);
    cover.position.x = side * 1.1;
    half.add(cover);

    // Gold trim along the outer edge of each cover.
    const trim = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 3), goldMat);
    trim.position.set(side * 2.18, 0, 0);
    half.add(trim);

    const block = new THREE.Mesh(new THREE.BoxGeometry(PAGE_W, 0.16, PAGE_D), blockMat);
    block.position.set(side * (PAGE_W / 2 + 0.01), 0.115, 0);
    half.add(block);

    const pageMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: side < 0 ? leftPage : rightPage,
      roughness: 0.85,
      emissive: CREAM,
      emissiveIntensity: 0.06,
      side: THREE.DoubleSide,
    });
    if (!pageMat.map) pageMat.color.set(CREAM);
    half.add(new THREE.Mesh(curvedPage(side), pageMat));

    if (edgeLines) {
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(cover.geometry),
        new THREE.LineBasicMaterial({ color: GOLD_LIGHT, transparent: true, opacity: 0.7 })
      );
      edges.position.copy(cover.position);
      half.add(edges);
    }
    book.add(half);
  });

  const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 3, 20), goldMat);
  spine.rotation.x = Math.PI / 2;
  spine.position.y = -0.03;
  book.add(spine);

  // A thin line of light in the gutter, where the holograms come from.
  const gutter = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.02, PAGE_D * 0.96), glowMat);
  gutter.position.y = 0.14;
  book.add(gutter);

  return book;
}

// The hologram beam widens as it rises; shared so the AR model matches the hero.
export const BEAM = { height: 3.2, bottom: 0.55, top: 1.6 };
export const beamRadiusAt = (y) => BEAM.bottom + ((BEAM.top - BEAM.bottom) * y) / BEAM.height;
