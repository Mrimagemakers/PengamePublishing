import React, { Component, Suspense, lazy, useEffect, useState } from 'react';

// Three.js loads in its own chunk after the headline has painted.
const HoloBookScene = lazy(() => import('./HoloBookScene'));

// If the 3D chunk fails to load or throws, keep the static book and carry on.
class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function canUseWebGL() {
  try {
    if (navigator.connection?.saveData) return false; // respect Data Saver
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    gl?.getExtension('WEBGL_lose_context')?.loseContext(); // free the test context
    return Boolean(gl);
  } catch {
    return false;
  }
}

// The original gold line-art book: shown before the 3D scene is ready, and
// instead of it when WebGL is unavailable.
function StaticBook() {
  return (
    <svg viewBox="-200 -90 400 140" className="h-auto w-[min(78%,420px)]" aria-hidden="true">
      <g fill="none" stroke="#F2D27A" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M0 40 C-50 10 -130 10 -190 30 V-60 C-130 -80 -50 -80 0 -40 C50 -80 130 -80 190 -60 V30 C130 10 50 10 0 40 Z" fill="#0A1730" />
        <path d="M0 -40 V40" />
        <path d="M-160 -40 C-110 -55 -50 -50 -20 -28 M-160 -15 C-110 -30 -50 -25 -20 -5 M20 -28 C50 -50 110 -55 160 -40 M20 -5 C50 -25 110 -30 160 -15" strokeOpacity=".45" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export default function HoloBookStage({ className = '' }) {
  const [webgl, setWebgl] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setWebgl(canUseWebGL());
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <div
        className={`hero-book absolute inset-x-0 bottom-[12%] flex justify-center transition-opacity duration-700 ${live ? 'opacity-0' : ''}`}
      >
        <StaticBook />
      </div>
      {webgl && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <div className={`absolute inset-0 transition-opacity duration-1000 ${live ? 'opacity-100' : 'opacity-0'}`}>
              <HoloBookScene onReady={() => setLive(true)} onLost={() => setLive(false)} />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
