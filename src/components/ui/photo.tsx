import type { Claim } from '../../content/types';
import { isBlank } from '../../content/types';
import type { Photo } from '../../content/page';
import { cn } from '../../lib/cn';

/**
 * A real photograph, or the labelled placeholder for one we don't have yet
 * (hard rule 9).
 *
 * The webp ladder goes in a <source> rather than the <img srcset>, because a
 * mixed srcset lets a high-DPR phone pick the much larger JPEG: at 390px and
 * DPR 3 the browser wants ~1170w and takes the only candidate that wide.
 * `priority` marks the hero, which is the LCP element.
 */
export function PhotoFrame({
  claim,
  className,
  priority = false,
}: {
  claim: Claim<Photo>;
  className?: string | undefined;
  priority?: boolean;
}) {
  if (isBlank(claim)) {
    const label = claim.label ?? `Photo: ${claim.need}`;
    return (
      <div
        role="img"
        aria-label={label}
        data-blank={claim.need}
        className={cn(
          'flex items-center justify-center text-center p-4 box-border',
          'border border-dashed border-border rounded-card bg-surface',
          'font-mono text-[11px] uppercase tracking-[.06em] text-text-muted',
          className,
        )}
      >
        {label}
      </div>
    );
  }

  const p = claim.value;
  // The slot is never wider than ~576px, so cap what the browser may ask for.
  const sizes = '(min-width: 768px) 45vw, 92vw';
  return (
    <picture className={cn('block', className)}>
      <source
        type="image/webp"
        sizes={sizes}
        srcSet={p.webp.map((w) => `${w.src} ${w.width}w`).join(', ')}
      />
      <img
        src={p.src}
        sizes={sizes}
        alt={p.alt}
        width={p.width}
        height={p.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        className="block w-full h-full object-cover rounded-card bg-surface"
      />
    </picture>
  );
}
