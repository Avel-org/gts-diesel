import { Text } from '../components/ui/claim';
import type { PageContent } from '../content/page';

export function HowItWorks({ content }: { content: PageContent }) {
  return (
    <section aria-labelledby="how-h" className="px-5 md:px-16 py-14 md:py-20 bg-surface">
      <h2 id="how-h" className="h-display text-[clamp(2rem,6vw,3.25rem)] text-text mb-10">
        <Text claim={content.howTitle} />
      </h2>
      <ol className="grid gap-6 md:grid-cols-3 list-none p-0 m-0">
        {content.steps.map((st) => (
          <li key={st.n} className="gts-reveal flex flex-col gap-3">
            <span className="font-mono text-5xl font-semibold text-accent leading-none">{st.n}</span>
            <span className="label-mono">
              <Text claim={st.meta} />
            </span>
            <h3 className="h-display text-2xl text-text">
              <Text claim={st.title} />
            </h3>
            <p className="text-text-muted">
              <Text claim={st.body} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
