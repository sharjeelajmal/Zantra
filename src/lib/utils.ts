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
