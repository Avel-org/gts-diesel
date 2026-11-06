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
  ['#faq', 'FAQ'],
] as const;

export function Header({ content }: { content: PageContent }) {
  const call = callFor(content);
  return (
    <header className="sticky top-0 z-20 flex items-center gap-2.5 md:gap-5 h-16 md:h-20 px-5 md:px-16 bg-bg border-b border-border">
      {content.brand === 'gts' ? (
        <Link to="/" aria-label={`${content.name} ${content.sub}`} className="block shrink-0">
          {/*
            Trimmed logo (scripts/images.mjs), 248×69 px. Mobile keeps the old
            visual size (~86px). Desktop is 186px: on a 2x screen that's a
            1.5x upscale, the most this raster takes before going soft. A
            vector logo from Mathew would allow bigger.
          */}
          <picture>
            <source type="image/webp" srcSet="/uploads/gts-logo-header.webp" />
            <img
              src="/uploads/gts-logo-header.png"
              alt=""
              width={248}
              height={69}
              className="block w-[86px] md:w-[186px] h-auto"
            />
          </picture>
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
