import { useState } from "react";
import type { FormEvent } from "react";
import { AlertTriangle, CheckCircle2, Trash2 } from "lucide-react";

type DeleteRequestForm = {
  xpadEmail: string;
  xpadPassword: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  reason: string;
  confirm: boolean;
};

const initialForm: DeleteRequestForm = {
  xpadEmail: "",
  xpadPassword: "",
  accountName: "",
  bankName: "",
  accountNumber: "",
  reason: "",
  confirm: false,
};

export const DeleteAccountRequest = () => {
  const [form, setForm] = useState<DeleteRequestForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = form.xpadEmail.trim().toLowerCase();
    const accountNumber = form.accountNumber.trim();
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    const accountNumberLooksValid = /^\d{10,18}$/.test(accountNumber);

    if (!emailLooksValid) {
      setError("Enter a valid XPAD account email address.");
      return;
    }

    if (!form.xpadPassword.trim()) {
      setError("Enter your XPAD password.");
      return;
    }

    if (!accountNumberLooksValid) {
      setError("Enter a valid account number (10 to 18 digits).");
      return;
    }

    if (!form.confirm) {
      setError("You must confirm that account deletion is permanent.");
      return;
    }

    const subject = `XPAD Account Deletion Request - ${normalizedEmail}`;
    const body = [
      "XPAD Account Deletion Request",
      "",
      `XPAD Email: ${normalizedEmail}`,
      `XPAD Password: ${form.xpadPassword}`,
      `Bank Account Name: ${form.accountName.trim()}`,
      `Bank Name: ${form.bankName.trim()}`,
      `Bank Account Number: ${accountNumber}`,
      `Additional Note: ${form.reason.trim() || "N/A"}`,
      "",
      "I confirm this request is submitted by the account owner.",
    ].join("\n");

    window.location.href = `mailto:apps@gigxpad.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="overflow-x-hidden bg-white">
      <section className="bg-[#f2f6f7] pt-32 pb-16 border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fdf2f2] flex items-center justify-center shrink-0">
              <Trash2 className="w-6 h-6 text-[#e25a5a]" />
            </div>
            <div>
              <p className="text-[#e25a5a] text-xs font-bold tracking-[0.2em] uppercase mb-2">
                Account Support
              </p>
              <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-[#162e38] mb-4">
                Request XPAD Account Deletion
              </h1>
              <p className="text-[#67777e] text-sm lg:text-base leading-relaxed max-w-2xl">
                Submit this form to request deletion of your XPAD account. If
                your wallet has any remaining balance, we will transfer it to
                the bank account details you provide below as your payout
                destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12 xl:px-20 max-w-3xl">
          {submitted ? (
            <div className="bg-[#f5fbf7] border border-[#b9e7c8] rounded-3xl p-8 lg:p-10">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-[#162e38] mb-3">
                Request Received
              </h2>
              <p className="text-[#67777e] text-sm leading-relaxed mb-5">
                Your email app should open with a prefilled deletion request
                addressed to apps@gigxpad.com. Send the email to complete your
                request, and support will contact you through your XPAD email
                for verification.
              </p>
              <a
                href="mailto:apps@gigxpad.com"
                className="inline-flex mb-4 text-sm font-semibold text-[#e25a5a] hover:underline"
              >
                Open apps@gigxpad.com manually
              </a>
              <br />
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setSubmitted(false);
                }}
                className="bg-[#162e38] hover:bg-[#0f2027] text-white text-sm font-bold px-6 py-3 rounded-full transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="bg-white border border-gray-200 rounded-3xl p-6 lg:p-10 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="md:col-span-2">
                  <span className="block text-sm font-semibold text-[#162e38] mb-2">
                    XPAD Email Address
                  </span>
                  <input
                    type="email"
                    required
                    value={form.xpadEmail}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        xpadEmail: event.target.value,
                      }))
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#162e38] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/25 focus:border-[#e25a5a]"
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="block text-sm font-semibold text-[#162e38] mb-2">
                    XPAD Password
                  </span>
                  <input
                    type="password"
                    required
                    value={form.xpadPassword}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        xpadPassword: event.target.value,
                      }))
                    }
                    placeholder="Enter your XPAD password"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#162e38] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/25 focus:border-[#e25a5a]"
                  />
                </label>

                <label>
                  <span className="block text-sm font-semibold text-[#162e38] mb-2">
                    Bank Account Name (for remaining balance transfer)
                  </span>
                  <input
                    type="text"
                    required
                    value={form.accountName}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        accountName: event.target.value,
                      }))
                    }
                    placeholder="Account holder name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#162e38] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/25 focus:border-[#e25a5a]"
                  />
                </label>

                <label>
                  <span className="block text-sm font-semibold text-[#162e38] mb-2">
                    Bank Name (for remaining balance transfer)
                  </span>
                  <input
                    type="text"
                    required
                    value={form.bankName}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        bankName: event.target.value,
                      }))
                    }
                    placeholder="Bank name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#162e38] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/25 focus:border-[#e25a5a]"
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="block text-sm font-semibold text-[#162e38] mb-2">
                    Account Number (where remaining balance will be transferred)
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    required
                    value={form.accountNumber}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        accountNumber: event.target.value.replace(/[^\d]/g, ""),
                      }))
                    }
                    placeholder="10 to 18 digits"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#162e38] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/25 focus:border-[#e25a5a]"
                  />
                </label>

                <label className="md:col-span-2">
                  <span className="block text-sm font-semibold text-[#162e38] mb-2">
                    Additional Note (Optional)
                  </span>
                  <textarea
                    rows={4}
                    value={form.reason}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        reason: event.target.value,
                      }))
                    }
                    placeholder="Tell us anything we should know for this request"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-[#162e38] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e25a5a]/25 focus:border-[#e25a5a]"
                  />
                </label>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-[#fff9f9] border border-[#f7dede] flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#e25a5a] shrink-0 mt-0.5" />
                <p className="text-sm text-[#67777e] leading-relaxed">
                  Deleting your account is permanent and cannot be reversed. Any
                  remaining balance will be transferred to the account details
                  provided above, so ensure they are accurate.
                </p>
              </div>

              <label className="mt-5 flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  checked={form.confirm}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      confirm: event.target.checked,
                    }))
                  }
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#e25a5a] focus:ring-[#e25a5a]"
                />
                <span className="text-sm text-[#67777e] leading-relaxed">
                  I confirm I am the account owner and I understand this request
                  may require identity verification.
                </span>
              </label>

              {error && (
                <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
              )}

              <button
                type="submit"
                className="mt-6 w-full md:w-auto bg-[#e25a5a] hover:bg-[#d13f3f] text-white text-sm font-bold px-8 py-3.5 rounded-full transition-all"
              >
                Submit Deletion Request
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
