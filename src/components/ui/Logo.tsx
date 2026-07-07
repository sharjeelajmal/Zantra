import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type LogoSize = 'nav' | 'footer';

export interface LogoProps {
  size?: LogoSize;
  className?: string;
  priority?: boolean;
}

const sizeClasses: Record<LogoSize, string> = {
  nav: 'h-8 sm:h-10 md:h-12 lg:h-14',
  footer: 'h-16 sm:h-20',
};

export function Logo({ size = 'nav', className, priority = false }: LogoProps) {
  return (
    <Link href="#" className={cn('inline-flex shrink-0 items-center', className)} aria-label="Zantrra home">
      <Image
        src="/logo.png"
        alt="Zantrra — Trust. Verify. Transact."
        width={280}
        height={112}
        priority={priority}
        className={cn('w-auto object-contain', sizeClasses[size])}
      />
    </Link>
  );
}
