import { Link } from 'react-router';
import { BlankSlot } from '../components/ui/blank';
import { isBlank } from '../content/types';
import { callFor } from '../lib/call';
import { business } from '../content/business';
import type { PageContent } from '../content/page';

export function Footer({ content }: { content: PageContent }) {
  const call = callFor(content);
  return (
    <footer className="px-5 md:px-16 py-12 bg-[var(--b-ink)] border-t border-border">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="flex-1">
          <p className="h-display text-xl text-text mb-3">{content.footerName}</p>
          <address className="not-italic text-text-muted text-sm">
            {content.addressLines.map((l, i) =>
              isBlank(l) ? <BlankSlot key={i} claim={l} /> : <span key={i} className="block">{l.value}</span>,
            )}
          </address>
          {call && (
            <a href={call.href} className="inline-flex items-center min-h-11 mt-1 text-accent no-underline font-semibold" data-call="footer">
              {call.display}
            </a>
          )}
        </div>
        <div>
          <p className="label-mono mb-2">Hours</p>
          <p className="font-mono text-sm text-text">{business.hoursText}</p>
        </div>
        <div>
          <p className="label-mono mb-2">Also ours</p>
          <Link to={content.sisterLink.path} className="gts-arrowlink text-text no-underline text-sm">
            {content.sisterLink.label}
          </Link>
        </div>
      </div>
      <p className="label-mono mt-10 text-[10px]">
        {isBlank(content.llc) ? <BlankSlot claim={content.llc} /> : content.llc.value} ·{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
