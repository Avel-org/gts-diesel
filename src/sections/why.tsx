import { isBlank } from '../content/types';
import { BlankSlot } from '../components/ui/blank';
import type { PageContent } from '../content/page';

/**
 * "Why GTS" — the proof grid from the design handoff. The old site's /referral
 * path redirects to #why, so the id is load-bearing.
 */
export function WhyGts({ content }: { content: PageContent }) {
  return (
    <section id="why" aria-labelledby="why-h" className="px-5 md:px-16 py-12 border-y border-border scroll-mt-16">
      <h2 id="why-h" className="sr-only">
        Why GTS
      </h2>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 m-0">
        {content.stats.map((st, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <dt className="label-mono order-2">{st.label}</dt>
            <dd className="order-1 m-0 font-mono text-4xl md:text-5xl font-semibold text-accent leading-none">
              {isBlank(st.value) ? <BlankSlot claim={st.value} /> : st.value.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
