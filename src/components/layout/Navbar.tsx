'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { navLinks } from '@/lib/content';
import { cn, oddGridLastSpan } from '@/lib/utils';

const NAV_OFFSET = 72;

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

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('main-nav');
      if (!nav) return;
      nav.classList.toggle('shadow-md', window.scrollY > 20);
      nav.classList.toggle('shadow-sm', window.scrollY <= 20);
    };
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
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden
        />
      )}

      <nav
        id="main-nav"
        className="fixed top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 shadow-[0_8px_32px_-8px_rgba(70,72,212,0.08)] backdrop-blur-xl transition-shadow duration-300"
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
              className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-slate-100 hover:text-primary lg:hidden"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} className="size-6" />
            </button>
          </div>
        </div>

        <div
          className={cn(
            'overflow-hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden',
            menuOpen ? 'max-h-[24rem] opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="mx-auto max-w-container-max-width px-unit-lg py-4">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    'rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-on-surface-variant transition-colors hover:bg-slate-50 hover:text-primary',
                    oddGridLastSpan(i, navLinks.length),
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="ghost" className="w-full justify-center whitespace-nowrap px-2 py-2 text-xs">
                Sign In
              </Button>
              <Button className="w-full justify-center whitespace-nowrap rounded-xl px-2 py-2 text-xs">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
