import { GoogleGenAI } from '@google/genai';
import { AGENCY_INFO, SERVICES, TRUSTED_CLIENTS, PORTFOLIO_PROJECTS } from '../data/agencyData';
import { ChatMessage, ChatAction } from '../types';

export interface BotResponse {
  text: string;
  actions?: ChatAction[];
  suggestions?: string[];
}

export interface RoiEstimate {
  monthlyBudget: number;
  industry: string;
  estimatedImpressions: string;
  estimatedClicks: string;
  estimatedLeads: string;
  estimatedRoas: string;
  recommendation: string;
}

// Calculate estimated ROI based on industry benchmarks in India & international
export function calculateRoi(budgetNum: number, industryKey: string): RoiEstimate {
  const budget = Math.max(10000, Math.min(2000000, budgetNum));
  const lowerIndustry = industryKey.toLowerCase();

  let cpc = 18; // Cost per click in INR
  let conversionRate = 0.04; // 4% conversion to inquiry/lead
  let targetRoas = '3.8x - 4.5x';
  let formattedIndustry = 'General Business';

  if (lowerIndustry.includes('e-com') || lowerIndustry.includes('retail') || lowerIndustry.includes('fashion')) {
    cpc = 12;
    conversionRate = 0.035;
    targetRoas = '4.0x - 5.5x';
    formattedIndustry = 'E-commerce & D2C';
  } else if (lowerIndustry.includes('real estate') || lowerIndustry.includes('property')) {
    cpc = 45;
    conversionRate = 0.03;
    targetRoas = '8.0x - 12.0x (High Ticket)';
    formattedIndustry = 'Real Estate';
  } else if (lowerIndustry.includes('health') || lowerIndustry.includes('hospital') || lowerIndustry.includes('dental') || lowerIndustry.includes('clinic')) {
    cpc = 28;
    conversionRate = 0.055;
    targetRoas = '4.5x - 6.0x';
    formattedIndustry = 'Healthcare & Clinics';
  } else if (lowerIndustry.includes('food') || lowerIndustry.includes('restaurant') || lowerIndustry.includes('hospitality')) {
    cpc = 10;
    conversionRate = 0.06;
    targetRoas = '3.5x - 4.8x';
    formattedIndustry = 'Hospitality & Dining';
  } else if (lowerIndustry.includes('tech') || lowerIndustry.includes('b2b') || lowerIndustry.includes('saas')) {
    cpc = 55;
    conversionRate = 0.025;
    targetRoas = '5.0x - 8.0x';
    formattedIndustry = 'B2B & Technology';
  } else if (lowerIndustry.includes('edu') || lowerIndustry.includes('coaching') || lowerIndustry.includes('school')) {
    cpc = 22;
    conversionRate = 0.045;
    targetRoas = '4.2x - 5.5x';
    formattedIndustry = 'Education & Institutes';
  }

  const estClicks = Math.round(budget / cpc);
  const estImpressions = Math.round(estClicks * 42);
  const estLeads = Math.round(estClicks * conversionRate);

  const recommendation = budget < 30000
    ? 'Ideal for hyper-local Google Search & Meta ads with AI retargeting to maximize local inquiries.'
    : budget < 100000
    ? 'Allows multi-channel Omni-scale: High-converting video creatives + Google intent ads + automated WhatsApp lead routing.'
    : 'Full-scale enterprise blitz: Continuous AI algorithmic budget distribution, dynamic creative personalization, and dedicated funnel optimization.';

  return {
    monthlyBudget: budget,
    industry: formattedIndustry,
    estimatedImpressions: `${(estImpressions / 1000).toFixed(1)}k - ${((estImpressions * 1.3) / 1000).toFixed(1)}k`,
    estimatedClicks: `${estClicks.toLocaleString('en-IN')} - ${Math.round(estClicks * 1.25).toLocaleString('en-IN')}`,
    estimatedLeads: `${estLeads.toLocaleString('en-IN')} - ${Math.round(estLeads * 1.3).toLocaleString('en-IN')} qualified inquiries`,
    estimatedRoas: targetRoas,
    recommendation,
  };
}

// Byteboost AI System Context for LLM Reasoning
const SYSTEM_KNOWLEDGE = `
You are the Byteboost AI Strategic Growth Assistant, representing Byteboost AI.
Byteboost AI is Visakhapatnam's premier AI-first digital marketing, creative, and technology agency located at Ushodya Junction, MVP Colony, Visakhapatnam, Andhra Pradesh, India.
Phone & WhatsApp: +91 93478 42535 | Email: byteboost.growth@gmail.com | Hours: Mon - Fri: 10:00 AM - 7:00 PM, Sat: 10:00 AM - 5:00 PM, Sun: Holiday (depends) IST.
Official Instagram: @byteboostai (https://www.instagram.com/byteboostai/)

CRITICAL PRICING & CLIENT CALL DATA DIRECTIVES (STRICTLY MANDATORY):
1. ABSOLUTELY DO NOT REVEAL OR QUOTE PRICING DETAILS, fixed numbers, costs, monthly charges, or package rates to clients.
2. NEVER mention specific fee figures like ₹25,000, ₹50,000, ₹1,20,000, or any package costs under any circumstances.
3. EXPLANATION TO CLIENTS: Always explain politely that Byteboost AI does not provide generic or cookie-cutter pricing. Because every brand's customer acquisition channels, market position, and technical scope are unique, pricing and deliverables are 100% custom-tailored after an initial strategy consultation.
4. CALL DATA COLLECTION: Whenever a client asks about pricing, costs, rates, packages, or hiring the agency:
   - Ask them to schedule a Strategy Call.
   - Collect their call data: Full Name, Phone / WhatsApp number, Email ID, Business Name / Website, and Preferred Time.
   - Explain that their call request is sent directly to executive email: byteboost.growth@gmail.com and WhatsApp number: +91 93478 42535 for an immediate callback from our senior strategist.

Key Agency Value Propositions:
- 18+ Years combined founder experience in performance marketing and engineering.
- 200+ Projects delivered with 50+ happy enterprise and growth clients.
- 7 Core Services:
  1. Graphic Designing & Visual Brand Stories (collateral, packaging, social reels, motion assets)
  2. AI-Powered High ROI Digital Marketing (Meta, Google, LinkedIn, algorithmic budget scaling)
  3. Modern Responsive Web Design (Vite, React, Next.js, high-speed conversion architectures)
  4. Authoritative Branding & Identity Systems (positioning, logos, guidelines, voice)
  5. Intuitive Mobile Applications (iOS, Android, cross-platform Flutter/React Native)
  6. Custom AI Tools & Automation (custom conversational chatbots, CRM sync, WhatsApp bots)
  7. Billing Services & Automated Invoicing (cloud billing engines, GST compliance, invoice automation)

Client Success Stories:
- Apex IONS: 3x verified lead surge within 60 days via neural audience targeting.
- Ambitious Guidance (AG): Global education & overseas consultancy in Hyderabad, Telangana – achieved 3.4x more verified enrollments via high-intent Google Search & AI lead bots.
- Velvet Luxe Apparel: +184% e-commerce revenue lift via generative creative ads.
- Vibhav Jewellers: 3.1M regional brand reach and 240% footfall surge.
- Dr. Kotta Hospital: 2.4x patient appointment bookings via hyper-local search intent.
- Chutneys & Cream Bowl: Viral local social campaigns across Visakhapatnam and coastal AP.

Tone: Professional, enthusiastic, sharp, consultative, helpful, and concise.
Never make up false services outside what the agency provides.
Always invite the user to schedule a Strategy Call, request an audit, or message directly on WhatsApp (+91 93478 42535) or email byteboost.growth@gmail.com.
`;

// Smart Fallback Intent-Based Engine (Guaranteed 0ms offline-ready response)
export function generateLocalEngineResponse(query: string): BotResponse {
  const q = query.trim().toLowerCase();

  // 1. GREETINGS & INTRO
  if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening|yo|hola)\b/.test(q)) {
    return {
      text: `Hello! 👋 Welcome to **Byteboost AI**. We are Visakhapatnam's premier AI-first digital marketing and creative agency.

Whether you need **more qualified customer leads**, a **high-converting modern website**, or an **AI automation system**, I'm here to connect you with our growth strategists.

What is your primary goal today?`,
      actions: [
        { label: '📞 Schedule Strategy Call', actionType: 'open-lead' },
        { label: '🛠️ Explore Services', actionType: 'query', payload: 'What services do you offer?' },
        { label: '💬 WhatsApp Founder (+91 93478 42535)', actionType: 'whatsapp' },
      ],
      suggestions: [
        'Schedule a strategy call with founder',
        'What services do you offer?',
        'Calculate ROI for ad spend',
        'Show me recent client results',
      ],
    };
  }

  // 2. DIRECT CALL DATA / CONTACT CAPTURE IN CHAT
  const phoneRegex = /(\+?\d{1,4}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}/;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const hasPhone = phoneRegex.test(query);
  const hasEmail = emailRegex.test(query);
  const isCallIntent = /\b(call me|callback|call back|contact me|phone me|schedule call|book call|set up a call|ring me|talk to someone|my phone|my number)\b/i.test(q);

  if ((hasPhone || hasEmail) && (isCallIntent || query.length < 60 || q.includes('call') || q.includes('contact'))) {
    const extractedPhone = query.match(phoneRegex)?.[0] || '';
    const extractedEmail = query.match(emailRegex)?.[0] || '';

    return {
      text: `📞 **Call Request Received & Logged!**

Thank you for sharing your contact details! We have registered your request for a 1-on-1 strategy call.

📋 **Client Call Data Captured:**
${extractedPhone ? `• 📱 **Phone / WhatsApp**: \`${extractedPhone}\`\n` : ''}${extractedEmail ? `• 📧 **Email**: \`${extractedEmail}\`\n` : ''}• 🏢 **Agency Routing Desk**:
  - Email: **byteboost.growth@gmail.com**
  - WhatsApp: **+91 93478 42535**

A senior strategist from our Visakhapatnam headquarters will connect with you shortly. You can also tap below to dispatch your message immediately on WhatsApp or Email!`,
      actions: [
        { 
          label: '💬 Confirm on WhatsApp (+91 93478 42535)', 
          actionType: 'whatsapp', 
          payload: `Hi Byteboost team! I submitted my call request on your website assistant: "${query}". Please contact me for a strategy consultation.` 
        },
        { 
          label: '📧 Send Email Confirmation', 
          actionType: 'external', 
          payload: `mailto:byteboost.growth@gmail.com?subject=New%20Strategy%20Call%20Request&body=Client%20Call%20Data%3A%0A%0A${encodeURIComponent(query)}%0A%0ATimestamp%3A%20${encodeURIComponent(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }))}%20IST` 
        },
        { label: '🚀 Open Detailed Call Form', actionType: 'open-lead' },
      ],
      suggestions: [
        'What services do you offer?',
        'Show me recent client results',
        'Where is your office located in Vizag?',
        'Follow Byteboost on Instagram',
      ],
    };
  }

  // 3. ROI & AD SPEND PERFORMANCE ESTIMATOR
  if (q.includes('roi') || (q.includes('budget') && !q.includes('price')) || q.includes('calculator') || q.includes('return on ad')) {
    // Extract any numbers if present
    const matchedNumber = query.replace(/,/g, '').match(/\d+/);
    const parsedBudget = matchedNumber ? parseInt(matchedNumber[0], 10) : 50000;
    const est = calculateRoi(parsedBudget, q);

    return {
      text: `📊 **Projected Marketing Ad Reach & Conversion Blueprint** *(for ₹${est.monthlyBudget.toLocaleString('en-IN')}/mo media spend in ${est.industry})*:

• **Target Ad Impressions**: ${est.estimatedImpressions}
• **High-Intent Clicks**: ${est.estimatedClicks}
• **Estimated Qualified Inquiries**: **${est.estimatedLeads}**
• **Anticipated ROAS Multiplier**: **${est.estimatedRoas}**

💡 **Strategic Assessment**: ${est.recommendation}

To review how our media buying team can implement this for your brand, let's schedule a brief strategy call!`,
      actions: [
        { label: '📞 Schedule Strategy Call', actionType: 'open-lead' },
        { label: '💬 Discuss on WhatsApp (+91 93478 42535)', actionType: 'whatsapp', payload: `Hi Byteboost! I checked the marketing projection for ₹${est.monthlyBudget} media spend and want to schedule a strategy call.` },
        { label: '📋 Configure Custom Scope', actionType: 'open-quote' },
      ],
      suggestions: [
        'Schedule a strategy call with founder',
        'Calculate ROI for ₹25,000 ad spend',
        'Calculate ROI for ₹1,00,000 ad spend',
        'What is included in digital marketing?',
      ],
    };
  }

  // 4. PRICING & PACKAGES INQUIRY (STRICTLY NO PRICING REVEALED - COLLECT CALL DATA)
  if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('rate') || q.includes('charges') || q.includes('fee') || q.includes('how much') || q.includes('pricing') || q.includes('tariff')) {
    return {
      text: `💼 **Custom-Tailored Strategy & Transparent Consultation**:

At **Byteboost AI**, we strictly do not offer generic or cookie-cutter pricing packages. Every business has distinct acquisition channels, margins, competition, and growth targets—so our solutions and investment scopes are 100% custom-crafted following an initial strategy consultation.

📞 **Schedule Your Free 1-on-1 Strategy Call**:
To get a tailored roadmap and transparent proposal, share your call details right here in the chat (or click **Schedule Strategy Call** below):
• **Your Full Name**
• **Phone / WhatsApp Number**
• **Business / Industry Name**
• **Preferred Call Time**

Your call request will be forwarded directly to our leadership desk:
• 📧 **Email**: **byteboost.growth@gmail.com**
• 💬 **WhatsApp**: **+91 93478 42535**

Our senior strategist in Visakhapatnam will review your requirements and connect with you directly!`,
      actions: [
        { label: '📞 Schedule Strategy Call', actionType: 'open-lead' },
        { label: '💬 WhatsApp Founder (+91 93478 42535)', actionType: 'whatsapp', payload: 'Hi Byteboost! I would like to schedule a strategy call to get a customized proposal for my business.' },
        { label: '📧 Email byteboost.growth@gmail.com', actionType: 'external', payload: 'mailto:byteboost.growth@gmail.com?subject=Strategy%20Call%20Request%20-%20Byteboost%20AI&body=Hi%20Byteboost%20Team%2C%0A%0AI%20would%20like%20to%20schedule%20a%20strategy%20call%20for%20my%20business.%0A%0AName%3A%20%0APhone%20%2F%20WhatsApp%3A%20%0ABusiness%20Name%3A%20%0APreferred%20Call%20Time%3A%20' },
      ],
      suggestions: [
        'Schedule a strategy call with founder',
        'What services do you offer?',
        'Show me recent client results',
        'Where is your office located in Vizag?',
      ],
    };
  }

  // 4B. QUOTE & CUSTOM ESTIMATE INQUIRY
  if (q.includes('quote') || q.includes('quotation') || q.includes('estimate') || q.includes('proposal')) {
    return {
      text: `📋 **Instant Custom Service Quotation**:

You can build and submit your customized project scope in our **Quote Generator**. 

Once submitted, your exact service requirements, budget tier, timeline, and notes are automatically routed to our direct leadership desk:
• 📧 **Email**: **byteboost.growth@gmail.com**
• 💬 **WhatsApp**: **+91 93478 42535**

Our Visakhapatnam strategy team reviews all submissions within 15–30 minutes during studio hours!`,
      actions: [
        { label: '📋 Configure Service Quote', actionType: 'open-quote' },
        { label: '💬 Chat on WhatsApp (+91 93478 42535)', actionType: 'whatsapp', payload: 'Hi Byteboost! I would like to request a custom service quotation.' },
        { label: '🎯 Free Brand Strategy Audit', actionType: 'open-lead' },
      ],
      suggestions: [
        'Schedule a strategy call with founder',
        'What services do you offer?',
        'Where is your agency located?',
        'Follow Byteboost on Instagram',
      ],
    };
  }

  // 5. WEB & APP DEVELOPMENT
  if (q.includes('web') || q.includes('website') || q.includes('app') || q.includes('mobile') || q.includes('react') || q.includes('shopify') || q.includes('wordpress')) {
    return {
      text: `💻 **High-Conversion Web & Mobile Engineering**:

Unlike template-heavy agencies, we engineer digital platforms that load in **under 1.2 seconds** and are mathematically structured to convert traffic into paying customers.

• **Deliverables**: Responsive mobile-first design, SEO foundation, lightning-fast React/Next.js or Shopify stack, interactive lead capture forms, WhatsApp click-to-chat integration, and Google Analytics 4 tracking.
• **Typical Timeline**: 
  - Landing pages: **3 to 5 days**
  - Full business websites: **7 to 14 days**
  - Custom web/mobile apps: **3 to 6 weeks**

Would you like us to review your existing website or build a brand-new platform?`,
      actions: [
        { label: '💻 Schedule Web Strategy Call', actionType: 'open-lead' },
        { label: '📋 Configure Project Scope', actionType: 'open-quote', payload: 'web-design' },
        { label: '💬 Chat on WhatsApp (+91 93478 42535)', actionType: 'whatsapp', payload: 'Hi Byteboost! I need a high-converting website/app for my business.' },
      ],
      suggestions: [
        'Schedule a web strategy call',
        'Can you redesign my existing website?',
        'Do you do SEO with web design?',
        'Show me web design case studies',
      ],
    };
  }

  // 6. VISAKHAPATNAM / LOCATION & CONTACT
  if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('vizag') || q.includes('visakhapatnam') || q.includes('office') || q.includes('contact') || q.includes('phone') || q.includes('email')) {
    return {
      text: `📍 **Byteboost AI Headquarters**:

• **Address**: Ushodya Junction, MVP Colony, Visakhapatnam, Andhra Pradesh, India.
• **Google Maps**: [View Office on Google Maps](https://www.google.com/maps/place/Byteboost+AI+Digital+Marketing+Agency,+2nd+Lane,+Ushodaya+Junction,+Adarsh+Nagar,+Pedda+Waltair,+Visakhapatnam,+Andhra+Pradesh/@17.5111396,78.2959945,14.25z/data=!4m2!3m1!1s0x3a3943238a3b5267:0xdcc93b35556758bf?entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D)
• **Phone & WhatsApp**: **+91 93478 42535**
• **Email**: **byteboost.growth@gmail.com**
• **Instagram**: [@byteboostai](https://www.instagram.com/byteboostai/)
• **Studio Hours**:
  - Mon - Fri: 10:00 AM - 7:00 PM
  - Saturday: 10:00 AM - 5:00 PM
  - Sunday: Holiday (depends)
• **Local Presence**: We actively serve businesses across Pedawaltair, Siripuram, Jagadamba, MVP Colony, Gajuwaka, Madhurawada, and pan-India & global clients!

You are welcome to visit our studio or book a direct Google Meet / phone consultation anytime!`,
      actions: [
        { label: '📞 Call Agency Now', actionType: 'call', payload: '+919347842535' },
        { label: '💬 WhatsApp Us Directly', actionType: 'whatsapp' },
        { label: '📸 Follow on Instagram', actionType: 'external', payload: 'https://www.instagram.com/byteboostai/' },
        { label: '🎯 Schedule Free Audit', actionType: 'open-lead' },
      ],
      suggestions: [
        'Can we schedule an in-person meeting in Vizag?',
        'What is your Instagram page?',
        'What local Vizag businesses do you work with?',
        'What services do you offer?',
        'Get a pricing quote',
      ],
    };
  }

  // INSTAGRAM & SOCIAL MEDIA
  if (q.includes('instagram') || q.includes('insta') || q.includes('social') || q.includes('follow') || q.includes('reels')) {
    return {
      text: `📸 **Follow Byteboost AI on Instagram (@byteboostai)**:

Connect with our creative and AI marketing team for:
• 🎬 **AI Marketing Reels & Frameworks**: High-converting hooks, video ads, and algorithmic breakdowns.
• 📈 **Real Client Case Studies**: Behind-the-scenes metrics showing 3x–10x revenue growth.
• 💡 **Vizag Studio BTS**: Team shoots, design sprints, and prompt engineering experiments.
• ⚡ **Weekly Growth Hacks**: Latest Meta ad policy shifts, Instagram algorithm updates, and AI workflows.

👉 **Instagram Profile**: [https://www.instagram.com/byteboostai/](https://www.instagram.com/byteboostai/)`,
      actions: [
        { label: '📸 Follow @byteboostai on Instagram', actionType: 'external', payload: 'https://www.instagram.com/byteboostai/' },
        { label: '💬 Chat on WhatsApp', actionType: 'whatsapp' },
        { label: '🚀 Get Free Brand Audit', actionType: 'open-lead' },
      ],
      suggestions: [
        'Where is your office located?',
        'What services do you offer?',
        'Can you audit our Instagram ads?',
      ],
    };
  }

  // 7. CLIENTS & CASE STUDIES
  if (q.includes('client') || q.includes('portfolio') || q.includes('result') || q.includes('case study') || q.includes('proof') || q.includes('example')) {
    return {
      text: `🏆 **Proven Performance Track Record (200+ Projects, 50+ Brands)**:

• **Apex IONS**: Scaled customer acquisition by **3x in 60 days** with laser-focused AI audience targeting.
• **Ambitious Guidance**: **3.4x more verified enrollments** in Hyderabad, Telangana via Google Search intent & AI chatbots.
• **Velvet Luxe Apparel**: Delivered a **+184% lift in e-commerce revenue** using generative ad variations.
• **Vibhav Jewellers**: Generated **3.1M+ regional brand impressions** and over 240% footfall increase.
• **Dr. Kotta Hospital**: Increased qualified patient consultations by **2.4x** through high-intent local search.
• **Hospitality Leaders**: Strategic viral campaigns for Chutneys, Cream Bowl, Zaika, and Hampi Naturals.

Would you like to review case studies specific to your industry?`,
      actions: [
        { label: '🚀 Get Free Strategy Audit', actionType: 'open-lead' },
        { label: '💬 Chat on WhatsApp', actionType: 'whatsapp', payload: 'Hi Byteboost! I want to see case studies related to my industry.' },
        { label: '📊 Calculate My Projected ROI', actionType: 'query', payload: 'Calculate ROI for my budget' },
      ],
      suggestions: [
        'How did you achieve 3x leads for Apex IONS?',
        'Do you work with healthcare or dental clinics?',
        'Do you work with real estate developers?',
        'What makes your AI different from traditional agencies?',
      ],
    };
  }

  // 8. WHY AI / WHAT MAKES YOU DIFFERENT
  if (q.includes('ai') || q.includes('different') || q.includes('why') || q.includes('automation') || q.includes('traditional')) {
    return {
      text: `🧠 **Why AI-First Digital Marketing Outperforms Traditional Agencies**:

1. **Continuous Algorithmic Optimization**: Traditional agencies check ad accounts once a day. Our automated bidding models reallocate budgets dynamically 24/7 to peak-converting times and demographics.
2. **Predictive Audience Targeting**: We pinpoint customer purchase intent before competitors notice, cutting average Cost-Per-Acquisition by up to 38%.
3. **Generative Creative Velocity**: We produce high-converting ad variations 10x faster, ensuring creative ad fatigue never drains your return on ad spend.
4. **Instant Lead Nurturing**: Automated WhatsApp bots and real-time CRM handoffs contact leads in under 2 minutes, multiplying closing rates.`,
      actions: [
        { label: '🚀 Experience the AI Difference', actionType: 'open-lead' },
        { label: '💬 Talk with an AI Strategist', actionType: 'whatsapp' },
      ],
      suggestions: [
        'Calculate ROI for my budget',
        'Can you build an AI chatbot for my business?',
        'Schedule a strategy call with founder',
        'Schedule a free consultation',
      ],
    };
  }

  // 9. DEFAULT COMPREHENSIVE INTELLIGENCE FALLBACK
  return {
    text: `Thank you for asking! At **Byteboost AI**, we blend artificial intelligence with world-class creative craft to accelerate brand authority and measurable revenue.

• **Quick Agency Snapshot**: Visakhapatnam's leading AI-first agency specializing in high-ROI marketing, graphic design, web & mobile engineering, and custom automation.
• **Direct Leadership Desk**: Message our founding team directly on WhatsApp at **+91 93478 42535** or email **byteboost.growth@gmail.com**.

How would you like to proceed?`,
    actions: [
      { label: '📞 Schedule Strategy Call', actionType: 'open-lead' },
      { label: '📋 Configure Custom Scope', actionType: 'open-quote' },
      { label: '💬 WhatsApp Us (+91 93478 42535)', actionType: 'whatsapp' },
      { label: '📊 Estimate Marketing ROI', actionType: 'query', payload: 'Calculate ROI for ₹50,000 budget' },
    ],
    suggestions: [
      'Schedule a strategy call with founder',
      'What services do you offer?',
      'Calculate ROI for my budget',
      'Where is your office located?',
    ],
  };
}

// Live Gemini API Caller with seamless fallback
export async function getChatbotResponse(userMessage: string, history: ChatMessage[]): Promise<BotResponse> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY);

  // If no Gemini key is provided, instantly provide the smart domain response
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return generateLocalEngineResponse(userMessage);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Format conversation history for multi-turn context
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_KNOWLEDGE}\n\nUser Question: ${userMessage}` }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_KNOWLEDGE,
        temperature: 0.7,
      },
    });

    const replyText = response.text || '';
    if (!replyText.trim()) {
      return generateLocalEngineResponse(userMessage);
    }

    // Determine relevant action chips based on content
    const actions: ChatAction[] = [];
    const lower = replyText.toLowerCase() + ' ' + userMessage.toLowerCase();

    if (lower.includes('call') || lower.includes('audit') || lower.includes('consult') || lower.includes('pricing') || lower.includes('cost') || lower.includes('rate')) {
      actions.push({ label: '📞 Schedule Strategy Call', actionType: 'open-lead' });
    }
    if (lower.includes('quote') || lower.includes('scope') || lower.includes('web') || lower.includes('app')) {
      actions.push({ label: '📋 Configure Project Scope', actionType: 'open-quote' });
    }
    actions.push({ label: '💬 WhatsApp (+91 93478 42535)', actionType: 'whatsapp' });

    return {
      text: replyText,
      actions,
      suggestions: [
        'Schedule a strategy call with founder',
        'Calculate ROI for my budget',
        'Show me recent client results',
        'Where is your office located?',
      ],
    };
  } catch (error) {
    console.warn('Live Gemini API fallback invoked:', error);
    // Instant smooth fallback to local engine
    return generateLocalEngineResponse(userMessage);
  }
}
