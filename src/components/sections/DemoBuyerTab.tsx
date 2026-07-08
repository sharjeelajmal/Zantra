'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { IconBox } from '@/components/ui/IconBox';
import { demoVendors, type DemoVendor } from '@/lib/content';
import { useEscrowStore } from '@/lib/store/useEscrowStore';
import { cn } from '@/lib/utils';

const DIRECT_VENDOR = demoVendors[0];

const stepTransition = {
  initial: { opacity: 0, y: 20, scale: 0.96, rotateX: 8 },
  animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
  exit: { opacity: 0, y: -16, scale: 0.98, rotateX: -6 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
};

const bidListVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const bidItemVariants = {
  hidden: { opacity: 0, x: -24, scale: 0.94 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 320, damping: 24 },
  },
};

function EscrowStatusCard() {
  const { activeVendor, step } = useEscrowStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="w-full max-w-md [perspective:1000px]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-2xl bg-gradient-to-b from-slate-200/90 to-transparent p-[1px] shadow-[0_24px_48px_-16px_rgba(70,72,212,0.3),0_12px_24px_-8px_rgba(15,23,42,0.1)]"
      >
        <div
          className="rounded-2xl bg-white/80 p-5 ring-1 ring-white/80 backdrop-blur-xl"
          style={{
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.95), 0 8px 24px -8px rgba(70,72,212,0.15)',
            transform: 'translateZ(12px)',
          }}
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <IconBox size="sm">
                <Icon name="shield_lock" />
              </IconBox>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Escrow Active</p>
                <p className="truncate whitespace-nowrap text-xs font-semibold text-slate-900">{activeVendor.price}</p>
              </div>
            </div>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-500/10"
            >
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              Secure
            </motion.span>
          </div>
          <div className="space-y-2 border-t border-slate-100/80 pt-3">
            <div className="flex justify-between gap-2 text-xs">
              <span className="text-slate-500">Vendor</span>
              <span className="truncate font-medium text-slate-900">{activeVendor.name}</span>
            </div>
            <div className="flex justify-between gap-2 text-xs">
              <span className="text-slate-500">Product</span>
              <span className="truncate font-medium text-slate-900">{activeVendor.product}</span>
            </div>
            <div className="flex justify-between gap-2 text-xs">
              <span className="text-slate-500">Status</span>
              <span
                className={cn(
                  'font-semibold',
                  step === 'delivered' ? 'text-amber-600' : 'text-primary',
                )}
              >
                {step === 'delivered' ? 'Awaiting Code Release' : 'Awaiting Delivery'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SecretCodeDisplay() {
  const secretCode = useEscrowStore((s) => s.secretCode);
  const [copied, setCopied] = useState(false);
  const digits = secretCode.split('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(secretCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <p className="mb-3 text-center text-xs font-medium text-slate-500">
        Your private 6-digit completion code
      </p>
      <div className="grid grid-cols-6 gap-1.5">
        {digits.map((digit, i) => (
          <motion.div
            key={`${digit}-${i}`}
            initial={{ opacity: 0, y: 16, rotateX: -40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ delay: i * 0.09, type: 'spring', stiffness: 320, damping: 20 }}
            whileHover={{ y: -3, scale: 1.05 }}
            className="flex h-12 items-center justify-center rounded-xl bg-gradient-to-b from-white to-slate-50 text-base font-bold text-primary shadow-[0_4px_12px_-4px_rgba(70,72,212,0.2)] ring-1 ring-slate-200/80"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {digit}
          </motion.div>
        ))}
      </div>
      <motion.button
        type="button"
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary/5 px-3 py-2.5 text-xs font-semibold text-primary ring-1 ring-primary/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
      >
        <Icon name="pin" className="size-3.5" />
        {copied ? 'Copied!' : 'Copy Code'}
      </motion.button>
    </motion.div>
  );
}

function PinPadInput({
  value,
  onChange,
  error,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  error: string | null;
  disabled?: boolean;
}) {
  const digits = value.padEnd(6, ' ').split('').slice(0, 6);

  return (
    <div className={cn('relative space-y-2', disabled && 'pointer-events-none opacity-60')}>
      <div className="grid grid-cols-6 gap-2">
        {digits.map((d, i) => (
          <div
            key={i}
            className={cn(
              'flex h-12 items-center justify-center rounded-xl text-xl font-bold transition-all duration-200',
              d.trim()
                ? 'bg-primary/5 text-primary shadow-[0_4px_12px_-4px_rgba(70,72,212,0.25)] ring-2 ring-primary/20'
                : 'bg-white text-slate-300 shadow-[inset_0_2px_6px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80',
              error && 'ring-error/40',
            )}
          >
            {d.trim() || '·'}
          </div>
        ))}
      </div>
      <label htmlFor="completion-code" className="sr-only">
        Enter 6-digit completion code
      </label>
      <input
        id="completion-code"
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
        aria-invalid={Boolean(error)}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
      <p className="text-center text-[10px] font-medium text-slate-400">Tap digits to enter code</p>
    </div>
  );
}

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
          <Icon name="hub" className="size-10 text-primary" />
        </motion.div>
        <p className="text-sm font-semibold text-primary">{message}</p>
      </div>
    </motion.div>
  );
}

function IdleChoiceGrid({
  onBuyDirect,
  onPostRequest,
  disabled,
}: {
  onBuyDirect: () => void;
  onPostRequest: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
      <motion.button
        type="button"
        disabled={disabled}
        onClick={onBuyDirect}
        whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className={cn(
          'group relative flex h-full min-h-[280px] overflow-hidden rounded-2xl bg-gradient-to-b from-primary/25 to-transparent p-[1px] text-left shadow-[0_20px_40px_-16px_rgba(70,72,212,0.28)]',
          disabled && 'pointer-events-none opacity-60',
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative flex h-full w-full flex-col rounded-2xl bg-white/90 p-5 ring-1 ring-white/80 backdrop-blur-xl">
          <div className="mb-4 flex items-start justify-between gap-2">
            <IconBox size="md" className="bg-gradient-to-br from-[#eef2ff] to-primary-fixed/40 ring-primary/10">
              <Icon name="shopping_cart" className="size-6" />
            </IconBox>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Fixed Price
            </span>
          </div>
          <h3 className="mb-1 font-headline-md text-headline-md text-on-background">Buy Direct</h3>
          <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-500">
            Skip bidding — lock escrow instantly at the listed price.
          </p>
          <div className="mt-auto flex min-h-[5.5rem] flex-col justify-center rounded-xl bg-slate-50/80 p-3 ring-1 ring-slate-900/5">
            <p className="truncate text-sm font-semibold text-on-background">{DIRECT_VENDOR.product}</p>
            <p className="truncate text-xs text-slate-500">{DIRECT_VENDOR.name}</p>
            <p className="mt-1 whitespace-nowrap text-lg font-black text-primary">{DIRECT_VENDOR.price}</p>
          </div>
        </div>
      </motion.button>

      <motion.button
        type="button"
        disabled={disabled}
        onClick={onPostRequest}
        whileHover={{ y: -6, rotateX: 4, rotateY: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className={cn(
          'group relative flex h-full min-h-[280px] overflow-hidden rounded-2xl bg-gradient-to-b from-violet-400/30 to-transparent p-[1px] text-left shadow-[0_20px_40px_-16px_rgba(109,40,217,0.22)]',
          disabled && 'pointer-events-none opacity-60',
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative flex h-full w-full flex-col rounded-2xl bg-white/90 p-5 ring-1 ring-white/80 backdrop-blur-xl">
          <div className="mb-4 flex items-start justify-between gap-2">
            <IconBox size="md" className="bg-gradient-to-br from-violet-50 to-violet-100 ring-violet-500/15">
              <Icon name="gavel" className="size-6 text-violet-600" />
            </IconBox>
            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700">
              Service Bidding
            </span>
          </div>
          <h3 className="mb-1 font-headline-md text-headline-md text-on-background">Post Service Request</h3>
          <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-500">
            Receive competitive bids from verified Guinea vendors.
          </p>
          <div className="mt-auto flex min-h-[5.5rem] items-center gap-2 rounded-xl bg-violet-50/80 p-3 ring-1 ring-violet-500/10">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="size-2 shrink-0 rounded-full bg-violet-500"
            />
            <p className="text-xs font-medium text-violet-800">3 vendors ready to bid</p>
          </div>
        </div>
      </motion.button>
    </div>
  );
}

function BidCard({
  vendor,
  onAccept,
  disabled,
}: {
  vendor: DemoVendor;
  onAccept: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.div
      variants={bidItemVariants}
      layout
      className="w-full rounded-2xl bg-gradient-to-b from-slate-200/70 to-transparent p-[1px] shadow-[0_12px_28px_-12px_rgba(70,72,212,0.2)]"
    >
      <div className="flex flex-col gap-3 rounded-2xl bg-white/90 p-4 ring-1 ring-white/80 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="size-1.5 shrink-0 rounded-full bg-emerald-400"
            />
            <p className="truncate text-sm font-semibold text-on-background">{vendor.name}</p>
          </div>
          <p className="truncate text-xs text-slate-500">{vendor.product}</p>
          <p className="mt-1 whitespace-nowrap text-base font-black text-primary">{vendor.price}</p>
        </div>
        <Button onClick={onAccept} disabled={disabled} className="w-full shrink-0 sm:w-auto">
          <Icon name="task_alt" className="size-4" />
          Accept Bid
        </Button>
      </div>
    </motion.div>
  );
}

function BiddingList({
  bids,
  onAcceptBid,
  disabled,
}: {
  bids: DemoVendor[];
  onAcceptBid: (v: DemoVendor) => void;
  disabled?: boolean;
}) {
  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-violet-50 ring-1 ring-violet-500/15"
        >
          <Icon name="gavel" className="size-5 text-violet-600" />
        </motion.div>
        <h3 className="mb-1 font-headline-md text-headline-md text-on-background">Incoming Bids</h3>
        <p className="text-xs text-slate-500">Compare offers from verified Guinea vendors</p>
      </div>
      <motion.div variants={bidListVariants} initial="hidden" animate="show" className="space-y-3">
        {bids.map((vendor) => (
          <BidCard
            key={vendor.name}
            vendor={vendor}
            disabled={disabled}
            onAccept={() => onAcceptBid(vendor)}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function DemoBuyerTab() {
  const {
    step,
    bids,
    activeVendor,
    error,
    isProcessing,
    startBidding,
    acceptBid,
    placeOrder,
    releaseFunds,
    reset,
    clearError,
  } = useEscrowStore();
  const [enteredCode, setEnteredCode] = useState('');

  const handleRelease = () => {
    releaseFunds(enteredCode);
  };

  const handleReset = () => {
    reset();
    setEnteredCode('');
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        {...stepTransition}
        className="relative flex min-h-[360px] w-full flex-col items-center gap-6 py-4 [perspective:1000px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence>
          {isProcessing && (step === 'idle' || step === 'bidding') && (
            <ProcessingOverlay message="Securing funds in Vault..." />
          )}
        </AnimatePresence>
        {step === 'released' && (
          <>
            <motion.div
              initial={{ scale: 0.6, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="relative flex size-20 items-center justify-center rounded-2xl bg-emerald-50 ring-2 ring-emerald-400/40"
              style={{ boxShadow: '0 0 40px -4px rgba(52, 211, 153, 0.55)' }}
            >
              <Icon name="verified" className="size-9 text-emerald-600" />
            </motion.div>
            <div className="max-w-sm text-center">
              <h3 className="mb-2 font-headline-md text-headline-md text-on-background">Payment Released</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                <span className="whitespace-nowrap font-semibold text-primary">{activeVendor.price}</span> released
                to {activeVendor.name}.
              </p>
            </div>
            <Button variant="outline" onClick={handleReset}>
              Start New Demo
            </Button>
          </>
        )}

        {step === 'idle' && (
          <IdleChoiceGrid
            disabled={isProcessing}
            onBuyDirect={() => placeOrder(DIRECT_VENDOR)}
            onPostRequest={startBidding}
          />
        )}

        {step === 'bidding' && (
          <BiddingList bids={bids} disabled={isProcessing} onAcceptBid={acceptBid} />
        )}

        {(step === 'locked' || step === 'delivered') && (
          <>
            <EscrowStatusCard />
            {step === 'locked' && <SecretCodeDisplay />}
            {step === 'delivered' && (
              <div className="w-full max-w-md space-y-4">
                <p className="text-center text-xs font-medium text-slate-600">
                  Enter your 6-digit completion code to release funds
                </p>
                <motion.div
                  animate={error ? { x: [-10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <PinPadInput
                    value={enteredCode}
                    disabled={isProcessing}
                    onChange={(v) => {
                      setEnteredCode(v);
                      if (error) clearError();
                    }}
                    error={error}
                  />
                </motion.div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-xs text-error"
                  >
                    {error}
                  </motion.p>
                )}
                <Button
                  onClick={handleRelease}
                  disabled={isProcessing || enteredCode.length !== 6}
                  className="w-full justify-center py-3.5"
                >
                  <Icon name="account_balance_wallet" className="size-5" />
                  Release Funds
                </Button>
              </div>
            )}
            {step === 'locked' && (
              <p className="max-w-sm text-center text-xs leading-relaxed text-slate-500">
                Switch to <span className="font-semibold text-primary">Seller</span> → Mark as Delivered
              </p>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
