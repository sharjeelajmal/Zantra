import { create } from 'zustand';
import { demoVendors, type DemoVendor } from '@/lib/content';

export type EscrowStep = 'idle' | 'bidding' | 'locked' | 'delivered' | 'released';

const DEFAULT_VENDOR = demoVendors[0];
const INVALID_CODE_MESSAGE = 'Invalid completion code. Please try again.';
const PROCESSING_DELAY_MS = 1500;

function generateSecretCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function lockEscrow(vendor: DemoVendor) {
  return {
    step: 'locked' as const,
    activeVendor: vendor,
    secretCode: generateSecretCode(),
    error: null,
  };
}

interface EscrowState {
  step: EscrowStep;
  bids: DemoVendor[];
  activeVendor: DemoVendor;
  secretCode: string;
  error: string | null;
  isProcessing: boolean;
  startBidding: () => void;
  acceptBid: (vendor: DemoVendor) => void;
  placeOrder: (vendor: DemoVendor) => void;
  markDelivered: () => void;
  releaseFunds: (enteredCode: string) => void;
  clearError: () => void;
  reset: () => void;
}

export const useEscrowStore = create<EscrowState>((set, get) => ({
  step: 'idle',
  bids: [],
  activeVendor: DEFAULT_VENDOR,
  secretCode: '',
  error: null,
  isProcessing: false,

  startBidding: () => {
    const { step, isProcessing } = get();
    if (step !== 'idle' || isProcessing) return;
    set({ step: 'bidding', bids: [...demoVendors], error: null });
  },

  acceptBid: (vendor) => {
    const { step, isProcessing } = get();
    if (step !== 'bidding' || isProcessing) return;

    set({ isProcessing: true, error: null });
    setTimeout(() => {
      set({ ...lockEscrow(vendor), isProcessing: false });
    }, PROCESSING_DELAY_MS);
  },

  placeOrder: (vendor) => {
    const { step, isProcessing } = get();
    if (step !== 'idle' || isProcessing) return;

    set({ isProcessing: true, error: null });
    setTimeout(() => {
      set({ ...lockEscrow(vendor), isProcessing: false });
    }, PROCESSING_DELAY_MS);
  },

  markDelivered: () => {
    const { step, isProcessing } = get();
    if (step !== 'locked' || isProcessing) return;
    set({ step: 'delivered', error: null });
  },

  releaseFunds: (enteredCode) => {
    const { step, secretCode, isProcessing } = get();
    if (step !== 'delivered' || isProcessing) return;

    const normalized = enteredCode.replace(/\D/g, '');
    if (normalized === secretCode) {
      set({ isProcessing: true, error: null });
      setTimeout(() => {
        set({ step: 'released', isProcessing: false, error: null });
      }, PROCESSING_DELAY_MS);
      return;
    }

    set({ error: INVALID_CODE_MESSAGE });
  },

  clearError: () => set({ error: null }),

  reset: () => {
    set({
      step: 'idle',
      bids: [],
      activeVendor: DEFAULT_VENDOR,
      secretCode: '',
      error: null,
      isProcessing: false,
    });
  },
}));
