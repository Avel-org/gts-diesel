import { BlankSlot } from '../components/ui/blank';
import type { PageContent } from '../content/page';

/**
 * Design rule 05: reviews and star ratings stay blank until Mathew supplies
 * them. Nothing here is ever generated, and no rating reaches the schema.
 */
export function Reviews({ content }: { content: PageContent }) {
  return (
    <section aria-labelledby="reviews-h" className="px-5 md:px-16 py-14 md:py-20">
      <h2 id="reviews-h" className="h-display text-[clamp(2rem,6vw,3rem)] text-text mb-3">
        What drivers say
      </h2>
      <p className="label-mono mb-8">Waiting on the client</p>
      <div className="grid gap-4 md:grid-cols-3">
        {content.reviews.map((r, i) => (
          <BlankSlot key={i} as="div" claim={r} className="min-h-32 p-6 rounded-card" />
        ))}
      </div>
    </section>
  );
}
