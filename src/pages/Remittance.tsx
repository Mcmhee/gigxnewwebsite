import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  CheckCircle,
  ChevronDown,
  MessageCircle,
  Send,
  RefreshCw,
} from "lucide-react";

// ── Animation variants ──────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

// ── Currency pairs for the live "calculator" ────────────────────
const currencies = [
  { code: "GBP", flag: "🇬🇧", name: "British Pound", symbol: "£" },
  { code: "USD", flag: "🇺🇸", name: "US Dollar", symbol: "$" },
  { code: "EUR", flag: "🇪🇺", name: "Euro", symbol: "€" },
  { code: "NGN", flag: "🇳🇬", name: "Nigerian Naira", symbol: "₦" },
  { code: "CAD", flag: "🇨🇦", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar", symbol: "A$" },
];

const rates: Record<string, Record<string, number>> = {
  NGN: {
    GBP: 0.00049,
    USD: 0.00065,
    EUR: 0.0006,
    CAD: 0.00088,
    AUD: 0.00098,
    NGN: 1,
  },
  GBP: { NGN: 2040, USD: 1.27, EUR: 1.18, CAD: 1.73, AUD: 1.93, GBP: 1 },
  USD: { NGN: 1538, GBP: 0.79, EUR: 0.93, CAD: 1.36, AUD: 1.52, USD: 1 },
  EUR: { NGN: 1670, GBP: 0.85, USD: 1.08, CAD: 1.47, AUD: 1.64, EUR: 1 },
  CAD: { NGN: 1132, GBP: 0.58, USD: 0.74, EUR: 0.68, AUD: 1.12, CAD: 1 },
  AUD: { NGN: 1011, GBP: 0.52, USD: 0.66, EUR: 0.61, CAD: 0.89, AUD: 1 },
};

// ── World map — accurate Natural Earth dot grid via dotted-map ─────
import DottedMap from "dotted-map/without-countries";

// City locations used in the map — lat/lng → SVG viewBox coords computed by dotted-map
const MAP_CITIES = [
  { lat: 51.5,  lng: -0.1,    label: "London",  flag: "🇬🇧", color: "#e25a5a" },
  { lat: 6.5,   lng: 3.4,     label: "Lagos",   flag: "🇳🇬", color: "#e25a5a" },
  { lat: 40.7,  lng: -74.0,   label: "New York",flag: "🇺🇸", color: "#e25a5a" },
  { lat: 19.0,  lng: 72.8,    label: "Mumbai",  flag: "🇮🇳", color: "#e25a5a" },
  { lat: -33.9, lng: 151.2,   label: "Sydney",  flag: "🇦🇺", color: "#e25a5a" },
  { lat: 43.7,  lng: -79.4,   label: "Toronto", flag: "🇨🇦", color: "#e25a5a" },
  { lat: -15.4, lng: 28.3,    label: "Lusaka",  flag: "🇿🇲", color: "#e25a5a" },
];

const WorldMapDots = () => {
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    fetch("/dotted-map.json")
      .then(r => r.json())
      .then(mapJson => {
        const map = new DottedMap({ map: mapJson });
        // Add city pins
        MAP_CITIES.forEach(city => {
          map.addPin({
            lat: city.lat,
            lng: city.lng,
            svgOptions: { color: "#e25a5a", radius: 0.6 },
          });
        });
        const svg = map.getSVG({
          radius: 0.26,
          color: "#c8d4d9",
          shape: "circle",
          backgroundColor: "transparent",
        });
        setSvgContent(svg);
      });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {svgContent ? (
        <div
          className="w-full h-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
          style={{ lineHeight: 0 }}
        />
      ) : (
        // Skeleton while loading
        <div className="w-full h-full bg-gray-50 animate-pulse rounded-2xl" />
      )}
    </div>
  );
};

// ── Floating payment card ──────────────────────────────────────

const FloatingCard = ({
  name,
  amount,
  currency,
  flag,
  delay,
  className,
}: {
  name: string;
  amount: string;
  currency: string;
  flag: string;
  delay: number;
  className?: string;
}) => (
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute bg-white rounded-2xl shadow-xl shadow-black/10 px-4 py-3 flex items-center gap-3 border border-gray-100 ${className}`}
    style={{ minWidth: 180 }}
  >
    <div className="w-10 h-10 rounded-xl bg-[#f2f6f7] flex items-center justify-center text-xl flex-shrink-0">
      {flag}
    </div>
    <div>
      <p className="text-xs text-[#67777e] font-medium">{name}</p>
      <p className="text-base font-bold text-[#162e38]">
        {currency}
        {amount}
      </p>
    </div>
    <div className="ml-auto">
      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
      </div>
    </div>
  </motion.div>
);

// ── Currency Selector ──────────────────────────────────────────
const CurrencySelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const selected = currencies.find((c) => c.code === value)!;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[#f2f6f7] hover:bg-gray-100 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#162e38] transition-colors min-w-[110px]"
      >
        <span className="text-base">{selected.flag}</span>
        <span>{selected.code}</span>
        <ChevronDown className="w-3.5 h-3.5 ml-auto text-[#67777e]" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 w-48 py-1">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                onChange(c.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium hover:bg-[#fdf2f2] transition-colors ${value === c.code ? "text-[#e25a5a]" : "text-[#162e38]"}`}
            >
              <span className="text-base">{c.flag}</span> {c.code} — {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────
export const Remittance = () => {
  const [sendAmount, setSendAmount] = useState("500");
  const [sendCurrency, setSendCurrency] = useState("NGN");
  const [receiveCurrency, setReceiveCurrency] = useState("GBP");
  const [formStep, setFormStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });

  const rate = rates[sendCurrency]?.[receiveCurrency] ?? 1;
  const receiveAmount = (parseFloat(sendAmount || "0") * rate).toLocaleString(
    "en-GB",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );
  const sendSymbol =
    currencies.find((c) => c.code === sendCurrency)?.symbol ?? "";
  const receiveSymbol =
    currencies.find((c) => c.code === receiveCurrency)?.symbol ?? "";

  const handleSwap = () => {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep("success");
  };

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white">
        {/* Glow blobs */}
        <div className="hero-glow-left -z-10" />
        <div className="hero-glow-right -z-10" />

        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-xl"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 bg-[#fdf2f2] border border-[#f9c9c9] text-[#e25a5a] text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
              >
                <span className="w-1.5 h-1.5 bg-[#e25a5a] rounded-full animate-pulse" />
                Global Remittance
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-[2.8rem] lg:text-[3.8rem] font-black tracking-tighter leading-[1.05] text-[#162e38] mb-6"
              >
                Distance is no longer a barrier
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg text-[#67777e] leading-relaxed mb-10 max-w-lg"
              >
                Send money to your family and friends across the globe —
                instantly, securely and at the best exchange rates with zero
                hidden fees.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a
                  href="#send-form"
                  className="bg-[#e25a5a] hover:bg-[#d13f3f] text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#e25a5a]/30 flex items-center gap-2"
                >
                  Send Money Now <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#calculator"
                  className="bg-white border border-gray-200 text-[#162e38] px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:bg-[#f2f6f7] hover:-translate-y-0.5"
                >
                  Try Calculator
                </a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-6 mt-10"
              >
                {[
                  { label: "0% Fees", sub: "Zero hidden charges" },
                  { label: "2 min", sub: "Average transfer time" },
                  { label: "120+", sub: "Countries supported" },
                ].map((b) => (
                  <div key={b.label}>
                    <p className="text-2xl font-black text-[#162e38] tracking-tighter">
                      {b.label}
                    </p>
                    <p className="text-xs text-[#67777e] font-medium mt-0.5">
                      {b.sub}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — world map + floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[420px] lg:h-[480px] flex items-center justify-center"
            >
              {/* Map background */}
              <div className="absolute inset-0">
                <WorldMapDots />
              </div>

              {/* Floating payment cards */}
              <FloatingCard
                name="Received from UK"
                amount="500"
                currency="£"
                flag="🇬🇧"
                delay={0}
                className="top-6 right-4 lg:right-8"
              />
              <FloatingCard
                name="Sent to Nigeria"
                amount="765,000"
                currency="₦"
                flag="🇳🇬"
                delay={0.8}
                className="bottom-10 left-2 lg:left-6"
              />
              <FloatingCard
                name="Transferred to US"
                amount="620"
                currency="$"
                flag="🇺🇸"
                delay={1.6}
                className="top-1/2 -translate-y-1/2 right-2 lg:right-4"
              />

              {/* Center coral glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-40 h-40 bg-[#e25a5a]/10 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THREE FEATURE CARDS ──────────────────────────────── */}
      <section className="bg-[#f2f6f7] py-20 border-y border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: CheckCircle,
                color: "#e25a5a",
                bgColor: "#fdf2f2",
                title: "Reliable",
                desc: "Our platform handles millions of transactions daily with 99.9% uptime. Your transfer is always on time, every time.",
              },
              {
                icon: Zap,
                color: "#f59e0b",
                bgColor: "#fffbeb",
                title: "Affordable",
                desc: "We charge zero transaction fees and offer some of the best exchange rates on the market — more money reaches your loved ones.",
              },
              {
                icon: Shield,
                color: "#10b981",
                bgColor: "#ecfdf5",
                title: "Secure",
                desc: "Bank-grade AES-256 encryption and 2FA protect every transfer. Your funds and data are always safe with us.",
              },
            ].map(({ icon: Icon, color, bgColor, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-white rounded-3xl p-8 border border-white hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 group hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: bgColor }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h3 className="text-xl font-bold text-[#162e38] mb-3">
                  {title}
                </h3>
                <p className="text-[#67777e] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LIVE RATE CALCULATOR ────────────────────────────── */}
      <section id="calculator" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Live Rates
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38] mb-4"
            >
              How much will they receive?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#67777e] text-lg max-w-xl mx-auto"
            >
              Get an instant estimate with our live exchange rate calculator —
              no sign-up required.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/80 p-8 lg:p-10">
              {/* You send */}
              <div className="mb-3">
                <label className="block text-xs font-semibold text-[#67777e] uppercase tracking-widest mb-2">
                  You send
                </label>
                <div className="flex items-center gap-3 bg-[#f2f6f7] rounded-2xl p-4">
                  <span className="text-2xl font-black text-[#162e38] flex-shrink-0">
                    {sendSymbol}
                  </span>
                  <input
                    type="number"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    className="flex-1 bg-transparent text-3xl font-black text-[#162e38] outline-none min-w-0"
                    placeholder="500"
                  />
                  <CurrencySelect
                    value={sendCurrency}
                    onChange={setSendCurrency}
                  />
                </div>
              </div>

              {/* Swap button */}
              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-px bg-gray-100" />
                <button
                  onClick={handleSwap}
                  className="w-10 h-10 bg-[#fdf2f2] hover:bg-[#f9c9c9] border border-[#f9c9c9] rounded-full flex items-center justify-center transition-colors group"
                >
                  <RefreshCw className="w-4 h-4 text-[#e25a5a] group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* They receive */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#67777e] uppercase tracking-widest mb-2">
                  They receive
                </label>
                <div className="flex items-center gap-3 bg-[#f2f6f7] rounded-2xl p-4">
                  <span className="text-2xl font-black text-[#162e38] flex-shrink-0">
                    {receiveSymbol}
                  </span>
                  <div className="flex-1 text-3xl font-black text-[#162e38]">
                    {receiveAmount}
                  </div>
                  <CurrencySelect
                    value={receiveCurrency}
                    onChange={setReceiveCurrency}
                  />
                </div>
              </div>

              {/* Meta row */}
              <div className="flex items-center justify-between text-sm mb-6 px-1">
                <span className="text-[#67777e]">Exchange Rate</span>
                <span className="font-bold text-[#162e38]">
                  1 {sendCurrency} = {rate.toFixed(rate < 0.01 ? 6 : 4)}{" "}
                  {receiveCurrency}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mb-8 px-1">
                <span className="text-[#67777e]">Transaction fee</span>
                <span className="font-bold text-emerald-500">FREE</span>
              </div>

              <a
                href="#send-form"
                className="w-full bg-[#e25a5a] hover:bg-[#d13f3f] text-white py-4 rounded-2xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-[#e25a5a]/25 flex items-center justify-center gap-2"
              >
                Send {sendSymbol}
                {parseFloat(sendAmount || "0").toLocaleString()} Now{" "}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SEND MONEY FORM ───────────────────────────────────── */}
      <section id="send-form" className="py-24 bg-[#f2f6f7]">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Get Started
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38] mb-4"
            >
              Send money in minutes
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#67777e] text-lg max-w-xl mx-auto"
            >
              Fill in your details and we'll get your transfer started right
              away.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left decorative panel */}
                <div
                  className="lg:col-span-2 p-10 flex flex-col justify-between relative overflow-hidden"
                  style={{ backgroundColor: "#162e38" }}
                >
                  {/* Glow */}
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#e25a5a]/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#e25a5a]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#e25a5a]/20 rounded-2xl flex items-center justify-center mb-6">
                      <Send className="w-6 h-6 text-[#e25a5a]" />
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight mb-3">
                      Start your transfer
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed">
                      Quick, easy and secure. We protect your funds with
                      bank-grade encryption every step of the way.
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="relative z-10 mt-10 space-y-5">
                    {[
                      "Enter your details",
                      "Choose recipient & amount",
                      "Confirm & send instantly",
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#e25a5a] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {i + 1}
                          </span>
                        </div>
                        <p className="text-white/70 text-sm font-medium">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Country flags */}
                  <div className="relative z-10 mt-10">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
                      We send to
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["🇬🇧", "🇺🇸", "🇨🇦", "🇦🇺", "🇪🇺", "🇳🇬", "🇬🇭", "🇰🇪"].map(
                        (flag) => (
                          <span key={flag} className="text-2xl">
                            {flag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Right form panel */}
                <div className="lg:col-span-3 p-10">
                  <AnimatePresence mode="wait">
                    {formStep === "form" ? (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-5 h-full flex flex-col"
                      >
                        <div>
                          <h3 className="text-xl font-bold text-[#162e38] mb-1">
                            Your information
                          </h3>
                          <p className="text-[#67777e] text-sm">
                            Tell us a little about yourself
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            {
                              id: "firstName",
                              label: "First Name",
                              placeholder: "John",
                              type: "text",
                            },
                            {
                              id: "lastName",
                              label: "Last Name",
                              placeholder: "Doe",
                              type: "text",
                            },
                          ].map(({ id, label, placeholder, type }) => (
                            <div key={id}>
                              <label className="block text-xs font-semibold text-[#67777e] uppercase tracking-wider mb-1.5">
                                {label}
                              </label>
                              <input
                                type={type}
                                placeholder={placeholder}
                                required
                                value={(form as Record<string, string>)[id]}
                                onChange={(e) =>
                                  setForm({ ...form, [id]: e.target.value })
                                }
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#162e38] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/30 focus:border-[#e25a5a] transition-all"
                              />
                            </div>
                          ))}
                        </div>

                        {[
                          {
                            id: "email",
                            label: "Email Address",
                            placeholder: "john@example.com",
                            type: "email",
                          },
                          {
                            id: "phone",
                            label: "Phone Number",
                            placeholder: "+44 7700 900000",
                            type: "tel",
                          },
                        ].map(({ id, label, placeholder, type }) => (
                          <div key={id}>
                            <label className="block text-xs font-semibold text-[#67777e] uppercase tracking-wider mb-1.5">
                              {label}
                            </label>
                            <input
                              type={type}
                              placeholder={placeholder}
                              required
                              value={(form as Record<string, string>)[id]}
                              onChange={(e) =>
                                setForm({ ...form, [id]: e.target.value })
                              }
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#162e38] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/30 focus:border-[#e25a5a] transition-all"
                            />
                          </div>
                        ))}

                        <div>
                          <label className="block text-xs font-semibold text-[#67777e] uppercase tracking-wider mb-1.5">
                            Sending To
                          </label>
                          <select
                            required
                            value={form.country}
                            onChange={(e) =>
                              setForm({ ...form, country: e.target.value })
                            }
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#162e38] focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/30 focus:border-[#e25a5a] transition-all bg-white"
                          >
                            <option value="">Select country...</option>
                            {[
                              "United Kingdom",
                              "United States",
                              "Nigeria",
                              "Canada",
                              "Australia",
                              "Ghana",
                              "Kenya",
                              "Germany",
                              "France",
                            ].map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full bg-[#e25a5a] hover:bg-[#d13f3f] text-white py-4 rounded-2xl font-bold text-base transition-all hover:-translate-y-0.5 shadow-lg shadow-[#e25a5a]/25 flex items-center justify-center gap-2"
                          >
                            Continue to Transfer{" "}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          <p className="text-center text-xs text-[#67777e] mt-3">
                            🔒 Your data is encrypted and secure
                          </p>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center h-full py-12 gap-6"
                      >
                        <div className="relative">
                          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                          </div>
                          <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" />
                        </div>
                        <h3 className="text-2xl font-black text-[#162e38] tracking-tight">
                          Request Received!
                        </h3>
                        <p className="text-[#67777e] max-w-xs leading-relaxed">
                          Thank you, {form.firstName}! Our team will contact you
                          at <strong>{form.email}</strong> within minutes to
                          complete your transfer.
                        </p>
                        <button
                          onClick={() => {
                            setFormStep("form");
                            setForm({
                              firstName: "",
                              lastName: "",
                              email: "",
                              phone: "",
                              country: "",
                            });
                          }}
                          className="text-[#e25a5a] font-semibold hover:underline text-sm"
                        >
                          Start a new transfer
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHATSAPP / DIRECT MESSAGE CTA ────────────────────── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left: text */}
            <div>
              <motion.p
                variants={fadeUp}
                className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-5"
              >
                Need Help?
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38] mb-5"
              >
                Send us a direct message
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[#67777e] text-lg leading-relaxed mb-8"
              >
                Have a question or need help with your transfer? Our support
                team is online 24/7 and will respond in under 5 minutes.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="https://wa.me/message/gigxpad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bc5b] text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-[#25D366]/25"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <a
                  href="mailto:support@gigxpad.com"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-[#162e38] px-8 py-4 rounded-full font-semibold transition-all hover:bg-[#f2f6f7] hover:-translate-y-0.5"
                >
                  Email Support
                </a>
              </motion.div>

              {/* Support stats */}
              <motion.div variants={fadeUp} className="flex gap-8 mt-10">
                {[
                  { stat: "< 5 min", label: "Response time" },
                  { stat: "24/7", label: "Always available" },
                  { stat: "4.9★", label: "Support rating" },
                ].map(({ stat, label }) => (
                  <div key={stat}>
                    <p className="text-xl font-black text-[#162e38] tracking-tighter">
                      {stat}
                    </p>
                    <p className="text-xs text-[#67777e] font-medium mt-0.5">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: phone mockup */}
            <motion.div
              variants={fadeUp}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Background card */}
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-[#25D366]/10 rounded-[2.5rem] blur-2xl scale-110 pointer-events-none" />

                <div className="relative bg-[#f2f6f7] rounded-[2.5rem] p-8 lg:p-10 max-w-sm">
                  {/* WhatsApp-style chat bubbles */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
                      <p className="text-sm text-[#162e38] font-medium">
                        Hi! I need help sending money to Nigeria 🇳🇬
                      </p>
                      <p className="text-[10px] text-[#67777e] mt-1">2:31 PM</p>
                    </div>
                    <div className="bg-[#e25a5a] rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-[80%] ml-auto">
                      <p className="text-sm text-white font-medium">
                        Of course! I can help you with that right away. 😊
                      </p>
                      <p className="text-[10px] text-white/70 mt-1">
                        2:32 PM ✓✓
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[80%]">
                      <p className="text-sm text-[#162e38] font-medium">
                        How much would you like to send?
                      </p>
                      <p className="text-[10px] text-[#67777e] mt-1">2:32 PM</p>
                    </div>
                    <div className="bg-[#e25a5a]/10 rounded-full px-4 py-2 w-fit">
                      <p className="text-xs text-[#e25a5a] font-semibold">
                        GigXPAD Support is typing…
                      </p>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex-1 text-sm text-gray-300">
                      Type a message…
                    </div>
                    <div className="w-8 h-8 bg-[#e25a5a] rounded-full flex items-center justify-center flex-shrink-0">
                      <Send className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ────────────────────────────────── */}
      <section className="py-20 bg-[#f2f6f7] border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-[2.5rem] overflow-hidden relative flex flex-col lg:flex-row items-center justify-between gap-10 p-12 lg:p-16"
            style={{ backgroundColor: "#162e38" }}
          >
            <div className="relative z-10 max-w-lg text-center lg:text-left">
              <p className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-4">
                Start Today
              </p>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-white mb-4">
                Ready to send your first transfer?
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                Join thousands of customers who trust GigXPAD to send money home
                — fast, safe and fee-free.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a
                href="#send-form"
                className="bg-[#e25a5a] hover:bg-[#d13f3f] text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-lg shadow-[#e25a5a]/30"
              >
                Send Money <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/message/gigxpad"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 border border-white/10 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Chat with us
              </a>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#e25a5a]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e25a5a]/8 rounded-full blur-[80px] pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
