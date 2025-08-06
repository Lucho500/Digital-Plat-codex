import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Sparkles, Send, X, Maximize2, Minimize2, ChevronDown, Brain, Zap, FileText, Calculator } from 'lucide-react';
import Button from './Button';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  category?: 'analysis' | 'alert' | 'suggestion' | 'calculation';
}

const MaxAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Simulate initial greeting with personality
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            content: "👋 Bonjour ! Je suis Max, votre copilot fiduciaire intelligent. Je suis là pour vous aider à piloter votre entreprise avec confiance et sérénité.\n\nJe peux :\n✨ Analyser votre situation financière\n📊 Préparer vos déclarations fiscales\n⚡️ Optimiser votre trésorerie\n\nQue puis-je faire pour vous aujourd'hui ?",
            type: 'assistant',
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      openButtonRef.current?.focus();
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      type: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setIsTyping(true);
    setShowWelcome(false);

    // Simulate AI response with personality
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "💡 Excellent question ! Je vais analyser ça pour vous donner une réponse précise et actionnable. Laissez-moi quelques secondes...",
        type: 'assistant',
        timestamp: new Date(),
        category: 'analysis'
      };
      setMessages(prev => [...prev, response]);
      
      // Simulate detailed follow-up
      setTimeout(() => {
        const detailedResponse: Message = {
          id: (Date.now() + 2).toString(),
          content: "Voici mon analyse :\n\n1️⃣ Votre trésorerie actuelle est de 45 230 € (en bonne santé)\n2️⃣ Vos prochaines échéances importantes :\n   • TVA : 15/07 (12 450 €)\n   • Salaires : 28/06 (14 520 €)\n\nJe recommande de provisionner 27 000 € pour couvrir ces échéances. Voulez-vous que je prépare un plan de trésorerie détaillé ?",
          type: 'assistant',
          timestamp: new Date(),
          category: 'suggestion'
        };
        setMessages(prev => [...prev, detailedResponse]);
        setIsTyping(false);
      }, 2000);
    }, 1500);
  };

  const suggestions = [
    {
      text: "Analyser ma trésorerie",
      icon: <Calculator size={12} />
    },
    {
      text: "Prochaines échéances",
      icon: <FileText size={12} />
    },
    {
      text: "Optimisation fiscale",
      icon: <Brain size={12} />
    }
  ];

  return (
    <>
      {/* Floating button with animation */}
      {!isOpen && (
        <button
          ref={openButtonRef}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-light transition-all duration-300 z-50 group animate-bounce hover:animate-none"
          aria-label="Ouvrir l'assistant Max"
        >
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full animate-ping"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full"></div>
          <MessageSquare size={24} className="relative z-10" />
          <div className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 bg-white text-primary px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap mr-4">
            Discuter avec Max, votre copilot 🚀
          </div>
        </button>
      )}

      {/* Chat window with enhanced UI */}
      <div 
        className={`
          fixed ${isExpanded ? 'inset-4' : 'bottom-6 right-6 w-96 h-[600px]'} 
          bg-white rounded-lg shadow-2xl z-50 flex flex-col 
          transition-all duration-300 ease-in-out 
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
          border border-gray-200
        `}
      >
        {/* Header with personality */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-t-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium">Max</h3>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-success rounded-full mr-2"></span>
                <p className="text-xs text-white/90">En ligne</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label={isExpanded ? 'Réduire la fenêtre' : 'Agrandir la fenêtre'}
            >
              {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Fermer l'assistant"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages with enhanced styling */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                  <Sparkles size={16} className="text-primary" />
                </div>
              )}
              <div 
                className={`
                  max-w-[80%] rounded-lg px-4 py-2 
                  ${msg.type === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100'
                  }
                  ${msg.category === 'analysis' ? 'border-l-4 border-primary' : ''}
                  ${msg.category === 'alert' ? 'border-l-4 border-warning' : ''}
                  ${msg.category === 'suggestion' ? 'border-l-4 border-success' : ''}
                `}
              >
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {msg.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-2 flex-shrink-0">
                  <span className="text-white text-sm font-medium">MD</span>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <Sparkles size={16} className="text-primary" />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick suggestions with icons */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 mb-2">Suggestions :</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button 
                key={index}
                className="text-xs bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors flex items-center space-x-1"
                onClick={() => {
                  setMessage(suggestion.text);
                }}
              >
                {suggestion.icon}
                <span>{suggestion.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input with enhanced UI */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Posez votre question à Max..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                rows={2}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </div>
            <Button
              variant="primary"
              icon={<Send size={16} />}
              onClick={handleSend}
              disabled={!message.trim()}
            >
              Envoyer
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Appuyez sur Entrée pour envoyer, Maj+Entrée pour un retour à la ligne
          </p>
        </div>
      </div>
    </>
  );
};

export default MaxAssistant;