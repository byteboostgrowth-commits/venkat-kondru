import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Building2,
  FileText
} from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';
import { LeadFormData } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: (data: LeadFormData) => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
  });
  const [preferredTime, setPreferredTime] = useState('Immediate / Next Available');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getFormattedCallData = () => {
    return `📞 NEW STRATEGY CALL REQUEST - BYTEBOOST AI
======================================================
Client Call Data:
• Full Name: ${formData.fullName || 'Prospective Client'}
• Phone / WhatsApp: ${formData.phone || 'Not provided'}
• Email Address: ${formData.email || 'Not provided'}
• Business / Brand Name: ${formData.businessName || 'Consultation inquiry'}
• Preferred Time to Connect: ${preferredTime}

Agency Routing Desk:
• Target Email: byteboost.growth@gmail.com
• Target WhatsApp: +91 93478 42535
• Studio Location: Ushodya Junction, MVP Colony, Visakhapatnam
• Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
======================================================`;
  };

  const getWhatsAppCallUrl = () => {
    const msg = `🚀 *NEW STRATEGY CALL REQUEST - BYTEBOOST AI*

👤 *CLIENT CALL DETAILS:*
• Name: ${formData.fullName}
• Phone / WhatsApp: ${formData.phone}
• Email: ${formData.email}
• Business Name: ${formData.businessName || 'General Consultation'}
• Preferred Call Time: ${preferredTime}

📍 *DISPATCH DESK:*
• Email: byteboost.growth@gmail.com
• WhatsApp: +91 93478 42535
📅 *Requested:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

    return `https://wa.me/919347842535?text=${encodeURIComponent(msg)}`;
  };

  const getMailtoCallUrl = () => {
    const subject = `New Strategy Call Request: ${formData.fullName || 'Client'} - Byteboost AI`;
    const body = getFormattedCallData();
    return `mailto:byteboost.growth@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getGmailWebmailUrl = () => {
    const subject = `New Strategy Call Request: ${formData.fullName || 'Client'} - Byteboost AI`;
    const body = getFormattedCallData();
    return `https://mail.google.com/mail/?view=cm&fs=1&to=byteboost.growth@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(getFormattedCallData());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Trigger direct WhatsApp to +91 9347842535
    try {
      window.open(getWhatsAppCallUrl(), '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Error launching WhatsApp:', err);
    }

    // 2. Trigger mailto to byteboost.growth@gmail.com
    const mailtoUrl = getMailtoCallUrl();
    const hiddenLink = document.createElement('a');
    hiddenLink.href = mailtoUrl;
    hiddenLink.style.display = 'none';
    document.body.appendChild(hiddenLink);
    hiddenLink.click();
    document.body.removeChild(hiddenLink);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }
    }, 400);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      id="leadModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
    >
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-2xl">
        {/* Close button */}
        <button
          id="closeModalBtn"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            {/* Modal Header */}
            <div className="mb-5">
              <img
                src={AGENCY_INFO.logo}
                alt="Byteboost AI"
                referrerPolicy="no-referrer"
                className="h-8 w-auto max-w-[170px] object-contain mb-2.5"
              />
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-orange-100 border border-orange-200 text-[#FF5E1E]">
                  <Sparkles className="w-3 h-3" />
                  <span>1-ON-1 STRATEGY CONSULTATION</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Direct to Founders
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Schedule Your Strategy Call</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Provide your contact details. Your call request is transmitted immediately to{' '}
                <span className="text-slate-900 font-medium">byteboost.growth@gmail.com</span> and WhatsApp{' '}
                <span className="text-slate-900 font-medium">+91 93478 42535</span> for an instant response.
              </p>
            </div>

            {/* Lead & Call Capture Form */}
            <form id="leadForm" onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label
                  htmlFor="leadFullName"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="leadFullName"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-[#F9FAFB] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E] focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="leadPhone"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="leadPhone"
                    type="tel"
                    required
                    placeholder="+91 93478 42535"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#F9FAFB] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="leadEmail"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="leadEmail"
                    type="email"
                    required
                    placeholder="contact@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-[#F9FAFB] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="leadBusiness"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Business / Company Name (Optional)
                </label>
                <input
                  id="leadBusiness"
                  type="text"
                  placeholder="e.g. Acme Retail or Brand Website"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-[#F9FAFB] border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Call Time
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Immediate / Next Available',
                    'Morning (10 AM - 1 PM)',
                    'Afternoon (1 PM - 5 PM)',
                    'Evening (5 PM - 8 PM)',
                  ].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setPreferredTime(t)}
                      className={`px-3 py-2 rounded-xl text-left border text-[11px] font-medium transition-all cursor-pointer truncate ${
                        preferredTime === t
                          ? 'bg-orange-50 border-[#FF5E1E] text-[#FF5E1E] font-semibold'
                          : 'bg-[#F9FAFB] border-slate-200 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Routing Banner */}
              <div className="p-3 rounded-xl bg-[#F9FAFB] border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>Call request dispatched to:</span>
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

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  id="skipModalBtn"
                  type="button"
                  onClick={onClose}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="submitModalBtn"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] hover:shadow-[0_0_20px_rgba(255,94,30,0.4)] transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Dispatching...' : 'Request Strategy Call'}</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="py-2 space-y-4 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                CALL REQUEST DISPATCHED
              </span>
              <h4 className="text-xl font-bold text-slate-900 mt-2">We Received Your Request!</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-[#FF5E1E] font-semibold">{formData.fullName}</span>! Your call request has been transmitted directly to our leadership team:
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {/* WhatsApp Card */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex flex-col justify-between space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    WHATSAPP
                  </span>
                  <span className="text-xs font-bold text-slate-900">+91 93478 42535</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Connect immediately with senior strategists in Visakhapatnam.
                </p>
                <a
                  href={getWhatsAppCallUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Email Card */}
              <div className="p-3.5 rounded-2xl bg-orange-50/50 border border-orange-200 flex flex-col justify-between space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E1E] bg-orange-100 px-2 py-0.5 rounded">
                    EMAIL
                  </span>
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[130px]">byteboost.growth@gmail.com</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Call brief delivered straight to executive agency inbox.
                </p>
                <div className="flex gap-1.5">
                  <a
                    href={getMailtoCallUrl()}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] transition-all"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Mail App</span>
                  </a>
                  <a
                    href={getGmailWebmailUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:text-slate-900"
                    title="Open in Web Gmail"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Formatted Message Preview & Copy */}
            <div className="text-left bg-[#F9FAFB] border border-slate-200 rounded-2xl p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#FF5E1E]" />
                  <span>Call Request Summary</span>
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
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[10.5px] font-mono text-slate-700 max-h-28 overflow-y-auto whitespace-pre-wrap bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                {getFormattedCallData()}
              </pre>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                ← Edit Call Details
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Done & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

