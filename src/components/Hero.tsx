import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onOpenLeadModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[640px] lg:min-h-[720px] pt-36 pb-24 lg:pt-48 lg:pb-36 bg-[#F3F4F6] overflow-hidden flex items-center"
    >
      {/* Background Image from User */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-full h-[112%] relative translate-y-6 sm:translate-y-9 lg:translate-y-12">
          <img
            src="/hero-bg.jpg"
            alt="AI Digital Marketing - Byteboost AI"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[80%_15%] sm:object-[right_15%] opacity-40 mix-blend-multiply transition-transform duration-700 hover:scale-105"
          />
        </div>
        {/* Left-to-right contrast overlay for text readability on light theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6] via-[#F3F4F6]/95 via-50% to-[#F3F4F6]/40 lg:to-transparent pointer-events-none" />
        {/* Top and bottom subtle vignettes */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#F8F9FA] via-[#F3F4F6]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F3F4F6] to-transparent pointer-events-none" />
      </div>

      {/* Tech Matrix Grid Overlay */}
      <div className="absolute inset-0 hero-grid-pattern opacity-60 pointer-events-none z-[1]" />

      {/* Glowing Ambient Orbs */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#FF5E1E]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow z-[1]" />
      <div className="absolute -bottom-20 left-10 w-72 h-72 bg-[#FF8800]/15 rounded-full blur-3xl pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Mini Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-orange-200 text-[#FF5E1E] text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF5E1E] animate-ping" />
            <span>AI-Powered Marketing Agency</span>
          </div>

          {/* Hero Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Boost Your Brand with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1E] via-amber-500 to-[#FF8800]">
              Intelligent Marketing
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-10 max-w-2xl">
            We combine AI technology with creative excellence to deliver marketing strategies that drive real results for your business.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-get-started-btn"
              onClick={onOpenLeadModal}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] hover:shadow-[0_0_30px_rgba(255,94,30,0.35)] hover:opacity-95 transition-all duration-300 group cursor-pointer shadow-md"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              id="hero-view-work-btn"
              href="#portfolio"
              className="inline-flex items-center px-7 py-3.5 rounded-full text-base font-semibold text-slate-700 bg-white border border-slate-300 hover:border-[#FF5E1E] hover:text-[#FF5E1E] transition-all duration-300 shadow-xs cursor-pointer"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
