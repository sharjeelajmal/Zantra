export interface NavLink {
  href: string;
  label: string;
}

export interface IconLabelItem {
  icon: string;
  label: string;
}

export interface ProblemCard {
  icon: string;
  title: string;
  description: string;
}

export interface Step {
  num: string;
  title: string;
  description: string;
}

export interface Feature {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
}

export interface AboutItem {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
  sub: string;
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status: string | null;
  active: boolean;
}

export interface DemoTabContent {
  icon: string;
  title: string;
  description: string;
}

export interface DemoVendor {
  name: string;
  category: string;
  product: string;
  price: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EscrowRow {
  label: string;
  value: string;
  highlight?: boolean;
  warn?: boolean;
}

export const navLinks: NavLink[] = [
  { href: '#features', label: 'Product' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#features', label: 'Features' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
];

export const heroTrustBadges: IconLabelItem[] = [
  { icon: 'verified_user', label: 'Escrow-Protected' },
  { icon: 'psychology', label: 'AI Fraud Shield' },
  { icon: 'task_alt', label: 'Verified African Vendors' },
];

export const heroCodeDigits = ['8', '4', '2', '7', '1', '9'];

export const escrowRows: EscrowRow[] = [
  { label: 'Product', value: 'Cement (50kg Bag)' },
  { label: 'Amount', value: '95,000 GNF', highlight: true },
  { label: 'Status', value: 'Awaiting Delivery', warn: true },
];

export const demoVendors: DemoVendor[] = [
  {
    name: 'Diallo Cement Supply',
    category: 'Building Materials',
    product: 'Cement (50kg Bag)',
    price: '95,000 GNF',
  },
  {
    name: 'Bah Paint Services',
    category: 'Home Services',
    product: 'Interior & Exterior Painting',
    price: '1,500,000 GNF',
  },
  {
    name: 'Camara Bulk Foods',
    category: 'Bulk Food Supplier',
    product: 'Rice (50kg Bag)',
    price: '450,000 GNF',
  },
];

export const problemCards: ProblemCard[] = [
  {
    icon: 'payments',
    title: 'Cash-Before-Delivery Risk',
    description:
      'Across Guinea and West Africa, buyers routinely pay upfront via mobile money with no guarantee that goods or services will arrive as promised.',
  },
  {
    icon: 'warning',
    title: 'P2P Fraud & Scams',
    description:
      'Informal peer-to-peer commerce lacks trust rails — impersonation, fake listings, and payment disputes cost communities millions in lost capital annually.',
  },
  {
    icon: 'no_accounts',
    title: 'Unverified Vendors',
    description:
      'Small businesses and independent sellers operate without identity verification, making it impossible for buyers to distinguish legitimate vendors from bad actors.',
  },
  {
    icon: 'gavel',
    title: 'No Escrow Infrastructure',
    description:
      'Africa’s fastest-growing digital economy runs on mobile money, yet lacks the escrow and dispute-resolution layer that institutional investors and consumers demand.',
  },
];

export const steps: Step[] = [
  {
    num: '01',
    title: 'Discover Verified Vendors',
    description:
      'Browse escrow-protected listings from verified African vendors — building materials, food supply, home services, and more.',
  },
  {
    num: '02',
    title: 'Order & Pay Securely',
    description:
      'Complete your purchase via mobile money or local payment rails. Funds are never released directly to the seller.',
  },
  {
    num: '03',
    title: 'Escrow Vault Activates',
    description:
      'Payment is locked in Zantrra’s escrow vault — fully protected in GNF until delivery is independently confirmed.',
  },
  {
    num: '04',
    title: '6-Digit Code Issued',
    description:
      'A unique completion code is generated for the buyer and held privately until goods or services are verified.',
  },
  {
    num: '05',
    title: 'Confirm & Release',
    description:
      'Once satisfied with delivery, the buyer shares the code — triggering instant, auditable payment release to the vendor.',
  },
  {
    num: '06',
    title: 'Receipt & Reputation',
    description:
      'Both parties receive a verified transaction receipt. Vendor trust scores update in real time for future buyers.',
  },
];

export const demoContent: Record<'buyer' | 'seller', DemoTabContent> = {
  buyer: {
    icon: 'shopping_cart',
    title: 'Buy with confidence in Guinea',
    description:
      'Source cement, bulk food, or home services from verified local vendors — your funds stay in escrow until you confirm delivery.',
  },
  seller: {
    icon: 'storefront',
    title: 'Sell to a trusted market',
    description:
      'List products and services, fulfill orders, and receive instant GNF payment once the buyer confirms — with zero chargeback risk.',
  },
};

export const features: Feature[] = [
  {
    icon: 'shield_lock',
    iconBg: 'bg-[#eef2ff]',
    title: 'Escrow-First Architecture',
    description:
      'Purpose-built trust infrastructure for peer-to-peer commerce — every transaction secured in a regulated escrow vault before release.',
  },
  {
    icon: 'pin',
    iconBg: 'bg-emerald-50',
    title: '6-Digit Completion Code',
    description:
      'Cryptographic proof of delivery ensures funds move only when the buyer explicitly authorizes release — eliminating premature payouts.',
  },
  {
    icon: 'gavel',
    iconBg: 'bg-orange-50',
    title: 'Service Bidding Marketplace',
    description:
      'Post procurement requests for painting, construction, and logistics — receive competitive bids from verified vendors across Guinea.',
  },
  {
    icon: 'account_balance_wallet',
    iconBg: 'bg-fuchsia-50',
    title: 'Mobile Money & GNF Wallet',
    description:
      'Native integration with Orange Money, MTN MoMo, and local bank rails — deposit, hold, and withdraw in Guinean Francs with minimal friction.',
  },
  {
    icon: 'psychology',
    iconBg: 'bg-blue-50',
    title: 'AI Trust & Fraud Engine',
    description:
      'Machine-learning models analyze vendor behavior, transaction patterns, and identity signals to flag fraud before funds are at risk.',
  },
  {
    icon: 'balance',
    iconBg: 'bg-rose-50',
    title: 'Structured Dispute Resolution',
    description:
      'Evidence-based mediation with trained arbitrators — fair outcomes for buyers and sellers when delivery disputes arise.',
  },
];

export const aboutItems: AboutItem[] = [
  {
    icon: 'flag',
    title: 'Mission',
    description:
      'To build Africa’s trust layer for peer-to-peer commerce — starting in Guinea — by making escrow protection as accessible as a mobile money transfer.',
  },
  {
    icon: 'visibility',
    title: 'Vision',
    description:
      'A continent where 1.4 billion people transact with verified vendors, institutional-grade escrow, and zero fear — unlocking billions in informal commerce.',
  },
  {
    icon: 'favorite',
    title: 'Values',
    description:
      'Financial inclusion, vendor dignity, and transaction transparency. We hold every escrow to the same standard we hold ourselves accountable to investors.',
  },
];

export const stats: Stat[] = [
  {
    value: '$40.5B',
    label: 'Africa E-commerce Market',
    sub: 'Projected size by 2025',
  },
  {
    value: '$56B',
    label: 'Projected Market Size',
    sub: 'CAGR 8.46% by 2029',
  },
  {
    value: '1.4B+',
    label: 'People in Africa',
    sub: 'Rapid digital adoption',
  },
  {
    value: '60%+',
    label: 'Mobile Transactions',
    sub: 'Mobile money dominant',
  },
];

export const roadmapItems: RoadmapItem[] = [
  {
    quarter: 'Q3 2024',
    title: 'Guinea Market Launch',
    description:
      'Pilot escrow marketplace in Conakry with verified vendors in building materials, bulk food, and home services — GNF-native payments.',
    status: 'In Progress',
    active: true,
  },
  {
    quarter: 'Q1 2025',
    title: 'West Africa Expansion',
    description:
      'Multi-country rollout across Francophone West Africa with localized mobile money integrations and cross-border escrow settlement.',
    status: null,
    active: false,
  },
  {
    quarter: 'Q3 2025',
    title: 'B2B Procurement Layer',
    description:
      'Enterprise escrow APIs for distributors, NGOs, and construction firms sourcing bulk materials from verified African suppliers.',
    status: 'Planned',
    active: false,
  },
  {
    quarter: '2026',
    title: 'Open Trust API',
    description:
      'Developer platform enabling third-party marketplaces, fintechs, and telcos to embed Zantrra’s escrow infrastructure across Africa.',
    status: 'Planned',
    active: false,
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'How does Zantrra protect mobile money payments in escrow?',
    answer:
      'Funds are securely held in our regulated institutional vault. Once a buyer deposits via Orange Money or MTN MoMo, the GNF is locked and cannot be accessed by the seller until delivery is confirmed via the 6-digit completion code.',
  },
  {
    question: 'Is Zantrra built for the Guinean Franc (GNF) and local payment rails?',
    answer:
      'Yes. Zantrra is architected GNF-native from day one — supporting Orange Money, MTN MoMo, and local bank transfers in Guinea. Every escrow balance, receipt, and vendor payout is denominated in Guinean Francs with full audit trails for investors and regulators.',
  },
  {
    question: 'How are African vendors verified before they can accept orders?',
    answer:
      'Every vendor passes a multi-step verification pipeline: government ID validation, business registration checks, mobile money account ownership, and AI-assisted reputation scoring. Unverified sellers cannot list products or receive escrow releases on the platform.',
  },
  {
    question: 'What happens if a buyer or seller disputes a delivery?',
    answer:
      'Disputed transactions are automatically frozen in escrow. Both parties submit evidence — delivery photos, chat logs, and payment receipts — and a trained mediator reviews the case within 48 hours. Funds are released to the rightful party based on documented proof, not platform bias.',
  },
  {
    question: "How does Zantrra capture value in Africa's $40B+ e-commerce market?",
    answer:
      'Zantrra earns a small transaction fee on every escrow-protected sale — cement, bulk food, home services, and B2B procurement. With 60%+ of African commerce on mobile money and no incumbent trust layer, we monetize the infrastructure gap that banks and global marketplaces have left unaddressed.',
  },
];

export const footerLinks: Record<string, string[]> = {
  Product: ['Escrow Vault', 'Vendor Verification', 'Mobile Money', 'Dispute Resolution', 'B2B API'],
  Company: ['About', 'Investors', 'Press', 'Partners', 'Careers'],
  Resources: ['Documentation', 'API Reference', 'Guinea Pilot', 'Security', 'Compliance'],
  Contact: ['hello@zantrra.com', 'Conakry Office', 'Investor Relations', 'Twitter', 'LinkedIn'],
};

export const footerSocialIcons = ['public', 'groups', 'share'];

export const footerLegalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];
