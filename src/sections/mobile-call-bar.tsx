import { Phone } from 'lucide-react';
import { callFor } from '../lib/call';
import type { PageContent } from '../content/page';

/** Fixed on mobile only; the desktop header already carries a call button. */
export function MobileCallBar({ content }: { content: PageContent }) {
  const call = callFor(content);
  if (!call) return null;
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-bg/95 border-t border-border backdrop-blur-sm pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <a
        href={call.href}
        data-call="sticky"
        className="flex items-center justify-center gap-2.5 h-14 rounded-card bg-primary text-primary-fg font-sans font-semibold no-underline"
      >
        <Phone aria-hidden="true" className="w-5 h-5" strokeWidth={2} />
        Call 24/7 · {call.display}
      </a>
    </div>
  );
}
