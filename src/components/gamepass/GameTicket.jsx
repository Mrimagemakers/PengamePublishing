import { useRef, useState } from 'react';
import './gameTicket.css';

// The Games Pass ticket in the Games Pass hero.
// Tap or click: one full spin (shows the printed back on the way round).
// Mouse over (desktop): the ticket tilts toward the pointer and the foil catches the light.
// Reduced motion: tapping flips straight between front and back, no spin or tilt.
export default function GameTicket({ worlds }) {
  const [turns, setTurns] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const card = useRef(null);
  const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const spin = () => setTurns(t => t + (reduced() ? 0.5 : 1));
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reduced()) return;
    const r = card.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 14, y: px * 18 });
    card.current.style.setProperty('--glare-x', `${(px + 0.5) * 100}%`);
    card.current.style.setProperty('--glare-y', `${(py + 0.5) * 100}%`);
  };
  const showingBack = Math.round(turns * 2) % 2 === 1;

  return (
    <div className="gt-float">
      <button
        ref={card}
        type="button"
        className="gt"
        onClick={spin}
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        aria-label={`Games Pass ticket, all-access to ${worlds} worlds. Tap to spin it.`}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${turns * 360 + tilt.y}deg)` }}
      >
        <span className="gt-face gt-front" aria-hidden={showingBack}>
          <span className="gt-top">
            <span className="gt-brand"><i />PenGame Publishing</span>
            <span className="gt-admit">Admit one</span>
          </span>
          <span className="gt-title">Games<br />Pass</span>
          <span className="gt-sub">All-access · {worlds} worlds</span>
          <span className="gt-holo" aria-hidden="true"><span>PG</span></span>
          <span className="gt-tags">AR · VR · Browser</span>
          <span className="gt-perf" aria-hidden="true" />
          <span className="gt-stub">
            <span className="gt-serial"><small>Serial</small>PG-2026-0{String(worlds).padStart(2, '0')}7</span>
            <span className="gt-barcode" aria-hidden="true" />
          </span>
          <span className="gt-glare" aria-hidden="true" />
        </span>

        <span className="gt-face gt-back" aria-hidden={!showingBack}>
          <span className="gt-back-mark">PG</span>
          <span className="gt-back-title">Your all-access adventure</span>
          <span className="gt-terms">
            Good for every Games Pass world in your browser, VR headset, or phone AR, plus new worlds as they launch.
            Monthly or yearly. Cancel anytime.
          </span>
          <span className="gt-back-site">pengamepublishing.com</span>
          <span className="gt-perf" aria-hidden="true" />
          <span className="gt-stub gt-back-stub">
            <span className="gt-qr" aria-hidden="true" />
            <span className="gt-serial"><small>Keep this stub</small>Valid 2026</span>
          </span>
          <span className="gt-glare" aria-hidden="true" />
        </span>
      </button>
      <span className="gt-hint" aria-hidden="true">Tap to spin</span>
    </div>
  );
}
