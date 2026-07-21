'use client';

import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { GridBackground } from '@/components/ui/GridBackground';
import { Icon } from '@/components/ui/Icon';
import { VideoModal } from '@/components/ui/VideoModal';
import { heroTrustBadges } from '@/lib/content';
import { HeroVisual } from '@/components/sections/HeroVisual';

function scrollToDemo() {
  const target = document.querySelector('#demo');
  if (!target) return;
  const nav = document.getElementById('main-nav');
  const offset = nav?.offsetHeight ?? 72;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <AnimatedSection className="relative overflow-hidden bg-white pt-[4.5rem]">
      <GridBackground />
      <div className="pointer-events-none absolute -top-32 right-0 size-[32rem] rounded-full bg-primary/[0.04] blur-3xl" />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg pb-16 pt-12 md:px-gutter md:pb-24 md:pt-16">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 py-1.5 text-sm font-semibold text-primary shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl ring-1 ring-slate-900/5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(70,72,212,0.8)]" />
              </span>
              Trusted Marketplace Infrastructure
            </div>

            <h1 className="mb-6 text-balance font-display-lg text-[40px] leading-[1.04] tracking-tighter text-on-background sm:text-[52px] lg:text-[60px]">
              Buy. Sell. Hire.
              <br />
              <span className="text-primary">With Complete Confidence.</span>
            </h1>

            <p className="mb-10 max-w-lg text-balance font-body-lg text-body-lg leading-relaxed text-slate-600">
              Zantrra connects buyers, businesses, and skilled professionals through secure escrow payments, verified
              identities, and trusted transactions creating a safer way to do commerce.
            </p>

            <div className="mb-12 grid grid-cols-2 gap-2 lg:flex lg:w-fit lg:gap-3">
              <Button
                onClick={scrollToDemo}
                className="justify-center gap-1 whitespace-nowrap rounded-xl px-2 py-2 text-[10px] leading-tight sm:px-3 sm:py-2.5 sm:text-[11px] md:text-xs lg:gap-2 lg:rounded-2xl lg:px-6 lg:py-3.5 lg:text-sm"
              >
                Try Interactive Demo
                <Icon name="arrow_forward" className="size-3 shrink-0 sm:size-3.5 lg:size-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setVideoOpen(true)}
                className="justify-center gap-1 whitespace-nowrap rounded-xl px-2 py-2 text-[10px] leading-tight sm:px-3 sm:py-2.5 sm:text-[11px] md:text-xs lg:gap-2 lg:rounded-2xl lg:px-6 lg:py-3.5 lg:text-sm"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_14px_-2px_rgba(70,72,212,0.5)] sm:size-6 lg:size-8">
                  <Icon name="play_arrow" className="size-2.5 text-white sm:size-3 lg:size-3.5" />
                </span>
                Watch Video
              </Button>
            </div>

            <div className="flex flex-wrap gap-6">
              {heroTrustBadges.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-slate-500">
                  <Icon name={item.icon} className="size-4 text-primary" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </AnimatedSection>
  );
}
