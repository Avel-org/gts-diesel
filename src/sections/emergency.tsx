import { Phone } from 'lucide-react';
import { ButtonLink } from '../components/ui/button';
import { HazardStripe } from '../components/ui/hazard';
import { Badge } from '../components/ui/badge';
import { callFor } from '../lib/call';
import { business } from '../content/business';
import type { PageContent } from '../content/page';

/** Hazard stripe use 1 of 2. */
export function EmergencyBand({ content }: { content: PageContent }) {
  const call = callFor(content);
  if (!call) return null;
  return (
    <section aria-labelledby="emergency-h" className="bg-accent text-accent-ink">
      <HazardStripe />
      <div className="px-5 md:px-16 py-8 flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Badge live className="bg-accent-ink text-accent border-accent-ink mb-3">
            Dispatch live
          </Badge>
          <h2 id="emergency-h" className="h-display text-[clamp(1.75rem,5vw,2.5rem)]">
            Broken down right now?
          </h2>
          <p className="font-mono text-sm mt-2">
            {business.hoursText} · Roadside up to {business.roadsideRadiusMiles} mi
          </p>
        </div>
        <ButtonLink href={call.href} variant="onAccent" size="call" data-call="emergency">
          <Phone aria-hidden="true" className="w-5 h-5" strokeWidth={2} />
          {call.display}
        </ButtonLink>
      </div>
    </section>
  );
}
