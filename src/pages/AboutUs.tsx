import { motion } from 'framer-motion';
import {
  Globe,
  Zap,
  Shield,
  Heart,
  Users,
  MapPin,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';

// ── Real app store URLs ──────────────────────────────────────────
const ANDROID_URL = "https://play.google.com/store/apps/details?id=com.giggroup.gigxpadmobile";
const IOS_URL = "https://apps.apple.com/ng/app/gigx-pad/id1589206329";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// ── Team ──────────────────────────────────────────────────────
const team = [
  {
    name: 'Osamede Arhunmwunde',
    role: 'Chief Executive Officer',
    bio: 'Visionary fintech leader driving GigXPAD’s mission to make cross-border finance accessible, fast, and truly borderless.',
    initials: 'OA',
    color: '#e25a5a',
    linkedin: 'https://www.linkedin.com/in/osamedearhunmwunde/',
  },
  {
    name: 'Anselm Mba',
    role: 'Chief Technology Officer',
    bio: 'Architect of GigXPAD’s core platform — building scalable, secure payment infrastructure that moves money in seconds.',
    initials: 'AM',
    color: '#162e38',
    linkedin: 'https://www.linkedin.com/in/anselmmba/',
  },
  {
    name: 'Samuel Abu',
    role: 'Legal & Compliance',
    bio: 'Ensures every GigXPAD product meets the highest global regulatory standards — from Bank of Zambia licensing to FINTRAC compliance.',
    initials: 'SA',
    color: '#67777e',
    linkedin: 'https://www.linkedin.com/in/samuelabu/',
  },
  {
    name: 'Noel Owolabi',
    role: 'Software Engineer',
    bio: 'Crafts the user-facing experiences that make complex financial operations feel effortless and delightful.',
    initials: 'NO',
    color: '#e25a5a',
    linkedin: 'https://www.linkedin.com/in/owolabi-emmanuel/',
  },
];

// ── Values ────────────────────────────────────────────────────
const values = [
  {
    icon: Globe,
    title: 'Borderless by Design',
    desc: 'We believe where you were born should never limit your access to financial freedom. Every product decision we make is guided by this principle.',
  },
  {
    icon: Shield,
    title: 'Security First',
    desc: 'Your money and data are protected by bank-grade encryption, AML/KYC compliance, and continuous fraud monitoring — 24 hours a day.',
  },
  {
    icon: Zap,
    title: 'Speed Without Compromise',
    desc: "Transfers that used to take days now take seconds. We obsess over speed so you don't have to think about it.",
  },
  {
    icon: Heart,
    title: 'Built for People',
    desc: "We're building for the nurse in Lagos sending money home to Accra, the student in London paying family bills. Real people with real needs.",
  },
];

// ── Stats ─────────────────────────────────────────────────────
const stats = [
  { icon: Users, value: '50,000+', label: 'Active users' },
  { icon: Globe, value: '15+', label: 'Countries served' },
  { icon: TrendingUp, value: '$2M+', label: 'Transferred monthly' },
  { icon: MapPin, value: '2021', label: 'Founded' },
];

export const AboutUs = () => {
  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative bg-[#162e38] pt-36 pb-28 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#e25a5a]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-[#e25a5a]/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#e25a5a]/20 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#e25a5a]" />
              </div>
              <span className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest">Our Story</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-[1.05]"
            >
              We're on a mission to make{' '}
              <span className="text-[#e25a5a]">money move</span>{' '}
              the way people do.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-white/60 text-xl leading-relaxed max-w-2xl"
            >
              XPAD was born out of frustration — watching families lose money to outrageous exchange rates
              and slow, unreliable transfer systems. We decided to build something better.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center"
              >
                <div className="w-10 h-10 bg-[#fdf2f2] rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#e25a5a]" />
                </div>
                <div className="text-3xl font-black text-[#162e38] tracking-tighter">{value}</div>
                <div className="text-sm text-[#67777e] font-medium">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ORIGIN STORY ──────────────────────────────────────── */}
      <section className="bg-[#f2f6f7] py-24">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-4">
                Why we exist
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl font-black tracking-tighter text-[#162e38] mb-6 leading-tight">
                The international money transfer industry was broken.
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-[#67777e] text-base leading-relaxed">
                <p>
                  In 2021, our founders watched friends and family members lose significant portions
                  of their hard-earned income to high transfer fees, unfair exchange rates, and
                  systems that seemed designed to keep people poor.
                </p>
                <p>
                  They asked a simple question: if technology can connect the world instantly,
                  why does sending $100 from London to Lagos still cost $15 and take 3 days?
                </p>
                <p>
                  <strong className="text-[#162e38]">GigXPAD was their answer.</strong> A platform
                  built from the ground up to be fast, affordable, secure, and — most importantly —
                  designed for the people who need it most.
                </p>
              </motion.div>
            </motion.div>

            {/* Visual card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-[#162e38] rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#e25a5a]/10 rounded-full blur-3xl" />
                <div className="text-[#e25a5a] font-semibold text-xs uppercase tracking-widest mb-6">Our promise</div>

                {[
                  { label: 'Transfer fees', before: 'Up to 8%', after: 'Free', win: true },
                  { label: 'Transfer time', before: '3–5 business days', after: 'Instant', win: true },
                  { label: 'Exchange rate', before: 'Hidden markup', after: 'Live market rate', win: true },
                  { label: 'Customer support', before: 'Email only, 72hr wait', after: '24/7 live chat', win: true },
                ].map(({ label, before, after, win }) => (
                  <div key={label} className="flex items-center justify-between py-3.5 border-b border-white/10 last:border-none gap-4">
                    <div className="text-white/50 text-sm w-28 shrink-0">{label}</div>
                    <div className="text-white/30 text-sm line-through flex-1 text-right">{before}</div>
                    <div className={`text-sm font-bold flex-1 text-right ${win ? 'text-emerald-400' : 'text-white'}`}>{after}</div>
                  </div>
                ))}
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#e25a5a] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-[#e25a5a]/30">
                Live since 2021 🚀
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-3">
              What drives us
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38]">
              Our core values
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-[#f2f6f7] rounded-2xl p-7 hover:shadow-md transition-all duration-200 hover:-translate-y-1 group"
              >
                <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm group-hover:bg-[#fdf2f2] transition-colors">
                  <Icon className="w-5 h-5 text-[#e25a5a]" />
                </div>
                <h3 className="font-bold text-[#162e38] mb-2 text-base">{title}</h3>
                <p className="text-[#67777e] text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section className="bg-[#f2f6f7] py-24">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-3">
              The people behind XPAD
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38] mb-4">
              Meet the team
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#67777e] max-w-lg mx-auto text-base leading-relaxed">
              A small, focused team united by the belief that everyone deserves access to world-class financial tools.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map(({ name, role, bio, initials, color, linkedin }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col"
              >
                {/* Avatar + LinkedIn */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md"
                    style={{ backgroundColor: color, boxShadow: `0 8px 24px ${color}35` }}
                  >
                    {initials}
                  </div>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} on LinkedIn`}
                    className="w-9 h-9 rounded-xl bg-[#f2f6f7] hover:bg-[#0077B5] flex items-center justify-center transition-all duration-200 group"
                  >
                    {/* LinkedIn logo */}
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#0077B5] group-hover:fill-white transition-colors" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <h3 className="font-bold text-[#162e38] text-base mb-0.5">{name}</h3>
                <p className="text-[#e25a5a] text-xs font-semibold mb-3">{role}</p>
                <p className="text-[#67777e] text-sm leading-relaxed flex-1">{bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────────── */}
      <section className="bg-[#162e38] py-20">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#e25a5a]/10 rounded-full blur-[80px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative z-10"
          >
            <p className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-4">Join the movement</p>
            <h2 className="text-4xl font-black tracking-tighter text-white mb-4">
              Ready to experience borderless finance?
            </h2>
            <p className="text-white/50 text-base max-w-lg mx-auto mb-8">
              Download the GigXPAD app today and join over 50,000 users enjoying instant, fee-free transfers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#e25a5a] hover:bg-[#d13f3f] text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-[#e25a5a]/30"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M3.18 23.76c.3.17.65.19.96.07l12.45-7.2-2.55-2.55-10.86 9.68zm-1.13-20.8a1.5 1.5 0 0 0-.55 1.18v17.72c0 .47.2.89.55 1.18l.07.06 9.92-9.92v-.23L2.12 2.9l-.07.06zm20.18 8.64-2.63-1.52-2.83 2.83 2.83 2.83 2.65-1.53a1.5 1.5 0 0 0 0-2.61zm-18.5 10.28 10.86-9.68-2.55-2.55L1.39 22.14l.34.74z"/></svg>
                Google Play
              </a>
              <a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 border border-white/20"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </a>
              <a
                href="/support"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 border border-white/10"
              >
                <MessageCircle className="w-4 h-4" /> Talk to Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
