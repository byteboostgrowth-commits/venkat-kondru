import React from 'react';
import { Phone, Mail, MapPin, Heart, Instagram, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E5E7EB] border-t border-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-300">
          {/* Col 1: Brand details */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#hero" className="inline-block group" id="footer-brand-logo">
              <img
                src={AGENCY_INFO.logo}
                alt="Byteboost AI - Power of AI Digital Marketing"
                referrerPolicy="no-referrer"
                className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[250px] object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </a>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              The power of AI digital marketing. We blend artificial intelligence with creative excellence to grow brands from Visakhapatnam to the world.
            </p>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={AGENCY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Byteboost on Instagram"
                title="Follow @byteboostai on Instagram"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#E1306C] hover:border-[#E1306C] transition-all hover:scale-105 shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={AGENCY_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Byteboost Facebook"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#FF5E1E] hover:border-[#FF5E1E] transition-all shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={AGENCY_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Byteboost LinkedIn"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#FF5E1E] hover:border-[#FF5E1E] transition-all shadow-xs"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={AGENCY_INFO.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Byteboost X Twitter"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#FF5E1E] hover:border-[#FF5E1E] transition-all shadow-xs"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href={AGENCY_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Byteboost YouTube"
                className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:text-[#FF5E1E] hover:border-[#FF5E1E] transition-all shadow-xs"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <a className="hover:text-[#FF5E1E] transition-colors" href="#about">
                  What We Are
                </a>
              </li>
              <li>
                <a className="hover:text-[#FF5E1E] transition-colors" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-[#FF5E1E] transition-colors" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li>
                <a className="hover:text-[#FF5E1E] transition-colors" href="#clients">
                  Clients
                </a>
              </li>
              <li>
                <a className="hover:text-[#FF5E1E] transition-colors" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Get In Touch */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Get In Touch
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF5E1E] shrink-0" />
                <a
                  className="hover:text-[#FF5E1E] transition-colors"
                  href={`tel:${AGENCY_INFO.phoneRaw}`}
                >
                  {AGENCY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF5E1E] shrink-0" />
                <a
                  className="hover:text-[#FF5E1E] transition-colors"
                  href={`mailto:${AGENCY_INFO.email}`}
                >
                  {AGENCY_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Instagram className="w-4 h-4 text-[#E1306C] shrink-0" />
                <a
                  className="hover:text-[#E1306C] transition-colors"
                  href={AGENCY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow @byteboostai on Instagram"
                >
                  Follow @byteboostai
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5E1E] shrink-0 mt-0.5" />
                <a
                  href={AGENCY_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF5E1E] transition-colors leading-relaxed group inline-flex items-center gap-1.5"
                  title="View Byteboost on Google Maps"
                >
                  <span>{AGENCY_INFO.address}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div>© 2026 Byteboost AI. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-300 text-[11px] text-slate-600 shadow-xs">
              Engineered with <Heart className="w-3 h-3 text-[#FF5E1E] fill-[#FF5E1E]" /> in Visakhapatnam
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
