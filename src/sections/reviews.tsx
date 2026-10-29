import { Star } from 'lucide-react';
import { BlankSlot } from '../components/ui/blank';
import { isBlank } from '../content/types';
import type { PageContent } from '../content/page';

/**
 * Real reviews, quoted from the client's Google Business Profile. Nothing here
 * is generated or summarised, and no rating reaches the structured data —
 * hard rule 8 keeps schema.org free of ratings and reviews.
 */
export function Reviews({ content }: { content: PageContent }) {
  const real = content.reviews.filter((r) => !isBlank(r));
  return (
    <section aria-labelledby="reviews-h" className="px-5 md:px-16 py-14 md:py-20">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
        <h2 id="reviews-h" className="h-display text-[clamp(2rem,6vw,3rem)] text-text">
          What drivers say
        </h2>
        <p className="label-mono">
          {real.length > 0 ? 'From Google reviews' : 'Waiting on the client'}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {content.reviews.map((r, i) =>
          isBlank(r) ? (
            <BlankSlot key={i} as="div" claim={r} className="min-h-32 p-6 rounded-card" />
          ) : (
            <figure
              key={i}
              className="gts-reveal flex flex-col gap-3 m-0 p-6 rounded-card border border-border bg-surface"
            >
              <div role="img" className="flex items-center gap-1" aria-label={`${r.value.stars} out of 5`}>
                {Array.from({ length: r.value.stars }, (_, n) => (
                  <Star key={n} aria-hidden="true" className="w-3.5 h-3.5 text-accent" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="m-0 text-text-muted text-[15px]">
                {r.value.excerpt ? `“${r.value.text}”` : r.value.text}
              </blockquote>
              <figcaption className="label-mono mt-auto pt-1 text-text">
                {r.value.name}
                <span className="text-text-muted"> · {r.value.when}</span>
              </figcaption>
            </figure>
          ),
        )}
      </div>
    </section>
  );
}
