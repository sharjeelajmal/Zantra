import { AboutSection } from '@/components/sections/AboutSection';
import { CTASection } from '@/components/sections/CTASection';
import { DemoSection } from '@/components/sections/DemoSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { MarketSection } from '@/components/sections/MarketSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <DemoSection />
        <FeaturesSection />
        <AboutSection />
        <MarketSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
