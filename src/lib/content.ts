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
  /** Maps to /public/assets/icons/{iconName}.svg — placeholder until final 2.5D assets arrive. */
  iconName: string;
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
  { href: '#market', label: 'Market Opportunity' },
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
    name: 'Mike Cement Supply',
    category: 'Building Materials',
    product: 'Cement (50kg Bag)',
    price: '95,000 GNF (~$11 USD)',
  },
  {
    name: 'Bah Paint Services',
    category: 'Home Services',
    product: 'Interior & Exterior Painting',
    price: '1,500,000 GNF (~$176 USD)',
  },
  {
    name: 'Camara Bulk Foods',
    category: 'Bulk Food Supplier',
    product: 'Rice (50kg Bag)',
    price: '450,000 GNF (~$53 USD)',
  },
];

export const biddingVendors: DemoVendor[] = [
  {
    name: 'Mike Paint Services',
    category: 'Home Services',
    product: 'Interior & Exterior Painting',
    price: '1,450,000 GNF (~$170 USD)',
  },
  {
    name: 'Elite Painting',
    category: 'Home Services',
    product: 'Residential & Commercial Painting',
    price: '1,650,000 GNF (~$194 USD)',
  },
  {
    name: 'Pro Painting',
    category: 'Home Services',
    product: 'Interior Painting & Finishing',
    price: '1,850,000 GNF (~$217 USD)',
  },
];

export const problemCards: ProblemCard[] = [
  {
    icon: 'payments',
    title: 'Buyers Fear Losing Their Money',
    description:
      'Buyers are often asked to pay before receiving a product or service, creating uncertainty and increasing the risk of fraud, poor workmanship, or non-delivery.',
  },
  {
    icon: 'warning',
    title: 'Fraud & Fake Listings',
    description:
      'Scammers, fake businesses, and misleading listings make it difficult to know who can be trusted, resulting in financial losses and reduced confidence in businesses',
  },
  {
    icon: 'no_accounts',
    title: 'Trust Is Difficult to Verify',
    description:
      'Many sellers and service providers operate without identity verification, making it difficult for customers to distinguish legitimate businesses from bad actors.',
  },
  {
    icon: 'gavel',
    title: 'No Trusted Payment Protection',
    description:
      'Without a trusted escrow system, buyers risk losing their money, while honest sellers risk completing work without guaranteed payment.',
  },
];

export const steps: Step[] = [
  {
    num: '01',
    title: 'Browse or Request Bids',
    description:
      'Explore products from verified vendors, browse trusted professionals, or post your project to receive competitive bids from qualified businesses.',
    iconName: 'step_discover',
  },
  {
    num: '02',
    title: 'Choose & Pay Securely',
    description:
      "Pay securely through Zantrra's escrow system. The buyer instantly receives a unique 6-digit confirmation code used to release payment after delivery or service completion.",
    iconName: 'step_pay',
  },
  {
    num: '03',
    title: 'Payment Secured in Escrow',
    description:
      'The seller delivers the product or completes the requested service while your payment remains safely protected in escrow.',
    iconName: 'step_escrow',
  },
  {
    num: '04',
    title: 'Delivery or Service Completion',
    description:
      'Once buyer satisfied, buyer share secure 6-digit confirmation code to seller or service provider. Zantrra instantly releases the payment to the seller in local curency.',
    iconName: 'step_code',
  },
  {
    num: '05',
    title: 'Confirm & Release Payment',
    description:
      'Both parties receive a digital receipt, leave reviews, and strengthen their reputation making every completed transaction safer for the entire community.',
    iconName: 'step_confirm',
  },
  {
    num: '06',
    title: 'Rate, Review & Build Trust',
    description:
      'Every transaction follows a simple six-step process that protects both buyers and sellers from payment to completion.',
    iconName: 'step_receipt',
  },
];export const demoContent: Record<'buyer' | 'seller', DemoTabContent> = {
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
    title: 'Secure Escrow Protection',
    description:
      'Every payment is securely held in escrow and released only after the buyer confirms that the product has been delivered or the service has been completed.',
  },
  {
    icon: 'pin',
    iconBg: 'bg-emerald-50',
    title: '6-Digit Confirmation Code',
    description:
      "Every transaction generates a unique 6-digit code, ensuring payment is released only with the buyer's authorization after successful completion.",
  },
  {
    icon: 'gavel',
    iconBg: 'bg-orange-50',
    title: 'Competitive Service Bidding',
    description:
      'Post your project and receive competitive bids from verified professionals, making it easy to compare pricing, experience, and reviews before choosing.',
  },
  {
    icon: 'account_balance_wallet',
    iconBg: 'bg-fuchsia-50',
    title: 'Flexible Payment Options',
    description:
      "Pay securely using Mobile Money, debit cards, bank transfers, or other supported payment methods all processed through Zantrra's protected escrow system.",
  },
  {
    icon: 'psychology',
    iconBg: 'bg-blue-50',
    title: 'Verified Businesses & Professionals',
    description:
      'Every vendor and service provider goes through identity verification, helping buyers confidently choose trusted businesses.',
  },
  {
    icon: 'balance',
    iconBg: 'bg-rose-50',
    title: 'Fair Dispute Resolution',
    description:
      'if a disagreement occurs, Zantrra provides a structured dispute process to help resolve issues fairly and protect both buyers and sellers.',
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
    value: '$56B',
    label: 'Africa E-commerce Market',
    sub: 'By 2029 · CAGR 8.6%',
  },
  {
    value: '1.5B+',
    label: 'Population',
    sub: "World's youngest continent",
  },
  {
    value: '751M',
    label: 'Mobile Internet Users',
    sub: 'Projected by 2030',
  },
  {
    value: '518M',
    label: 'Unique Mobile Subscribers',
    sub: 'Projected by 2030',
  },
  {
    value: '$290B',
    label: 'Mobile Economy Contribution',
    sub: 'To GDP by 2030',
  },
];

export interface MarketListItem {
  icon: string;
  title: string;
  description: string;
}

export const whyAfricaItems: MarketListItem[] = [
  {
    icon: 'shopping_cart',
    title: 'Massive Consumer Economy',
    description: 'Spending projected to reach $2.5 trillion by 2030.',
  },
  {
    icon: 'pin',
    title: 'Growing Digital Adoption',
    description: 'Mobile money and internet access driving a revolution.',
  },
  {
    icon: 'groups',
    title: 'Young & Urban Population',
    description: "60% of Africa's population is under 25.",
  },
  {
    icon: 'rocket_launch',
    title: 'Entrepreneurship & SMEs',
    description: 'Millions of independent sellers coming online yearly.',
  },
  {
    icon: 'public',
    title: 'Cross-Border Integration',
    description: 'The AfCFTA is unlocking a single digital market.',
  },
];

export const whyNowItems: MarketListItem[] = [
  {
    icon: 'pin',
    title: 'Growing Mobile Connectivity',
    description: '751 million mobile internet users projected by 2030.',
  },
  {
    icon: 'warning',
    title: 'Trust Gap',
    description: 'Fraud, scams, and payment uncertainty remain major barriers.',
  },
  {
    icon: 'payments',
    title: 'Expanding Digital Payments',
    description: 'Mobile technologies expected to contribute $290B to the economy by 2030.',
  },
  {
    icon: 'public',
    title: 'Cross-Border Opportunity',
    description: 'AfCFTA creating a single market for 1.3B+ people.',
  },
];

export const targetMarkets: MarketListItem[] = [
  {
    icon: 'shopping_cart',
    title: 'Goods Marketplace',
    description: 'Construction materials, electronics, fashion, retail, home & living, and more.',
  },
  {
    icon: 'hub',
    title: 'Local Services',
    description: 'Electricians, plumbers, cleaning, repairs, transportation, and more.',
  },
  {
    icon: 'package',
    title: 'Wholesale & B2B Trade',
    description: 'Agriculture, food supplies, industrial goods, building materials, and more.',
  },
  {
    icon: 'public',
    title: 'Cross-Border Trade',
    description: 'Regional buyers & sellers, imports, exports, and international SMEs.',
  },
];

export const marketGapItems: string[] = [
  'Fraud and scams in peer-to-peer transactions.',
  'Lack of secure payment and escrow protection.',
  'Low trust between buyers and sellers.',
  'Limited buyer protection and dispute resolution.',
  "Fragmented solutions that don't work across Africa.",
];

export const whyZantrraItems: MarketListItem[] = [
  { icon: 'shield_lock', title: 'Secure Escrow', description: '' },
  { icon: 'verified_user', title: 'Verified Users', description: '' },
  { icon: 'pin', title: '6-Digit Security Code', description: '' },
  { icon: 'payments', title: 'Mobile Money Integration', description: '' },
  { icon: 'public', title: 'Local & Cross-Border Payments', description: '' },
  { icon: 'balance', title: 'Dispute Resolution', description: '' },
  { icon: 'favorite', title: 'Reputation & Trust Scores', description: '' },
];

export const economyStats: Stat[] = [
  { value: '$3.2T', label: 'Africa GDP', sub: '2024' },
  { value: '$2.5T', label: 'Consumer Spending', sub: 'By 2030 · cash, cards & mobile money' },
  { value: '$56B', label: 'E-commerce Market', sub: 'By 2029' },
];

export const mobileInternetGrowth = [
  { year: '2023', value: '320M', pct: 43 },
  { year: '2025', value: '416M', pct: 55 },
  { year: '2030', value: '751M', pct: 100 },
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
