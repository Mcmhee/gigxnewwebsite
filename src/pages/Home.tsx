import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap, Users } from "lucide-react";

// ── Real app store URLs ──────────────────────────────────────────
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.giggroup.gigxpadmobile";
const IOS_URL = "https://apps.apple.com/ng/app/gigx-pad/id1589206329";

// Animated counter hook
function useCounter(target: number, duration: number = 2) {
  const [count, setCount] = React.useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Remittance Globe Component ───────────────────────────────────────────────
// Map viewBox: 1000 x 500 (equirectangular: lon→x, lat→y)
// lon: -180..180 → x: 0..1000   x = (lon+180)/360 * 1000
// lat:  90..-90 → y: 0..500     y = (90-lat)/180 * 500
function project(lon: number, lat: number): [number, number] {
  return [(lon + 180) / 360 * 1000, (90 - lat) / 180 * 500];
}

// City geo coords → map pixel coords (viewBox 1000x500)
const [lgX, lgY] = project(3.4, 6.5);    // Lagos, Nigeria
const [lkX, lkY] = project(28.3, -15.4); // Lusaka, Zambia
const [trX, trY] = project(-79.4, 43.7); // Toronto, Canada

const CITIES = {
  lagos:   { x: lgX, y: lgY, label: "Lagos",   flag: "🇳🇬", color: "#34d399" },
  lusaka:  { x: lkX, y: lkY, label: "Lusaka",  flag: "🇿🇲", color: "#fbbf24" },
  toronto: { x: trX, y: trY, label: "Toronto", flag: "🇨🇦", color: "#60a5fa" },
};

function cubicBezierPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - 120;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

function AnimatedArc({ from, to, delay = 0 }: { from: keyof typeof CITIES; to: keyof typeof CITIES; delay?: number }) {
  const c1 = CITIES[from];
  const c2 = CITIES[to];
  const d = cubicBezierPath(c1.x, c1.y, c2.x, c2.y);
  return (
    <>
      <path d={d} stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" fill="none" />
      <motion.path
        d={d}
        stroke={c1.color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="600"
        strokeDashoffset={600}
        animate={{ strokeDashoffset: [600, -600] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", delay }}
        style={{ filter: `drop-shadow(0 0 4px ${c1.color})` }}
      />
      <motion.circle r="5" fill={c1.color} style={{ filter: `drop-shadow(0 0 7px ${c1.color})` }}>
        <animateMotion dur="4s" repeatCount="indefinite" begin={`${delay}s`} path={d} />
      </motion.circle>
    </>
  );
}

function CityNode({ city }: { city: keyof typeof CITIES }) {
  const c = CITIES[city];
  return (
    <g>
      <motion.circle
        cx={c.x} cy={c.y} r={10}
        fill="none" stroke={c.color} strokeWidth="1"
        animate={{ r: [8, 18], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.circle
        cx={c.x} cy={c.y} r={6}
        fill="none" stroke={c.color} strokeWidth="1"
        animate={{ r: [5, 14], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
      />
      <circle cx={c.x} cy={c.y} r={5} fill={c.color} style={{ filter: `drop-shadow(0 0 7px ${c.color})` }} />
      <circle cx={c.x} cy={c.y} r={2.5} fill="white" />
    </g>
  );
}

const TRANSACTIONS = [
  { from: "🇳🇬 Lagos", to: "🇨🇦 Toronto", amount: "₦250,000", converted: "≈ CA$430", color: "#34d399" },
  { from: "🇿🇲 Lusaka", to: "🇨🇦 Toronto", amount: "K 12,000",  converted: "≈ CA$98",  color: "#fbbf24" },
  { from: "🇳🇬 Lagos", to: "🇿🇲 Lusaka",  amount: "₦45,000",   converted: "≈ K 5,500", color: "#60a5fa" },
];

function RemittanceGlobe() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [countryPaths, setCountryPaths] = useState<string[]>([]);

  // Load real world map from world-atlas TopoJSON
  useEffect(() => {
    import("topojson-client").then(({ feature }) => {
      fetch("/world-110m.json")
        .then(r => r.json())
        .then((topo: any) => {
          const countries = feature(topo, topo.objects.countries) as any;
          // Convert each feature to an SVG path string using equirectangular projection
          // viewBox 1000x500: lon -180..180 → 0..1000, lat 90..-90 → 0..500
          const paths: string[] = countries.features.map((feat: any) => {
            const coords = feat.geometry;
            if (!coords) return "";
            const toPath = (rings: number[][][]) =>
              rings.map(ring =>
                ring.map(([lon, lat], i) => {
                  const x = ((lon + 180) / 360) * 1000;
                  const y = ((90 - lat) / 180) * 500;
                  return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
                }).join(" ") + " Z"
              ).join(" ");
            if (coords.type === "Polygon") return toPath(coords.coordinates);
            if (coords.type === "MultiPolygon") return coords.coordinates.map(toPath).join(" ");
            return "";
          }).filter(Boolean);
          setCountryPaths(paths);
        });
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % TRANSACTIONS.length), 2800);
    return () => clearInterval(t);
  }, []);

  const tx = TRANSACTIONS[activeIdx];

  // Card is 500x320. Map viewBox is 1000x500.
  // We want to show a zoomed-in region centred on the Atlantic / Africa corridor.
  // Use SVG viewBox shifting to zoom: show 1000x500 → but card is 500x320
  // Keep the full world viewBox and let SVG scale it.

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full flex justify-center lg:justify-end"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-[#e25a5a]/8 rounded-full blur-[100px]" />
      </div>

      {/* Outer wrapper — overflow-visible so badges can peek over edge */}
      <div className="relative w-full">

        {/* Badge spacer so they don't get clipped — padding matches badge width */}
        <div className="relative" style={{ margin: "16px 48px" }}>

          {/* Globe card — fills the inner space */}
          <div
            className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/30 w-full"
            style={{
              aspectRatio: "16/11",
              background: "linear-gradient(135deg, #0d1f26 0%, #162e38 55%, #1a3545 100%)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Live pill */}
            <div
              className="absolute top-5 left-5 z-20 flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.13)" }}
            >
              <span className="w-2 h-2 bg-[#34d399] rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-semibold">Live Transfers</span>
            </div>

            {/* SVG world map — equirectangular 1000×500 viewBox */}
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              style={{ opacity: 0.92 }}
            >
              {/* Country fills */}
              {countryPaths.map((d, i) => (
                <path key={i} d={d}
                  fill="rgba(255,255,255,0.065)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="0.7"
                />
              ))}

              {/* Transfer arcs */}
              <AnimatedArc from="lagos"  to="toronto" delay={0} />
              <AnimatedArc from="lusaka" to="toronto" delay={1.4} />
              <AnimatedArc from="lagos"  to="lusaka"  delay={2.8} />

              {/* City nodes */}
              <CityNode city="lagos" />
              <CityNode city="lusaka" />
              <CityNode city="toronto" />

              {/* City labels */}
              {(Object.keys(CITIES) as Array<keyof typeof CITIES>).map(key => {
                const c = CITIES[key];
                const lw = key === "toronto" ? 68 : 60;
                return (
                  <g key={key}>
                    <rect x={c.x + 10} y={c.y - 16} width={lw} height={22} rx={6}
                      fill="rgba(0,0,0,0.7)" stroke={c.color} strokeWidth="0.8" strokeOpacity="0.8" />
                    <text x={c.x + 14} y={c.y + 2} fill="white" fontSize="11"
                      fontFamily="system-ui,sans-serif" fontWeight="700">
                      {c.flag} {c.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Live transaction card */}
            <div className="absolute bottom-5 left-5 right-5 z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.13)",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                      style={{ background: `${tx.color}22` }}>
                      💸
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-bold truncate">{tx.from} → {tx.to}</p>
                      <p className="text-white/50 text-xs mt-0.5">just now</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black" style={{ color: tx.color }}>{tx.amount}</p>
                    <p className="text-white/50 text-xs mt-0.5">{tx.converted}</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                    style={{ background: "#34d39922", color: "#34d399" }}>
                    ✓ Sent
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#e25a5a]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#60a5fa]/8 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Floating currency badges — overlap card edges */}
          {[
            { label: "₦ NGN",   color: "#34d399", style: { top: "18%",  left:  -52 } },
            { label: "CA$ CAD", color: "#60a5fa", style: { top: "38%",  right: -60 } },
            { label: "K ZMW",   color: "#fbbf24", style: { top: "65%",  left:  -52 } },
          ].map((badge, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 3.4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
              className="absolute z-30 px-4 py-2 rounded-xl text-sm font-bold shadow-xl"
              style={{
                ...badge.style,
                background: `${badge.color}1c`,
                border: `1px solid ${badge.color}55`,
                color: badge.color,
                backdropFilter: "blur(12px)",
                whiteSpace: "nowrap",
              }}
            >
              {badge.label}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
// ──────────────────────────────────────────────────────────────────────────────

export const Home = () => {


  const { count: downloadCount, ref: dlRef } = useCounter(50);
  const { count: countryCount, ref: ctRef } = useCounter(120);
  const { count: txnCount, ref: txRef } = useCounter(2);

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center">
        {/* Gigxpad-style dual glow blobs */}
        <div className="hero-glow-left -z-10" />
        <div className="hero-glow-right -z-10" />
        <div className="absolute inset-0 -z-10 bg-white pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-20 lg:py-0 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-2">
          {/* Left: Text */}
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
              The New Standard in Finance
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] font-black tracking-tighter leading-[1.03] text-[#162e38] mb-7"
            >
              Effortlessly Organise and Simplify Your Finances
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-[#67777e] mb-10 leading-relaxed max-w-lg"
            >
              Automatically track your expenses, set budgets, and achieve your
              financial goals — all in one borderless wallet.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              {/* Google Play */}
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#162e38] hover:bg-[#1e3d4d] text-white pl-5 pr-7 py-3 rounded-2xl font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#162e38]/30 flex items-center gap-3.5 min-w-[190px]"
              >
                {/* Play Store icon */}
                <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 23.76c.3.17.65.19.96.07l12.45-7.2-2.55-2.55-10.86 9.68z" fill="#EA4335"/>
                  <path d="M2.05 2.96a1.5 1.5 0 0 0-.55 1.18v17.72c0 .47.2.89.55 1.18l.07.06 9.92-9.92v-.23L2.12 2.9l-.07.06z" fill="#4285F4"/>
                  <path d="M22.23 11.6l-2.63-1.52-2.83 2.83 2.83 2.83 2.65-1.53a1.5 1.5 0 0 0 0-2.61z" fill="#FBBC05"/>
                  <path d="M3.14 23.83l10.86-9.68-2.55-2.55L1.39 22.14l1.75 1.69z" fill="#34A853"/>
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-white/60 text-[10px] font-medium uppercase tracking-wider">Get it on</span>
                  <span className="text-white font-bold text-[17px] tracking-tight">Google Play</span>
                </div>
              </a>

              {/* App Store */}
              <a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-[#f2f6f7] text-[#162e38] pl-5 pr-7 py-3 rounded-2xl font-semibold text-base border border-gray-200 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm flex items-center gap-3.5 min-w-[190px]"
              >
                {/* Apple icon */}
                <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-[#67777e] text-[10px] font-medium uppercase tracking-wider">Download on the</span>
                  <span className="text-[#162e38] font-bold text-[17px] tracking-tight">App Store</span>
                </div>
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4">
              {/* Avatar pile */}
              <div className="flex -space-x-3">
                {["#e25a5a", "#c084fc", "#fb923c", "#34d399"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ring-1 ring-white/60"
                      style={{ backgroundColor: color, zIndex: 4 - i }}
                    >
                      {["JK", "AM", "SR", "TW"][i]}
                    </div>
                  ),
                )}
              </div>
              <div>
                <span className="text-[#162e38] font-bold text-base">
                  <span ref={dlRef}>{downloadCount}</span>k+ Downloads
                </span>
                <p className="text-[#67777e] text-xs mt-0.5">
                  Trusted by users in 120+ countries
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Fintech World Connection Map */}
          <RemittanceGlobe />
        </div>
      </section>

      {/* ── Trust / Credentials Strip ────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white py-5">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <img
              src="/6.png"
              alt="Backed by Techstars · Licensed by Bank of Zambia and FINTRAC CANAFE"
              className="h-14 md:h-16 w-auto object-contain select-none"
              draggable={false}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white py-8">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {[
              {
                label: "App Downloads",
                value: downloadCount,
                suffix: "k+",
                ref: dlRef,
              },
              {
                label: "Countries Supported",
                value: countryCount,
                suffix: "+",
                ref: ctRef,
              },
              {
                label: "Avg. Transfer Time",
                value: txnCount,
                suffix: " min",
                ref: txRef,
              },
              { label: "Transaction Fee", value: 0, suffix: "%", ref: null },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <p className="text-4xl lg:text-5xl font-black text-[#162e38] tracking-tighter">
                  <span ref={stat.ref}>{stat.value}</span>
                  {stat.suffix}
                </p>
                <p className="text-[#67777e] text-sm mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bento Feature Grid ───────────────────────────────────── */}
      <section
        className="container mx-auto px-6 lg:px-12 xl:px-20 py-24 lg:py-32"
        id="features"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Features
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-[#162e38] mb-4"
          >
            Built for the Modern World
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[#67777e] text-lg max-w-xl mx-auto"
          >
            Everything you need to manage your money across borders —
            beautifully simple.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto"
        >
          {/* Card 1 — Wide hero card: Cross-border */}
          <motion.div
            variants={fadeUp}
            style={{ backgroundColor: "#162e38" }}
            className="lg:col-span-2 text-white rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative min-h-[300px]"
          >
            <div className="flex-1 z-10">
              <div className="w-12 h-12 bg-[#e25a5a]/20 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-[#e25a5a]" />
              </div>
              <h3 className="text-3xl font-black tracking-tighter mb-3">
                Cross-Border Transfers
              </h3>
              <p className="text-white/60 text-base leading-relaxed max-w-sm">
                Global transfers, zero friction. Send and receive money
                worldwide in seconds with live exchange rates.
              </p>
              <button className="mt-8 inline-flex items-center gap-2 text-white border border-white/20 hover:bg-white/10 rounded-full px-6 py-2.5 text-sm font-semibold transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-shrink-0 z-10">
              <img
                src="/send-money-ui.png"
                alt="Send Money UI"
                className="w-64 lg:w-72 object-contain rounded-2xl shadow-2xl shadow-black/40"
              />
            </div>
            {/* decorative glow */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#e25a5a]/15 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Card 2 — Virtual Cards */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 min-h-[300px]"
          >
            <div>
              <div className="w-12 h-12 bg-[#fdf2f2] rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-[#e25a5a]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="2"
                    strokeWidth="2"
                  />
                  <path d="M2 10h20" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-2xl font-black tracking-tighter mb-2 text-[#162e38]">
                Virtual Cards
              </h3>
              <p className="text-[#67777e] text-sm leading-relaxed">
                Spend without limits. Instant virtual cards for international
                purchases, anytime worldwide.
              </p>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl">
              <img
                src="/card-ui.png"
                alt="Virtual Card UI"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Card 3 — Bills Payment */}
          <motion.div
            variants={fadeUp}
            className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 min-h-[300px]"
          >
            <div>
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-black tracking-tighter mb-2 text-[#162e38]">
                Bills Payment
              </h3>
              <p className="text-[#67777e] text-sm leading-relaxed">
                Handle recurring bills with ease. Pay subscriptions and
                utilities globally with one tap.
              </p>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl">
              <img
                src="/bills-ui.png"
                alt="Bills Payment UI"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Card 4 — Wide: Multi-currency wallet */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-2 bg-gradient-to-br from-[#e25a5a] to-[#c23f3f] text-white rounded-3xl p-8 lg:p-10 overflow-hidden relative min-h-[220px] flex flex-col justify-between"
          >
            <div className="z-10 relative">
              <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-black tracking-tighter mb-3">
                Multi-Currency Wallet
              </h3>
              <p className="text-white/70 text-base leading-relaxed max-w-md">
                Keep your money in one place. Buy, sell, and hold multiple
                currencies — fiat or crypto — effortlessly with live rates.
              </p>
            </div>

            {/* Floating currency chips */}
            <div className="absolute right-8 top-8 flex flex-col gap-3 z-10">
              {[
                {
                  symbol: "₦",
                  label: "NGN",
                  bg: "bg-emerald-400/20 text-emerald-100",
                },
                {
                  symbol: "£",
                  label: "GBP",
                  bg: "bg-yellow-400/20 text-yellow-100",
                },
                {
                  symbol: "€",
                  label: "EUR",
                  bg: "bg-pink-400/20 text-pink-100",
                },
                { symbol: "$", label: "USD", bg: "bg-white/15 text-white" },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                  className={`${c.bg} backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-2 text-sm font-bold`}
                >
                  <span className="text-xl">{c.symbol}</span> {c.label}
                </motion.div>
              ))}
            </div>

            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Why GigXPAD Section ─────────────────────────────────── */}
      <section className="bg-[#f2f6f7] border-y border-gray-100 py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            {/* Left content */}
            <div>
              <motion.p
                variants={fadeUp}
                className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-5"
              >
                Why GigXPAD
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38] mb-6"
              >
                Our App is compatible with multiple payment methods from all
                over the world.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[#67777e] text-lg leading-relaxed mb-10"
              >
                Pay and receive payment through multiple payment gateways with
                the best exchange rates and zero hidden fees.
              </motion.p>
              <motion.div variants={fadeUp} className="space-y-5">
                {[
                  {
                    icon: Shield,
                    title: "Bank-Grade Security",
                    desc: "End-to-end encryption and biometric authentication keep your funds safe.",
                  },
                  {
                    icon: Zap,
                    title: "Instant Transfers",
                    desc: "Send money globally in under 2 minutes, 24/7, 365 days a year.",
                  },
                  {
                    icon: Users,
                    title: "Dedicated Support",
                    desc: "Our team is available around the clock to help you with any questions.",
                  },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 bg-[#fdf2f2] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-[#e25a5a]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#162e38] mb-1">{title}</h4>
                      <p className="text-[#67777e] text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — stats grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
              {[
                { label: "Countries Supported", value: "120+", color: "navy" },
                { label: "Happy Customers", value: "50K+", color: "coral" },
                { label: "Currencies", value: "35+", color: "white" },
                { label: "Uptime", value: "99.9%", color: "white" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-7 flex flex-col justify-end min-h-[160px] transition-transform hover:-translate-y-1 duration-200"
                  style={{
                    backgroundColor:
                      item.color === "navy"
                        ? "#162e38"
                        : item.color === "coral"
                          ? "#e25a5a"
                          : "#ffffff",
                    border:
                      item.color === "white" ? "1px solid #e5e7eb" : "none",
                    color: item.color === "white" ? "#162e38" : "#ffffff",
                  }}
                >
                  <p className="text-4xl font-black tracking-tighter mb-1">
                    {item.value}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{
                      opacity: item.color === "white" ? 1 : 0.65,
                      color: item.color === "white" ? "#67777e" : "inherit",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────────── */}
      <section className="container mx-auto px-6 lg:px-12 xl:px-20 py-24 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="rounded-[2.5rem] overflow-hidden relative flex flex-col lg:flex-row items-center justify-between gap-10 p-12 lg:p-20"
          style={{ backgroundColor: "#162e38" }}
        >
          <div className="relative z-10 max-w-lg">
            <motion.p
              variants={fadeUp}
              className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-4"
            >
              Get started today
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black tracking-tighter text-white mb-5"
            >
              Start Your Borderless Financial Journey
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/50 text-lg leading-relaxed"
            >
              Join 50,000+ people who use GigXPAD to send money globally, pay
              bills, and manage their finances effortlessly.
            </motion.p>
          </div>
          <motion.div
            variants={fadeUp}
            className="relative z-10 flex flex-col sm:flex-row gap-4 flex-shrink-0"
          >
            <a
              href={ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#e25a5a] hover:bg-[#d13f3f] text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 flex items-center gap-2 text-base shadow-lg shadow-[#e25a5a]/30"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.96.07l12.45-7.2-2.55-2.55-10.86 9.68zm-1.13-20.8a1.5 1.5 0 0 0-.55 1.18v17.72c0 .47.2.89.55 1.18l.07.06 9.92-9.92v-.23L2.12 2.9l-.07.06zm20.18 8.64-2.63-1.52-2.83 2.83 2.83 2.83 2.65-1.53a1.5 1.5 0 0 0 0-2.61zm-18.5 10.28 10.86-9.68-2.55-2.55L1.39 22.14l.34.74z"/></svg>
              Google Play
            </a>
            <a
              href={IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 text-base border border-white/10 flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              App Store
            </a>
          </motion.div>
          {/* CTA decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e25a5a]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e25a5a]/10 rounded-full blur-[80px] pointer-events-none" />
        </motion.div>
      </section>
    </div>
  );
};
