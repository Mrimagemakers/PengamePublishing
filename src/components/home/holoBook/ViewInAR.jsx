import React, { useEffect, useState } from 'react';

const MODEL = 'ar/holo-book';
const TITLE = 'PenGame holographic book';

// iPhone/iPad: Safari's AR Quick Look opens the .usdz model.
// Android: Google's Scene Viewer opens the .glb model (3D view if AR isn't available).
// Everywhere else the link isn't shown.
function detectAR() {
  if (typeof window === 'undefined') return null;
  try {
    if (document.createElement('a').relList?.supports?.('ar')) return 'ios';
  } catch {
    /* ignore */
  }
  if (/android/i.test(navigator.userAgent)) return 'android';
  return null;
}

function sceneViewerUrl() {
  const file = new URL(`${MODEL}.glb`, `${window.location.origin}/`).href;
  const fallback = window.location.href;
  return (
    `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(file)}` +
    `&mode=ar_preferred&title=${encodeURIComponent(TITLE)}` +
    '#Intent;scheme=https;package=com.google.android.googlequicksearchbox;' +
    `action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(fallback)};end;`
  );
}

export default function ViewInAR() {
  const [platform, setPlatform] = useState(null);
  useEffect(() => setPlatform(detectAR()), []);

  if (platform === 'ios') {
    // Quick Look needs the link's only child to be an image, so the pill is an SVG.
    return (
      <a
        rel="ar"
        href={`/${MODEL}.usdz`}
        aria-label="View the book in AR"
        className="inline-block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2D27A]"
      >
        <img src="/ar/view-in-ar.svg" alt="View the book in AR" width="212" height="44" />
      </a>
    );
  }

  if (platform === 'android') {
    return (
      <a
        href={sceneViewerUrl()}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-[#F2D27A]/60 px-5 text-sm font-semibold text-[#F2D27A] transition-colors hover:bg-[#F2D27A]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F2D27A]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z M3.5 7 12 11.5 20.5 7 M12 11.5v10" />
        </svg>
        View the book in AR
      </a>
    );
  }

  return null;
}
