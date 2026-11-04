import React from 'react';
import { AGENCY_INFO, STATS } from '../data/agencyData';

export const WhoWeAre: React.FC = () => {
  return (
    <section
      id="about"
      className="py-24 bg-white relative border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E1E]">
              WHAT WE ARE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Results-Driven Digital Marketing & <br className="hidden sm:inline" />
              Creative Solutions
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              ByteBoost Digital Marketing Agency is a results-driven digital marketing and creative solutions agency backed by 18+ years of professional experience in graphic design and visual communication. We combine deep creative expertise with modern digital technologies, AI-powered tools, and strategic marketing to help brands build a powerful identity, connect with the right audience, and accelerate business growth.
            </p>

            <div className="pt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5E1E] hover:text-[#E04B10] transition-colors group"
              >
                <span>Explore our services</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* Stats Bar */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#FF5E1E]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Studio / Tech Setup Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-[#F3F4F6] shadow-xl p-2.5 group">
              {/* Glow backdrop effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF5E1E]/15 to-amber-400/15 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              <div className="relative rounded-xl overflow-hidden bg-slate-100 aspect-[16/11]">
                <img
                  src={AGENCY_INFO.teamImage}
                  alt="Byteboost AI team monitoring data and marketing campaigns"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-lg bg-white/95 backdrop-blur border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono text-slate-800 font-semibold">
                      Neural Engine Active • Realtime ROI
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#FF5E1E] font-bold">99.8% Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
