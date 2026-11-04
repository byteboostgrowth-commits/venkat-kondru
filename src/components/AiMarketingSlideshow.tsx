import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Maximize2
} from 'lucide-react';
import { AI_MARKETING_SLIDES } from '../data/agencyData';
import { MarketingSlide } from '../types';

interface AiMarketingSlideshowProps {
  onOpenLeadModal: () => void;
  onOpenQuoteModal: () => void;
}

const SLIDE_INTERVAL_MS = 5000;

export const AiMarketingSlideshow: React.FC<AiMarketingSlideshowProps> = ({
  onOpenLeadModal,
  onOpenQuoteModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const slides = AI_MARKETING_SLIDES;
  const currentSlide: MarketingSlide = slides[currentIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Manage automatic interval and progress bar
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const progressStepMs = 50;
    const increment = (progressStepMs / SLIDE_INTERVAL_MS) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, progressStepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section
      id="ai-slideshow"
      aria-label="AI Digital Marketing Slideshow"
      className="relative py-16 sm:py-20 bg-[#F3F4F6] overflow-hidden border-b border-slate-200"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FF5E1E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF8800]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Title & Auto-Play Status Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-[#FF5E1E] text-xs font-semibold uppercase tracking-widest mb-3">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Interactive Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              AI Digital Marketing in Action
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Automatic showcase of our neural growth engines, generative creative studios, and real-time conversion models.
            </p>
          </div>

          {/* Quick Slideshow Controls in Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlaying && !isHovered ? 'bg-[#FF5E1E] animate-pulse' : 'bg-slate-400'
                }`}
              />
              <span>{isHovered ? 'Paused (Hovering)' : isPlaying ? 'Auto-Playing' : 'Paused'}</span>
            </div>

            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
              className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#FF5E1E] hover:text-[#FF5E1E] text-slate-700 transition-colors cursor-pointer shadow-xs"
              title={isPlaying ? 'Pause auto-sliding' : 'Resume auto-sliding'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Previous & Next Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#FF5E1E] hover:text-[#FF5E1E] text-slate-700 transition-colors cursor-pointer shadow-xs"
                title="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#FF5E1E] hover:text-[#FF5E1E] text-slate-700 transition-colors cursor-pointer shadow-xs"
                title="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN SLIDESHOW VIEWPORT */}
        {/* ========================================================================= */}
        <div
          className="relative rounded-3xl overflow-hidden border border-[#212638] bg-[#0E111A] shadow-2xl group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Continuous Auto-Slide Progress Bar (Top) */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-black/40 z-30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF5E1E] via-[#FF8800] to-amber-400 transition-all duration-75 ease-linear shadow-[0_0_12px_rgba(255,94,30,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Slides Container */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] w-full min-h-[460px] sm:min-h-[520px] overflow-hidden">
            {slides.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  {/* Background Slide Image with subtle cinematic zoom when active */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                      isActive ? 'scale-105' : 'scale-100'
                    }`}
                  />

                  {/* Dark Multi-layer Gradient Overlays for High-Contrast Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/75 via-45% to-black/30 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#07090E]/95 via-[#07090E]/80 via-40% to-transparent pointer-events-none" />

                  {/* Slide Content Overlay */}
                  <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end z-20">
                    <div className="max-w-2xl lg:max-w-3xl">
                      
                      {/* Top Badges & Index Counter */}
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5E1E]/90 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                          <Sparkles className="w-3.5 h-3.5" />
                          {slide.badge}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-slate-300 text-xs font-medium">
                          {slide.category}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#FF8800] text-xs font-mono font-semibold">
                          0{index + 1} / 0{slides.length}
                        </span>
                      </div>

                      {/* Main Slide Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2 sm:mb-3">
                        {slide.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-sm sm:text-base text-[#FF8C38] font-semibold mb-3">
                        {slide.subtitle}
                      </p>

                      {/* Deep Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mb-5 hidden sm:block">
                        {slide.description}
                      </p>

                      {/* Metric Badges */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mb-6">
                        {slide.metrics.map((metric, mIdx) => (
                          <div
                            key={mIdx}
                            className="px-3 py-2 rounded-xl bg-black/55 backdrop-blur-md border border-white/10"
                          >
                            <div className="text-base sm:text-xl font-bold text-white tracking-tight">
                              {metric.value}
                            </div>
                            <div className="text-[10px] sm:text-xs text-slate-400 truncate">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Slide Call to Actions */}
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={onOpenLeadModal}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] hover:shadow-[0_0_25px_rgba(255,94,30,0.5)] transition-all cursor-pointer group"
                        >
                          <span>Deploy This AI Strategy</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </button>

                        <button
                          type="button"
                          onClick={onOpenQuoteModal}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-slate-200 bg-black/50 backdrop-blur-md border border-white/15 hover:border-white/40 hover:text-white transition-all cursor-pointer"
                        >
                          <span>Get Free AI Audit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Large Floating Prev/Next Buttons for Mouse Users */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-2xl bg-black/50 hover:bg-[#FF5E1E] backdrop-blur-md border border-white/10 hover:border-[#FF5E1E] text-white transition-all duration-300 opacity-80 group-hover:opacity-100 cursor-pointer z-30 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-2xl bg-black/50 hover:bg-[#FF5E1E] backdrop-blur-md border border-white/10 hover:border-[#FF5E1E] text-white transition-all duration-300 opacity-80 group-hover:opacity-100 cursor-pointer z-30 shadow-lg"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Bottom Dot & Thumbnail Navigation Strip */}
          <div className="absolute bottom-4 right-4 sm:right-8 z-30 hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
            {slides.map((slide, index) => {
              const isCurrent = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                  className={`relative group transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'w-8 h-2.5 rounded-full bg-gradient-to-r from-[#FF5E1E] to-[#FF8800]'
                      : 'w-2.5 h-2.5 rounded-full bg-white/30 hover:bg-white/60'
                  }`}
                  title={slide.title}
                />
              );
            })}
          </div>
        </div>

        {/* Interactive Capability Thumbnails Row (Desktop / Tablet) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-6">
          {slides.map((slide, index) => {
            const isCurrent = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`text-left p-3 rounded-2xl transition-all duration-300 cursor-pointer border relative overflow-hidden flex flex-col justify-between shadow-xs ${
                  isCurrent
                    ? 'bg-white border-2 border-[#FF5E1E] shadow-[0_4px_20px_rgba(255,94,30,0.15)]'
                    : 'bg-white/90 border border-slate-200 hover:border-orange-300 hover:bg-orange-50/40'
                }`}
              >
                {/* Active indicator bar */}
                {isCurrent && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF5E1E] to-[#FF8800]" />
                )}

                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E1E] truncate">
                    0{index + 1} • {slide.badge.replace('AI ', '')}
                  </span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-ping" />
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-900 truncate w-full">
                  {slide.title}
                </div>

                <div className="text-[11px] text-slate-500 mt-1 truncate">
                  {slide.category}
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
