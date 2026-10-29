/**
 * Where a claim on the page came from. Hard rule 1: no invented facts.
 *
 * - `his-site`  copied from the old website, not yet re-confirmed
 * - `mathew`    confirmed directly by Mathew
 * - `blank`     not known yet; renders as a labelled placeholder
 */
export type Source = 'his-site' | 'mathew' | 'blank';

/** A value and where it came from. */
export type Sourced<T> = { value: T; source: Exclude<Source, 'blank'> };

/** A claim we do not have yet. `need` says what to ask Mathew for. */
export type Blank = { source: 'blank'; need: string; label?: string | undefined };

/** Either a known, sourced value or a labelled blank. */
export type Claim<T> = Sourced<T> | Blank;

export const said = <T>(value: T): Sourced<T> => ({ value, source: 'mathew' });
export const site = <T>(value: T): Sourced<T> => ({ value, source: 'his-site' });
export const blank = (need: string, label?: string): Blank => ({ source: 'blank', need, label });

export const isBlank = <T>(c: Claim<T>): c is Blank => c.source === 'blank';

/** Reads a claim, or returns undefined when it is still blank. */
export function valueOf<T>(c: Claim<T>): T | undefined {
  return isBlank(c) ? undefined : c.value;
}

/** Every blank in a content tree, for docs/OPEN-BLANKS.md and the build log. */
export function collectBlanks(node: unknown, path = ''): Array<{ path: string; need: string }> {
  if (node === null || typeof node !== 'object') return [];
  const obj = node as Record<string, unknown>;
  if (obj.source === 'blank' && typeof obj.need === 'string') {
    return [{ path: path || '(root)', need: obj.need }];
  }
  return Object.entries(obj).flatMap(([k, v]) =>
    collectBlanks(v, path ? `${path}.${k}` : k),
  );
}
