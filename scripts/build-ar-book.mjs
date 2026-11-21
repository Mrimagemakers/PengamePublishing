// Builds the "View the book in AR" models from the same book used in the hero:
//   public/ar/holo-book.glb  (Android Scene Viewer)
//   public/ar/holo-book.usdz (iPhone / iPad AR Quick Look)
// Run with: node scripts/build-ar-book.mjs
// The AR copy has no page printing (Node has no canvas) and no animation;
// the holograms are solid translucent shapes so both viewers can show them.
import { writeFileSync, mkdirSync } from 'node:fs';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter.js';
import { buildOpenBook, BEAM, beamRadiusAt, GOLD, GOLD_LIGHT, HOLO_BLUE } from '../src/components/home/holoBook/openBook.js';

// GLTFExporter reads its output Blob with FileReader, which Node lacks.
globalThis.FileReader ??= class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => { this.result = buf; this.onloadend?.(); this.onload?.(); });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = `data:${blob.type || 'application/octet-stream'};base64,${Buffer.from(buf).toString('base64')}`;
      this.onloadend?.(); this.onload?.();
    });
  }
};

function holoMaterial(color, opacity, intensity = 1.2) {
  return new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: intensity, transparent: true, opacity, roughness: 0.4,
  });
}

function buildARModel() {
  const root = new THREE.Group();
  root.name = 'HoloBook';

  const book = buildOpenBook({ edgeLines: false }); // line segments don't export to USDZ
  book.position.y = 0.1;
  root.add(book);

  const holo = new THREE.Group();
  holo.position.y = 0.32;
  root.add(holo);

  const beam = new THREE.Mesh(new THREE.CylinderGeometry(BEAM.top, BEAM.bottom, BEAM.height, 48, 1, true), holoMaterial(GOLD_LIGHT, 0.12, 0.8));
  beam.position.y = BEAM.height / 2;
  holo.add(beam);

  [0.05, 1.25, 2.35].forEach((y, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(beamRadiusAt(y), i === 0 ? 0.03 : 0.018, 10, 96),
      holoMaterial(i === 1 ? HOLO_BLUE : GOLD_LIGHT, 0.9, 1.6)
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    holo.add(ring);
  });

  // Five hologram cards around the beam, each with a gold frame.
  const frameMat = holoMaterial(GOLD, 0.95, 1.4);
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 + 0.4;
    const height = 0.95 + (i % 3) * 0.62;
    const r = beamRadiusAt(height) * 0.92;
    const card = new THREE.Group();
    card.position.set(Math.cos(angle) * r, height, Math.sin(angle) * r);
    card.rotation.y = -angle + Math.PI / 2; // face outward
    card.add(new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.72, 0.015), holoMaterial(i % 2 ? HOLO_BLUE : GOLD_LIGHT, 0.28)));
    [[0, 0.36, 1.05, 0.03], [0, -0.36, 1.05, 0.03], [0.525, 0, 0.03, 0.75], [-0.525, 0, 0.03, 0.75]].forEach(([x, y, w, h]) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.03), frameMat);
      bar.position.set(x, y, 0);
      card.add(bar);
    });
    holo.add(card);
  }

  // Real-world size: the open book is about 30 cm wide.
  root.scale.setScalar(0.3 / 4.4);
  return root;
}

const out = new URL('../public/ar/', import.meta.url);
mkdirSync(out, { recursive: true });

const scene = new THREE.Scene();
scene.add(buildARModel());
scene.updateMatrixWorld(true);
// USDZ has no double-sided materials; front faces are enough for a static model.
scene.traverse((o) => { if (o.material) o.material.side = THREE.FrontSide; });

const glb = await new GLTFExporter().parseAsync(scene, { binary: true });
writeFileSync(new URL('holo-book.glb', out), Buffer.from(glb));

const usdz = await new USDZExporter().parseAsync(scene);
writeFileSync(new URL('holo-book.usdz', out), Buffer.from(usdz));

console.log('Wrote public/ar/holo-book.glb (%d KB) and holo-book.usdz (%d KB)', Math.round(glb.byteLength / 1024), Math.round(usdz.byteLength / 1024));
