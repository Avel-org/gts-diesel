import type { CSSProperties } from 'react';
import type { Claim } from '../../content/types';
import { isBlank } from '../../content/types';
import type { Photo } from '../../content/page';
import { cn } from '../../lib/cn';

/**
 * Never show a photo wider than its source can hold on a 2x screen: native
 * width ÷ 1.4 (about 571px for Mathew's 800px files). Applied at md and up.
 */
export const maxDisplayWidth = (p: Pick<Photo, 'width'>) => Math.round(p.width / 1.4);

/**
 * A real photograph, or the labelled placeholder for one we don't have yet
 * (hard rule 9).
 *
 * Shape: `slot` is the designed aspect class, used for placeholders. A real
 * photo takes its own ratio at md and up, so desktop never crops and zooms it.
 * Below md it takes `mobileCrop` if given (with the photo's `focal` point),
 * otherwise its own ratio too. The ratio is reserved before the image loads,
 * and width/height stay on the <img>, so nothing shifts.
 *
 * Formats: AVIF, then WebP, each in a <source>, rather than in the <img
 * srcset>, because a mixed srcset lets a high-DPR phone pick the much larger
 * JPEG: at 390px and DPR 3 the browser wants ~1170w and takes the only
 * candidate that wide. The JPEG is the last-resort fallback in `src`.
 *
 * `sizes` must describe the slot's real rendered width at each breakpoint.
 * `priority` marks the hero, which is the LCP element.
 */
export function PhotoFrame({
  claim,
  className,
  slot = 'aspect-[4/3]',
  mobileCrop,
  sizes,
  priority = false,
}: {
  claim: Claim<Photo>;
  className?: string | undefined;
  slot?: string;
  mobileCrop?: string;
  sizes: (maxPx: number) => string;
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
          slot,
          className,
        )}
      >
        {label}
      </div>
    );
  }

  const p = claim.value;
  const max = maxDisplayWidth(p);
  const s = sizes(max);
  const style = {
    '--photo-ratio': p.ratio,
    '--photo-max': `${max}px`,
    '--photo-focal': p.focal ?? 'center',
  } as CSSProperties;
  const ladder = (set: Photo['webp']) => set.map((w) => `${w.src} ${w.width}w`).join(', ');
  return (
    <picture
      style={style}
      className={cn(
        'block w-full md:max-w-(--photo-max) md:mx-auto',
        mobileCrop ? cn(mobileCrop, 'md:aspect-(--photo-ratio)') : 'aspect-(--photo-ratio)',
        className,
      )}
    >
      <source type="image/avif" sizes={s} srcSet={ladder(p.avif)} />
      <source type="image/webp" sizes={s} srcSet={ladder(p.webp)} />
      <img
        src={p.src}
        sizes={s}
        alt={p.alt}
        width={p.width}
        height={p.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        className="block w-full h-full object-cover object-(--photo-focal) md:object-center rounded-card bg-surface"
      />
    </picture>
  );
}
