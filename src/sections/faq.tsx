import { Accordion, AccordionItem } from '../components/ui/accordion';
import { Text } from '../components/ui/claim';
import type { PageContent } from '../content/page';

export function Faq({ content }: { content: PageContent }) {
  return (
    <section id="faq" className="px-5 md:px-16 py-14 md:py-20 scroll-mt-16">
      <h2 className="h-display text-[clamp(2rem,6vw,3rem)] text-text mb-8">Questions</h2>
      <Accordion className="max-w-[72ch]">
        {content.faqs.map((f, i) => (
          <AccordionItem key={i} q={<Text claim={f.q} />}>
            <Text claim={f.a} />
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
