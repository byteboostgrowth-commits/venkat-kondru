import React, { useState } from 'react';
import { Bell, Menu, X, ArrowRight } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface NavbarProps {
  onOpenLeadModal: () => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadModal, onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'AI Showcase', href: '#ai-slideshow' },
    { label: 'What We Are', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Clients', href: '#clients' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F8F9FA]/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center group py-2" id="nav-brand-logo">
          <img
            src={AGENCY_INFO.logo}
            alt="Byteboost AI - Power of AI Digital Marketing"
            referrerPolicy="no-referrer"
            className="h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[240px] object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#FF5E1E] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3.5">
          {/* Get Free Audit button */}
          <button
            id="nav-get-audit-btn"
            onClick={onOpenLeadModal}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-700 hover:text-[#FF5E1E] px-3.5 py-2 rounded-lg bg-white border border-slate-200 hover:border-[#FF5E1E]/50 transition-colors shadow-xs cursor-pointer font-medium"
          >
            <Bell className="w-3.5 h-3.5 text-[#FF5E1E]" />
            <span>Get Free Audit</span>
          </button>

          {/* Get Quote button */}
          <button
            id="nav-get-quote-btn"
            onClick={onOpenQuoteModal}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] hover:shadow-[0_0_20px_rgba(255,94,30,0.35)] hover:opacity-95 transition-all duration-300 cursor-pointer"
          >
            Get Quote
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            id="nav-mobile-toggle-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-700 hover:text-[#FF5E1E] text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#FF5E1E]"
            >
              Get Free Audit
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full text-center py-2.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white hover:opacity-95"
            >
              Get Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
