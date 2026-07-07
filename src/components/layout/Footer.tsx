import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import { footerLegalLinks, footerLinks, footerSocialIcons } from '@/lib/content';

export function Footer() {
  return (
    <footer className="bg-white border-t border-on-background/8">
      <div className="max-w-container-max-width mx-auto px-unit-lg py-unit-xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-gutter mb-12">
          <div className="col-span-2 md:col-span-1">
            <Logo size="footer" className="mb-4" />
            <p className="font-body-md text-body-md text-on-surface-variant text-sm mb-5">
              Secure escrow-powered commerce for the modern internet.
            </p>
            <div className="flex gap-3">
              {footerSocialIcons.map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="flex items-center justify-center size-9 rounded-xl border border-on-background/8 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <Icon name={icon} className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-label-md text-label-md font-bold text-on-background uppercase tracking-wider mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-on-background/8">
          <p className="font-label-md text-label-md text-slate-400 text-xs">
            © 2026 Zantrra Technologies Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLegalLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-label-md text-label-md text-slate-400 hover:text-primary text-xs transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
