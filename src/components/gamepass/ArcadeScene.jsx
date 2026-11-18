import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ArcadeScene() {
  const mount = useRef(null);
  useEffect(() => {
    const host = mount.current;
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 13);
    scene.add(new THREE.AmbientLight(0xffffff, 2));
    const light = new THREE.PointLight(0x49ffde, 90); light.position.set(3, 3, 5); scene.add(light);
    const shapes = [new THREE.TorusGeometry(1, .23, 16, 60), new THREE.IcosahedronGeometry(.8, 0), new THREE.BoxGeometry(1, 1, 1)];
    const colors = [0xffca66, 0x60ffe3, 0xa58aff];
    const objects = Array.from({ length: 11 }, (_, i) => {
      const mesh = new THREE.Mesh(shapes[i % 3], new THREE.MeshStandardMaterial({ color: colors[i % 3], metalness: .7, roughness: .25 }));
      mesh.position.set((i % 4 - 1.5) * 2.9, (Math.floor(i / 4) - 1) * 2.7, -i % 3);
      mesh.rotation.set(i * .4, i, .3); scene.add(mesh); return mesh;
    });
    const resize = () => { const { width, height } = host.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); };
    const observer = new ResizeObserver(resize); observer.observe(host); resize();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    const render = (time = 0) => {
      objects.forEach((mesh, i) => { mesh.rotation.y = i + time * .00018; mesh.position.y = (Math.floor(i / 4) - 1) * 2.7 + Math.sin(time * .0006 + i) * .25; });
      renderer.render(scene, camera);
      if (!reduced.matches) frame = requestAnimationFrame(render);
    };
    render();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); shapes.forEach(g => g.dispose()); objects.forEach(m => m.material.dispose()); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div ref={mount} className="gp-scene" aria-hidden="true" />;
}
