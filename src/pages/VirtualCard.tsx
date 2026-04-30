import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react";

export const VirtualCard = () => {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <section className="container mx-auto px-6 lg:px-12 xl:px-20">
        <div className="max-w-3xl">
          <p className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest mb-4">
            Product
          </p>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-[#162e38] mb-6 leading-tight">
            Virtual Card
          </h1>
          <p className="text-[#67777e] text-lg leading-relaxed mb-10">
            Create secure virtual cards in seconds for online subscriptions,
            international payments, and safer checkout everywhere.
          </p>
          <button className="bg-[#e25a5a] hover:bg-[#d13f3f] text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#e25a5a]/30 inline-flex items-center gap-2">
            Create Card <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
          <div className="rounded-3xl border border-gray-100 p-8 bg-[#f8fbfc]">
            <CreditCard className="w-7 h-7 text-[#e25a5a] mb-4" />
            <h2 className="text-2xl font-bold text-[#162e38] mb-2">
              Instant issuance
            </h2>
            <p className="text-[#67777e]">
              Spin up cards immediately for one-time purchases or recurring
              payments.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-100 p-8 bg-[#f8fbfc]">
            <ShieldCheck className="w-7 h-7 text-[#e25a5a] mb-4" />
            <h2 className="text-2xl font-bold text-[#162e38] mb-2">
              Stronger controls
            </h2>
            <p className="text-[#67777e]">
              Lock, freeze, and manage spending limits with built-in protection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
