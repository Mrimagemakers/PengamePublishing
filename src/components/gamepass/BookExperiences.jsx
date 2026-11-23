import { Link } from 'react-router-dom';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { BOOKS } from '@/lib/booksData';

export default function BookExperiences({ member = false }) {
  const books = BOOKS.filter(book => book.experienceUrl);
  return <section className="gp-section" id="books" aria-labelledby="pass-books-title">
    <div className="gp-heading"><div><p className="gp-eyebrow">BOOKS · INCLUDED IN GAME PASS</p>
      <h2 id="pass-books-title">Stories beyond the page.</h2>
      <p>Explore the AR/VR companions to these PenGame Publishing books. Printed books are sold separately.</p>
    </div></div>
    <div className="gp-grid">{books.map(book => <article className="gp-card" id={`book-${book.id}`} key={book.id} style={{ scrollMarginTop: '6rem' }}>
      <div className="gp-art"><img src={book.image} alt={book.title} loading="lazy" style={{ objectFit: 'contain' }} /><span>BOOKS · AR/VR</span></div>
      <div className="gp-card-body"><h3>{book.title}</h3><p>{book.description}</p>
        <p className="gp-card-meta">Interactive book · Browser · AR/VR on supported devices</p>
        <p className="gp-card-meta">{book.digitalPrice} one-time digital purchase · Also included in Game Pass</p>
        {book.digitalCheckoutUrl ? <a className="gp-card-link" href={book.digitalCheckoutUrl} rel="noopener">Buy digital access, {book.digitalPrice} <ArrowUpRight size={16} aria-hidden="true" /></a> : <p className="gp-small">Individual checkout coming soon.</p>}
        {member
          ? <a className="gp-card-link" href={book.experienceUrl}>Open AR/VR book <ArrowUpRight size={16} aria-hidden="true" /></a>
          : <><a className="gp-card-link" href="#membership">Get Game Pass <ArrowUpRight size={16} aria-hidden="true" /></a>
            <Link className="gp-card-link gp-quiet" to={`/game-pass/library#book-${book.id}`}>Already joined? Open in member library</Link></>}
        <Link className="gp-card-link gp-quiet" to="/publications"><BookOpen size={16} aria-hidden="true" /> Browse Books</Link>
      </div>
    </article>)}</div>
  </section>;
}
