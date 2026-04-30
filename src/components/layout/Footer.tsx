import React from "react";
import { Link } from "react-router-dom";

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
              {["App Store", "Google Play"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors border border-white/20 hover:bg-white/10"
                >
                  {s}
                </a>
              ))}
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
