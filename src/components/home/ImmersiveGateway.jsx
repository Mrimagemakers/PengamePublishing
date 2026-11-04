import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import './immersive.css';
const BookWorld = lazy(() => import('./BookWorld'));

export default function ImmersiveGateway() {
  const [enabled, setEnabled] = useState(false);
  return <section className="pg-gateway">
    <div className="pg-orbit" aria-hidden="true" />
    <div className="pg-intro"><span className="pg-eyebrow">PENGAME / BEYOND THE PAGE</span>
      <h1>Every story.<br />A new <em>dimension.</em></h1>
      <p>Open a book. Discover a world. Explore stories, creative learning, and playable adventures from the PenGame universe.</p>
      <a className="pg-new-edition" href="https://www.amazon.com/dp/B0HKG8PCQC" target="_blank" rel="noopener noreferrer">JUST ARRIVED <strong>Nia and the Number Garden: Deluxe Edition ↗</strong></a>
      <div className="pg-actions"><Link to="/publications">Explore the books ↗</Link><Link to="/games" className="pg-outline">Enter the games portal →</Link></div>
      <div className="pg-caption">READ · EXPLORE · PLAY · GROW</div>
    </div>
    <div className="pg-world">
      {enabled ? <Suspense fallback={<p>Opening the story world…</p>}><BookWorld /></Suspense> : <div className="pg-cover-gallery" aria-label="Featured PenGame book covers"><img className="pg-cover-side" src={`${import.meta.env.BASE_URL}covers/changing-the-channel.jpg`} alt="Changing the Channel by Darnell E. Clark" /><img className="pg-cover-main" src={`${import.meta.env.BASE_URL}covers/nia-deluxe.jpg`} alt="Nia and the Number Garden: Deluxe Edition by Darnell Clark" /><img className="pg-cover-side" src={`${import.meta.env.BASE_URL}covers/leo.jpg`} alt="Leo the Lost Language Lion" /></div>}
      <button className="pg-toggle" onClick={() => setEnabled(!enabled)}>{enabled ? 'Close 3D experience' : 'Enable interactive 3D / XR'}</button>
      <p className="pg-world-note">Optional 3D. All books and experiences are available through regular links.</p>
    </div>
  </section>;
}
