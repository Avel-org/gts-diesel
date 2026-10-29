import { BlankSlot } from '../components/ui/blank';
import { PhotoFrame } from '../components/ui/photo';
import { isBlank } from '../content/types';
import { business } from '../content/business';
import type { PageContent } from '../content/page';

export function ServiceArea({ content }: { content: PageContent }) {
  const isGts = content.brand === 'gts';
  return (
    <section id="area" className="px-5 md:px-16 py-14 md:py-20 bg-surface scroll-mt-16">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="label-mono mb-4">Service area</p>
          <h2 className="h-display text-[clamp(2rem,6vw,3rem)] text-text mb-4">
            {isGts
              ? `Roadside up to ${business.roadsideRadiusMiles} miles from Marietta.`
              : 'Marietta, GA.'}
          </h2>
          <address className="not-italic text-text-muted mb-6">
            {content.addressLines.map((l, i) =>
              isBlank(l) ? <BlankSlot key={i} claim={l} /> : <span key={i} className="block">{l.value}</span>,
            )}
          </address>
        </div>
        <PhotoFrame claim={content.shopPhoto} className="aspect-[4/3]" />
      </div>
    </section>
  );
}
