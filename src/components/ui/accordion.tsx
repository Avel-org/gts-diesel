import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

/**
 * Native disclosure. No JS state, so the answers are in the pre-rendered HTML
 * and readable before hydration.
 */
export function Accordion({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('divide-y divide-border border-y border-border', className)}>{children}</div>;
}

export function AccordionItem({ q, children }: { q: ReactNode; children: ReactNode }) {
  return (
    <details className="group">
      <summary
        className={cn(
          'flex items-center justify-between gap-4 cursor-pointer list-none',
          'py-5 min-h-11 font-sans text-base font-semibold text-text',
          'marker:hidden [&::-webkit-details-marker]:hidden',
        )}
      >
        {q}
        <span
          aria-hidden="true"
          className={cn(
            'shrink-0 w-5 h-5 relative',
            'before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:bg-accent',
            'after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:bg-accent',
            'after:transition-transform after:duration-[var(--dur-slow)] after:ease-[var(--ease-out)]',
            'group-open:after:scale-y-0',
          )}
        />
      </summary>
      <div className="pb-5 pr-9 text-text-muted">{children}</div>
    </details>
  );
}
