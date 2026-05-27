import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.giggroup.gigxpadmobile";

export const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (
        productsOpen &&
        productMenuRef.current &&
        !productMenuRef.current.contains(event.target as Node)
      ) {
        setProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [productsOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-150 ${isActive ? "text-[#e25a5a]" : "text-[#67777e] hover:text-[#162e38]"}`;

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/support", label: "Support" },
    { to: "/about", label: "About Us" },
  ];

  const productLinks = [
    {
      to: "/remittance",
      label: "Remittance",
      description: "Fast cross-border transfers",
    },
    {
      to: "/multi-currency-wallet",
      label: "Multi-Currency Wallet",
      description: "Hold and manage multiple currencies",
    },
    {
      to: "/virtual-card",
      label: "Virtual Card",
      description: "Spend globally with instant virtual cards",
    },
  ];

  const isProductsActive = productLinks.some((product) =>
    location.pathname.startsWith(product.to),
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 h-20 flex items-center ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="XPAD"
            className="h-8 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>

          <div ref={productMenuRef} className="relative">
            <button
              className={`text-sm font-medium transition-colors duration-150 inline-flex items-center gap-1 ${
                isProductsActive
                  ? "text-[#e25a5a]"
                  : "text-[#67777e] hover:text-[#162e38]"
              }`}
              onClick={() => setProductsOpen((prev) => !prev)}
              aria-expanded={productsOpen}
              aria-haspopup="menu"
            >
              Products
              <span
                className={`transition-transform ${productsOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>

            {productsOpen && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl border border-gray-100 shadow-xl p-3">
                {productLinks.map((product) => (
                  <NavLink
                    key={product.label}
                    to={product.to}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-2.5 transition-colors ${
                        isActive ? "bg-[#fdf2f2]" : "hover:bg-[#f7f9fa]"
                      }`
                    }
                    onClick={() => setProductsOpen(false)}
                  >
                    <p className="text-sm font-semibold text-[#162e38]">
                      {product.label}
                    </p>
                    <p className="text-xs text-[#67777e] mt-0.5">
                      {product.description}
                    </p>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {navLinks
            .filter((link) => link.to !== "/")
            .map(({ to, label, end }) => (
              <NavLink key={to} to={to} className={linkClass} end={end}>
                {label}
              </NavLink>
            ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <a
            href={ANDROID_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#e25a5a] hover:bg-[#d13f3f] text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#e25a5a]/30"
          >
            Get Started
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => {
            setMobileOpen(!mobileOpen);
            if (mobileOpen) setMobileProductsOpen(false);
          }}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-[#162e38] rounded-full transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-[#162e38] rounded-full transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-[#162e38] rounded-full transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-100 shadow-lg px-6 py-6 flex flex-col gap-4">
          <NavLink
            to="/"
            className={linkClass}
            end
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>

          <div className="border border-gray-100 rounded-2xl p-2">
            <button
              className="w-full text-left px-2 py-1.5 text-sm font-semibold text-[#162e38] flex items-center justify-between"
              onClick={() => setMobileProductsOpen((prev) => !prev)}
              aria-expanded={mobileProductsOpen}
            >
              Products
              <span
                className={`transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>

            {mobileProductsOpen && (
              <div className="pt-1 pb-1 flex flex-col">
                {productLinks.map((product) => (
                  <NavLink
                    key={product.label}
                    to={product.to}
                    className="px-2 py-2 text-sm text-[#67777e] hover:text-[#162e38]"
                    onClick={() => {
                      setMobileProductsOpen(false);
                      setMobileOpen(false);
                    }}
                  >
                    {product.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {navLinks
            .filter((link) => link.to !== "/")
            .map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                className={linkClass}
                end={end}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </NavLink>
            ))}

          <a
            href={ANDROID_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-[#e25a5a] text-white font-bold py-3 rounded-full text-sm shadow-lg shadow-[#e25a5a]/30 text-center block"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};
