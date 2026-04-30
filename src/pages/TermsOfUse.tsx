import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const sections = [
  {
    title: '1. Scope',
    content: `These Legal Terms and Conditions ("Terms") govern your use of the website located at gigxpad.com and all associated services, features, content, and applications offered by Gigx Technologies Inc. ("XPAD", "we", "us", or "our"), a company registered in Toronto, Canada.

By accessing or using our Services, you agree to be bound by these Terms. XPAD reserves the right to modify these Terms at any time. Changes will be effective upon posting to the website. Your continued use of the Services after any modification constitutes your acceptance of the revised Terms.`,
  },
  {
    title: '2. Use of the Services',
    subcontent: [
      {
        subtitle: '2.1 XPAD is Not a Bank',
        text: `XPAD is a financial technology company, not a bank. Our Services are facilitated through partnerships with licensed financial institutions. Nothing on this platform constitutes financial, investment, legal, or tax advice. You should seek independent professional advice before making any financial decisions.`,
      },
      {
        subtitle: '2.2 Eligibility',
        text: `To use our Services, you must:

• Be at least 18 years of age
• Not be a resident of the United States of America
• Not be located in a jurisdiction where the use of our Services is restricted or prohibited by law
• Have the legal capacity to enter into a binding agreement

By using our Services, you represent and warrant that you meet all eligibility requirements.`,
      },
      {
        subtitle: '2.3 Account Creation',
        text: `To access certain features of XPAD, you must create an account. During registration, you will be required to provide accurate and complete information including:

• Company registration documents (for business accounts)
• Proof of address
• Valid phone number and email address
• Bank account information
• Government-issued photo identification (for KYC verification)

You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account.`,
      },
      {
        subtitle: '2.4 Software License',
        text: `Subject to these Terms, XPAD grants you a limited, non-exclusive, non-transferable, revocable licence to access and use our software solely for your personal, non-commercial use. You acknowledge that our software may contain third-party components subject to separate licence terms.

You are responsible for maintaining the security of the device(s) on which you access our Services.`,
      },
      {
        subtitle: '2.5 Restrictions',
        text: `You agree not to:

• Reverse engineer, decompile, disassemble, or attempt to derive the source code of any software
• Scrape, crawl, or use automated tools to extract data from our Services
• Use our Services to build a competitive product or service
• Resell, sublicense, or provide access to our Services to third parties
• Interfere with or disrupt the integrity or performance of our Services
• Circumvent any security or authentication measures`,
      },
    ],
  },
  {
    title: '3. Ownership',
    content: `XPAD and its licensors exclusively own all right, title, and interest in and to the Services, including all associated intellectual property rights such as patents, copyrights, trademarks, and trade secrets.

You retain ownership of any content you submit through our Services ("User Content"). By submitting User Content, you grant XPAD a worldwide, royalty-free, sublicensable, and non-exclusive licence to use, reproduce, modify, and distribute such content solely for the purpose of operating and improving the Services.`,
  },
  {
    title: '4. User Conduct',
    content: `You agree that you will not use the Services to:

• Engage in any unlawful, fraudulent, or deceptive activity
• Violate any applicable local, national, or international law or regulation
• Infringe on the intellectual property rights of XPAD or any third party
• Harass, abuse, threaten, or harm any other person
• Transmit any unsolicited commercial communications (spam)
• Distribute malware, viruses, or any other malicious code
• Interfere with the proper functioning of the Services
• Facilitate any transaction involving the proceeds of crime or money laundering
• Impersonate any person or entity or falsely represent your affiliation with any person or entity`,
  },
  {
    title: '5. Withdrawal Limits & Locked Accounts',
    content: `XPAD reserves the right, at its sole discretion, to:

• Set, modify, or remove transaction and withdrawal limits on any account at any time
• Temporarily or permanently suspend or lock any account where we have reasonable grounds to suspect fraudulent, illegal, or suspicious activity
• Hold funds pending completion of our compliance and verification processes

XPAD shall not be liable for any loss or damage arising from such actions where they are taken in good faith in compliance with applicable law or internal risk management policies.`,
  },
  {
    title: '6. Indemnification',
    content: `You agree to defend, indemnify, and hold harmless XPAD and its directors, officers, employees, contractors, agents, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:

• Your violation of these Terms
• Your use of the Services
• Your User Content
• Your violation of any third-party rights, including intellectual property rights
• Any damage caused by viruses or other harmful material transmitted through your account`,
  },
  {
    title: '7. Disclaimer of Warranties',
    content: `THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, XPAD DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:

• WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT
• WARRANTIES THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE
• WARRANTIES AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SERVICES

Your use of the Services is at your sole risk.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, XPAD'S TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE SERVICES SHALL NOT EXCEED TWENTY UNITED STATES DOLLARS (USD $20).

IN NO EVENT SHALL XPAD BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, BUSINESS, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH:

• Your use or inability to use the Services
• Any unauthorised access to or alteration of your transmissions or data
• Any conduct or content of any third party on the Services`,
  },
  {
    title: '9. Terms and Termination',
    content: `These Terms are effective from the date you first access our Services and will remain in effect until terminated.

You may terminate your account at any time by contacting support@gigxpad.com and following our account closure procedures. Note that applicable financial regulations may require us to retain certain data after closure.

XPAD may suspend or terminate your access to the Services immediately and without notice if:

• You breach any provision of these Terms
• We are required to do so by law or regulatory authority
• We determine, in our sole discretion, that continued access poses a risk to any user or to the integrity of the Services`,
  },
  {
    title: '10. Arbitration Agreement',
    content: `Any dispute, controversy, or claim arising out of or relating to these Terms or the use of our Services, including any question regarding its existence, validity, or termination, shall be referred to and finally resolved by binding arbitration under the Lagos Chamber of Commerce International Arbitration Centre (LACIAC) Rules.

You agree to waive any right to participate in a class-action lawsuit or class-wide arbitration. The number of arbitrators shall be one. The seat, or legal place, of arbitration shall be Lagos, Nigeria. The language of the arbitration shall be English.

Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent irreparable harm.`,
  },
  {
    title: '11. General Provisions',
    subcontent: [
      {
        subtitle: '11.1 Governing Law',
        text: `These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.`,
      },
      {
        subtitle: '11.2 Electronic Communications',
        text: `By using our Services, you consent to receiving electronic communications from XPAD, including notices, agreements, disclosures, and other information. You agree that all agreements, notices, and disclosures provided electronically satisfy any legal requirement that such communications be in writing.`,
      },
      {
        subtitle: '11.3 Force Majeure',
        text: `XPAD shall not be liable for any failure or delay in performance resulting from causes beyond our reasonable control, including acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, flood, accidents, strikes, or shortages of transportation, fuel, energy, labour, or materials.`,
      },
      {
        subtitle: '11.4 Entire Agreement',
        text: `These Terms, together with our Privacy Policy and any other legal notices published by XPAD on the Services, constitute the entire agreement between you and XPAD concerning your use of the Services and supersede all prior agreements and understandings.`,
      },
      {
        subtitle: '11.5 Contact Information',
        text: `If you have any questions about these Terms, please contact us:

**Gigx Technologies Inc.**
Email: support@gigxpad.com
Website: https://gigxpad.com`,
      },
    ],
  },
];

export const TermsOfUse = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="bg-[#f2f6f7] pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#fdf2f2] rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#e25a5a]" />
              </div>
              <span className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest">Legal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38] mb-4">
              Terms of Use
            </h1>
            <p className="text-[#67777e] text-base leading-relaxed max-w-2xl">
              These Legal Terms and Conditions govern your access to and use of XPAD services. Please read them carefully before using our platform.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-[#67777e]">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Last updated: January 1, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="space-y-10"
          >
            {sections.map((section, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="pb-10 border-b border-gray-100 last:border-none"
              >
                <h2 className="text-xl font-bold text-[#162e38] mb-4">{section.title}</h2>

                {/* Flat section */}
                {section.content && (
                  <div className="text-[#67777e] text-sm leading-7 space-y-3">
                    {section.content.split('\n\n').map((para, j) => (
                      <p
                        key={j}
                        className="whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                          __html: para
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#162e38]">$1</strong>')
                            .replace(/^• /gm, '&bull; '),
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Sub-sectioned content */}
                {section.subcontent && (
                  <div className="space-y-6">
                    {section.subcontent.map((sub, j) => (
                      <div key={j} className="pl-4 border-l-2 border-[#f2f6f7]">
                        <h3 className="text-base font-bold text-[#162e38] mb-2">{sub.subtitle}</h3>
                        <div className="text-[#67777e] text-sm leading-7 space-y-2">
                          {sub.text.split('\n\n').map((para, k) => (
                            <p
                              key={k}
                              className="whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: para
                                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#162e38]">$1</strong>')
                                  .replace(/^• /gm, '&bull; '),
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#162e38] py-16">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-4xl text-center">
          <div className="text-white/50 text-sm mb-3">Questions about our terms?</div>
          <h2 className="text-2xl font-black text-white mb-4 tracking-tight">
            We're happy to clarify
          </h2>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Reach out to our support team with any questions about these Terms of Use.
          </p>
          <a
            href="mailto:support@gigxpad.com"
            className="inline-flex items-center gap-2 bg-[#e25a5a] hover:bg-[#d13f3f] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:-translate-y-0.5 shadow-lg shadow-[#e25a5a]/30"
          >
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
};
