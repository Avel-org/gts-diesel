import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'default' | 'outline' | 'onAccent' | 'link';
type Size = 'call' | 'default' | 'sm';

// Variants follow the cva block documented at the end of design/app.css.
const variants: Record<Variant, string> = {
  default:
    'bg-primary text-primary-fg border border-primary hover:bg-[var(--primary-hover)] active:scale-[.98]',
  outline: 'border border-text-muted text-text hover:bg-surface-2',
  onAccent: 'bg-accent-ink text-accent border border-accent-ink',
  link: 'gts-arrowlink text-text px-0 h-auto',
};

const sizes: Record<Size, string> = {
  // 56px: the a11y spec's call-button target.
  call: 'h-14 px-6 text-base gap-2.5',
  default: 'h-11 px-5 text-sm gap-2',
  sm: 'h-9 px-3 text-sm gap-1.5',
};

export type ButtonProps = ComponentProps<'button'> & { variant?: Variant; size?: Size };

const base =
  'inline-flex items-center justify-center rounded-card font-sans font-semibold ' +
  'transition-[background-color,transform,box-shadow] duration-[var(--dur-slow)] ' +
  'ease-[var(--ease-out)] disabled:opacity-60 disabled:pointer-events-none';

export function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export type CallLinkProps = ComponentProps<'a'> & { variant?: Variant; size?: Size };

/** The same shape as Button, rendered as an anchor for tel: links. */
export function ButtonLink({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: CallLinkProps) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], 'no-underline', className)}
      {...props}
    />
  );
}
