import { tierOf } from '@/lib/ageRatings';

// The PenGame age rating as a small badge: ALL AGES, 10+, 13+, 17+ or 18+.
// Uses <strong>/<em> so card styles for <span> and <b> don't restyle it.
export default function RatingBadge({ game, className = '' }) {
  const tier = tierOf(game);
  if (!tier) return null;
  return <strong className={`pg-rating pg-rating-${tier.min} ${className}`} title={`${tier.name}. ${tier.summary}`}>
    <em className="sr-only">Rated </em>{tier.label}
  </strong>;
}
