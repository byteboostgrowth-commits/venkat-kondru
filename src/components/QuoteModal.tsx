import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Calculator,
  MessageSquare,
  Send,
  Mail,
  Phone,
  Copy,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Building2,
  FileText
} from 'lucide-react';
import { AGENCY_INFO, SERVICES } from '../data/agencyData';
import { ServiceItem } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, preselectedService }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService.id] : ['digital-marketing']
  );
  const [budgetTier, setBudgetTier] = useState('growth');
  const [timeline, setTimeline] = useState('1-3-months');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService && !selectedServices.includes(preselectedService.id)) {
      setSelectedServices((prev) => [preselectedService.id, ...prev.filter((id) => id !== preselectedService.id)]);
    }
  }, [preselectedService]);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const getServiceTitles = () => {
    return selectedServices
      .map((id) => SERVICES.find((s) => s.id === id)?.title)
      .filter(Boolean);
  };

  const timelineLabels: Record<string, string> = {
    '1-3-months': '1-3 months',
    '3-6-months': '3-6 months',
    '1-year': '1 Year',
    'flexible-ongoing': 'Flexible ongoing',
  };

  const budgetLabels: Record<string, string> = {
    starter: 'Starter Tier (Emerging Brands)',
    growth: 'Growth Tier (Scaling Fast)',
    enterprise: 'Enterprise Tier (Custom Scope)',
  };

  // Pre-formatted WhatsApp Message for +91 9347842535
  const getFormattedWhatsAppMessage = () => {
    const serviceList = getServiceTitles().map((s) => `• ${s}`).join('\n');
    return `🚀 *NEW SERVICE REQUEST QUOTATION - BYTEBOOST AI*

👤 *CLIENT INFORMATION:*
• Name: ${name || 'Prospective Client'}
• Phone: ${phone || 'Not provided'}
• Email: ${email || 'Not provided'}

🛠️ *REQUESTED SERVICES:*
${serviceList || '• General Consultation'}

💼 *BUDGET SCOPE:*
${budgetLabels[budgetTier] || budgetTier}

⏱️ *PREFERRED TIMELINE:*
${timelineLabels[timeline] || timeline}

📝 *PROJECT NOTES & GOALS:*
${notes.trim() ? notes : 'Standard scope discussion requested.'}

📍 *DISPATCH CHANNELS:*
• Email: byteboost.growth@gmail.com
• WhatsApp: +91 93478 42535
📅 *Generated:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;
  };

  const getWhatsAppQuoteUrl = () => {
    const msg = getFormattedWhatsAppMessage();
    return `https://wa.me/919347842535?text=${encodeURIComponent(msg)}`;
  };

  // Pre-formatted Email Message for byteboost.growth@gmail.com
  const getEmailSubject = () => {
    const titles = getServiceTitles().join(', ');
    return `New Service Quotation Request: ${name || 'Prospective Client'} - ${titles || 'ByteBoost AI'}`;
  };

  const getFormattedEmailBody = () => {
    const serviceList = getServiceTitles().map((s) => `  - ${s}`).join('\n');
    return `NEW SERVICE REQUEST QUOTATION
======================================================
ByteBoost AI Digital Marketing Agency
Target Email: byteboost.growth@gmail.com
Target WhatsApp: +91 93478 42535
Location: Ushodya Junction, MVP Colony, Visakhapatnam, AP, India
======================================================

CLIENT CONTACT DETAILS:
- Full Name: ${name}
- Phone / WhatsApp: ${phone}
- Email Address: ${email}

REQUESTED SERVICES:
${serviceList || '  - General Consultation'}

PROJECT SPECIFICATIONS:
- Budget Tier: ${budgetLabels[budgetTier] || budgetTier}
- Timeline: ${timelineLabels[timeline] || timeline}

PROJECT SCOPE & REQUIREMENTS:
${notes.trim() ? notes : 'No additional notes provided. Looking forward to discussing.'}

SUBMISSION INFO:
- Sent via ByteBoost AI Web Portal Service Quote System
- Routed To: byteboost.growth@gmail.com & +91 9347842535
- Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
======================================================`;
  };

  const getMailtoQuoteUrl = () => {
    const subject = getEmailSubject();
    const body = getFormattedEmailBody();
    return `mailto:byteboost.growth@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getGmailWebmailUrl = () => {
    const subject = getEmailSubject();
    const body = getFormattedEmailBody();
    return `https://mail.google.com/mail/?view=cm&fs=1&to=byteboost.growth@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyMessage = () => {
    const fullText = getFormattedEmailBody();
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Trigger WhatsApp with target +91 9347842535
    const waUrl = getWhatsAppQuoteUrl();
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Error opening WhatsApp link:', err);
    }

    // 2. Trigger Mailto for byteboost.growth@gmail.com
    const mailtoUrl = getMailtoQuoteUrl();
    const hiddenLink = document.createElement('a');
    hiddenLink.href = mailtoUrl;
    hiddenLink.style.display = 'none';
    document.body.appendChild(hiddenLink);
    hiddenLink.click();
    document.body.removeChild(hiddenLink);

    setSubmitted(true);
  };

  return (
    <div
      id="quoteModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 p-5 sm:p-8 shadow-2xl">
        <button
          id="closeQuoteModalBtn"
          onClick={onClose}
          aria-label="Close quote modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-5">
              <img
                src={AGENCY_INFO.logo}
                alt="Byteboost AI"
                referrerPolicy="no-referrer"
                className="h-8 w-auto max-w-[170px] object-contain mb-3"
              />
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E1E] bg-orange-100 border border-orange-200 px-2.5 py-1 rounded">
                  CUSTOM ESTIMATE
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Direct to Email & WhatsApp
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">Get Your Project Quote</h3>
              <p className="text-xs text-slate-600 mt-1">
                Configure your required solutions. Your customized quotation will be dispatched directly to{' '}
                <span className="text-slate-900 font-medium">byteboost.growth@gmail.com</span> and WhatsApp{' '}
                <span className="text-slate-900 font-medium">+91 93478 42535</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Select Services */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Required Solutions (Multiple)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICES.map((s) => {
                    const active = selectedServices.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer flex items-center justify-between ${
                          active
                            ? 'bg-orange-50 border-[#FF5E1E] text-[#FF5E1E] font-semibold'
                            : 'bg-[#F9FAFB] border-slate-200 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <span className="truncate pr-1">{s.title}</span>
                        {active && <Check className="w-3.5 h-3.5 text-[#FF5E1E] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Target Scope & Budget Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'starter', label: 'Starter', desc: 'Emerging Brands' },
                    { id: 'growth', label: 'Growth', desc: 'Scaling Fast' },
                    { id: 'enterprise', label: 'Enterprise', desc: 'Market Leader' },
                  ].map((tier) => (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => setBudgetTier(tier.id)}
                      className={`p-2.5 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                        budgetTier === tier.id
                          ? 'bg-orange-50 border-[#FF5E1E] text-[#FF5E1E] font-semibold'
                          : 'bg-[#F9FAFB] border-slate-200 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div className="font-semibold">{tier.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Desired Timeline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '1-3-months', label: '1-3 months' },
                    { id: '3-6-months', label: '3-6 months' },
                    { id: '1-year', label: '1 Year' },
                    { id: 'flexible-ongoing', label: 'Flexible ongoing' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTimeline(t.id)}
                      className={`py-2.5 px-2 rounded-xl text-center border text-xs transition-all cursor-pointer ${
                        timeline === t.id
                          ? 'bg-orange-50 border-[#FF5E1E] text-[#FF5E1E] font-semibold'
                          : 'bg-[#F9FAFB] border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-800'
                      }`}
                    >
                      <div className="font-medium whitespace-nowrap">{t.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-[#F9FAFB] border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 93478 42535"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs bg-[#F9FAFB] border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-[#F9FAFB] border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Notes / Goals (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Target audience, expected deliverables, specific website or campaign goals..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs bg-[#F9FAFB] border border-slate-300 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E] focus:bg-white"
                />
              </div>

              {/* Destination Banner */}
              <div className="p-3 rounded-xl bg-[#F9FAFB] border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Quotation targets:</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                    <MessageSquare className="w-3 h-3" /> +91 93478 42535
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-[#FF5E1E] flex items-center gap-1 font-semibold">
                    <Mail className="w-3 h-3" /> byteboost.growth@gmail.com
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] hover:shadow-[0_0_20px_rgba(255,94,30,0.4)] flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Quote Request</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-3 space-y-5 text-center">
            {/* Header Success Icon */}
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                QUOTATION COMPILED & DISPATCHED
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">Quote Request Sent!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 leading-relaxed">
                Thank you, <span className="text-[#FF5E1E] font-semibold">{name}</span>! Your customized service request
                quotation has been formatted and directed to both Byteboost AI channels:
              </p>
            </div>

            {/* Dual Destination Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {/* WhatsApp Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#25D366]/50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    WHATSAPP
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">+91 93478 42535</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Direct chat with Byteboost leadership team in Visakhapatnam.
                  </p>
                </div>
                <a
                  href={getWhatsAppQuoteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp (+91 93478 42535)</span>
                </a>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-[#FF5E1E]/50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#FF5E1E]/20 border border-[#FF5E1E]/40 flex items-center justify-center text-[#FF5E1E]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E1E] bg-orange-100 px-2 py-0.5 rounded">
                    EMAIL
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 truncate">byteboost.growth@gmail.com</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Formal proposal and quote breakdown delivered to agency inbox.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <a
                    href={getMailtoQuoteUrl()}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] hover:shadow-[0_0_15px_rgba(255,94,30,0.35)] transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Mail App</span>
                  </a>
                  <a
                    href={getGmailWebmailUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:text-slate-900 transition-colors"
                  >
                    <span>Open in Web Gmail</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formatted Quotation Text Box with Copy Action */}
            <div className="text-left bg-[#F9FAFB] border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#FF5E1E]" />
                  <span>Quotation Message Preview</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FF5E1E] hover:text-[#d44813] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Full Message</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] font-mono text-slate-700 max-h-36 overflow-y-auto whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                {getFormattedEmailBody()}
              </pre>
            </div>

            {/* Bottom Actions */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                ← Edit Quotation Details
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:text-slate-900 transition-all cursor-pointer"
              >
                Done & Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

