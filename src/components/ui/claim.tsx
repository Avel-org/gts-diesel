import type { Claim } from '../../content/types';
import { isBlank } from '../../content/types';
import { BlankSlot } from './blank';

/**
 * Renders a sourced string, or its labelled blank. Sections must read content
 * through this so a blank can never silently render as empty.
 */
export function Text({ claim, className }: { claim: Claim<string>; className?: string }) {
  if (isBlank(claim)) return <BlankSlot claim={claim} className={className} />;
  return <span className={className}>{claim.value}</span>;
}

/** The plain string, or undefined when blank. For attributes and titles. */
export function textOf(claim: Claim<string>): string | undefined {
  return isBlank(claim) ? undefined : claim.value;
}
