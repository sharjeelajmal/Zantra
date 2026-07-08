'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, type MouseEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { navLinks } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { IconName } from '@/components/ui/Icon';

const NAV_OFFSET = 72;

const NAV_ICONS: Record<string, IconName> = {
  Product: 'hub',
  'How it Works': 'cursor_click',
  Features: 'shield_lock',
  About: 'groups',
  FAQ: 'visibility',
};

function scrollToSection(href: string) {
  if (!href.startsWith('#')) return;

  const target = document.querySelector(href);
  if (!target) return;

  const nav = document.getElementById('main-nav');
  const offset = nav?.offsetHeight ?? NAV_OFFSET;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: 'smooth' });
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    scrollToSection(href);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        id="main-nav"
        className={cn(
          'fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-xl transition-all duration-300',
          scrolled
            ? 'shadow-[0_12px_40px_-12px_rgba(70,72,212,0.14)]'
            : 'shadow-[0_8px_32px_-8px_rgba(70,72,212,0.08)]',
        )}
      >
        <div className="mx-auto flex min-h-[4rem] max-w-container-max-width items-center justify-between gap-2 px-unit-lg py-2 md:min-h-[4.5rem]">
          <Logo size="nav" priority />

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-label-md text-label-md text-on-surface-variant transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
            <Button variant="ghost" className="hidden whitespace-nowrap px-2 py-1 text-[11px] md:inline-flex lg:px-3 lg:py-1.5 lg:text-sm">
              Sign In
            </Button>
            <Button className="hidden whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] md:inline-flex lg:rounded-xl lg:px-4 lg:py-2 lg:text-sm">
              Get Started
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                'relative z-[60] flex size-10 items-center justify-center rounded-xl text-on-surface-variant transition-all duration-200 lg:hidden',
                menuOpen
                  ? 'bg-primary text-white shadow-[0_8px_20px_-6px_rgba(70,72,212,0.45)]'
                  : 'bg-slate-100/80 ring-1 ring-slate-900/5 hover:bg-slate-100 hover:text-primary',
              )}
            >
              <Icon name={menuOpen ? 'close' : 'menu'} className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-md lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />

            <motion.div
              key="nav-sheet"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="fixed inset-x-3 top-[4.75rem] z-50 overflow-hidden rounded-[1.75rem] lg:hidden"
              style={{
                boxShadow:
                  '0 32px 64px -16px rgba(70,72,212,0.28), 0 16px 32px -12px rgba(15,23,42,0.18)',
              }}
            >
              <div className="relative border border-white/60 bg-white/90 backdrop-blur-2xl">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(70,72,212,0.1)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(109,40,217,0.06)_0%,transparent_45%)]"
                />

                <div className="relative px-4 pb-5 pt-4">
                  <div className="mb-4 flex items-center justify-between px-1">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">Navigate</p>
                      <p className="text-sm font-semibold text-on-background">Explore Zantrra</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-500/15">
                      <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                      Live
                    </span>
                  </div>

                  <nav className="space-y-1.5">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i, type: 'spring', stiffness: 400, damping: 28 }}
                        className="group flex items-center gap-3 rounded-2xl bg-white/70 px-3.5 py-3.5 ring-1 ring-slate-900/[0.04] transition-all duration-200 hover:bg-primary/[0.04] hover:ring-primary/15 active:scale-[0.98]"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-violet-500/10 text-primary ring-1 ring-primary/10 transition-all duration-200 group-hover:from-primary group-hover:to-violet-600 group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(70,72,212,0.45)]">
                          <Icon name={NAV_ICONS[link.label] ?? 'hub'} className="size-4" />
                        </span>
                        <span className="flex-1 text-sm font-semibold text-on-background">{link.label}</span>
                        <Icon
                          name="arrow_forward"
                          className="size-4 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                        />
                      </motion.a>
                    ))}
                  </nav>

                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <Button
                      variant="ghost"
                      className="w-full justify-center rounded-2xl bg-slate-50 px-3 py-3 text-xs font-semibold ring-1 ring-slate-900/5"
                    >
                      Sign In
                    </Button>
                    <Button className="w-full justify-center rounded-2xl px-3 py-3 text-xs shadow-[0_12px_28px_-8px_rgba(70,72,212,0.45)]">
                      Get Started
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-slate-50/80 px-3 py-2.5 ring-1 ring-slate-900/[0.04]">
                    <Icon name="shield_lock" className="size-3.5 text-primary" />
                    <p className="text-[11px] font-medium text-slate-500">Escrow-protected commerce</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
