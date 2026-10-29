import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** A mono chip. `live` adds the beacon dot used for "Open 24/7". */
export function Badge({
  className,
  live = false,
  children,
  ...props
}: ComponentProps<'span'> & { live?: boolean; children?: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2 rounded-[var(--radius-chip)]',
        'border border-border bg-surface-2 text-text',
        'font-mono text-[10px] font-medium leading-none uppercase tracking-[.08em] whitespace-nowrap',
        className,
      )}
      {...props}
    >
      {live && (
        <span
          aria-hidden="true"
          className="gts-beacon w-1.5 h-1.5 rounded-full bg-accent border border-[var(--rule)]"
        />
      )}
      {children}
    </span>
  );
}
