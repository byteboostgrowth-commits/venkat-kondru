import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  Landmark,
  Globe,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Navigation,
  Copy,
  Check,
  MessageCircle,
  Instagram,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface ContactProps {
  onOpenLeadModal: () => void;
  onOpenQuoteModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenLeadModal, onOpenQuoteModal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      'Ushodya Junction, MVP Colony, Visakhapatnam, Andhra Pradesh, India.'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const directionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Byteboost+AI+Digital+Marketing+Agency,+Ushodya+Junction,+MVP+Colony,+Visakhapatnam,+Andhra+Pradesh,+India';

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#FF5E1E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-xs font-semibold text-[#FF5E1E] mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>VISIT OUR INNOVATION STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Find Us on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1E] via-[#FF8800] to-amber-600">Google Maps</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Headquartered in coastal Andhra Pradesh at <span className="text-slate-900 font-semibold">Ushodya Junction, MVP Colony, Visakhapatnam, Andhra Pradesh, India</span>. Drop in for a strategy session or connect with our AI marketing team online.
          </p>
        </div>

        {/* Bento Grid: Info Cards + Google Maps Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Office Details & Direct Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            {/* Primary Office Location Card */}
            <div
              id="contact-location-card"
              className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FA] border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#FF5E1E] transition-colors"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5E1E]/5 rounded-bl-full blur-xl pointer-events-none" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#FF5E1E] to-[#FF8800] p-0.5 flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(255,94,30,0.25)]">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-[#FF5E1E]">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Byteboost Headquarters
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Byteboost AI Digital Marketing Agency
                  </h3>
                </div>
              </div>

              {/* Physical Street Address with Icons */}
              <div className="mt-5 pt-4 border-t border-slate-200 space-y-3">
                {/* Full Address Block */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 group/addr shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E1E] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#FF5E1E] uppercase tracking-wider flex items-center gap-1.5">
                      <span>Agency Address</span>
                    </p>
                    <p className="text-sm font-semibold text-slate-900 mt-1 leading-snug break-words">
                      Ushodya Junction, MVP Colony, Visakhapatnam, Andhra Pradesh, India.
                    </p>
                  </div>
                </div>

                {/* Structured Breakdown with Icons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2.5 shadow-xs">
                    <div className="w-7 h-7 rounded-md bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E1E] shrink-0">
                      <Landmark className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-500 block leading-tight">Landmark</span>
                      <span className="font-semibold text-slate-800 text-xs truncate block">Ushodya Junction</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2.5 shadow-xs">
                    <div className="w-7 h-7 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-500 block leading-tight">Colony</span>
                      <span className="font-semibold text-slate-800 text-xs truncate block">MVP Colony</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2.5 shadow-xs">
                    <div className="w-7 h-7 rounded-md bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-slate-500 block leading-tight">City & State</span>
                      <span className="font-semibold text-slate-800 text-xs truncate block">Visakhapatnam, AP</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  id="contact-open-gmaps-btn"
                  href={AGENCY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[170px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(255,94,30,0.3)] transition-all cursor-pointer shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  id="contact-get-directions-btn"
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FF5E1E]" />
                  <span>Directions</span>
                </a>

                <button
                  id="contact-copy-address-btn"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs transition-colors cursor-pointer shadow-xs"
                  title="Copy full address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 text-xs font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Contact Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Phone */}
              <a
                id="contact-phone-card"
                href={`tel:${AGENCY_INFO.phoneRaw}`}
                className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 hover:border-[#FF5E1E] hover:bg-white transition-all flex items-center gap-3 group shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E1E] shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-medium text-slate-500">Direct Phone</p>
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#FF5E1E] transition-colors">
                    {AGENCY_INFO.phone}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                id="contact-email-card"
                href={`mailto:${AGENCY_INFO.email}`}
                className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 hover:border-blue-400 hover:bg-white transition-all flex items-center gap-3 group shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-medium text-slate-500">Official Email</p>
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                    {AGENCY_INFO.email}
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                id="contact-whatsapp-card"
                href={AGENCY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 hover:border-emerald-500 hover:bg-white transition-all flex items-center gap-3 group h-full shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-medium text-slate-500">Quick WhatsApp</p>
                  <p className="text-xs font-bold text-emerald-600 truncate">
                    Chat with Strategist
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Instant online support</p>
                </div>
              </a>

              {/* Instagram Quick Link */}
              <a
                id="contact-instagram-quick-card"
                href="https://www.instagram.com/byteboostai/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 hover:border-[#E1306C] hover:bg-white transition-all flex items-center gap-3 group h-full shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-[#E1306C] shrink-0 group-hover:scale-105 transition-transform">
                  <Instagram className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-medium text-slate-500">Instagram</p>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-[#E1306C] truncate transition-colors">
                    @byteboostai
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Follow for daily tips</p>
                </div>
              </a>

              {/* Studio Hours */}
              <div
                id="contact-hours-card"
                className="sm:col-span-2 p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 flex items-start gap-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[11px] font-medium text-slate-500">Studio Hours</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Open
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-slate-500">Mon - Fri</span>
                      <span className="font-semibold text-slate-800">10am to 7pm</span>
                    </div>
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-slate-500">Saturday</span>
                      <span className="font-semibold text-slate-800">10am - 5pm</span>
                    </div>
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="text-slate-500">Sunday</span>
                      <span className="font-medium text-amber-700">Holiday (depends)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fast Audit CTA Banner */}
            <div className="p-4 rounded-xl bg-orange-50/80 border border-orange-200 flex items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF5E1E] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Want to meet our team?</p>
                  <p className="text-[11px] text-slate-600">Schedule an in-person or virtual consultation</p>
                </div>
              </div>
              <button
                id="contact-book-meeting-btn"
                onClick={onOpenLeadModal}
                className="px-3.5 py-2 rounded-lg bg-[#FF5E1E] hover:bg-[#E04B10] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Viewer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              id="google-maps-container"
              className="w-full flex-1 min-h-[420px] sm:min-h-[500px] rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-lg flex flex-col relative group"
            >
              {/* Map Top Bar */}
              <div className="px-4 py-3 bg-[#F8F9FA] border-b border-slate-200 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="font-semibold text-slate-900 truncate">
                    Byteboost AI Digital Marketing Agency
                  </span>
                  <span className="hidden sm:inline-block text-slate-400">•</span>
                  <span className="hidden sm:inline-block text-slate-500 truncate">
                    Ushodya Junction, MVP Colony, Visakhapatnam
                  </span>
                </div>

                <a
                  href={AGENCY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#FF5E1E] hover:text-[#E04B10] shrink-0"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Google Maps iFrame */}
              <div className="relative w-full flex-1 min-h-[360px] bg-slate-100">
                <iframe
                  id="gmaps-embed-iframe"
                  title="Byteboost AI Digital Marketing Agency Location Map"
                  src={AGENCY_INFO.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full filter contrast-[1.02]"
                />

                {/* Floating Map Info Overlay Pill */}
                <div className="absolute top-3 left-3 right-3 sm:right-auto pointer-events-none z-10">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md pointer-events-auto">
                    <div className="w-6 h-6 rounded-md bg-[#FF5E1E] flex items-center justify-center text-white shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-900 leading-tight">Ushodya Junction, MVP Colony</p>
                      <p className="text-[10px] text-slate-500">Visakhapatnam, Andhra Pradesh, India.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Bottom Action Bar */}
              <div className="p-3.5 sm:p-4 bg-[#F8F9FA] border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Google Business Profile</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    id="maps-bottom-direct-link"
                    href={AGENCY_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white text-xs font-semibold hover:shadow-[0_0_15px_rgba(255,94,30,0.35)] transition-all shadow-xs"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    id="maps-bottom-directions-link"
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-medium transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#FF5E1E]" />
                    <span className="hidden sm:inline">Get</span>
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Follow Us on Instagram Showcase Banner */}
        <div
          id="follow-instagram"
          className="mt-12 rounded-2xl bg-gradient-to-r from-orange-50/80 via-white to-rose-50/70 border border-orange-200 p-6 sm:p-8 lg:p-10 relative overflow-hidden group hover:border-[#E1306C] transition-all shadow-md"
        >
          {/* Ambient Instagram Gradient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Instagram Branding & Information */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 max-w-2xl">
              {/* Instagram Icon Badge with Authentic Gradient Ring */}
              <a
                href={AGENCY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative shrink-0 group/icon cursor-pointer"
                title="Open Byteboost AI on Instagram"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] p-[2.5px] shadow-[0_8px_24px_rgba(225,48,108,0.25)] group-hover/icon:scale-105 transition-transform">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-[#E1306C]">
                    <Instagram className="w-8 h-8 sm:w-10 sm:h-10 text-[#E1306C] group-hover/icon:scale-110 transition-transform" />
                  </div>
                </div>
                {/* Live Pulse Dot */}
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E1306C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E1306C] border-2 border-white"></span>
                </span>
              </a>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-[#E1306C] mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse" />
                  <span>OFFICIAL INSTAGRAM CHANNEL</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Follow Us on Instagram{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD1D1D] via-[#E1306C] to-[#833AB4]">
                    @byteboostai
                  </span>
                </h3>
                <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Connect with our creative and AI marketing team for daily high-ROAS campaign breakdowns, viral reels, digital growth masterclasses, and behind-the-scenes inside our Visakhapatnam studio.
                </p>

                {/* Topic Pills */}
                <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-xs">
                    🎬 AI Marketing Reels
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-xs">
                    📈 Client Case Studies
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-xs">
                    💡 Vizag Studio BTS
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-xs">
                    ⚡ Growth Strategies
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Direct Follow CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 w-full sm:w-auto shrink-0">
              <a
                id="contact-follow-instagram-primary-btn"
                href={AGENCY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white font-bold text-sm shadow-[0_4px_20px_rgba(225,48,108,0.3)] hover:shadow-[0_6px_28px_rgba(225,48,108,0.4)] hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow @byteboostai</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                id="contact-view-instagram-profile-btn"
                href={AGENCY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold transition-colors shadow-xs"
              >
                <span>View Latest Posts & Reels</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E1306C]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
