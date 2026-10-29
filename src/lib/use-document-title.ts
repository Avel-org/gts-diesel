import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { headMeta } from './head';

/**
 * The title ships in the pre-rendered HTML. On a client-side navigation
 * nothing would update it, so sync it to the route here.
 */
export function useDocumentTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = headMeta[pathname];
    if (meta) document.title = meta.title;
  }, [pathname]);
}
