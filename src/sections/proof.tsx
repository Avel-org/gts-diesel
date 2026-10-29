import { isBlank } from '../content/types';
import { BlankSlot } from '../components/ui/blank';
import type { PageContent } from '../content/page';

export function ProofGrid({ content }: { content: PageContent }) {
  return (
    <section aria-labelledby="proof-h" className="px-5 md:px-16 py-12 border-y border-border">
      <h2 id="proof-h" className="sr-only">
        By the numbers
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
