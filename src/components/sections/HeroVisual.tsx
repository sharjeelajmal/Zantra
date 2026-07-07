'use client';

import { FloatingElement } from '@/components/ui/FloatingElement';
import { Icon } from '@/components/ui/Icon';
import { IconBox } from '@/components/ui/IconBox';
import { demoVendors } from '@/lib/content';

const [cementVendor, paintVendor] = demoVendors;

function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-slate-200/80 rounded-full ${className ?? 'h-2 w-full'}`} />;
}

function GlowDot({ color = 'emerald' }: { color?: 'emerald' | 'primary' | 'amber' }) {
  const colors = {
    emerald: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
    primary: 'bg-primary shadow-[0_0_8px_rgba(70,72,212,0.7)]',
    amber: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
  };
  return <span className={`size-2 rounded-full ${colors[color]}`} />;
}

function MicroCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/70 ring-1 ring-slate-900/5 rounded-2xl ${className ?? ''}`}
      style={{
        boxShadow:
          '0 2px 4px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.04), 0 12px 24px rgba(0,0,0,0.06)',
      }}
    >
      {children}
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[26rem] w-full max-w-lg sm:h-[28rem]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(70,72,212,0.08)_0%,transparent_65%)]" />

      <FloatingElement delay={0} duration={6} className="absolute left-0 top-6 z-0 w-[17rem] sm:w-[18.5rem] -rotate-3">
        <MicroCard className="p-4">
          <div className="mb-4 flex items-center justify-between gap-1">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <IconBox size="sm" className="shrink-0">
                  <Icon name="shield_lock" />
                </IconBox>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Escrow Locked</p>
                  <p className="truncate whitespace-nowrap text-[10px] font-semibold text-slate-900 sm:text-xs">
                    {paintVendor.price} held
                  </p>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 ring-1 ring-emerald-500/10">
              <GlowDot color="emerald" />
              <span className="text-[10px] font-semibold text-emerald-700">Secure</span>
            </div>
          </div>
          <div className="mb-3 space-y-2">
            <Skeleton className="h-2 w-3/4" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-5/6" />
          </div>
          <div className="flex items-center gap-2 border-t border-slate-100 pt-2">
            <div className="size-8 shrink-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 ring-2 ring-white" />
            <div className="min-w-0 flex-1 space-y-1.5">
              <p className="truncate text-[10px] font-medium text-slate-700">{paintVendor.name}</p>
              <Skeleton className="h-1.5 w-20" />
            </div>
            <GlowDot color="primary" />
          </div>
        </MicroCard>
      </FloatingElement>

      <FloatingElement delay={0.8} duration={5.5} className="absolute right-0 top-20 z-10 w-[18rem] sm:w-[19.5rem] rotate-2">
        <MicroCard className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Transaction Receipt</p>
            <span className="text-[10px] font-mono text-slate-400">#ZTR-8492</span>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div className="size-9 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-indigo-500 ring-2 ring-white shadow-sm" />
            <div className="size-9 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 ring-2 ring-white shadow-sm -ml-4" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold text-slate-900 sm:text-xs">{cementVendor.product}</p>
              <p className="truncate text-[10px] text-slate-500">{cementVendor.name}</p>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-6 gap-1.5">
            {['8', '4', '2', '7', '1', '9'].map((d) => (
              <div
                key={d}
                className="flex h-9 items-center justify-center rounded-lg bg-slate-50 text-sm font-bold text-primary ring-1 ring-slate-200/80"
              >
                {d}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-50/80 px-3 py-2 ring-1 ring-slate-100">
            <span className="shrink-0 text-[10px] text-slate-500 sm:text-xs">Total</span>
            <span className="truncate whitespace-nowrap text-[10px] font-bold text-primary sm:text-xs">
              {cementVendor.price}
            </span>
          </div>
        </MicroCard>
      </FloatingElement>

      <FloatingElement delay={1.4} duration={4.8} className="absolute bottom-4 left-4 z-20">
        <MicroCard className="flex items-center gap-2 px-3 py-2">
          <IconBox size="sm" className="bg-emerald-500/5 text-emerald-600 ring-emerald-500/15">
            <Icon name="verified" className="size-3.5" />
          </IconBox>
          <span className="whitespace-nowrap text-[10px] font-semibold text-slate-800 sm:text-xs">Vendor Verified</span>
        </MicroCard>
      </FloatingElement>

      <FloatingElement delay={2} duration={5.2} className="absolute bottom-10 right-2 z-20">
        <MicroCard className="flex items-center gap-2.5 px-3 py-2.5">
          <Icon name="account_balance_wallet" className="size-4 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="text-[10px] leading-none text-slate-400">Funds Held</p>
            <p className="truncate whitespace-nowrap text-[10px] font-bold text-slate-900 sm:text-xs">
              {cementVendor.price}
            </p>
          </div>
        </MicroCard>
      </FloatingElement>
    </div>
  );
}
