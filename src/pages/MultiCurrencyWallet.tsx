import { ArrowRight, Globe, Wallet } from "lucide-react";

export const MultiCurrencyWallet = () => {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <section className="container mx-auto px-6 lg:px-12 xl:px-20">
        <div className="max-w-3xl">
          <p className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-4">
            Product
          </p>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-[#162e38] mb-6 leading-tight">
            Multi-Currency Wallet
          </h1>
          <p className="text-[#67777e] text-lg leading-relaxed mb-10">
            Hold, convert, and manage multiple currencies from one unified
            wallet. Designed for cross-border users who need flexibility without
            friction.
          </p>
          <button className="bg-[#e25a5a] hover:bg-[#d13f3f] text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#e25a5a]/30 inline-flex items-center gap-2">
            Open Wallet <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
          <div className="rounded-3xl border border-gray-100 p-8 bg-[#f8fbfc]">
            <Wallet className="w-7 h-7 text-[#e25a5a] mb-4" />
            <h2 className="text-2xl font-bold text-[#162e38] mb-2">
              One balance view
            </h2>
            <p className="text-[#67777e]">
              Track all supported currencies in one place with clear, real-time
              visibility.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-100 p-8 bg-[#f8fbfc]">
            <Globe className="w-7 h-7 text-[#e25a5a] mb-4" />
            <h2 className="text-2xl font-bold text-[#162e38] mb-2">
              Global readiness
            </h2>
            <p className="text-[#67777e]">
              Send and receive in multiple regions with competitive conversion
              rates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
