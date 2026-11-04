import React from 'react';
import { X, ExternalLink, CheckCircle, ArrowRight } from 'lucide-react';
import { PortfolioProject } from '../types';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onRequestSimilar: (project: PortfolioProject) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
}) => {
  if (!project) return null;

  return (
    <div
      id="projectModal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Project Image Banner */}
          <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 shadow-xs">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#FF5E1E] px-2.5 py-1 rounded shadow-xs">
                {project.categoryTag}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1.5 drop-shadow-sm">{project.title}</h3>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F9FAFB] border border-slate-200 text-center">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Client</div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5">{project.client}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Timeline</div>
              <div className="text-xs font-semibold text-slate-900 mt-0.5">{project.duration}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Measured Impact</div>
              <div className="text-xs font-bold text-[#FF5E1E] mt-0.5">{project.roi}</div>
            </div>
          </div>

          {/* Narrative Summary */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Project Overview</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Deliverables */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Core Deliverables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F9FAFB] border border-slate-200 text-xs text-slate-700"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#FF5E1E] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 cursor-pointer transition-colors"
            >
              Back to Portfolio
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestSimilar(project);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] hover:shadow-[0_0_20px_rgba(255,94,30,0.35)] cursor-pointer"
            >
              <span>Request Similar Solution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
