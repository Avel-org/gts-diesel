import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

const control =
  'w-full bg-surface-2 text-text border border-border rounded-input px-3 py-2.5 ' +
  'font-sans text-base placeholder:text-text-muted/70 ' +
  'transition-colors duration-[var(--dur-fast)]';

/** Every input gets a visible label — the a11y spec requires it. */
export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="label-mono text-text">
        {label}
      </label>
      {children}
      {hint && <p className="font-mono text-[11px] text-text-muted">{hint}</p>}
    </div>
  );
}

export const Input = ({ className, ...p }: ComponentProps<'input'>) => (
  <input className={cn(control, className)} {...p} />
);

export const Textarea = ({ className, ...p }: ComponentProps<'textarea'>) => (
  <textarea className={cn(control, 'min-h-28 resize-y', className)} {...p} />
);
