import type { Blank as BlankClaim } from '../../content/types';
import { cn } from '../../lib/cn';

/**
 * Hard rule 9 and the handoff's blankRule: a dashed outline plus what is
 * needed. Never substitute invented content for a blank.
 */
export function BlankSlot({
  claim,
  className,
  as: As = 'span',
}: {
  claim: BlankClaim;
  className?: string | undefined;
  as?: 'span' | 'div' | 'p' | undefined;
}) {
  const label = claim.label ?? `Blank: ${claim.need}`;
  return (
    <As
      data-blank={claim.need}
      className={cn(
        'inline-flex items-center justify-center text-center',
        'border border-dashed border-border rounded-[var(--radius-chip)]',
        'px-2 py-1 font-mono text-[11px] uppercase tracking-[.06em] text-text-muted',
        className,
      )}
    >
      {label}
    </As>
  );
}
