import { Link } from 'react-router';
import { Badge } from '../components/ui/badge';
import { ButtonLink } from '../components/ui/button';
import { BlankSlot } from '../components/ui/blank';
import { blank } from '../content/types';
import { callFor } from '../lib/call';
import type { PageContent } from '../content/page';

const nav = [
  ['#services', 'Services'],
  ['#fleet', 'Fleet'],
  ['#area', 'Area'],
  ['#faq', 'FAQ'],
] as const;

export function Header({ content }: { content: PageContent }) {
  const call = callFor(content);
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2.5 h-16 px-5 md:px-16 bg-bg border-b border-border">
      {content.brand === 'gts' ? (
        <Link to="/" aria-label={`${content.name} ${content.sub}`} className="block shrink-0">
          <img
            src="/uploads/gts-logo-white-on-ink.png"
            alt=""
            width={118}
            height={38}
            className="w-[118px] h-auto"
          />
        </Link>
      ) : (
        <Link to="/cowboys-radiator" className="flex flex-col leading-none no-underline text-text">
          <span className="h-display text-[26px]">{content.name}</span>
          <span className="label-mono text-[9px] mt-0.5">{content.sub}</span>
        </Link>
      )}

      <Badge live>Open 24/7</Badge>

      <nav className="hidden md:flex gap-7 ml-auto font-sans text-sm font-medium">
        {nav.map(([href, label]) => (
          <a key={href} href={href} className="gts-navlink no-underline text-text-muted hover:text-text inline-flex items-center min-h-11">
            {label}
          </a>
        ))}
      </nav>

      <div className="ml-auto md:ml-0 hidden sm:block">
        {call ? (
          <ButtonLink href={call.href} data-call="header">
            {call.display}
          </ButtonLink>
        ) : (
          <BlankSlot claim={blank('Cowboys phone number')} />
        )}
      </div>
    </header>
  );
}
