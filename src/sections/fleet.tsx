import { ButtonLink } from '../components/ui/button';
import { PhotoFrame } from '../components/ui/photo';
import { Text } from '../components/ui/claim';
import { callFor } from '../lib/call';
import type { PageContent } from '../content/page';

export function Fleet({ content }: { content: PageContent }) {
  const call = callFor(content);
  const fleet = content.services.find((s) => s.icon === 'users') ?? content.services[0];
  return (
    <section id="fleet" className="px-5 md:px-16 py-14 md:py-20 scroll-mt-16 md:scroll-mt-20">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <PhotoFrame
          claim={content.fleetPhoto}
          // Half of the row, after 2×64px padding and a 32px gap.
          sizes={(max) => `(min-width: 768px) min(${max}px, calc((100vw - 160px) / 2)), calc(100vw - 40px)`}
        />
        <div>
          <p className="label-mono mb-4">Fleet accounts</p>
          <h2 className="h-display text-[clamp(2rem,6vw,3rem)] text-text mb-4">
            {fleet ? <Text claim={fleet.title} /> : 'Fleet services'}
          </h2>
          {fleet && (
            <ul className="list-none p-0 flex flex-col gap-2 mb-6">
              {fleet.items.map((it, i) => (
                <li key={i} className="flex gap-2.5 text-text">
                  <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 shrink-0 bg-accent" />
                  <Text claim={it} />
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-3">
            <a href="#quote" className="gts-arrowlink no-underline text-text font-semibold">
              {content.ghostLabel} →
            </a>
            {call && (
              <ButtonLink href={call.href} variant="outline" data-call="fleet">
                Call about fleet · {call.display}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
