import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Icon } from '@/components/ui/Icon';
import { IconBox } from '@/components/ui/IconBox';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { aboutItems } from '@/lib/content';
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
            <h2 className="mb-10 max-w-md text-balance font-headline-lg text-headline-lg-mobile tracking-tighter text-on-background md:text-headline-lg">
              Commerce built
              <br />
              on principle.
            </h2>
            <div className="space-y-8">
              {aboutItems.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <IconBox size="md" className="shrink-0">
                    <Icon name={item.icon} />
                  </IconBox>
                  <div>
                    <h3 className="mb-1 font-label-md text-label-md font-bold text-on-background">{item.title}</h3>
                    <p className="text-sm font-body-md text-body-md leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
