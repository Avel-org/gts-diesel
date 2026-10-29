export { business, addressLine } from './business';
export { gts } from './gts';
export { cowboys } from './cowboys';
export { openQuestions } from './questions';
export * from './types';
export type * from './page';

import { gts } from './gts';
import { cowboys } from './cowboys';
import { openQuestions } from './questions';
import { collectBlanks } from './types';

/**
 * Cowboys has no phone number yet, so its call buttons must not render a
 * live tel: link. GTS always calls business.phoneHref.
 */
export const pages = { gts, cowboys } as const;

/** Every open blank across both pages. `pnpm build` prints this. */
export function openBlanks() {
  return {
    gts: collectBlanks(gts, 'gts'),
    cowboys: collectBlanks(cowboys, 'cowboys'),
    questions: collectBlanks(openQuestions, 'ask'),
  };
}
