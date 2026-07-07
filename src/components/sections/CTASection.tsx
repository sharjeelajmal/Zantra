'use client';

import { motion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Icon } from '@/components/ui/Icon';

const FLOATING_BADGES = [
  { icon: 'verified_user' as const, label: '10K+ Waitlist', x: '-12%', y: '18%', delay: 0 },
  { icon: 'shield_lock' as const, label: 'Bank-Grade Escrow', x: '88%', y: '22%', delay: 0.15 },
  { icon: 'groups' as const, label: 'Guinea First', x: '92%', y: '72%', delay: 0.3 },
];

export function CTASection() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-slate-50/50 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_30%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[100px]" />

      <div className="relative mx-auto max-w-container-max-width px-unit-lg md:px-gutter">
        <div className="relative mx-auto max-w-3xl [perspective:1400px]">
          {FLOATING_BADGES.map((badge) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                y: { duration: 4 + badge.delay * 2, repeat: Infinity, ease: 'easeInOut' },
                opacity: { duration: 0.5, delay: badge.delay },
              }}
              className="pointer-events-none absolute z-20 hidden items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-[0_12px_32px_-12px_rgba(70,72,212,0.25)] ring-1 ring-white/80 backdrop-blur-xl lg:flex"
              style={{ left: badge.x, top: badge.y, transform: 'translateZ(40px)' }}
            >
              <span className="flex size-7 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name={badge.icon} className="size-4" />
              </span>
              {badge.label}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 32, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative overflow-hidden rounded-[2rem] p-[1px] shadow-[0_32px_64px_-20px_rgba(70,72,212,0.35)]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary via-indigo-600 to-violet-800" />
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.18)_0%,_transparent_55%)]" />
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,0,0,0.2)_0%,_transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:28px_28px]" />

            <div className="relative overflow-hidden rounded-[2rem] px-6 py-10 text-center md:px-14 md:py-16">
              <motion.div
                animate={{ y: [0, -6, 0], rotateY: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mx-auto mb-8 flex size-20 items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 rounded-[1.35rem] bg-white/20 blur-xl" />
                <div
                  className="relative flex size-20 items-center justify-center rounded-[1.35rem] bg-white/15 ring-1 ring-white/25 backdrop-blur-md"
                  style={{
                    boxShadow:
                      '0 20px 40px -12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)',
                    transform: 'translateZ(24px)',
                  }}
                >
                  <Icon name="rocket_launch" className="size-9 text-white" />
                </div>
              </motion.div>

              <h2 className="relative mb-4 text-balance text-3xl font-black leading-tight tracking-tighter text-white md:text-5xl">
                Ready to Experience
                <br />
                <span className="bg-gradient-to-r from-white via-[#e0e7ff] to-[#c7d2fe] bg-clip-text text-transparent">
                  Trusted Commerce?
                </span>
              </h2>
              <p className="relative mx-auto mb-10 max-w-md text-balance text-base leading-relaxed text-[#c6d2ff] md:text-lg">
                Join thousands of buyers and sellers waiting for the launch. Be first to access secure, escrow-powered
                transactions across Guinea.
              </p>

              <motion.form
                className="relative mx-auto max-w-lg"
                onSubmit={(e) => e.preventDefault()}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              >
                <div
                  className="rounded-2xl bg-white/10 p-1.5 ring-1 ring-white/20 backdrop-blur-md"
                  style={{ boxShadow: '0 16px 40px -12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)' }}
                >
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="min-w-0 rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-[#c6d2ff]/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/35 md:py-4"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-[0_12px_32px_-8px_rgba(0,0,0,0.35)] transition-all hover:bg-white/95 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.4)] md:py-4"
                    >
                      <Icon name="mail" className="size-4" />
                      Join Waitlist
                    </button>
                  </div>
                </div>
              </motion.form>

              <div className="relative mt-6 flex flex-wrap items-center justify-center gap-4">
                <p className="text-xs leading-relaxed text-[#a3b3ff]">No spam, ever. Unsubscribe any time.</p>
                <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80">
                  <Icon name="verified" className="size-3.5 text-emerald-300" />
                  Early access guaranteed
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
