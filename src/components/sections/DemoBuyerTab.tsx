'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { IconBox } from '@/components/ui/IconBox';
import { demoVendors, type DemoVendor } from '@/lib/content';
import { useEscrowStore } from '@/lib/store/useEscrowStore';
import { cn, parseGnfAndCalculateFees } from '@/lib/utils';

const DIRECT_VENDOR = demoVendors[0];

type BuyerPhase = 'selection' | 'direct_search' | 'direct_catalog' | 'direct_checkout' | 'bidding_setup';

const phaseTransition = {
  initial: { opacity: 0, y: 16, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
};

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

const CATALOG_ITEMS = [
  { name: 'Cement (50kg Bag)', price: '95,000 GNF (~$11 USD)', highlight: true },
  { name: 'Cement (25kg Bag)', price: '52,000 GNF (~$6 USD)', highlight: false },
  { name: 'Sand (1 ton)', price: '180,000 GNF (~$21 USD)', highlight: false },
];

function PhaseBackButton({ onClick, label = 'Back' }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-primary"
    >
      <Icon name="arrow_forward" className="size-3 rotate-180" />
      {label}
    </button>
  );
}

function EscrowStatusCard() {
  const { activeVendor, step } = useEscrowStore();
  const fees = parseGnfAndCalculateFees(activeVendor.price);

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
              <IconBox size="sm" className="!size-11 !rounded-xl bg-transparent ring-0 shadow-none">
                <Icon name="shield_lock" className="size-9 drop-shadow-[0_6px_12px_rgba(15,23,42,0.16)]" />
              </IconBox>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Escrow Active</p>
                <p className="truncate whitespace-nowrap text-xs font-semibold text-slate-900">{fees.buyerTotal}</p>
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
                {step === 'delivered' ? 'Awaiting Seller Code Entry' : 'Awaiting Delivery'}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50/90 p-3.5 ring-1 ring-slate-900/5">
            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Transaction Breakdown
            </p>
            <div className="space-y-2">
              <div className="flex justify-between gap-2 text-xs">
                <span className="text-slate-500">Base Price</span>
                <span className="whitespace-nowrap font-medium text-slate-900">{fees.baseAmount}</span>
              </div>
              <div className="flex justify-between gap-2 text-xs">
                <span className="text-slate-500">Platform Fee (2%)</span>
                <span className="whitespace-nowrap font-medium text-amber-700">+{fees.platformFee}</span>
              </div>
              <div className="flex justify-between gap-2 border-t border-slate-200/80 pt-2 text-xs">
                <span className="font-semibold text-slate-700">Total Paid</span>
                <span className="whitespace-nowrap font-bold text-primary">{fees.buyerTotal}</span>
              </div>
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
      <p className="mb-3 text-center text-xs font-medium leading-relaxed text-slate-500">
        Share this code with the seller ONLY after you receive the product/service.
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
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary/5 px-3 py-2.5 text-xs font-semibold text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] ring-1 ring-primary/10"
      >
        <Icon name="pin" className="size-5 drop-shadow-[0_4px_8px_rgba(15,23,42,0.14)]" />
        {copied ? 'Copied!' : 'Copy Code'}
      </motion.button>
    </motion.div>
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
          <Icon name="hub" className="size-14 drop-shadow-[0_8px_16px_rgba(15,23,42,0.18)]" />
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
    <motion.div
      key="selection"
      layoutId="buyer-phase-shell"
      {...phaseTransition}
      className="grid w-full max-w-2xl grid-cols-1 items-stretch gap-4 sm:grid-cols-2"
    >
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
            <IconBox size="md" className="!size-16 !rounded-2xl bg-transparent ring-0 shadow-none">
              <Icon name="shopping_cart" className="size-12 drop-shadow-[0_8px_16px_rgba(15,23,42,0.16)]" />
            </IconBox>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Fixed Price
            </span>
          </div>
          <h3 className="mb-1 font-headline-md text-headline-md text-on-background">Buy Direct</h3>
          <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-500">
            Search vendors, browse catalog, then lock escrow at the listed price.
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
            <IconBox size="md" className="!size-16 !rounded-2xl bg-transparent ring-0 shadow-none">
              <Icon name="gavel" className="size-12 drop-shadow-[0_8px_16px_rgba(15,23,42,0.16)]" />
            </IconBox>
            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700">
              Service Bidding
            </span>
          </div>
          <h3 className="mb-1 font-headline-md text-headline-md text-on-background">Post Service Request</h3>
          <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-500">
            Set location, category, and budget — then receive competitive bids.
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
    </motion.div>
  );
}

function DirectSearchPhase({
  onSelectVendor,
  onBack,
}: {
  onSelectVendor: (vendor: DemoVendor) => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      key="direct_search"
      layoutId="buyer-phase-shell"
      {...phaseTransition}
      className="w-full max-w-lg space-y-4"
    >
      <div className="flex items-center justify-between">
        <PhaseBackButton onClick={onBack} />
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Step 1 · Search</p>
      </div>

      <div className="rounded-2xl bg-white/90 p-4 shadow-[0_12px_32px_-16px_rgba(70,72,212,0.22)] ring-1 ring-slate-900/5 backdrop-blur-xl">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          Search Location
        </label>
        <div className="flex items-center gap-2 rounded-xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-900/5">
          <Icon name="search" className="size-5 shrink-0 drop-shadow-[0_4px_8px_rgba(15,23,42,0.14)]" />
          <span className="text-sm font-semibold text-on-background">Conakry</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            className="ml-0.5 inline-block h-4 w-0.5 bg-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="px-1 text-xs font-medium text-slate-500">Vendors near Conakry</p>
        {demoVendors.map((vendor, i) => {
          const isMike = vendor.name === DIRECT_VENDOR.name;
          return (
            <motion.button
              key={vendor.name}
              type="button"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                if (isMike) onSelectVendor(vendor);
              }}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl bg-white/90 px-4 py-3.5 text-left shadow-[0_8px_24px_-14px_rgba(70,72,212,0.2)] ring-1 ring-slate-900/5 backdrop-blur-xl transition-all',
                isMike
                  ? 'hover:ring-primary/25 hover:shadow-[0_12px_28px_-12px_rgba(70,72,212,0.28)]'
                  : 'opacity-60',
              )}
            >
              <IconBox size="sm" className="!size-11 shrink-0 bg-transparent ring-0 shadow-none">
                <Icon
                  name={isMike ? 'storefront' : 'shopping_cart'}
                  className="size-8 drop-shadow-[0_4px_8px_rgba(15,23,42,0.14)]"
                />
              </IconBox>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-on-background">{vendor.name}</p>
                <p className="truncate text-xs text-slate-500">
                  {vendor.category} · Conakry
                </p>
              </div>
              {isMike ? (
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  Select
                </span>
              ) : (
                <span className="shrink-0 text-[10px] font-medium text-slate-400">Nearby</span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function DirectCatalogPhase({
  onSelectProduct,
  onBack,
}: {
  onSelectProduct: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      key="direct_catalog"
      layoutId="buyer-phase-shell"
      {...phaseTransition}
      className="w-full max-w-lg space-y-4"
    >
      <div className="flex items-center justify-between">
        <PhaseBackButton onClick={onBack} />
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Step 2 · Catalog</p>
      </div>

      <div className="rounded-2xl bg-white/90 p-5 shadow-[0_12px_32px_-16px_rgba(70,72,212,0.22)] ring-1 ring-slate-900/5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-3">
          <IconBox size="md" className="!size-14 bg-transparent ring-0 shadow-none">
            <Icon name="storefront" className="size-11 drop-shadow-[0_6px_12px_rgba(15,23,42,0.16)]" />
          </IconBox>
          <div className="min-w-0">
            <p className="text-sm font-bold text-on-background">{DIRECT_VENDOR.name}</p>
            <p className="text-xs text-slate-500">{DIRECT_VENDOR.category} · Conakry</p>
          </div>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-500/15">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Verified
          </span>
        </div>

        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Products</p>
        <div className="space-y-2">
          {CATALOG_ITEMS.map((item, i) => (
            <motion.button
              key={item.name}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={item.highlight ? { y: -2 } : undefined}
              whileTap={item.highlight ? { scale: 0.99 } : undefined}
              disabled={!item.highlight}
              onClick={() => {
                if (item.highlight) onSelectProduct();
              }}
              className={cn(
                'flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left ring-1 backdrop-blur-sm transition-all',
                item.highlight
                  ? 'bg-primary/[0.06] ring-primary/20 shadow-[0_8px_20px_-12px_rgba(70,72,212,0.3)]'
                  : 'bg-slate-50/80 ring-slate-900/5 opacity-55',
              )}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-on-background">{item.name}</p>
                <p className="whitespace-nowrap text-xs font-bold text-primary">{item.price}</p>
              </div>
              {item.highlight && (
                <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white">
                  Select
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function DirectCheckoutPhase({
  onProceed,
  onBack,
  disabled,
}: {
  onProceed: () => void;
  onBack: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.div
      key="direct_checkout"
      layoutId="buyer-phase-shell"
      {...phaseTransition}
      className="w-full max-w-md space-y-4"
    >
      <div className="flex items-center justify-between">
        <PhaseBackButton onClick={onBack} />
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Step 3 · Checkout</p>
      </div>

      <div className="rounded-2xl bg-white/90 p-5 shadow-[0_16px_40px_-18px_rgba(70,72,212,0.28)] ring-1 ring-slate-900/5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <Icon name="shopping_cart" className="size-8 drop-shadow-[0_4px_8px_rgba(15,23,42,0.14)]" />
          <div>
            <h3 className="text-sm font-bold text-on-background">Order Summary</h3>
            <p className="text-xs text-slate-500">{DIRECT_VENDOR.name}</p>
          </div>
        </div>

        <div className="space-y-3 rounded-xl bg-slate-50/90 p-3.5 ring-1 ring-slate-900/5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-on-background">Cement (50kg Bag)</p>
              <p className="text-xs text-slate-500">Building Materials</p>
            </div>
            <p className="shrink-0 whitespace-nowrap text-sm font-bold text-primary">95,000 GNF (~$11 USD)</p>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-200/70 pt-3">
            <span className="text-xs font-medium text-slate-500">Quantity</span>
            <div className="inline-flex items-center gap-3 rounded-xl bg-white px-3 py-1.5 ring-1 ring-slate-900/5">
              <span className="text-sm font-bold text-slate-300">−</span>
              <span className="min-w-[1.25rem] text-center text-sm font-bold text-on-background">1</span>
              <span className="text-sm font-bold text-slate-300">+</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-200/70 pt-3">
            <span className="text-xs font-semibold text-slate-700">Total Price</span>
            <span className="whitespace-nowrap text-base font-black text-primary">95,000 GNF (~$11 USD)</span>
          </div>
        </div>

        <Button
          onClick={onProceed}
          disabled={disabled}
          className="mt-5 w-full justify-center py-3.5"
        >
          <Icon name="shield_lock" className="size-5 drop-shadow-[0_4px_8px_rgba(15,23,42,0.14)]" />
          Proceed to Payment
        </Button>
      </div>
    </motion.div>
  );
}

function BiddingSetupPhase({
  onSubmit,
  onBack,
  disabled,
}: {
  onSubmit: () => void;
  onBack: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.div
      key="bidding_setup"
      layoutId="buyer-phase-shell"
      {...phaseTransition}
      className="w-full max-w-md space-y-4"
    >
      <div className="flex items-center justify-between">
        <PhaseBackButton onClick={onBack} />
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-500">Service Request</p>
      </div>

      <div className="rounded-2xl bg-white/90 p-5 shadow-[0_16px_40px_-18px_rgba(109,40,217,0.22)] ring-1 ring-slate-900/5 backdrop-blur-xl">
        <div className="mb-5 flex items-center gap-2.5">
          <IconBox size="sm" className="!size-11 bg-transparent ring-0 shadow-none">
            <Icon name="gavel" className="size-9 drop-shadow-[0_4px_8px_rgba(15,23,42,0.14)]" />
          </IconBox>
          <div>
            <h3 className="text-sm font-bold text-on-background">Post a Service Request</h3>
            <p className="text-xs text-slate-500">Get competitive bids from verified vendors</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Search Location
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-900/5">
              <Icon name="search" className="size-5 shrink-0" />
              <span className="text-sm font-semibold text-on-background">Conakry</span>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Select Category
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-violet-50/80 px-3 py-3 ring-1 ring-violet-500/15">
              <Icon name="hub" className="size-5 shrink-0" />
              <span className="text-sm font-semibold text-violet-900">Paint</span>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Enter Budget
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-slate-50/90 px-3 py-3 ring-1 ring-slate-900/5">
              <Icon name="account_balance_wallet" className="size-5 shrink-0" />
              <span className="text-sm font-bold text-on-background">2,000,000 GNF (~$235 USD)</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onSubmit}
          disabled={disabled}
          className="mt-5 w-full justify-center py-3.5"
        >
          <Icon name="gavel" className="size-5 drop-shadow-[0_4px_8px_rgba(15,23,42,0.14)]" />
          Submit Request
        </Button>
      </div>
    </motion.div>
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
          <Icon name="task_alt" className="size-5 drop-shadow-[0_4px_8px_rgba(15,23,42,0.14)]" />
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
          className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-transparent"
        >
          <Icon name="gavel" className="size-12 drop-shadow-[0_8px_16px_rgba(15,23,42,0.16)]" />
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
    isProcessing,
    startBidding,
    acceptBid,
    placeOrder,
    reset,
  } = useEscrowStore();

  const [buyerPhase, setBuyerPhase] = useState<BuyerPhase>('selection');
  const fees = parseGnfAndCalculateFees(activeVendor.price);

  const handleReset = () => {
    reset();
    setBuyerPhase('selection');
  };

  const handleProceedToPayment = () => {
    placeOrder(DIRECT_VENDOR);
    setBuyerPhase('selection');
  };

  const handleSubmitBidding = () => {
    startBidding();
    setBuyerPhase('selection');
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step === 'withdrawn' ? 'released' : step}
        {...stepTransition}
        className="relative flex min-h-[360px] w-full flex-col items-center gap-6 py-4 [perspective:1000px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <AnimatePresence>
          {isProcessing && (step === 'idle' || step === 'bidding') && (
            <ProcessingOverlay
              message={
                step === 'bidding' || buyerPhase === 'bidding_setup'
                  ? 'Posting service request...'
                  : 'Securing funds in Vault...'
              }
            />
          )}
        </AnimatePresence>

        {(step === 'released' || step === 'withdrawn') && (
          <>
            <motion.div
              initial={{ scale: 0.6, rotateY: -90 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="relative flex size-20 items-center justify-center rounded-2xl bg-emerald-50 ring-2 ring-emerald-400/40"
              style={{ boxShadow: '0 0 40px -4px rgba(52, 211, 153, 0.55)' }}
            >
              <Icon name="verified" className="size-14 drop-shadow-[0_8px_16px_rgba(15,23,42,0.16)]" />
            </motion.div>
            <div className="max-w-sm text-center">
              <h3 className="mb-2 font-headline-md text-headline-md text-on-background">Payment Released</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Escrow settled. Seller received{' '}
                <span className="whitespace-nowrap font-semibold text-primary">{fees.sellerNet}</span> after fees.
              </p>
            </div>
            <Button variant="outline" onClick={handleReset}>
              Start New Demo
            </Button>
          </>
        )}

        {step === 'idle' && (
          <AnimatePresence mode="wait">
            {buyerPhase === 'selection' && (
              <IdleChoiceGrid
                disabled={isProcessing}
                onBuyDirect={() => setBuyerPhase('direct_search')}
                onPostRequest={() => setBuyerPhase('bidding_setup')}
              />
            )}

            {buyerPhase === 'direct_search' && (
              <DirectSearchPhase
                onBack={() => setBuyerPhase('selection')}
                onSelectVendor={() => setBuyerPhase('direct_catalog')}
              />
            )}

            {buyerPhase === 'direct_catalog' && (
              <DirectCatalogPhase
                onBack={() => setBuyerPhase('direct_search')}
                onSelectProduct={() => setBuyerPhase('direct_checkout')}
              />
            )}

            {buyerPhase === 'direct_checkout' && (
              <DirectCheckoutPhase
                disabled={isProcessing}
                onBack={() => setBuyerPhase('direct_catalog')}
                onProceed={handleProceedToPayment}
              />
            )}

            {buyerPhase === 'bidding_setup' && (
              <BiddingSetupPhase
                disabled={isProcessing}
                onBack={() => setBuyerPhase('selection')}
                onSubmit={handleSubmitBidding}
              />
            )}
          </AnimatePresence>
        )}

        {step === 'bidding' && (
          <BiddingList bids={bids} disabled={isProcessing} onAcceptBid={acceptBid} />
        )}

        {(step === 'locked' || step === 'delivered') && (
          <>
            <EscrowStatusCard />
            <SecretCodeDisplay />
            {step === 'locked' && (
              <p className="max-w-sm text-center text-xs leading-relaxed text-slate-500">
                Switch to <span className="font-semibold text-primary">Seller</span> → Mark as Delivered
              </p>
            )}
            {step === 'delivered' && (
              <p className="max-w-sm text-center text-xs leading-relaxed text-slate-500">
                Share your code with the seller so they can release funds.
              </p>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
