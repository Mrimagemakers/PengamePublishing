import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildOpenBook, BEAM, beamRadiusAt, GOLD_LIGHT, HOLO_BLUE } from './openBook';

// ---------------------------------------------------------------------------
// Canvas textures (drawn once, no image downloads)
// ---------------------------------------------------------------------------

function canvasTexture(width, height, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

// Older browsers lack CanvasRenderingContext2D.roundRect, so draw it by hand.
function roundRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawPage(ctx, w, h, right) {
  ctx.fillStyle = '#f6ecd4';
  ctx.fillRect(0, 0, w, h);
  // Soft shading toward the gutter
  const shade = ctx.createLinearGradient(right ? 0 : w, 0, right ? w * 0.25 : w * 0.75, 0);
  shade.addColorStop(0, 'rgba(10,23,48,.22)');
  shade.addColorStop(1, 'rgba(10,23,48,0)');
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, w, h);

  const left = right ? 70 : 52;
  ctx.fillStyle = '#b8862a';
  ctx.font = '600 22px Georgia, serif';
  ctx.fillText(right ? 'Chapter One' : 'PenGame Publishing', left, 70);
  ctx.fillRect(left, 86, 120, 3);

  if (right) {
    // A small gold line drawing: a horizon with a rising sun
    ctx.strokeStyle = '#c9952f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(w / 2, 300, 70, Math.PI, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(left, 300);
    ctx.lineTo(w - 52, 300);
    ctx.stroke();
    for (let i = 0; i < 7; i++) {
      const a = Math.PI + (i + 1) * (Math.PI / 8);
      ctx.beginPath();
      ctx.moveTo(w / 2 + Math.cos(a) * 90, 300 + Math.sin(a) * 90);
      ctx.lineTo(w / 2 + Math.cos(a) * 118, 300 + Math.sin(a) * 118);
      ctx.stroke();
    }
  }

  ctx.fillStyle = 'rgba(10,23,48,.28)';
  const start = right ? 360 : 130;
  for (let y = start, i = 0; y < h - 70; y += 26, i++) {
    const len = (w - left - 52) * (i % 5 === 4 ? 0.55 : 0.9 + ((i * 37) % 10) / 100);
    ctx.fillRect(left, y, Math.min(len, w - left - 52), 7);
  }
  ctx.fillStyle = '#b8862a';
  ctx.font = '18px Georgia, serif';
  ctx.fillText(right ? '2' : '1', right ? w - 70 : 52, h - 34);
}

const ICONS = {
  read(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 34); ctx.quadraticCurveTo(-30, 22, -58, 28); ctx.lineTo(-58, -26);
    ctx.quadraticCurveTo(-30, -32, 0, -18); ctx.quadraticCurveTo(30, -32, 58, -26);
    ctx.lineTo(58, 28); ctx.quadraticCurveTo(30, 22, 0, 34); ctx.closePath();
    ctx.moveTo(0, -18); ctx.lineTo(0, 34);
    ctx.stroke();
  },
  play(ctx) {
    ctx.beginPath();
    roundRect(ctx, -60, -24, 120, 52, 26);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-38, 2); ctx.lineTo(-18, 2); ctx.moveTo(-28, -8); ctx.lineTo(-28, 12);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(24, -2, 5, 0, Math.PI * 2); ctx.arc(40, 10, 5, 0, Math.PI * 2); ctx.fill();
  },
  vr(ctx) {
    ctx.beginPath();
    roundRect(ctx, -62, -26, 124, 54, 18);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-28, 2, 18, 13, 0, 0, Math.PI * 2);
    ctx.ellipse(28, 2, 18, 13, 0, 0, Math.PI * 2);
    ctx.stroke();
  },
  ar(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, -34); ctx.lineTo(34, -16); ctx.lineTo(34, 20); ctx.lineTo(0, 38);
    ctx.lineTo(-34, 20); ctx.lineTo(-34, -16); ctx.closePath();
    ctx.moveTo(-34, -16); ctx.lineTo(0, 2); ctx.lineTo(34, -16); ctx.moveTo(0, 2); ctx.lineTo(0, 38);
    ctx.stroke();
  },
  learn(ctx) {
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(0, 2, 58, 18, (i * Math.PI) / 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(0, 2, 7, 0, Math.PI * 2); ctx.fill();
  },
};

function drawPanel(ctx, w, h, { icon, label, blue }) {
  const rgb = blue ? '143,180,255' : '242,210,122';
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = `rgba(${rgb},.10)`;
  ctx.beginPath(); roundRect(ctx, 6, 6, w - 12, h - 12, 18); ctx.fill();
  ctx.strokeStyle = `rgba(${rgb},.85)`;
  ctx.lineWidth = 3;
  ctx.stroke();
  // Corner brackets
  ctx.lineWidth = 5;
  [[16, 16, 1, 1], [w - 16, 16, -1, 1], [16, h - 16, 1, -1], [w - 16, h - 16, -1, -1]].forEach(([x, y, dx, dy]) => {
    ctx.beginPath(); ctx.moveTo(x, y + dy * 22); ctx.lineTo(x, y); ctx.lineTo(x + dx * 22, y); ctx.stroke();
  });
  // Scan lines
  ctx.fillStyle = `rgba(${rgb},.07)`;
  for (let y = 10; y < h - 10; y += 6) ctx.fillRect(10, y, w - 20, 2);

  ctx.save();
  ctx.translate(w / 2, h / 2 - 16);
  ctx.strokeStyle = `rgb(${rgb})`;
  ctx.fillStyle = `rgb(${rgb})`;
  ctx.lineWidth = 6;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ICONS[icon](ctx);
  ctx.restore();

  ctx.fillStyle = `rgb(${rgb})`;
  ctx.font = '700 30px system-ui, -apple-system, Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, w / 2, h - 30);
}

const PANELS = [
  { icon: 'read', label: 'READ' },
  { icon: 'play', label: 'PLAY', blue: true },
  { icon: 'vr', label: 'STEP INSIDE' },
  { icon: 'ar', label: 'AR', blue: true },
  { icon: 'learn', label: 'LEARN' },
];

function radialSprite(size, inner, outer) {
  return canvasTexture(size, size, (ctx, w) => {
    const g = ctx.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, w);
  });
}

// ---------------------------------------------------------------------------
// Hologram beam shader: fades as it rises, with slow moving light streaks
// ---------------------------------------------------------------------------

const beamVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const beamFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uBase;
  uniform vec3 uTip;
  varying vec2 vUv;
  void main() {
    float h = vUv.y;
    float fade = pow(1.0 - h, 1.6) * smoothstep(0.0, 0.2, h);
    float streak = 0.55 + 0.45 * sin(vUv.x * 62.8318 + uTime * 1.3) * sin(vUv.x * 25.1327 - uTime * 0.7);
    float flicker = 0.92 + 0.08 * sin(uTime * 9.0 + h * 20.0);
    gl_FragColor = vec4(mix(uBase, uTip, h), fade * streak * flicker * 0.34);
  }
`;

// ---------------------------------------------------------------------------

export default function HoloBookScene({ onReady, onLost }) {
  const mount = useRef(null);
  const callbacks = useRef({ onReady, onLost });
  callbacks.current = { onReady, onLost };

  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      if (!renderer.getContext()) throw new Error('no context');
    } catch {
      return undefined; // No WebGL: the static line-art book stays on screen.
    }

    const small = window.matchMedia('(max-width: 1023px)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
    const lookAt = new THREE.Vector3(0, 1.15, 0);
    const viewDir = new THREE.Vector3(0, 0.27, 1).normalize();

    scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x0a1730, 1.4));
    const key = new THREE.DirectionalLight(0xfff1d6, 2.2);
    key.position.set(-3, 5, 4);
    scene.add(key);
    const pageLight = new THREE.PointLight(GOLD_LIGHT, 2.5, 6, 2);
    pageLight.position.set(0, 1, 0.3);
    scene.add(pageLight);

    const disposables = [];
    const track = (thing) => { disposables.push(thing); return thing; };

    // --- Book -------------------------------------------------------------
    const float = new THREE.Group();
    scene.add(float);

    const leftPage = track(canvasTexture(512, 704, (c, w, h) => drawPage(c, w, h, false)));
    const rightPage = track(canvasTexture(512, 704, (c, w, h) => drawPage(c, w, h, true)));
    const book = buildOpenBook({ leftPage, rightPage });
    book.rotation.x = 0.3; // tip the pages toward the viewer
    float.add(book);

    // --- Hologram ---------------------------------------------------------
    const holo = new THREE.Group();
    holo.position.y = 0.22;
    float.add(holo);

    const beamMat = track(new THREE.ShaderMaterial({
      vertexShader: beamVertex,
      fragmentShader: beamFragment,
      uniforms: {
        uTime: { value: 0 },
        uBase: { value: new THREE.Color(GOLD_LIGHT) },
        uTip: { value: new THREE.Color(HOLO_BLUE) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }));
    const beam = new THREE.Mesh(
      track(new THREE.CylinderGeometry(BEAM.top, BEAM.bottom, BEAM.height, 48, 1, true)),
      beamMat
    );
    beam.position.y = BEAM.height / 2;
    holo.add(beam);

    const rings = [0.05, 1.25, 2.35].map((y, i) => {
      const ring = new THREE.Mesh(
        track(new THREE.TorusGeometry(beamRadiusAt(y), i === 0 ? 0.022 : 0.012, 8, 96)),
        track(new THREE.MeshBasicMaterial({
          color: i === 1 ? HOLO_BLUE : GOLD_LIGHT,
          transparent: true,
          opacity: i === 0 ? 0.9 : 0.45,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }))
      );
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      holo.add(ring);
      return ring;
    });

    const panelGeo = track(new THREE.PlaneGeometry(1.05, 0.72));
    const panels = PANELS.map((p, i) => {
      const map = track(canvasTexture(256, 176, (c, w, h) => drawPanel(c, w, h, p)));
      const mat = track(new THREE.MeshBasicMaterial({
        map,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }));
      const mesh = new THREE.Mesh(panelGeo, mat);
      mesh.userData = { angle: (i / PANELS.length) * Math.PI * 2, height: 0.95 + (i % 3) * 0.62, phase: i * 1.7 };
      holo.add(mesh);
      return mesh;
    });

    // Rising sparks inside the beam
    const COUNT = small ? 90 : 170;
    const sparkPos = new Float32Array(COUNT * 3);
    const sparkSeed = Array.from({ length: COUNT }, () => ({
      a: Math.random() * Math.PI * 2,
      r: Math.sqrt(Math.random()) * 0.85,
      speed: 0.25 + Math.random() * 0.55,
      y: Math.random() * BEAM.height,
    }));
    const sparkGeo = track(new THREE.BufferGeometry());
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparks = new THREE.Points(sparkGeo, track(new THREE.PointsMaterial({
      size: 0.075,
      map: track(radialSprite(64, 'rgba(255,240,200,1)', 'rgba(242,210,122,0)')),
      color: GOLD_LIGHT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })));
    holo.add(sparks);

    // Glow on the "floor" under the floating book
    const floorGlow = new THREE.Mesh(
      track(new THREE.PlaneGeometry(6, 3.4)),
      track(new THREE.MeshBasicMaterial({
        map: track(radialSprite(128, 'rgba(217,165,58,.55)', 'rgba(217,165,58,0)')),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }))
    );
    floorGlow.rotation.x = -Math.PI / 2;
    floorGlow.position.y = -0.95;
    scene.add(floorGlow);

    // --- Layout -------------------------------------------------------------
    const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = width / height;
      const dist = Math.max(2.5 / tan, 2.7 / (tan * camera.aspect)) * 1.18;
      camera.position.copy(lookAt).addScaledVector(viewDir, dist);
      camera.lookAt(lookAt);
      camera.updateProjectionMatrix();
      if (!running) renderer.render(scene, camera);
    };

    // --- Motion -----------------------------------------------------------
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!small) window.addEventListener('pointermove', onPointer, { passive: true });

    const updateSparks = (dt) => {
      for (let i = 0; i < COUNT; i++) {
        const s = sparkSeed[i];
        s.y += s.speed * dt;
        if (s.y > BEAM.height) s.y = 0;
        const r = s.r * beamRadiusAt(s.y);
        sparkPos[i * 3] = Math.cos(s.a + s.y * 0.6) * r;
        sparkPos[i * 3 + 1] = s.y;
        sparkPos[i * 3 + 2] = Math.sin(s.a + s.y * 0.6) * r;
      }
      sparkGeo.attributes.position.needsUpdate = true;
    };

    const pose = (t, dt) => {
      float.position.y = Math.sin(t * 0.9) * 0.12;
      float.rotation.y = Math.sin(t * 0.25) * 0.32 + pointer.x * 0.25;
      float.rotation.x = pointer.y * 0.08;
      float.rotation.z = Math.sin(t * 0.6) * 0.02;
      floorGlow.scale.setScalar(1 - Math.sin(t * 0.9) * 0.06);
      floorGlow.material.opacity = 0.85 - Math.sin(t * 0.9) * 0.15;

      beamMat.uniforms.uTime.value = t;
      rings.forEach((ring, i) => {
        ring.rotation.z = t * (i % 2 ? -0.4 : 0.3);
        ring.material.opacity = (i === 0 ? 0.85 : 0.4) + Math.sin(t * 2 + i) * 0.1;
      });

      panels.forEach((panel) => {
        const { angle, height, phase } = panel.userData;
        const a = angle + t * 0.22;
        const r = beamRadiusAt(height) * 0.92;
        panel.position.set(Math.cos(a) * r, height + Math.sin(t * 0.8 + phase) * 0.08, Math.sin(a) * r);
        panel.quaternion.copy(camera.quaternion); // always face the viewer
        // Panels behind the beam dim so the ring reads as depth
        const front = (Math.sin(a) + 1) / 2;
        panel.material.opacity = (0.35 + front * 0.65) * (0.93 + 0.07 * Math.sin(t * 13 + phase));
      });
      updateSparks(dt);
    };

    // --- Render loop: runs only while the banner is on screen -------------
    let running = false;
    let frame = 0;
    let last = performance.now();
    let elapsed = 0;
    let visible = true;
    let readySent = false;

    const draw = () => {
      renderer.render(scene, camera);
      if (!readySent) {
        readySent = true;
        callbacks.current.onReady?.();
      }
    };

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      pose(elapsed, dt);
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduced.matches || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const still = () => {
      // Reduced motion: one composed frame, no movement.
      elapsed = 2.2;
      pose(elapsed, 0);
      updateSparks(0);
      draw();
    };
    const sync = () => {
      if (reduced.matches) { stop(); still(); } else start();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    }, { rootMargin: '80px' });
    io.observe(host);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener?.('change', sync);

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();
    updateSparks(0);
    sync();

    const onContextLost = (e) => {
      e.preventDefault();
      stop();
      callbacks.current.onLost?.();
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener?.('change', sync);
      window.removeEventListener('pointermove', onPointer);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      book.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      });
      disposables.forEach((d) => d.dispose?.());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mount} className="absolute inset-0" aria-hidden="true" />;
}
