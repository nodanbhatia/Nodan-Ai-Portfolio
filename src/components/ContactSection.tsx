import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  onSocialClick: (platform: 'github' | 'linkedin') => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSocialClick }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedState, setSubmittedState] = useState<{
    mailtoUrl: string;
    formattedPayload: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2200);
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(emailTrimmed)) {
      nextErrors.email = 'Please enter a valid email address (e.g. name@company.com).';
    }
    if (!message.trim()) {
      nextErrors.message = 'Please enter a message before sending.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedState(null);
      return;
    }

    setErrors({});
    const subject = `Portfolio Inquiry from ${name.trim()}`;
    const body = `Hello Nodan,\n\n${message.trim()}\n\n---\nFrom: ${name.trim()}\nReply-To: ${email.trim()}`;
    const mailtoUrl = `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSubmittedState({
      mailtoUrl,
      formattedPayload: `To: ${PROFILE_DATA.email}\nSubject: ${subject}\n\n${body}`,
    });

    // Trigger native mail client safely via an anchor click
    const anchor = document.createElement('a');
    anchor.href = mailtoUrl;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <section
      id="contact"
      className="relative z-10 py-20 sm:py-28 border-t border-white/[0.06] bg-[#101522]/40"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Columns: Direct Contact Details & Social Channels */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono text-[#38BDF8] tracking-wider">
                08. Get In Touch
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC] tracking-tight text-balance">
                Connect for Data Science, AI & Machine Learning Roles
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Available for Data Science, Machine Learning, and AI Analytics opportunities, internships, and collaborative projects.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email Card */}
              <div
                data-cursor-card="true"
                className="group interactive-card p-4 rounded-xl bg-[#080B12] border border-white/[0.08] hover:border-[#38BDF8]/35 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#101522] border border-white/[0.08] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                    <Mail className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-[#94A3B8]">Email</div>
                    <a
                      href={PROFILE_DATA.emailHref}
                      className="text-sm font-medium text-[#F8FAFC] hover:text-[#38BDF8] transition-colors truncate block"
                    >
                      {PROFILE_DATA.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                  aria-label="Copy email address"
                  className="interactive-btn px-2.5 py-1.5 rounded-lg bg-[#101522] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-colors shrink-0 inline-flex items-center gap-1.5"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span className="text-[#38BDF8]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div
                data-cursor-card="true"
                className="group interactive-card p-4 rounded-xl bg-[#080B12] border border-white/[0.08] hover:border-[#8B5CF6]/35 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#101522] border border-white/[0.08] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                    <Phone className="w-4 h-4 text-[#8B5CF6]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-[#94A3B8]">Phone</div>
                    <a
                      href={PROFILE_DATA.phoneHref}
                      className="text-sm font-mono font-medium text-[#F8FAFC] hover:text-[#38BDF8] transition-colors tabular-nums block"
                    >
                      {PROFILE_DATA.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE_DATA.phone, 'phone')}
                  aria-label="Copy phone number"
                  className="interactive-btn px-2.5 py-1.5 rounded-lg bg-[#101522] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-colors shrink-0 inline-flex items-center gap-1.5"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span className="text-[#38BDF8]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="pt-2 space-y-2.5">
              <div className="text-xs font-mono text-[#94A3B8]">
                Professional Profiles
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  data-magnetic="true"
                  onClick={() => onSocialClick('linkedin')}
                  className="group interactive-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#080B12] hover:bg-[#101522] border border-white/[0.1] hover:border-[#8B5CF6]/40 text-xs sm:text-sm font-medium text-[#F8FAFC] transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                >
                  <Linkedin
                    className="w-4 h-4 text-[#8B5CF6] transition-transform duration-200 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <span>LinkedIn</span>
                </button>
                <button
                  type="button"
                  data-magnetic="true"
                  onClick={() => onSocialClick('github')}
                  className="group interactive-btn inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#080B12] hover:bg-[#101522] border border-white/[0.1] hover:border-[#38BDF8]/40 text-xs sm:text-sm font-medium text-[#F8FAFC] transition-colors focus-visible:outline-2 focus-visible:outline-[#38BDF8]"
                >
                  <Github
                    className="w-4 h-4 text-[#38BDF8] transition-transform duration-200 group-hover:rotate-6"
                    aria-hidden="true"
                  />
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right 7 Columns: Validated Contact Form with Mailto Dispatch */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              data-cursor-card="true"
              className="interactive-card rounded-2xl bg-[#101522] border border-white/[0.08] hover:border-[#38BDF8]/30 p-6 sm:p-8 lg:p-10 space-y-6"
            >
              <div className="border-b border-white/[0.08] pb-4">
                <h3 className="text-lg font-bold text-[#F8FAFC]">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Completing this form prepares a pre-addressed message to{' '}
                  <span className="font-mono text-[#F8FAFC]">{PROFILE_DATA.email}</span> via your email client.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[#F8FAFC]"
                  >
                    Name <span className="text-[#38BDF8]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#080B12] border text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-rose-400 focus:border-rose-400'
                        : 'border-white/[0.1] focus:border-[#38BDF8]'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="text-xs text-rose-300 pt-0.5"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[#F8FAFC]"
                  >
                    Email <span className="text-[#38BDF8]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="you@organization.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#080B12] border text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-rose-400 focus:border-rose-400'
                        : 'border-white/[0.1] focus:border-[#38BDF8]'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="text-xs text-rose-300 pt-0.5"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[#F8FAFC]"
                >
                  Message <span className="text-[#38BDF8]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Share details about the role, project, or inquiry..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={`w-full px-4 py-3 rounded-xl bg-[#080B12] border text-sm text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:outline-none transition-colors resize-y ${
                    errors.message
                      ? 'border-rose-400 focus:border-rose-400'
                      : 'border-white/[0.1] focus:border-[#38BDF8]'
                  }`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="text-xs text-rose-300 pt-0.5"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  data-magnetic="true"
                  className="group interactive-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#080B12] bg-[#38BDF8] hover:bg-[#7DD3FC] rounded-xl transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <Send
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                  <span>Send Message</span>
                </button>

                <span className="text-xs text-[#94A3B8]">
                  Opens default mail client · Zero third-party tracking
                </span>
              </div>

              {/* Transparent Mailto Dispatch Confirmation & One-Click Copy Fallback */}
              {submittedState && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  role="status"
                  className="p-4 rounded-xl bg-[#080B12] border border-[#38BDF8]/40 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#38BDF8]">
                      Email Client Draft Prepared
                    </span>
                    <a
                      href={submittedState.mailtoUrl}
                      className="text-xs font-mono underline text-[#F8FAFC] hover:text-[#38BDF8]"
                    >
                      Re-open Mail App
                    </a>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Your email client has been prompted with your message to{' '}
                    <span className="text-[#F8FAFC] font-mono">
                      {PROFILE_DATA.email}
                    </span>
                    . If your browser does not have a default mail app configured, you can copy your formatted message below:
                  </p>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(submittedState.formattedPayload, 'full-message')
                      }
                      className="interactive-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101522] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-[#F8FAFC] transition-colors"
                    >
                      {copiedField === 'full-message' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span className="text-[#38BDF8]">
                            Copied Formatted Message
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#38BDF8]" />
                          <span>Copy Formatted Message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setName('');
                        setEmail('');
                        setMessage('');
                        setSubmittedState(null);
                      }}
                      className="text-xs text-[#94A3B8] hover:text-[#F8FAFC]"
                    >
                      Reset Form
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
