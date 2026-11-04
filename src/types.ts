export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  features: string[];
  icon: string;
  image?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  categoryTag: string;
  image: string;
  client?: string;
  duration?: string;
  roi?: string;
  summary: string;
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ClientItem {
  id: string;
  name: string;
  regionalName?: string;
  category: string;
  industry: string;
  logo: string;
  tagline?: string;
  location?: string;
  description: string;
  growthImpact: string;
  highlightMetric?: {
    value: string;
    label: string;
  };
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  businessName?: string;
  serviceInterest?: string;
}

export interface ChatAction {
  label: string;
  actionType: 'open-lead' | 'open-quote' | 'whatsapp' | 'call' | 'query' | 'external';
  payload?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: ChatAction[];
  suggestions?: string[];
  isError?: boolean;
}

export interface MarketingSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  accentColor?: string;
  category: string;
}
