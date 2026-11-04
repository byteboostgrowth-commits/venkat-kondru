import React, { useState } from 'react';
import { TRUSTED_CLIENTS, TESTIMONIALS } from '../data/agencyData';
import { ClientItem } from '../types';
import { Building2, MapPin, TrendingUp, Sparkles, Star, Quote, ArrowUpRight } from 'lucide-react';

interface ClientsProps {
  onOpenQuoteModal?: () => void;
}

export const Clients: React.FC<ClientsProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Dynamically extract all unique categories
  const categories = ['All', ...Array.from(new Set(TRUSTED_CLIENTS.map((c) => c.category)))];

  const filteredClients = selectedCategory === 'All'
    ? TRUSTED_CLIENTS
    : TRUSTED_CLIENTS.filter((c) => c.category === selectedCategory);

  return (
    <section
      id="clients"
      className="py-24 bg-[#F3F4F6] relative border-t border-slate-200 overflow-hidden"
    >
      {/* Glow background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#FF5E1E]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#FF5E1E] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trusted Partnerships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Trusted by Market Leaders &amp; Visionary Brands
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Byteboost AI Digital Marketing Agency proudly partners with distinguished healthcare institutions, 
            culinary leaders, defense organizations, enterprise consultancies, and premier retail enterprises 
            to accelerate brand presence and measurable business growth.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY FILTER TABS */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-xs ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white shadow-[0_0_20px_rgba(255,94,30,0.3)] font-semibold'
                  : 'bg-white text-slate-700 hover:text-[#FF5E1E] border border-slate-200 hover:border-orange-300'
              }`}
            >
              {category}
              {category === 'All' && ` (${TRUSTED_CLIENTS.length})`}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* CLIENT DETAILS CARDS GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-24">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              id={`client-card-${client.id}`}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#FF5E1E] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Card Top: Client Title & Category/Location Badges */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#FF5E1E] transition-colors">
                        {client.name}
                      </h3>
                      {client.regionalName && (
                        <span className="text-sm font-semibold text-slate-500">
                          ({client.regionalName})
                        </span>
                      )}
                    </div>
                    {client.tagline && (
                      <p className="text-xs sm:text-sm text-slate-500 italic mt-0.5">
                        "{client.tagline}"
                      </p>
                    )}
                    <p className="text-xs font-medium text-[#FF5E1E] mt-1.5">
                      Industry: {client.industry}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-row sm:flex-col sm:items-end gap-1.5 flex-wrap shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF5E1E] text-xs font-semibold">
                      <Building2 className="w-3.5 h-3.5" />
                      {client.category}
                    </span>
                    {client.location && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {client.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Division line */}
                <div className="my-5 flex items-center gap-3">
                  <div className="w-1/3 h-[2px] bg-gradient-to-r from-[#FF5E1E] via-[#FF8800]/70 to-transparent rounded-full" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] shrink-0" />
                  <div className="h-[1px] flex-1 bg-slate-200" />
                </div>

                {/* Client In-Depth Description */}
                <div className="mb-5">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5">
                    About The Client:
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {client.description}
                  </p>
                </div>

                {/* Byteboost AI Marketing Impact Box */}
                <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200/80 text-xs">
                  <div className="flex items-center gap-2 text-[#FF5E1E] font-bold uppercase tracking-wider mb-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>Byteboost AI Growth Impact</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {client.growthImpact}
                  </p>
                </div>
              </div>

              {/* Card Footer: Highlight Metric & Quote Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                {client.highlightMetric ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {client.highlightMetric.value}
                    </span>
                    <span className="text-xs text-slate-500 font-medium leading-tight">
                      {client.highlightMetric.label}
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">Verified Client</div>
                )}

                {onOpenQuoteModal && (
                  <button
                    onClick={onOpenQuoteModal}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF5E1E] hover:text-[#E04B10] transition-colors cursor-pointer"
                  >
                    <span>Get Similar Strategy</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* TESTIMONIALS & CLIENT WORDS SECTION (Keeps #testimonials anchor working) */}
        {/* ========================================================================= */}
        <div id="testimonials" className="pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E1E]">
              WHAT OUR CLIENTS SAY
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-3 tracking-tight">
              Direct Feedback from Trusted Partners
            </h3>
            <p className="text-slate-600 text-sm">
              Real voices, verified partnerships, and long-term marketing relationships that speak for themselves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                id={`testimonial-card-${item.id}`}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#FF5E1E] transition-all flex flex-col justify-between group shadow-xs hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FF5E1E] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="text-[#FF5E1E] mb-3 text-3xl font-serif leading-none select-none">
                    ❝
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="font-bold text-slate-900 text-sm group-hover:text-[#FF5E1E] transition-colors">
                    {item.author}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {item.role}, <span className="text-slate-700 font-medium">{item.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
