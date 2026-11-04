import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function BookWorld() {
  const host = useRef(null);
  const api = useRef(null);
  const [status, setStatus] = useState('Drag to orbit. Scroll to zoom.');
  const [supported, setSupported] = useState({});
  const [paused, setPaused] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const pauseRef = useRef(paused);
  useEffect(() => { pauseRef.current = paused; }, [paused]);
  useEffect(() => {
    let renderer, controls, observer, session;
    let disposed = false, visible = true;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, .1, 100);
    camera.position.set(0, 1, 7);
    const group = new THREE.Group();
    scene.add(group);
    const resources = [];
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      renderer.xr.enabled = true;
      host.current.appendChild(renderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false; controls.minDistance = 3; controls.maxDistance = 10;
      scene.add(new THREE.HemisphereLight(0xffffff, 0x283053, 3));
      const light = new THREE.DirectionalLight(0xffffff, 4); light.position.set(3, 5, 4); scene.add(light);
      const loader = new THREE.TextureLoader();
      const covers = ['changing-the-channel.jpg', 'nia-deluxe.jpg', 'leo.jpg'];
      [0xe5b84b, 0x52c7bb, 0x9d88ed].forEach((color, i) => {
        const book = new THREE.Group();
        const width = i === 1 ? 1.65 : 1.2;
        const cover = new THREE.BoxGeometry(width, 1.7, .3);
        const material = new THREE.MeshStandardMaterial({ color, roughness: .35, metalness: .2 });
        const texture = loader.load(`${import.meta.env.BASE_URL}covers/${covers[i]}`, () => {
          if (disposed) texture.dispose();
        }, undefined, () => { if (!disposed) setStatus('Some cover textures could not load. Book links and the catalog remain available.'); });
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        const front = new THREE.MeshStandardMaterial({ map: texture, roughness: .72 });
        const pages = new THREE.BoxGeometry(width - .07, 1.57, .24);
        const paper = new THREE.MeshStandardMaterial({ color: 0xfff4df });
        resources.push(cover, material, pages, paper, front, texture);
        book.add(new THREE.Mesh(cover, [material, material, material, material, front, material]));
        const pageMesh = new THREE.Mesh(pages, paper); pageMesh.position.x = .055; book.add(pageMesh);
        book.position.set((i - 1) * 1.55, i === 1 ? .35 : -.25, 0);
        book.rotation.set(.12, -.35 + i * .18, (i - 1) * -.15); group.add(book);
      });
      const resize = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix();
      });
      resize.observe(host.current); resources.push({ dispose: () => resize.disconnect() });
      observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); observer.observe(host.current);
      renderer.setAnimationLoop((time) => {
        if (!renderer.xr.isPresenting && (!visible || document.hidden)) return;
        if (!pauseRef.current) group.rotation.y = Math.sin(time * .00025) * .25;
        controls.update(); renderer.render(scene, camera);
      });
      api.current = async (mode) => {
        try {
          session = await navigator.xr.requestSession(mode, mode === 'immersive-ar' ? { optionalFeatures: ['local-floor'] } : {});
          if (disposed) { await session.end(); return; }
          group.position.set(0, 1.2, -3); group.scale.setScalar(.6);
          session.addEventListener('end', () => { group.position.set(0, 0, 0); group.scale.setScalar(1); setStatus('XR session ended.'); });
          await renderer.xr.setSession(session);
          setStatus('XR active. Use your device controls to exit. AR displays a floating book sculpture; it does not track a cover.');
        } catch (error) { setStatus(`XR could not start: ${error.message}`); }
      };
      if (window.isSecureContext && navigator.xr) Promise.all(['immersive-vr', 'immersive-ar'].map(async mode => [mode, await navigator.xr.isSessionSupported(mode).catch(() => false)])).then(entries => { if (!disposed) setSupported(Object.fromEntries(entries)); });
    } catch { setStatus('3D is unavailable on this device. Explore the books and games using the links on this page.'); }
    return () => { disposed = true; api.current = null; session?.end().catch(() => {}); observer?.disconnect(); controls?.dispose(); renderer?.setAnimationLoop(null); resources.forEach(r => r.dispose()); renderer?.dispose(); renderer?.domElement.remove(); };
  }, []);
  return <><div ref={host} className="pg-canvas" aria-label="Interactive sculpture of three floating books" /><div className="pg-xr-controls"><button onClick={() => setPaused(!paused)}>{paused ? 'Resume motion' : 'Pause motion'}</button>{Object.entries(supported).filter(([, yes]) => yes).map(([mode]) => <button key={mode} onClick={() => api.current?.(mode)}>Enter {mode === 'immersive-ar' ? 'AR' : 'VR'}</button>)}</div><p role="status" className="pg-world-note">{status} {!Object.values(supported).some(Boolean) && 'XR requires a compatible device and browser over HTTPS.'}</p></>;
}
