import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { BOOKS } from '@/lib/booksData';
import { resolveBookCode } from '@/lib/experiences';
import '@/components/home/immersive.css';

export default function BookExperiences() {
  const initial = BOOKS.find(b => b.id === new URLSearchParams(location.search).get('book'));
  const [id, setId] = useState(initial?.id || BOOKS[0].id);
  const [qr, setQr] = useState('');
  const [message, setMessage] = useState(initial ? 'Book QR link opened.' : 'Choose a book to create a demo QR companion link.');
  const [scanning, setScanning] = useState(false);
  const [manual, setManual] = useState('');
  const video = useRef(null);
  const stream = useRef(null);
  const generation = useRef(0);
  const book = BOOKS.find(b => b.id === id);
  const url = new URL(location.href); url.search = ''; url.searchParams.set('book', id);
  const stop = () => { generation.current++; stream.current?.getTracks().forEach(t=>t.stop()); stream.current = null; setScanning(false); };
  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url.href, { width: 240, margin: 3, errorCorrectionLevel: 'M' }).then(data => { if (active) setQr(data); }).catch(()=>setMessage('QR generation failed. Use the companion link below.'));
    return () => { active = false; };
  }, [url.href]);
  useEffect(() => () => { generation.current++; stream.current?.getTracks().forEach(t=>t.stop()); }, []);
  useEffect(() => {
    const hide = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', hide);
    return () => document.removeEventListener('visibilitychange', hide);
  }, []);
  const accept = value => {
    const found = resolveBookCode(value, location.origin, location.pathname, BOOKS);
    if (!found) { setMessage('This is not a recognized PenGame companion QR. Scan a code generated on this page.'); return false; }
    setId(found.id); setMessage(`Opened companion for ${found.title}.`); stop(); return true;
  };
  const start = async () => {
    stop();
    const token = generation.current;
    try {
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) throw new Error('Camera scanning requires HTTPS and a compatible browser. Use your phone camera or paste the QR link.');
      if (!('BarcodeDetector' in window) || !(await window.BarcodeDetector.getSupportedFormats()).includes('qr_code')) throw new Error('This browser cannot decode QR codes here. Use your phone camera or paste the QR link.');
      const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
      const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      if (generation.current !== token) { media.getTracks().forEach(t=>t.stop()); return; }
      stream.current = media; setScanning(true); video.current.srcObject = media; await video.current.play();
      setMessage('Point the camera at a PenGame demo QR code.');
      const scan = async () => {
        if (generation.current !== token) return;
        try { const codes = await detector.detect(video.current); if (codes[0] && accept(codes[0].rawValue)) return; } catch { /* A frame may not be ready yet. */ }
        if (generation.current === token) setTimeout(scan, 350);
      };
      scan();
    } catch (error) { if (generation.current === token) { stop(); setMessage(error.message); } }
  };
  return <section className="pg-section"><span className="pg-eyebrow" style={{color:'#23685f'}}>FROM PRINT TO POSSIBILITY</span><h1 className="font-heading text-5xl my-5">Scan a code. Open a story.</h1><p>This working QR demo connects a printed code to a book companion. It does not recognize book covers. Codes are generated for this site’s current address; regenerate them at the final public address before printing.</p><div className="pg-scan"><label htmlFor="book-choice">Choose a book</label><select id="book-choice" value={id} onChange={e=>setId(e.target.value)}>{BOOKS.map(b=><option key={b.id} value={b.id}>{b.title}</option>)}</select><div className="pg-grid"><div>{qr && <img src={qr} alt={`Demo QR code for ${book.title}`} width="240" height="240" />}<a href={url.href}>Open companion link</a>{qr && <p><a href={qr} download={`pengame-${id}-qr.png`}>Download printable QR</a></p>}</div><article><h2 className="!text-2xl">{book.title}</h2><p>{book.description}</p><p className="my-4">{book.purchaseUrl ? <a href={book.purchaseUrl} target="_blank" rel="noopener noreferrer">View book / purchase ↗</a> : <span>Publication coming soon. Contact PenGame for updates.</span>}</p><p>Companion demo: read the synopsis, visit the book, and explore the <a href="https://storyscapexr.com" target="_blank" rel="noopener noreferrer">StoryScape XR platform</a>. Book-specific AR scenes and cover tracking are not included. Use the home page’s optional AR mode to view a floating book sculpture on supported devices.</p></article><div><button onClick={start} disabled={scanning}>Start QR camera</button><button onClick={stop} disabled={!scanning}>Stop camera</button><video ref={video} hidden={!scanning} muted playsInline aria-label="QR camera preview" /><label htmlFor="qr-link">Or paste a companion QR link</label><input id="qr-link" type="url" value={manual} onChange={e=>setManual(e.target.value)} /><button onClick={()=>accept(manual)}>Open pasted code</button></div></div><p role="status" className="mt-6">{message}</p><p className="text-sm mt-3">Camera access starts only when requested. Frames stay on your device; scanning stops when you leave this page or hide the tab.</p></div></section>;
}

