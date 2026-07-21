'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { IconBox } from '@/components/ui/IconBox';
import { useEscrowStore } from '@/lib/store/useEscrowStore';
import { cn } from '@/lib/utils';

const stepTransition = {
  initial: { opacity: 0, y: 20, scale: 0.96, rotateX: 8 },
  animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
  exit: { opacity: 0, y: -16, scale: 0.98, rotateX: -6 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
};

const bidPulseVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const bidPulseItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 22 } },
};

function ProcessingOverlay({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-white/50 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        >
          <Icon name="hub" className="size-14 drop-shadow-[0_8px_16px_rgba(15,23,42,0.18)]" />
        </motion.div>
        <p className="text-sm font-semibold text-primary">{message}</p>
      </div>
    </motion.div>
  );
}

export function DemoSellerTab() {
  const { step, bids, activeVendor, isProcessing, markDelivered, reset } = useEscrowStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        {...stepTransition}
        className="relative flex min-h-[360px] w-full flex-col items-center gap-6 py-4 [perspective:1000px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence>
          {isProcessing && step === 'delivered' && (
            <ProcessingOverlay message="Verifying completion code..." />
          )}
        </AnimatePresence>
        {step === 'idle' && (
          <>
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border border-primary/20"
              />
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                className="absolute inset-0 rounded-full border border-primary/15"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <IconBox size="lg" className="relative !size-20 bg-transparent ring-0 shadow-none">
                  <Icon name="storefront" className="size-14 drop-shadow-[0_8px_16px_rgba(15,23,42,0.16)]" />
                </IconBox>
              </motion.div>
            </div>
            <div className="max-w-sm text-center">
              <h3 className="mb-2 font-headline-md text-headline-md text-on-background">Waiting for new orders...</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Storefront is live. Buyers can purchase direct or post a service request.
              </p>
            </div>
          </>
        )}

        {step === 'bidding' && (
          <div className="w-full max-w-md space-y-5">
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-transparent"
              >
                <Icon name="gavel" className="size-12 drop-shadow-[0_8px_16px_rgba(15,23,42,0.16)]" />
              </motion.div>
              <h3 className="mb-2 font-headline-md text-headline-md text-on-background">Bids in Progress</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Vendors are competing on an open service request. Awaiting buyer selection.
              </p>
            </div>
            <motion.div variants={bidPulseVariants} initial="hidden" animate="show" className="space-y-2">
              {bids.map((vendor, i) => (
                <motion.div
                  key={vendor.name}
                  variants={bidPulseItem}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/80 px-4 py-3 ring-1 ring-slate-900/5 backdrop-blur-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-on-background">{vendor.name}</p>
                    <p className="truncate text-[10px] text-slate-500">{vendor.product}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="whitespace-nowrap text-xs font-bold text-primary">{vendor.price}</span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                        'bg-amber-50 text-amber-700 ring-1 ring-amber-500/15',
                      )}
                    >
                      Pending
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {step === 'released' && (
          <div className="relative flex w-full flex-col items-center gap-6">
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute left-1/2 top-4 size-72 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.2)_0%,transparent_70%)]"
            />
            <motion.div
              initial={{ scale: 0.5, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 16 }}
              className="relative flex size-20 items-center justify-center rounded-2xl bg-emerald-50 ring-2 ring-emerald-400/50"
              style={{
                boxShadow:
                  '0 0 48px -4px rgba(52, 211, 153, 0.65), 0 16px 32px -8px rgba(15, 23, 42, 0.1)',
                transformStyle: 'preserve-3d',
              }}
            >
              <Icon name="verified" className="relative size-14 drop-shadow-[0_8px_16px_rgba(15,23,42,0.16)]" />
            </motion.div>
            <div className="relative max-w-sm text-center">
              <h3 className="mb-2 font-headline-md text-headline-md text-on-background">Funds Released to Wallet</h3>
              <p className="text-sm leading-relaxed text-slate-600">Credited to your local wallet.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 22 }}
              className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-emerald-300/50 to-transparent p-[1px]"
              style={{ boxShadow: '0 0 40px -8px rgba(52, 211, 153, 0.5)' }}
            >
              <div className="rounded-2xl bg-white/85 p-5 ring-2 ring-emerald-400/30 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Wallet balance</span>
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="size-1.5 rounded-full bg-emerald-400"
                    />
                    Live
                  </span>
                </div>
                <motion.p
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, type: 'spring', stiffness: 300, damping: 16 }}
                  className="mt-2 truncate whitespace-nowrap text-3xl font-black text-emerald-700"
                  style={{ textShadow: '0 4px 16px rgba(52, 211, 153, 0.4)' }}
                >
                  +{activeVendor.price}
                </motion.p>
              </div>
            </motion.div>
            <Button variant="outline" onClick={reset}>
              Start New Demo
            </Button>
          </div>
        )}

        {step === 'locked' && (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-[0_0_16px_rgba(70,72,212,0.6)]"
            >
              1
            </motion.div>
            <div className="max-w-sm text-center">
              <h3 className="mb-2 font-headline-md text-headline-md text-on-background">Order Received</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                <span className="whitespace-nowrap font-semibold text-primary">{activeVendor.price}</span> in Escrow.
                Deliver product.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, rotateX: 20, y: 30 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              whileHover={{ y: -4, rotateX: 2 }}
              className="w-full max-w-md rounded-2xl bg-gradient-to-b from-slate-200/90 to-transparent p-[1px] shadow-[0_24px_48px_-16px_rgba(70,72,212,0.22)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="rounded-2xl bg-white/85 p-5 ring-1 ring-white/80 backdrop-blur-xl">
                <div className="mb-3 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Buyer order</span>
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="font-semibold text-emerald-600"
                  >
                    Escrow Secured
                  </motion.span>
                </div>
                <p className="mb-1 truncate text-sm font-semibold text-on-background">{activeVendor.product}</p>
                <p className="mb-3 truncate text-xs text-slate-500">{activeVendor.category}</p>
                <p className="whitespace-nowrap text-lg font-bold text-primary">{activeVendor.price}</p>
              </div>
            </motion.div>
            <Button onClick={markDelivered} disabled={isProcessing} className="px-6 py-3">
              <Icon name="task_alt" className="size-6 drop-shadow-[0_4px_8px_rgba(15,23,42,0.14)]" />
              Mark as Delivered
            </Button>
          </>
        )}

        {step === 'delivered' && (
          <>
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <IconBox size="lg" className="!size-20 bg-transparent ring-0 shadow-none">
                <Icon name="pin" className="size-14 drop-shadow-[0_8px_16px_rgba(15,23,42,0.16)]" />
              </IconBox>
            </motion.div>
            <div className="max-w-sm text-center">
              <h3 className="mb-2 font-headline-md text-headline-md text-on-background">Delivery Confirmed</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Waiting for buyer to release{' '}
                <span className="whitespace-nowrap font-semibold text-primary">{activeVendor.price}</span>.
              </p>
            </div>
            <div className="w-full max-w-xs rounded-xl bg-amber-50/80 px-4 py-3 text-center ring-1 ring-amber-500/15">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-700">Pending release</p>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
