import { useState } from "react";

// ── Real app store URLs ──────────────────────────────────────────
const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.giggroup.gigxpadmobile";
const IOS_URL = "https://apps.apple.com/ng/app/gigx-pad/id1589206329";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Wallet,
  User,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Mail,
  Search,
  ArrowRight,
} from "lucide-react";

// ── Animation variants ─────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

// ── FAQ Data (matching original gigxpad.com/support) ───────────
const faqSections = [
  {
    id: "get-started",
    title: "Get Started",
    items: [
      {
        q: "How Do I Deposit into the XPAD Naira Wallet?",
        a: 'You can deposit into your XPAD Naira Wallet by navigating to the Wallet tab in the app, selecting "Add Money", and choosing your preferred payment method — bank transfer, card, or USSD. Deposits are instant and free.',
      },
      {
        q: "How Withdrawals work",
        a: 'To withdraw funds, go to your Wallet, tap "Withdraw", enter the amount and your bank account details. Withdrawals are processed instantly to any Nigerian bank account. Standard withdrawal limits apply based on your verification tier.',
      },
      {
        q: "How do I purchase bills on XPAD?",
        a: 'Tap the "Bills" icon on your home screen. You can pay for airtime, data, electricity, cable TV, and more. Select the service, enter the required details, and confirm payment — it\'s done in seconds.',
      },
    ],
  },
  {
    id: "xpad-wallet",
    title: "XPAD Wallet",
    items: [
      {
        q: "How much am I charged for a withdrawal?",
        a: "XPAD charges a flat fee of ₦50 per local bank withdrawal. International withdrawals may attract a small conversion fee based on current exchange rates. There are no hidden charges.",
      },
      {
        q: "How much does it cost to transfer on XPAD?",
        a: "Transfers between XPAD users are completely free. For external bank transfers, a small fee may apply depending on the amount and destination. International remittances through our platform are fee-free.",
      },
      {
        q: "Do I have to pay deposit fees?",
        a: "No — deposits into your XPAD wallet are always free, regardless of the method or amount. We believe your money should work for you, not for us.",
      },
    ],
  },
  {
    id: "my-account",
    title: "My Account and Verification",
    items: [
      {
        q: "What are the Account Verification Tiers?",
        a: "XPAD has three verification tiers: Tier 1 (BVN only) gives limited access; Tier 2 (BVN + ID) unlocks higher limits; Tier 3 (BVN + ID + Proof of Address) gives full access to all features including international remittance.",
      },
      {
        q: "How to Share Your Referral Code",
        a: 'Go to your Profile, tap "Refer & Earn", and copy your unique referral code or share it directly via WhatsApp, SMS, or social media. You earn a bonus each time a friend signs up and completes a transaction.',
      },
      {
        q: "Change my XPAD username",
        a: "Navigate to Profile → Settings → Edit Profile. You can update your display name or username from here. Note that your XPAD tag (used for transfers) can only be changed once every 30 days.",
      },
      {
        q: "Set up 2-Factor Authentication",
        a: "In the app, go to Profile → Security → Two-Factor Authentication. You can enable 2FA via SMS or an authenticator app (Google Authenticator / Authy). We strongly recommend enabling 2FA to protect your account.",
      },
    ],
  },
  {
    id: "others",
    title: "Others",
    items: [
      {
        q: "How to Delete my XPAD User Profile",
        a: "To delete your account, go to Profile → Settings → Account → Delete Account. Please note that this action is permanent and irreversible. All your wallet balances must be withdrawn before deletion. Contact support if you need assistance.",
      },
      {
        q: "Where can I go if I have more questions?",
        a: "You can reach our support team 24/7 via the in-app chat, WhatsApp, or email at support@gigxpad.com. We typically respond within 5 minutes during business hours.",
      },
    ],
  },
];

// ── Category nav cards ─────────────────────────────────────────
const categories = [
  { id: "get-started", label: "About XPAD", icon: HelpCircle },
  { id: "xpad-wallet", label: "XPAD Wallet", icon: Wallet },
  { id: "my-account", label: "My Account", icon: User },
];

// ── Accordion Item ─────────────────────────────────────────────
const AccordionItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span
          className={`text-base font-medium transition-colors ${open ? "text-[#e25a5a]" : "text-[#162e38]"} group-hover:text-[#e25a5a]`}
        >
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 ml-4 transition-all duration-300 ${open ? "rotate-180 text-[#e25a5a]" : "text-[#67777e]"}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#67777e] text-sm leading-relaxed pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
export const Support = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  // Filter FAQ items by search query
  const filteredSections = faqSections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((section) =>
      activeCategory ? section.id === activeCategory : section.items.length > 0,
    );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="bg-[#f2f6f7] pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38] mb-10"
            >
              How can we help?
            </motion.h1>

            {/* Search bar */}
            <motion.div variants={fadeUp} className="relative mb-12">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#67777e] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveCategory(null);
                }}
                placeholder="Search for articles, questions..."
                className="w-full bg-white border border-gray-200 rounded-full py-4 pl-14 pr-36 text-base text-[#162e38] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/30 focus:border-[#e25a5a] shadow-sm transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-[#e25a5a] hover:bg-[#d13f3f] text-white rounded-full px-6 font-semibold text-sm transition-all">
                Search
              </button>
            </motion.div>

            {/* Category cards */}
            <motion.div variants={stagger} className="grid grid-cols-3 gap-4">
              {categories.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  variants={fadeUp}
                  onClick={() =>
                    setActiveCategory(activeCategory === id ? null : id)
                  }
                  className={`bg-white rounded-2xl p-6 flex flex-col items-center gap-3 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    activeCategory === id
                      ? "border-[#e25a5a] shadow-md shadow-[#e25a5a]/10"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCategory === id ? "bg-[#fdf2f2]" : "bg-[#f2f6f7]"}`}
                  >
                    <Icon
                      className={`w-5 h-5 ${activeCategory === id ? "text-[#e25a5a]" : "text-[#162e38]"}`}
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold ${activeCategory === id ? "text-[#e25a5a]" : "text-[#162e38]"}`}
                  >
                    {label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ SECTIONS ───────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-4xl">
          {filteredSections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 bg-[#fdf2f2] rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-[#e25a5a]" />
              </div>
              <h3 className="text-xl font-bold text-[#162e38] mb-2">
                No results found
              </h3>
              <p className="text-[#67777e] text-sm">
                Try a different search term or{" "}
                <a
                  href="#contact"
                  className="text-[#e25a5a] font-semibold hover:underline"
                >
                  contact us directly
                </a>
                .
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={stagger}
              className="space-y-12"
            >
              {filteredSections.map((section) => (
                <motion.div key={section.id} variants={fadeUp}>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-black tracking-tight text-[#162e38]">
                      {section.title}
                    </h2>
                    <span className="bg-[#fdf2f2] text-[#e25a5a] text-xs font-bold px-2.5 py-1 rounded-full">
                      {section.items.length}
                    </span>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden">
                    {section.items.map((item, i) => (
                      <div key={i} className="px-6">
                        <AccordionItem q={item.q} a={item.a} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CONTACT SECTION ────────────────────────────────────── */}
      <section
        id="contact"
        className="bg-[#f2f6f7] py-24 border-t border-gray-100"
      >
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
              Still need help?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38] mb-4"
            >
              Get in touch with us
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[#67777e] text-lg max-w-xl mx-auto"
            >
              Our support team is available 24/7. We'll get back to you as soon
              as possible.
            </motion.p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Quick contact cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              {[
                {
                  icon: MessageCircle,
                  title: "Chat on WhatsApp",
                  desc: "Message us directly on WhatsApp. Fastest response — usually under 5 minutes.",
                  action: "Start Chat",
                  href: "https://wa.me/message/gigxpad",
                  color: "#25D366",
                  bgColor: "#f0fdf4",
                  borderColor: "#bbf7d0",
                },
                {
                  icon: Mail,
                  title: "Send us an email",
                  desc: "Email our team at support@gigxpad.com. We reply within a few hours.",
                  action: "Email Support",
                  href: "mailto:support@gigxpad.com",
                  color: "#e25a5a",
                  bgColor: "#fdf2f2",
                  borderColor: "#f9c9c9",
                },
              ].map(
                ({
                  icon: Icon,
                  title,
                  desc,
                  action,
                  href,
                  color,
                  bgColor,
                  borderColor,
                }) => (
                  <motion.a
                    key={title}
                    variants={fadeUp}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-6 border hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group flex flex-col gap-4"
                    style={{ borderColor }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: bgColor }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#162e38] mb-1">{title}</h3>
                      <p className="text-[#67777e] text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-1.5 font-semibold text-sm mt-auto"
                      style={{ color }}
                    >
                      {action}{" "}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.a>
                ),
              )}

              {/* Support stats */}
              <motion.div
                variants={fadeUp}
                className="bg-[#162e38] rounded-2xl p-6 text-white"
              >
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">
                  Support Stats
                </p>
                {[
                  { stat: "< 5 min", label: "Avg. response time" },
                  { stat: "24 / 7", label: "Always available" },
                  { stat: "4.9 ★", label: "Customer satisfaction" },
                ].map(({ stat, label }) => (
                  <div
                    key={stat}
                    className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-none"
                  >
                    <span className="text-white/60 text-sm">{label}</span>
                    <span className="font-bold text-white text-sm">{stat}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-xl font-bold text-[#162e38] mb-1">
                  Send us a message
                </h3>
                <p className="text-[#67777e] text-sm mb-6">
                  We'll get back to you within a few hours.
                </p>

                <AnimatePresence mode="wait">
                  {!sent ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleContactSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#67777e] uppercase tracking-wider mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={contactForm.name}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                name: e.target.value,
                              })
                            }
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#162e38] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/30 focus:border-[#e25a5a] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#67777e] uppercase tracking-wider mb-1.5">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm({
                                ...contactForm,
                                email: e.target.value,
                              })
                            }
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#162e38] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/30 focus:border-[#e25a5a] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#67777e] uppercase tracking-wider mb-1.5">
                          Subject
                        </label>
                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#162e38] focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/30 focus:border-[#e25a5a] transition-all bg-white">
                          <option>General Inquiry</option>
                          <option>Account Issue</option>
                          <option>Transfer Problem</option>
                          <option>Virtual Card Help</option>
                          <option>Security Concern</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#67777e] uppercase tracking-wider mb-1.5">
                          Message
                        </label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Describe your issue or question in as much detail as possible..."
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              message: e.target.value,
                            })
                          }
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#162e38] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/30 focus:border-[#e25a5a] transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#e25a5a] hover:bg-[#d13f3f] text-white py-4 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#e25a5a]/25 flex items-center justify-center gap-2"
                      >
                        Send Message <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-center text-xs text-[#67777e]">
                        🔒 Your information is private and secure
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center py-12 gap-4"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Mail className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" />
                      </div>
                      <h3 className="text-xl font-black text-[#162e38]">
                        Message Sent!
                      </h3>
                      <p className="text-[#67777e] text-sm max-w-xs leading-relaxed">
                        Thanks <strong>{contactForm.name}</strong>! We've
                        received your message and will reply to{" "}
                        <strong>{contactForm.email}</strong> shortly.
                      </p>
                      <button
                        onClick={() => {
                          setSent(false);
                          setContactForm({ name: "", email: "", message: "" });
                        }}
                        className="text-[#e25a5a] font-semibold text-sm hover:underline mt-2"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM BANNER ──────────────────────────────────────── */}
      <section
        className="py-20 border-t border-gray-100"
        style={{ backgroundColor: "#162e38" }}
      >
        <div className="container mx-auto px-6 lg:px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-center relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#e25a5a]/10 rounded-full blur-[80px] pointer-events-none" />
            <p className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-4 relative z-10">
              Ready to get started?
            </p>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tighter text-white mb-4 relative z-10">
              Download the GigXPAD app today
            </h2>
            <p className="text-white/50 text-base max-w-lg mx-auto mb-8 relative z-10">
              Join over 50,000 users who send money globally, manage their
              finances, and pay bills seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a
                href={ANDROID_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#e25a5a] hover:bg-[#d13f3f] text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 shadow-lg shadow-[#e25a5a]/30"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M3.18 23.76c.3.17.65.19.96.07l12.45-7.2-2.55-2.55-10.86 9.68zm-1.13-20.8a1.5 1.5 0 0 0-.55 1.18v17.72c0 .47.2.89.55 1.18l.07.06 9.92-9.92v-.23L2.12 2.9l-.07.06zm20.18 8.64-2.63-1.52-2.83 2.83 2.83 2.83 2.65-1.53a1.5 1.5 0 0 0 0-2.61zm-18.5 10.28 10.86-9.68-2.55-2.55L1.39 22.14l.34.74z" />
                </svg>
                Google Play
              </a>
              <a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 border border-white/10"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://wa.me/message/gigxpad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5 border border-white/10"
              >
                <MessageCircle className="w-4 h-4" /> Chat with Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
