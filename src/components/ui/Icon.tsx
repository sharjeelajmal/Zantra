import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Brain,
  CircleCheck,
  CirclePlay,
  CreditCard,
  Eye,
  Flag,
  Gavel,
  Globe,
  Heart,
  KeyRound,
  Mail,
  Menu,
  Minus,
  MousePointerClick,
  Network,
  Package,
  Play,
  Plus,
  Rocket,
  Scale,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Store,
  TriangleAlert,
  UserCheck,
  UserX,
  Users,
  Wallet,
  X,
} from 'lucide-react';
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
  | 'cursor_click';

export interface IconProps extends LucideProps {
  name: IconName | string;
  className?: string;
}

const ICON_MAP: Record<IconName, LucideIcon> = {
  verified_user: UserCheck,
  psychology: Brain,
  task_alt: CircleCheck,
  payments: CreditCard,
  warning: TriangleAlert,
  no_accounts: UserX,
  gavel: Gavel,
  shield_lock: ShieldCheck,
  pin: KeyRound,
  account_balance_wallet: Wallet,
  balance: Scale,
  flag: Flag,
  visibility: Eye,
  favorite: Heart,
  shopping_cart: ShoppingCart,
  storefront: Store,
  arrow_forward: ArrowRight,
  play_arrow: Play,
  play_circle: CirclePlay,
  verified: BadgeCheck,
  menu: Menu,
  add: Plus,
  remove: Minus,
  mail: Mail,
  public: Globe,
  groups: Users,
  share: Share2,
  hub: Network,
  rocket_launch: Rocket,
  arrow_right: ArrowRight,
  close: X,
  package: Package,
  banknote: Banknote,
  cursor_click: MousePointerClick,
};

const DEFAULT_ICON = Network;

export function Icon({ name, className, strokeWidth = 1.5, ...props }: IconProps) {
  const LucideComponent = ICON_MAP[name as IconName] ?? DEFAULT_ICON;

  return (
    <LucideComponent
      className={cn('shrink-0', className)}
      strokeWidth={strokeWidth}
      aria-hidden
      {...props}
    />
  );
}
