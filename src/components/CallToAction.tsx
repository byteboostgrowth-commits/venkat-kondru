import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface CallToActionProps {
  onOpenLeadModal: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenLeadModal }) => {
  return (
    <section id="cta" className="py-16 bg-[#F3F4F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FF5E1E] via-[#FF6B26] to-[#FF8800] p-8 sm:p-14 text-center shadow-[0_15px_40px_rgba(255,94,30,0.3)]">
          {/* Subtle Glow Ring */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-white/20 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 relative z-10">
            Ready to Boost Your Brand?
          </h2>

          <p className="text-orange-50 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8 relative z-10 font-medium">
            Let's discuss how our AI-powered marketing solutions can help your business grow.
          </p>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
            <button
              id="cta-start-conversation-btn"
              onClick={onOpenLeadModal}
              className="px-8 py-3.5 rounded-full text-base font-bold text-[#FF5E1E] bg-white hover:bg-orange-50 hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 cursor-pointer group shadow-lg"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              id="cta-whatsapp-link"
              href={AGENCY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors inline-flex items-center gap-2 shadow-lg border border-emerald-400/40"
            >
              <MessageCircle className="w-5 h-5 text-white fill-white/20" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
