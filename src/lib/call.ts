import { business } from '../content/business';
import type { PageContent } from '../content/page';

/**
 * Hard rule 2: every call link resolves to the one number in business.ts.
 * Cowboys has no sourced number yet, so it gets no live tel: link.
 */
export function callFor(content: PageContent) {
  if (content.brand === 'gts') {
    return { href: business.phoneHref, display: business.phoneDisplay } as const;
  }
  return null;
}
