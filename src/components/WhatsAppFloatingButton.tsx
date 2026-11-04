import React from 'react';
import { AGENCY_INFO } from '../data/agencyData';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <a
      id="floating-whatsapp-btn"
      href={AGENCY_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct WhatsApp Chat"
      className="group relative w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
    >
      <span className="absolute right-14 whitespace-nowrap bg-white border border-slate-300 text-xs px-2.5 py-1 rounded-md text-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
        Chat with Founder ({AGENCY_INFO.phone})
      </span>
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.588-5.768-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.086.086-.176.18-.076.353.1.174.444.734.954 1.189.658.586 1.213.769 1.386.855.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.087.289.13.332.202.043.073.043.419-.101.824z" />
      </svg>
    </a>
  );
};
