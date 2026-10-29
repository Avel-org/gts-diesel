import { Header } from './header';
import { Hero } from './hero';
import { EmergencyBand } from './emergency';
import { Services } from './services';
import { HowItWorks } from './how';
import { Fleet } from './fleet';
import { WhyGts } from './why';
import { Reviews } from './reviews';
import { Faq } from './faq';
import { FinalCall } from './final';
import { Footer } from './footer';
import { MobileCallBar } from './mobile-call-bar';
import { useDocumentTitle } from '../lib/use-document-title';
import type { PageContent } from '../content/page';

/** Section order comes from docs/design/design-spec.json -> sectionOrder. */
export function Page({ content }: { content: PageContent }) {
  useDocumentTitle();
  return (
    <>
      <Header content={content} />
      <main>
        <Hero content={content} />
        <EmergencyBand content={content} />
        <Services content={content} />
        <HowItWorks content={content} />
        <Fleet content={content} />
        <WhyGts content={content} />
        <Reviews content={content} />
        <Faq content={content} />
        <FinalCall content={content} />
      </main>
      <Footer content={content} />
      <MobileCallBar content={content} />
    </>
  );
}
