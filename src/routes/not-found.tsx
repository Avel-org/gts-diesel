import { Link } from 'react-router';
import { ButtonLink } from '../components/ui/button';
import { business } from '../content/business';

export function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="label-mono">404</p>
      <h1 className="h-display text-[clamp(2rem,8vw,3.5rem)] text-text">
        That page moved.
      </h1>
      <ButtonLink href={business.phoneHref} size="call" data-call="404">
        Call 24/7 · {business.phoneDisplay}
      </ButtonLink>
      <Link to="/" className="gts-arrowlink text-text no-underline">
        Back to the main page
      </Link>
    </main>
  );
}
