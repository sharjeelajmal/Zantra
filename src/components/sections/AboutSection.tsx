import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { AboutVisual } from '@/components/sections/AboutVisual';

export function AboutSection() {
  return (
    <AnimatedSection id="about" className="relative overflow-hidden bg-slate-50/50 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <AboutVisual />

          <div>
            <SectionEyebrow>About Zantrra</SectionEyebrow>
            <h2 className="mb-8 max-w-md text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
              Building the Trust Infrastructure for Commerce
            </h2>
            <div className="space-y-5">
              <p className="font-body-md text-slate-600 leading-relaxed">
                Every day, millions of people buy products, hire professionals, and conduct business without a trusted
                system protecting both sides of the transaction. Buyers worry about fraud and non-delivery, while
                honest businesses worry about completing work without guaranteed payment. This lack of trust slows
                commerce, limits economic opportunity, and creates unnecessary risk.
              </p>
              <p className="font-body-md text-slate-600 leading-relaxed">
                Zantrra was created to solve this problem. By combining secure escrow, verified identities, competitive
                bidding, and transparent payments into one platform, we&apos;re building the trust infrastructure that
                helps buyers, businesses, and professionals transact with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
