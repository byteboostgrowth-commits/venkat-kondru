import React from 'react';
import { Palette, TrendingUp, Monitor, Sparkles, Smartphone, Cpu, Receipt, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/agencyData';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'palette':
        return <Palette className="w-6 h-6" />;
      case 'trending-up':
        return <TrendingUp className="w-6 h-6" />;
      case 'monitor':
        return <Monitor className="w-6 h-6" />;
      case 'sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'cpu':
        return <Cpu className="w-6 h-6" />;
      case 'receipt':
      case 'billing':
        return <Receipt className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <section
      id="services"
      className="py-24 bg-[#F3F4F6] relative border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E1E]">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight">
            What We Offer
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From creative design to AI-powered marketing, we offer comprehensive solutions to grow your business.
          </p>
        </div>

        {/* Services 6-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              onClick={() => onSelectService(service)}
              className="p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-[#FF5E1E] hover:shadow-[0_10px_30px_rgba(255,94,30,0.15)] shadow-xs transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF5E1E] mb-6 group-hover:bg-[#FF5E1E] group-hover:text-white transition-colors duration-300">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#FF5E1E] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-[#FF5E1E] transition-colors">
                <span>Configure solution</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Center CTA Button */}
        <div className="mt-12 text-center">
          <a
            id="explore-services-cta"
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] hover:shadow-[0_0_30px_rgba(255,94,30,0.35)] transition-all duration-300 group shadow-md"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
