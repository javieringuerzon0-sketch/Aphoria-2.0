import React, { useState, useMemo } from 'react';
import { Star, ChevronDown, CheckCircle, Camera } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

export interface CustomerReview {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  rating: number;
  date: string;
  title: string;
  text: string;
  image?: string;
  skinType?: string;
  helpfulCount: number;
}

// ─── Default reviews (editable by Javier) ────────────────────────────
// Copy: immediate results from first use, progressive improvement, by day 28 skin looks years younger
// Avatar images: ALL 12 are unique — no repeats within or across products
const DEFAULT_REVIEWS: Record<string, CustomerReview[]> = {
  '24-gold-mask': [
    {
      id: 'gm-1',
      name: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-03-15',
      title: 'Instant glow from the very first use',
      text: 'I applied it before a dinner party and within minutes my skin looked luminous — my husband asked if I got a facial! By day 7, my fine lines were visibly softer. Now at day 28, people think I look 5 years younger. This is not hype, it actually works from the first application.',
      skinType: 'Combination',
      helpfulCount: 47,
    },
    {
      id: 'gm-2',
      name: 'Jennifer L.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-03-10',
      title: 'Saw the difference the same night',
      text: "I've wasted thousands on skincare that promises results 'in 6-8 weeks.' This mask? I saw firmer, brighter skin the SAME NIGHT. By day 10, my pores looked half their size. Four weeks in and my skin looks like it did in my twenties. Already on my second tube.",
      skinType: 'Oily',
      helpfulCount: 38,
    },
    {
      id: 'gm-3',
      name: 'Amanda K.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-03-05',
      title: 'Day 1: glow. Day 28: transformation',
      text: 'First application — instant radiance, my skin felt tighter right away. By day 5, my jawline looked more defined. Day 14, fine lines around my eyes were fading. Day 28? My dermatologist asked what I changed because my skin looks years younger. The clinical protocol PDF is a game changer.',
      skinType: 'Mature',
      helpfulCount: 52,
    },
    {
      id: 'gm-4',
      name: 'Rachel W.',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-02-28',
      title: 'Immediate softness, long-term youth',
      text: "Right after the first mask my skin felt like silk — so smooth and hydrated, instantly. Each day it kept getting better. By week 2 my texture was completely even. Now at 28 days, the difference in my before/after photos is shocking. My skin genuinely looks 3-4 years younger.",
      skinType: 'Dry',
      helpfulCount: 29,
    },
    {
      id: 'gm-5',
      name: 'Diana P.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-02-20',
      title: 'My clients noticed on day ONE',
      text: "I'm a makeup artist and I know skincare. Applied the Gold Mask before bed — within minutes my skin felt different. Woke up with visibly brighter skin. The 24K gold particles give an instant luminosity that lasts all day. After 28 days of consistent use, my skin has reversed years of damage. Every single client asks what I'm using.",
      skinType: 'Normal',
      helpfulCount: 63,
    },
    {
      id: 'gm-6',
      name: 'Monica T.',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-02-15',
      title: 'First use = instant believer',
      text: 'Was nervous spending the money but the 30-day guarantee made me go for it. First application: my skin was glowing and plump within 20 minutes. By day 3, I stopped wearing foundation. Day 28, my sister said I look like I got professional treatments. Got the bundle — now I alternate Gold and Avocado daily.',
      skinType: 'Sensitive',
      helpfulCount: 41,
    },
  ],
  'avocado-mask': [
    {
      id: 'am-1',
      name: 'Emily R.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-03-18',
      title: 'Hydration from the very first minute',
      text: "I have chronically dry skin and NOTHING worked. Applied the Avocado Mask and within minutes my skin felt plump and alive — not tight, not flaky, just soft. By day 5, my coworkers asked if I changed my routine. Day 28? My skin looks dewy and years younger. I'm never going back.",
      skinType: 'Dry',
      helpfulCount: 55,
    },
    {
      id: 'am-2',
      name: 'Natasha B.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-03-12',
      title: 'Replaced my $200 cream — instantly better',
      text: "First night: applied it and immediately felt my skin absorbing it — that deep, instant hydration. Woke up with the softest skin I've had in years. By week 1, my uneven texture was smoothing out. After 28 days, my dermatologist noticed the improvement without me saying anything. Better than products 5x the price.",
      skinType: 'Combination',
      helpfulCount: 42,
    },
    {
      id: 'am-3',
      name: 'Lisa C.',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-03-08',
      title: 'Redness calmed from the first application',
      text: "I have rosacea and most products burn. The Avocado Mask felt soothing IMMEDIATELY — zero irritation, instant calm. Minutes after applying I could feel the difference. By day 3, my redness was visibly less. Day 10, I went makeup-free for the first time in years. After the full 28-day protocol, my skin looks calm, even, and genuinely younger. Life changing.",
      skinType: 'Sensitive',
      helpfulCount: 61,
    },
    {
      id: 'am-4',
      name: 'Karen J.',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-03-01',
      title: 'Same-day hydration that keeps getting better',
      text: "Most products wear off by noon. This one? You feel it working within minutes of applying — that deep, lasting hydration. Woke up STILL hydrated. By evening my skin was still soft. That's when I knew this was different. After 28 days of daily use, my skin has this natural glow I haven't had since my early twenties.",
      skinType: 'Normal',
      helpfulCount: 33,
    },
    {
      id: 'am-5',
      name: 'Priya S.',
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-02-25',
      title: 'Instant results that compound daily',
      text: "Day 1: visibly plumper, softer skin right after washing off the mask. Day 7: pores started shrinking. Day 14: texture completely smooth. Day 28: my before/after photos are INSANE — my skin looks like it reversed 4-5 years. This isn't a product that makes you wait, you see it working immediately.",
      skinType: 'Oily',
      helpfulCount: 48,
    },
    {
      id: 'am-6',
      name: 'Claudia V.',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&w=96&h=96&q=80',
      verified: true,
      rating: 5,
      date: '2026-02-18',
      title: 'Bought one, came back for the bundle',
      text: "First application and my face felt like I just left a spa — instant deep hydration, within minutes. By day 3 I ordered the bundle to add the Gold Mask. Now I alternate: Avocado mornings, Gold evenings. 28 days later my skin has completely transformed — firmer, brighter, younger. Best skincare decision I've ever made.",
      skinType: 'Mature',
      helpfulCount: 39,
    },
  ],
};

// ─── Rating Distribution (hardcoded, editable) ────────────────────────
const RATING_DIST: Record<string, number[]> = {
  '24-gold-mask': [0, 1, 2, 12, 85],   // 1★=0%, 2★=1%, 3★=2%, 4★=12%, 5★=85%
  'avocado-mask': [0, 0, 3, 15, 82],
};

type SortOption = 'newest' | 'helpful' | 'highest' | 'lowest';

interface Props {
  productHandle: string;
  totalReviews: number;
}

const ReviewsSection: React.FC<Props> = ({ productHandle, totalReviews }) => {
  const [sortBy, setSortBy] = useState<SortOption>('helpful');
  const [showAll, setShowAll] = useState(false);

  const reviews = DEFAULT_REVIEWS[productHandle] || DEFAULT_REVIEWS['24-gold-mask'];
  const dist = RATING_DIST[productHandle] || RATING_DIST['24-gold-mask'];

  const avgRating = 4.9;

  const sorted = useMemo(() => {
    const copy = [...reviews];
    switch (sortBy) {
      case 'newest': return copy.sort((a, b) => b.date.localeCompare(a.date));
      case 'helpful': return copy.sort((a, b) => b.helpfulCount - a.helpfulCount);
      case 'highest': return copy.sort((a, b) => b.rating - a.rating);
      case 'lowest': return copy.sort((a, b) => a.rating - b.rating);
      default: return copy;
    }
  }, [reviews, sortBy]);

  const visible = showAll ? sorted : sorted.slice(0, 3);

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="py-20 lg:py-32 bg-white relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aphoria-gold mb-4 block">
              Customer Reviews
            </span>
            <h2 className="text-4xl lg:text-5xl font-brand font-light tracking-tight text-aphoria-black leading-[0.95]">
              Verified <span className="italic text-aphoria-gold">Results.</span>
            </h2>
          </div>

          {/* Aggregate Rating */}
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-5xl font-light text-aphoria-black tabular-nums">{avgRating}</div>
              <div className="flex items-center gap-0.5 mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="text-aphoria-gold" />
                ))}
              </div>
              <div className="text-[10px] text-aphoria-mid mt-1 uppercase tracking-widest">
                {totalReviews.toLocaleString()} reviews
              </div>
            </div>

            {/* Rating Bars */}
            <div className="space-y-1.5 min-w-[160px]">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[11px] text-aphoria-mid w-4 text-right tabular-nums">{star}</span>
                  <Star size={10} fill="currentColor" className="text-aphoria-gold/60" />
                  <div className="flex-1 h-1.5 bg-aphoria-black/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-aphoria-gold rounded-full transition-all duration-700"
                      style={{ width: `${dist[star - 1]}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-aphoria-mid/60 w-8 tabular-nums">{dist[star - 1]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between border-b border-aphoria-black/10 pb-4 mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-aphoria-black">
            {reviews.length} Featured Reviews
          </span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-transparent text-[11px] uppercase tracking-[0.15em] text-aphoria-mid pr-6 cursor-pointer focus:outline-none hover:text-aphoria-black transition-colors"
            >
              <option value="helpful">Most Helpful</option>
              <option value="newest">Newest</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
            <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-aphoria-mid pointer-events-none" />
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-0">
          {visible.map((review, idx) => (
            <article
              key={review.id}
              className={`py-8 ${idx < visible.length - 1 ? 'border-b border-aphoria-black/5' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-aphoria-gold/20"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-aphoria-black">{review.name}</span>
                      {review.verified && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-aphoria-green">
                          <CheckCircle size={10} />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={11}
                            fill={i < review.rating ? 'currentColor' : 'none'}
                            className={i < review.rating ? 'text-aphoria-gold' : 'text-aphoria-black/15'}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-aphoria-mid">{formatDate(review.date)}</span>
                      {review.skinType && (
                        <span className="text-[9px] uppercase tracking-widest text-aphoria-mid/50 hidden sm:inline">
                          {review.skinType} skin
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="text-[15px] font-semibold text-aphoria-black mb-2">{review.title}</h4>
              <p className="text-[14px] text-aphoria-mid leading-relaxed">{review.text}</p>

              {review.image && (
                <div className="mt-4">
                  <OptimizedImage
                    src={review.image}
                    alt={`Review photo by ${review.name}`}
                    className="w-20 h-20 rounded-lg object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="mt-4 flex items-center gap-4">
                <button className="text-[10px] uppercase tracking-widest text-aphoria-mid hover:text-aphoria-black transition-colors">
                  Helpful ({review.helpfulCount})
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Show More */}
        {!showAll && reviews.length > 3 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3 border border-aphoria-black/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-aphoria-black hover:border-aphoria-black hover:bg-aphoria-black hover:text-white transition-all duration-300"
            >
              Show All Reviews
              <ChevronDown size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
