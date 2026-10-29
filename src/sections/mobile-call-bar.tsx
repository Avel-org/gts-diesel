import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { callFor } from '../lib/call';
import { cn } from '../lib/cn';
import type { PageContent } from '../content/page';

/**
 * AC5: the bar appears once the hero call button has scrolled out of view,
 * hides while the final call band is on screen, never shows on desktop (CSS),
 * and gets out of the way of a focused field so it cannot cover one.
 *
 * It starts hidden, which is also what the pre-rendered HTML contains — there
 * is nothing to show until the visitor has scrolled.
 */
export function MobileCallBar({ content }: { content: PageContent }) {
  const call = callFor(content);
  const [heroGone, setHeroGone] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);
  const [fieldFocused, setFieldFocused] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-call="hero"]');
    const final = document.getElementById('quote');
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const o = new IntersectionObserver(([e]) => setHeroGone(!e?.isIntersecting), { threshold: 0 });
      o.observe(hero);
      observers.push(o);
    }
    if (final) {
      const o = new IntersectionObserver(([e]) => setFinalVisible(!!e?.isIntersecting), { threshold: 0 });
      o.observe(final);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      setFieldFocused(!!t?.matches('input, textarea, select'));
    };
    const onOut = () => setFieldFocused(false);
    document.addEventListener('focusin', onIn);
    document.addEventListener('focusout', onOut);
    return () => {
      document.removeEventListener('focusin', onIn);
      document.removeEventListener('focusout', onOut);
    };
  }, []);

  if (!call) return null;
  const shown = heroGone && !finalVisible && !fieldFocused;

  return (
    <div
      data-sticky-bar={shown ? 'shown' : 'hidden'}
      {...(shown ? {} : { 'aria-hidden': true })}
      className={cn(
        'md:hidden fixed bottom-0 inset-x-0 z-30 p-3',
        'bg-bg/95 border-t border-border backdrop-blur-sm',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        'transition-[transform,opacity] duration-[var(--dur-slow)] ease-[var(--ease-out)]',
        'motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none',
      )}
    >
      <a
        href={call.href}
        data-call="sticky"
        tabIndex={shown ? undefined : -1}
        className="flex items-center justify-center gap-2.5 h-14 rounded-card bg-primary text-primary-fg font-sans font-semibold no-underline"
      >
        <Phone aria-hidden="true" className="w-5 h-5" strokeWidth={2} />
        Call 24/7 · {call.display}
      </a>
    </div>
  );
}
