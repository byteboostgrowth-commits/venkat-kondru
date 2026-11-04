import React from 'react';
import { TESTIMONIALS } from '../data/agencyData';

export const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-24 bg-[#F3F4F6] relative border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E1E]">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Don't just take our word for it — hear from the businesses we've helped grow.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              id={`testimonial-card-${item.id}`}
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#FF5E1E]/50 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                {/* Orange Double Quote Icon */}
                <div className="text-[#FF5E1E] mb-4 text-4xl font-serif leading-none select-none">
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
                  {item.role}, {item.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
