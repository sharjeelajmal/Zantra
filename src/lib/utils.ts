export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Full-width last cell when a 2-column grid has an odd number of items (resets at lg). */
export function oddGridLastSpan(index: number, total: number): string | undefined {
  if (total % 2 !== 0 && index === total - 1) {
    return 'col-span-2 lg:col-span-1';
  }
  return undefined;
}

function formatGnf(amount: number): string {
  return `${amount.toLocaleString('en-US')} GNF`;
}

/** Parse a price like "95,000 GNF" and compute 2% platform fee totals. */
export function parseGnfAndCalculateFees(priceString: string) {
  const baseRaw = Number(priceString.replace(/[^\d]/g, '')) || 0;
  const feeRaw = Math.round(baseRaw * 0.02);
  const buyerTotalRaw = baseRaw + feeRaw;
  const sellerNetRaw = baseRaw - feeRaw;

  return {
    baseAmount: formatGnf(baseRaw),
    platformFee: formatGnf(feeRaw),
    buyerTotal: formatGnf(buyerTotalRaw),
    sellerNet: formatGnf(sellerNetRaw),
    baseRaw,
    feeRaw,
    buyerTotalRaw,
    sellerNetRaw,
  };
}
