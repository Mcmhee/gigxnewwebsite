import { Link } from "react-router-dom";

const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.giggroup.gigxpadmobile";
const IOS_URL = "https://apps.apple.com/ng/app/gigx-pad/id1589206329";

const LINKS: Record<string, { label: string; to?: string; href?: string }[]> = {
  Navigate: [
    { label: "Home", to: "/" },
    { label: "Remittance", to: "/remittance" },
    { label: "Support", to: "/support" },
    { label: "About Us", to: "/about" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Use", to: "/terms-of-use" },
  ],
  Contact: [
    { label: "support@gigxpad.com", href: "mailto:support@gigxpad.com" },
    { label: "WhatsApp Chat", href: "https://wa.me/message/gigxpad" },
  ],
};

export const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#162e38" }}
      className="text-white pt-16 pb-10"
    >
      <div className="container mx-auto px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-14">
          {/* Brand col */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <img
                src="/logo_white.png"
                alt="XPAD"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Borderless Finances. Secure, fast, and remarkably simple
              cross-border transactions, all in one elegant app.
            </p>
            {/* App store badges */}
            <div className="flex gap-3">
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors border border-white/20 hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
                  <path d="M3.18 23.76c.3.17.65.19.96.07l12.45-7.2-2.55-2.55-10.86 9.68z" fill="#EA4335"/>
                  <path d="M2.05 2.96a1.5 1.5 0 0 0-.55 1.18v17.72c0 .47.2.89.55 1.18l.07.06 9.92-9.92v-.23L2.12 2.9l-.07.06z" fill="#4285F4"/>
                  <path d="M22.23 11.6l-2.63-1.52-2.83 2.83 2.83 2.83 2.65-1.53a1.5 1.5 0 0 0 0-2.61z" fill="#FBBC05"/>
                  <path d="M3.14 23.83l10.86-9.68-2.55-2.55L1.39 22.14l1.75 1.69z" fill="#34A853"/>
                </svg>
                Google Play
              </a>
              <a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors border border-white/20 hover:bg-white/10"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map(({ label, to, href }) => (
                  <li key={label}>
                    {to ? (
                      <Link
                        to={to}
                        className="text-white/50 hover:text-white text-sm transition-colors"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 hover:text-white text-sm transition-colors"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Gigxpad Technologies. All rights
            reserved.
          </p>
          <a
            href="mailto:support@gigxpad.com"
            className="text-white/40 hover:text-white text-sm transition-colors"
          >
            support@gigxpad.com
          </a>
        </div>
      </div>
    </footer>
  );
};
