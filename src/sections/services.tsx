import { Icon } from '../components/ui/icon';
import { BlankPhoto } from '../components/ui/blank';
import { Text } from '../components/ui/claim';
import { cn } from '../lib/cn';
import type { PageContent, Service } from '../content/page';

function Tile({ s, large }: { s: Service; large: boolean }) {
  return (
    <article
      className={cn(
        'gts-reveal flex flex-col gap-4 p-6 rounded-card border border-border bg-surface',
        large && 'md:col-span-2 md:flex-row md:items-start md:gap-8',
      )}
    >
      <div className="flex-1">
        <Icon name={s.icon} className="w-6 h-6 text-accent mb-4" />
        <h3 className="h-display text-2xl text-text mb-2">
          <Text claim={s.title} />
        </h3>
        <p className="text-text-muted mb-4">
          <Text claim={s.benefit} />
        </p>
        <ul className="list-none p-0 flex flex-col gap-2">
          {s.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-text">
              <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 shrink-0 bg-accent" />
              <Text claim={it} />
            </li>
          ))}
        </ul>
      </div>
      {large && <BlankPhoto claim={s.photo} className="md:w-2/5 aspect-[4/3] shrink-0" />}
    </article>
  );
}

export function Services({ content }: { content: PageContent }) {
  return (
    <section id="services" className="px-5 md:px-16 py-14 md:py-20 scroll-mt-16">
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <h2 className="h-display text-[clamp(2rem,6vw,3.25rem)] text-text">
          <Text claim={content.servicesTitle} />
        </h2>
        <p className="label-mono">
          <Text claim={content.specRow} />
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {content.services.map((s, i) => (
          <Tile key={i} s={s} large={s.large === true} />
        ))}
      </div>
    </section>
  );
}
