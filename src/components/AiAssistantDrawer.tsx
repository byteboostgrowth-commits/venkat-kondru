import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  Bot,
  User,
  Calculator,
  Layers,
  PhoneCall,
  RotateCcw,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  MessageCircle
} from 'lucide-react';
import { AGENCY_INFO, SERVICES } from '../data/agencyData';
import { ChatMessage, ChatAction } from '../types';
import { getChatbotResponse, calculateRoi, RoiEstimate } from '../utils/chatbotEngine';

interface AiAssistantDrawerProps {
  onOpenLeadModal: () => void;
  onOpenQuoteModal?: (serviceId?: string) => void;
}

type ActiveTab = 'chat' | 'roi' | 'services';

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  onOpenLeadModal,
  onOpenQuoteModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [showTeaser, setShowTeaser] = useState(true);

  // Initial welcome message with action buttons and strategic follow-ups
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello! 👋 I'm the **Byteboost AI Strategic Assistant**.

We specialize in AI-powered performance marketing, generative creative production, and custom high-speed web & mobile development for brands in Visakhapatnam and globally.

How can we accelerate your business growth today?`,
      timestamp: 'Just now',
      actions: [
        { label: '📞 Schedule Strategy Call', actionType: 'open-lead' },
        { label: '📊 Calculate ROI', actionType: 'query', payload: 'Calculate ROI for my budget' },
        { label: '🛠️ Explore Services', actionType: 'query', payload: 'What services do you offer?' },
        { label: '💬 Chat on WhatsApp', actionType: 'whatsapp' },
      ],
      suggestions: [
        'Schedule a strategy call with founder',
        'What services do you offer?',
        'Calculate ROI for ₹50,000 ad spend',
        'Show me client results in Vizag',
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ROI Calculator interactive state
  const [roiBudget, setRoiBudget] = useState<number>(50000);
  const [roiIndustry, setRoiIndustry] = useState<string>('Real Estate');
  const [currentRoi, setCurrentRoi] = useState<RoiEstimate>(() => calculateRoi(50000, 'Real Estate'));

  // Update calculated ROI whenever budget or industry changes
  useEffect(() => {
    setCurrentRoi(calculateRoi(roiBudget, roiIndustry));
  }, [roiBudget, roiIndustry]);

  // Subtle web audio chime for message cues
  const playSound = useCallback((type: 'send' | 'receive') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      if (type === 'send') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else {
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(1050, now + 0.15);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch {
      // Audio context might be restricted before first click
    }
  }, [soundEnabled]);

  // Auto-scroll messages to bottom
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, activeTab]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, activeTab]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    playSound('send');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    if (activeTab !== 'chat') {
      setActiveTab('chat');
    }

    try {
      const botResponse = await getChatbotResponse(text, messages);
      playSound('receive');
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: botResponse.actions,
        suggestions: botResponse.suggestions,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chatbot error:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `I apologize, but our neural connection briefly stuttered. For immediate personalized assistance, reach our founder directly on WhatsApp at **+91 93478 42535**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: '💬 WhatsApp Us', actionType: 'whatsapp' },
          { label: '🚀 Free Strategy Audit', actionType: 'open-lead' },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: ChatAction) => {
    switch (action.actionType) {
      case 'open-lead':
        onOpenLeadModal();
        break;
      case 'open-quote':
        if (onOpenQuoteModal) {
          onOpenQuoteModal(action.payload);
        } else {
          onOpenLeadModal();
        }
        break;
      case 'whatsapp': {
        const msg = action.payload || 'Hi Byteboost! I was interacting with your AI chatbot and want to discuss marketing for my business.';
        window.open(`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
        break;
      }
      case 'call': {
        const phone = action.payload || AGENCY_INFO.phone;
        window.open(`tel:${phone.replace(/\s+/g, '')}`, '_self');
        break;
      }
      case 'external': {
        if (action.payload) {
          window.open(action.payload, '_blank', 'noopener,noreferrer');
        }
        break;
      }
      case 'query':
        if (action.payload) {
          handleSend(action.payload);
        }
        break;
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Chat cleared. Welcome back! 👋 How can **Byteboost AI** assist your business strategy today?`,
        timestamp: 'Just now',
        actions: [
          { label: '📞 Schedule Strategy Call', actionType: 'open-lead' },
          { label: '📊 Calculate ROI', actionType: 'query', payload: 'Calculate ROI for my budget' },
          { label: '🛠️ Explore Services', actionType: 'query', payload: 'What services do you offer?' },
        ],
        suggestions: [
          'Schedule a strategy call with founder',
          'What services do you offer?',
          'Calculate ROI for ₹50,000 ad spend',
          'Where is your office located?',
        ],
      },
    ]);
  };

  // Format simple markdown into clean HTML elements safely
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Check bullet point
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
      let processed = line;
      if (isBullet) {
        processed = line.replace(/^[•\-]\s*/, '');
      }

      // Bold replacement
      const parts = processed.split(/(\*\*.*?\*\*)/g);

      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-bold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={pIdx} className="text-[#FF5E1E] not-italic font-semibold">
              {part.slice(1, -1)}
            </em>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1">
            <span className="text-[#FF5E1E] text-xs font-bold leading-5">•</span>
            <div className="flex-1 leading-relaxed text-slate-700">{renderedParts}</div>
          </div>
        );
      }

      return (
        <p key={idx} className="my-1 leading-relaxed text-slate-700">
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Teaser Bubble (Dismissible) */}
      {!isOpen && showTeaser && (
        <div className="fixed bottom-24 right-6 z-40 max-w-[280px] p-3.5 rounded-2xl bg-white border border-orange-200 text-slate-700 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            type="button"
            onClick={() => setShowTeaser(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 p-0.5 rounded-md"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-50 p-1 flex items-center justify-center shrink-0 shadow-xs border border-slate-200 overflow-hidden">
              <img src="/chatbot-icon.png" alt="Byteboost AI" className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>Byteboost AI Copilot</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </p>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Need a tailored marketing roadmap or ROI projection? Click to chat!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        id="aiChatToggleBtn"
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTeaser(false);
        }}
        aria-label={isOpen ? 'Close AI marketing assistant' : 'Open AI marketing assistant'}
        className="relative group w-14 h-14 rounded-full bg-white border-2 border-[#FF5E1E] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,94,30,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer z-40 overflow-hidden"
      >
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 z-10">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>
        {isOpen ? (
          <div className="w-full h-full bg-gradient-to-tr from-[#FF5E1E] to-[#FF8800] flex items-center justify-center text-white">
            <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
          </div>
        ) : (
          <div className="w-full h-full p-1.5 flex items-center justify-center bg-white">
            <img
              src="/chatbot-icon.png"
              alt="Byteboost AI"
              className="w-full h-full object-contain group-hover:scale-110 transition-transform"
            />
          </div>
        )}
      </button>

      {/* Recreated Full-Fledged AI Chatbot Interface */}
      {isOpen && (
        <div
          id="aiChatDrawer"
          role="dialog"
          aria-label="AI Strategic Assistant"
          className={`fixed bottom-24 right-4 sm:right-6 z-50 bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
            isExpanded
              ? 'w-[94vw] sm:w-[540px] h-[85vh] max-h-[720px]'
              : 'w-[94vw] sm:w-[410px] h-[600px] max-h-[82vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="px-4 py-3.5 bg-[#F9FAFB] border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 shadow-xs border border-slate-200 overflow-hidden">
                  <img src="/chatbot-icon.png" alt="Byteboost AI" className="w-full h-full object-contain" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <span>Byteboost AI Copilot</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-orange-100 text-[#FF5E1E] border border-orange-200">
                    HYBRID AI
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Visakhapatnam HQ • Instant Strategy Engine</span>
                </div>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute audio cues' : 'Enable audio cues'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FF5E1E]" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleResetChat}
                aria-label="Restart chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-label={isExpanded ? 'Collapse window' : 'Expand window'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer hidden sm:block"
                title={isExpanded ? 'Compact mode' : 'Expanded view'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Mode Navigation Switcher Tabs */}
          <div className="px-3 py-2 bg-[#F3F4F6] border-b border-slate-200 flex items-center justify-between gap-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('roi')}
              className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                activeTab === 'roi'
                  ? 'bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>ROI Calculator</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 font-semibold transition-colors cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Services (7)</span>
            </button>
          </div>

          {/* TAB 1: AI CONVERSATION VIEW */}
          {activeTab === 'chat' && (
            <>
              {/* Messages Container */}
              <div
                id="chatMessages"
                className="flex-1 p-4 overflow-y-auto space-y-4 text-xs select-text scroll-smooth bg-[#F9FAFB]"
              >
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`flex items-start gap-2.5 max-w-[88%] ${
                          isBot ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        {/* Avatar */}
                        {isBot ? (
                          <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-xs p-0.5 overflow-hidden">
                            <img src="/chatbot-icon.png" alt="Byteboost AI" className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            <User className="w-4 h-4" />
                          </div>
                        )}

                        {/* Message Bubble */}
                        <div
                          className={`p-3.5 rounded-2xl relative group ${
                            isBot
                              ? 'rounded-tl-none bg-white border border-slate-200 text-slate-800 shadow-xs'
                              : 'rounded-tr-none bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white font-medium shadow-xs'
                          }`}
                        >
                          <div className="text-xs sm:text-[13px] leading-relaxed">
                            {isBot ? renderFormattedText(msg.text) : msg.text}
                          </div>

                          {/* Message Footer: Timestamp & Copy Button */}
                          <div
                            className={`flex items-center justify-between gap-3 mt-2 pt-1.5 border-t text-[10px] ${
                              isBot ? 'border-slate-100 text-slate-400' : 'border-white/20 text-white/80'
                            }`}
                          >
                            <span>{msg.timestamp}</span>

                            {isBot && (
                              <button
                                type="button"
                                onClick={() => handleCopyMessage(msg.id, msg.text)}
                                className="flex items-center gap-1 hover:text-slate-800 transition-colors cursor-pointer"
                                title="Copy answer"
                              >
                                {copiedMsgId === msg.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span className="text-emerald-600 font-semibold">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* In-Message Interactive Action Buttons */}
                      {isBot && msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2 ml-9">
                          {msg.actions.map((act, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              onClick={() => handleActionClick(act)}
                              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FF5E1E] border border-orange-200 hover:border-[#FF5E1E] text-slate-700 hover:text-white text-[11px] font-medium transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Suggested Follow-up Prompts (Only for latest bot message) */}
                      {isBot &&
                        msg.suggestions &&
                        msg.suggestions.length > 0 &&
                        msg.id === messages[messages.length - 1]?.id && (
                          <div className="mt-3 ml-9 space-y-1.5">
                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                              Suggested Questions:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.suggestions.map((sug, sIdx) => (
                                <button
                                  key={sIdx}
                                  type="button"
                                  onClick={() => handleSend(sug)}
                                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-[#FF5E1E] text-slate-600 hover:text-[#FF5E1E] text-[11px] transition-colors cursor-pointer text-left shadow-xs"
                                >
                                  {sug}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}

                {/* Live Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2.5 text-slate-500 text-xs">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 p-0.5 overflow-hidden">
                      <img src="/chatbot-icon.png" alt="Byteboost AI" className="w-full h-full object-contain animate-pulse" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-none bg-white border border-slate-200 shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] text-slate-500 ml-1.5">Synthesizing AI strategy...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Area */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form
                  id="chatForm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    id="chatInput"
                    type="text"
                    placeholder="Ask about marketing, SEO, web design, or schedule a strategy call..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isTyping}
                    className="flex-1 bg-[#F9FAFB] border border-slate-300 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E] focus:bg-white disabled:opacity-50 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    aria-label="Send message"
                    className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white font-semibold hover:shadow-[0_0_15px_rgba(255,94,30,0.4)] transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick Shortcuts strip */}
                <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-slate-500">
                  <span>Press Enter to send</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSend('Tell me about your free AI audit')}
                      className="hover:text-[#FF5E1E] transition-colors cursor-pointer"
                    >
                      ⚡ Free Audit
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => handleSend('Where is your office in Visakhapatnam?')}
                      className="hover:text-[#FF5E1E] transition-colors cursor-pointer"
                    >
                      📍 Vizag HQ
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: INTERACTIVE ROI CALCULATOR VIEW */}
          {activeTab === 'roi' && (
            <div className="flex-1 p-5 overflow-y-auto space-y-5 text-slate-800 bg-[#F9FAFB]">
              <div>
                <div className="flex items-center gap-2 text-[#FF5E1E] text-xs font-bold uppercase tracking-wider mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Performance Projections</span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Estimate Your Marketing ROI
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Simulate lead generation and return on ad spend powered by Byteboost AI’s neural targeting algorithms.
                </p>
              </div>

              {/* Industry Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Your Industry:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'E-commerce & D2C',
                    'Real Estate',
                    'Healthcare & Clinics',
                    'Hospitality & Dining',
                    'B2B & Technology',
                    'Education & Institutes',
                  ].map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setRoiIndustry(ind)}
                      className={`p-2 rounded-xl text-left text-xs font-medium transition-all cursor-pointer border ${
                        roiIndustry === ind
                          ? 'bg-orange-50 border-[#FF5E1E] text-[#FF5E1E] font-semibold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Ad Budget Slider */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-700">Monthly Ad Spend:</span>
                  <span className="text-base font-extrabold text-[#FF5E1E]">
                    ₹{roiBudget.toLocaleString('en-IN')} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="5000"
                  value={roiBudget}
                  onChange={(e) => setRoiBudget(parseInt(e.target.value, 10))}
                  className="w-full accent-[#FF5E1E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
                  <span>₹20,000</span>
                  <span>₹1,00,000</span>
                  <span>₹2,50,000</span>
                  <span>₹5,00,000+</span>
                </div>
              </div>

              {/* Projection Outcome Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500">Target Ad Reach</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {currentRoi.estimatedImpressions}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Impressions</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] text-slate-500">High-Intent Clicks</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {currentRoi.estimatedClicks}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Visitors to funnel</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 col-span-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-orange-800">Projected Inquiries / Leads</div>
                      <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                        {currentRoi.estimatedLeads}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-500">Target ROAS</div>
                      <div className="text-base font-bold text-emerald-600">
                        {currentRoi.estimatedRoas}
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-700 mt-2.5 pt-2 border-t border-orange-200 leading-relaxed">
                    {currentRoi.recommendation}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    handleSend(`I evaluated the ROI estimator for ₹${roiBudget.toLocaleString('en-IN')}/mo in ${roiIndustry}. Can you prepare an action plan for this?`);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5E1E] to-[#FF8800] text-white font-semibold text-xs hover:shadow-[0_4px_15px_rgba(255,94,30,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Inject Plan Into AI Conversation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const msg = `Hi Byteboost AI! I calculated an ROI projection for ₹${roiBudget.toLocaleString('en-IN')} in ${roiIndustry} and want to discuss launching campaigns.`;
                    window.open(`https://wa.me/${AGENCY_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full py-2.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Discuss Strategy on WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES QUICK BROWSER */}
          {activeTab === 'services' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-slate-800 bg-[#F9FAFB]">
              <div className="mb-2">
                <h3 className="text-base font-extrabold text-slate-900">
                  7 Core Growth Services
                </h3>
                <p className="text-xs text-slate-500">
                  Select any service to generate an instant quote or deep-dive with the AI.
                </p>
              </div>

              <div className="space-y-2.5">
                {SERVICES.map((srv, index) => (
                  <div
                    key={srv.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-orange-300 transition-all flex flex-col justify-between group shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-lg bg-orange-100 text-[#FF5E1E] text-[10px] font-bold flex items-center justify-center">
                          0{index + 1}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#FF5E1E] transition-colors">
                          {srv.title}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (onOpenQuoteModal) {
                            onOpenQuoteModal(srv.id);
                          } else {
                            onOpenLeadModal();
                          }
                        }}
                        className="px-2 py-1 rounded-lg bg-orange-100 hover:bg-[#FF5E1E] text-[#FF5E1E] hover:text-white text-[10px] font-semibold transition-colors cursor-pointer"
                      >
                        Get Quote
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2 mb-2">
                      {srv.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {srv.features.slice(0, 3).map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <button
                        type="button"
                        onClick={() => {
                          handleSend(`Can you provide a detailed breakdown and pricing for your ${srv.title} service?`);
                        }}
                        className="text-[#FF5E1E] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <span>Ask AI about deliverables</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
