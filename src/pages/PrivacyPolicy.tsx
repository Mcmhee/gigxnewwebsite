import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const sections = [
  {
    title: '1. Introduction',
    content: `Gigx Technologies Inc. ("XPAD", "we", "us", or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application and related services (collectively, the "Services").

Please read this policy carefully. If you disagree with its terms, please discontinue use of our Services.`,
  },
  {
    title: '2. Information We Collect',
    content: `We collect information that you provide directly to us, including:

• **Identity Data**: First name, last name, username or similar identifier, date of birth, and gender.
• **Contact Data**: Email address, phone number, and physical address.
• **Financial Data**: Bank account details, payment card details, transaction history, and wallet balances.
• **Identity Verification Data**: Government-issued ID documents, photographs, and biometric data required for KYC (Know Your Customer) compliance.
• **Technical Data**: IP address, browser type, device identifiers, operating system, and usage data collected automatically when you interact with our Services.
• **Usage Data**: Information about how you use our website, products, and services, including transaction data and activity logs.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use the information we collect to:

• Provide, operate, and maintain our Services
• Process transactions and send related information (e.g., confirmations, receipts)
• Verify your identity and comply with applicable AML/KYC regulations
• Send administrative information, such as changes to our terms, conditions, and policies
• Respond to your comments, questions, and provide customer support
• Send marketing and promotional communications (where permitted by law and with your consent)
• Monitor and analyze usage and trends to improve the Services
• Detect, prevent, and address fraud, security breaches, and other harmful activities
• Comply with legal obligations and regulatory requirements`,
  },
  {
    title: '4. Sharing Your Information',
    content: `We may share your personal information with:

• **Service Providers**: Third-party vendors who perform services on our behalf (e.g., payment processors, identity verification services, cloud storage providers, analytics providers).
• **Business Partners**: Financial institutions and banking partners required to facilitate transactions.
• **Regulatory Authorities**: Government bodies, law enforcement, and financial regulators where required by applicable law or legal process.
• **Professional Advisors**: Lawyers, auditors, and insurers where necessary in the course of the professional services they provide to us.
• **Business Transfers**: In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.

We do not sell, trade, or rent your personal information to third parties for their marketing purposes.`,
  },
  {
    title: '5. Data Security',
    content: `We implement industry-standard technical and organisational measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, or access. These measures include:

• AES-256 encryption for data at rest and in transit (TLS/SSL)
• Two-factor authentication (2FA)
• Regular security audits and penetration testing
• Access controls limiting data access to authorised personnel on a need-to-know basis
• Secure data centres with physical access controls

However, no method of electronic transmission or storage is 100% secure. While we strive to protect your personal data, we cannot guarantee absolute security.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain your personal information for as long as necessary to fulfil the purposes outlined in this Privacy Policy and as required by applicable law. Specifically:

• Account data is retained for the duration of your account and for a period of 5 years thereafter, in compliance with applicable financial regulations.
• Transaction records may be retained for up to 7 years in compliance with anti-money laundering regulations.
• You may request deletion of your personal data subject to our legal retention obligations.`,
  },
  {
    title: '7. Your Privacy Rights',
    content: `Depending on your jurisdiction, you may have the following rights regarding your personal information:

• **Right to Access**: Request a copy of the personal data we hold about you.
• **Right to Rectification**: Request correction of inaccurate or incomplete data.
• **Right to Erasure**: Request deletion of your personal data where there is no legitimate reason for us to continue processing it.
• **Right to Restrict Processing**: Request that we suspend processing your personal data in certain circumstances.
• **Right to Data Portability**: Receive your personal data in a structured, machine-readable format.
• **Right to Object**: Object to processing of your personal data where we rely on legitimate interests.

To exercise any of these rights, please contact us at support@gigxpad.com. We will respond to your request within 30 days.`,
  },
  {
    title: '8. Cookies and Tracking Technologies',
    content: `We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.

We use the following categories of cookies:
• **Essential Cookies**: Necessary for the operation of our Services.
• **Analytics Cookies**: Help us understand how visitors interact with our Services.
• **Preference Cookies**: Enable the Services to remember your preferences.
• **Marketing Cookies**: Used to deliver relevant advertisements (where applicable).`,
  },
  {
    title: '9. International Data Transfers',
    content: `Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ from those of your jurisdiction.

If you are located in the European Economic Area (EEA) or the United Kingdom, please note that we take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy, including relying on Standard Contractual Clauses approved by the European Commission.`,
  },
  {
    title: '10. Children\'s Privacy',
    content: `Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information.

If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us at support@gigxpad.com.`,
  },
  {
    title: '11. Changes to This Policy',
    content: `We reserve the right to update or change this Privacy Policy at any time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We may also send you an email notification of significant changes.

Your continued use of the Services after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide by the modified policy.`,
  },
  {
    title: '12. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:

**Gigx Technologies Inc.**
Email: support@gigxpad.com
Website: https://gigxpad.com

We take your privacy seriously and will respond to all queries within 5 business days.`,
  },
];

export const PrivacyPolicy = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="bg-[#f2f6f7] pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#fdf2f2] rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#e25a5a]" />
              </div>
              <span className="text-[#e25a5a] font-semibold text-sm uppercase tracking-widest">Legal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-[#162e38] mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#67777e] text-base leading-relaxed max-w-2xl">
              Your privacy matters to us. This policy explains how Gigx Technologies Inc. collects, uses, and protects your personal information when you use XPAD.
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
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="space-y-10"
          >
            {sections.map((section, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="pb-10 border-b border-gray-100 last:border-none"
              >
                <h2 className="text-xl font-bold text-[#162e38] mb-4">{section.title}</h2>
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#162e38] py-16">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-4xl text-center">
          <div className="text-white/50 text-sm mb-3">Questions about your privacy?</div>
          <h2 className="text-2xl font-black text-white mb-4 tracking-tight">
            We're here to help
          </h2>
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto">
            Reach out to our support team if you have any questions about how we handle your data.
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
