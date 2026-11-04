import React from 'react';
import { PORTFOLIO_PROJECTS } from '../data/agencyData';
import { PortfolioProject } from '../types';

interface PortfolioProps {
  onSelectProject: (project: PortfolioProject) => void;
  onOpenQuoteModal: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject, onOpenQuoteModal }) => {
  return (
    <section
      id="portfolio"
      className="py-24 bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E1E]">
            PORTFOLIO
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4 tracking-tight">
            Our Recent Work
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Take a look at some of our latest projects and see the results we deliver.
          </p>
        </div>

        {/* 4 Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_PROJECTS.map((project) => (
            <div
              key={project.id}
              id={`portfolio-card-${project.id}`}
              onClick={() => onSelectProject(project)}
              className="group rounded-2xl overflow-hidden bg-[#F8F9FA] border border-slate-200 hover:border-[#FF5E1E] transition-all duration-300 flex flex-col cursor-pointer shadow-xs hover:shadow-xl"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] text-slate-800 font-semibold border border-slate-200 shadow-xs">
                  Click to inspect
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5E1E]">
                    {project.categoryTag}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1 group-hover:text-[#FF5E1E] transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <span>{project.client}</span>
                  <span className="text-[#FF5E1E] font-bold">{project.roi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Portfolio Outline Button */}
        <div className="mt-12 text-center">
          <button
            id="view-full-portfolio-btn"
            onClick={onOpenQuoteModal}
            className="inline-flex items-center px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-[#FF5E1E] hover:text-[#FF5E1E] transition-colors cursor-pointer shadow-xs"
          >
            View Full Portfolio
          </button>
        </div>
      </div>
    </section>
  );
};
