import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type IconName =
  | 'verified_user'
  | 'psychology'
  | 'task_alt'
  | 'payments'
  | 'warning'
  | 'no_accounts'
  | 'gavel'
  | 'shield_lock'
  | 'pin'
  | 'account_balance_wallet'
  | 'balance'
  | 'flag'
  | 'visibility'
  | 'favorite'
  | 'shopping_cart'
  | 'storefront'
  | 'arrow_forward'
  | 'play_arrow'
  | 'play_circle'
  | 'verified'
  | 'menu'
  | 'add'
  | 'remove'
  | 'mail'
  | 'public'
  | 'groups'
  | 'share'
  | 'hub'
  | 'rocket_launch'
  | 'arrow_right'
  | 'close'
  | 'package'
  | 'banknote'
  | 'cursor_click'
  | 'step_discover'
  | 'step_pay'
  | 'step_escrow'
  | 'step_code'
  | 'step_confirm'
  | 'step_receipt'
  | 'search'
  | 'card'
  | 'escrow_vault'
  | 'enter_code';

/** Encode path segments so spaces / parentheses resolve correctly */
function assetUrl(filename: string) {
  return `/assets/Icons/${filename.split('/').map(encodeURIComponent).join('/')}`;
}

/**
 * Canonical IconName → exact 3D PNG filename in /public/assets/Icons
 */
const ICON_FILE: Record<string, string> = {
  // How-it-works + aliases
  step_discover: 'Magnifying glass.png',
  search: 'Magnifying glass.png',
  step_pay: 'Secure credit card.png',
  card: 'Secure credit card.png',
  step_escrow: 'Secure bank.png',
  escrow_vault: 'Secure bank.png',
  step_confirm: 'Cardboard delivery.png',
  package: 'Cardboard delivery.png',
  step_code: 'phonemobile.png',
  enter_code: 'phonemobile.png',
  step_receipt: '(GNF) currency.png',
  banknote: '(GNF) currency.png',

  // Feature / marketing keys
  shield_lock: 'Secure bank.png',
  pin: 'phonemobile.png',
  gavel: 'Legal court judge gavel.png',
  account_balance_wallet: 'Wallet.png',
  verified_user: 'Shield with a checkmark.png',
  balance: 'Handshake.png',
  storefront: 'Storefront.png',
  verified: 'Verified user badge.png',
  shopping_cart: 'Buyer.png',

  // Additional site-wide mappings
  psychology: 'Magnifying glass.png',
  task_alt: 'Handshake.png',
  payments: 'Secure credit card.png',
  warning: 'Closed security padlock.png',
  no_accounts: 'Buyer.png',
  flag: 'Five-star rating.png',
  visibility: 'Magnifying glass.png',
  favorite: 'Five-star rating.png',
  mail: 'phonemobile.png',
  public: 'Secure bank.png',
  groups: 'Handshake.png',
  share: 'Handshake.png',
  hub: 'Secure bank.png',
  rocket_launch: 'Delivery truck.png',
  cursor_click: 'Magnifying glass.png',
};

const DEFAULT_FILE = 'Secure bank.png';

/** Tiny UI chrome — stroke SVGs (no 3D PNG for these controls) */
const CHROME_ICONS = new Set([
  'menu',
  'close',
  'add',
  'remove',
  'arrow_forward',
  'arrow_right',
  'play_arrow',
  'play_circle',
]);

export interface IconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'name'> {
  name: IconName | string;
  className?: string;
  alt?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
}

function ChromeSvg({ name, className }: { name: string; className?: string }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: cn('shrink-0', className),
    'aria-hidden': true as const,
  };

  switch (name) {
    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case 'add':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'remove':
      return (
        <svg {...common}>
          <path d="M5 12h14" />
        </svg>
      );
    case 'arrow_forward':
    case 'arrow_right':
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case 'play_arrow':
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M8 5v14l11-7-11-7z" />
        </svg>
      );
    case 'play_circle':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export function Icon({
  name,
  className,
  alt = '',
  strokeWidth: _strokeWidth,
  absoluteStrokeWidth: _absoluteStrokeWidth,
  ...props
}: IconProps) {
  if (CHROME_ICONS.has(name)) {
    return <ChromeSvg name={name} className={className} />;
  }

  const src = ICON_FILE[name] ? assetUrl(ICON_FILE[name]) : assetUrl(DEFAULT_FILE);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={cn('shrink-0 object-contain', className)}
      {...props}
    />
  );
}
