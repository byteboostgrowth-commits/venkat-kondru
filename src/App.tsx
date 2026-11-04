import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AiMarketingSlideshow } from './components/AiMarketingSlideshow';
import { WhoWeAre } from './components/WhoWeAre';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { QuoteModal } from './components/QuoteModal';
import { ProjectModal } from './components/ProjectModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { PortfolioProject, ServiceItem } from './types';

export default function App() {
  // Starts open so it reproduces the exact visual screen in Image 1.png
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);

  const handleSelectService = (service: ServiceItem) => {
    setPreselectedService(service);
    setIsQuoteModalOpen(true);
  };

  const handleRequestSimilarProject = (project: PortfolioProject) => {
    setSelectedProject(null);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen text-slate-800 selection:bg-[#FF5E1E] selection:text-white relative">
      {/* Top Navigation */}
      <Navbar
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
        onOpenQuoteModal={() => {
          setPreselectedService(null);
          setIsQuoteModalOpen(true);
        }}
      />

      {/* Main Sections */}
      <main>
        <Hero onOpenLeadModal={() => setIsLeadModalOpen(true)} />
        <AiMarketingSlideshow
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
          onOpenQuoteModal={() => {
            setPreselectedService(null);
            setIsQuoteModalOpen(true);
          }}
        />
        <WhoWeAre />
        <Services onSelectService={handleSelectService} />
        <Portfolio
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenQuoteModal={() => {
            setPreselectedService(null);
            setIsQuoteModalOpen(true);
          }}
        />
        <Clients
          onOpenQuoteModal={() => {
            setPreselectedService(null);
            setIsQuoteModalOpen(true);
          }}
        />
        <Contact
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
          onOpenQuoteModal={() => {
            setPreselectedService(null);
            setIsQuoteModalOpen(true);
          }}
        />
        <CallToAction onOpenLeadModal={() => setIsLeadModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        preselectedService={preselectedService}
        onClose={() => {
          setIsQuoteModalOpen(false);
          setPreselectedService(null);
        }}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilar={handleRequestSimilarProject}
      />

      {/* Floating Interactive Hub */}
      <div
        data-purpose="floating-interactive-hub"
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto"
      >
        <WhatsAppFloatingButton />
        <AiAssistantDrawer
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
          onOpenQuoteModal={(serviceId?: string) => {
            setPreselectedService(serviceId || null);
            setIsQuoteModalOpen(true);
          }}
        />
      </div>
    </div>
  );
}
