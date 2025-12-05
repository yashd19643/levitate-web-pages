import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import { Send, Bot, User, Sparkles, Zap, Globe, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

type Language = 'en' | 'hi' | 'mr';

const languageLabels: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी'
};

const welcomeMessages: Record<Language, string> = {
  en: 'Hello! How can I help you with farming today?',
  hi: 'नमस्ते! आज मैं खेती में आपकी कैसे मदद कर सकता हूं?',
  mr: 'नमस्कार! आज मी शेतीमध्ये तुम्हाला कशी मदत करू शकतो?'
};

const faqQuestionsByLang: Record<Language, string[]> = {
  en: [
    'What crop is best for my soil?',
    'How do I detect common pests?',
    'How much water does my crop need?',
    'What are the latest market prices?'
  ],
  hi: [
    'मेरी मिट्टी के लिए कौन सी फसल सबसे अच्छी है?',
    'आम कीटों को कैसे पहचानें?',
    'मेरी फसल को कितने पानी की जरूरत है?',
    'बाजार के ताजा भाव क्या हैं?'
  ],
  mr: [
    'माझ्या मातीसाठी कोणती पिके सर्वोत्तम आहे?',
    'सामान्य कीटक कसे ओळखायचे?',
    'माझ्या पिकाला किती पाणी लागते?',
    'बाजारातील ताजे भाव काय आहेत?'
  ]
};

const placeholderByLang: Record<Language, string> = {
  en: 'Type your question here...',
  hi: 'अपना सवाल यहां लिखें...',
  mr: 'तुमचा प्रश्न येथे टाइप करा...'
};

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: welcomeMessages.en,
      sender: 'bot',
    },
  ]);
  const { toast } = useToast();

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setMessages([{
      id: 1,
      text: welcomeMessages[newLang],
      sender: 'bot',
    }]);
  };

  const handleSendMessage = async () => {
    if (message.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: message.trim(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('agri-chat', {
        body: { message: currentMessage, language }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const botResponse: Message = {
        id: messages.length + 2,
        text: data.reply,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: language === 'en' ? 'Error' : language === 'hi' ? 'त्रुटि' : 'त्रुटी',
        description: language === 'en' 
          ? 'Failed to get response. Please try again.' 
          : language === 'hi' 
          ? 'जवाब प्राप्त करने में विफल। कृपया पुनः प्रयास करें।'
          : 'प्रतिसाद मिळविण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen py-12 relative">
      <Navigation />
      <ParticleBackground />
      
      <div className="container relative z-10 px-4 pt-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">24/7 AI Assistant</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Agri Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === 'en' && 'Your personalized AI-powered digital guide for all farming queries, available anytime, anywhere'}
            {language === 'hi' && 'आपके सभी खेती प्रश्नों के लिए आपका व्यक्तिगत AI-संचालित डिजिटल गाइड, कभी भी, कहीं भी उपलब्ध'}
            {language === 'mr' && 'तुमच्या सर्व शेती प्रश्नांसाठी तुमचे वैयक्तिक AI-चालित डिजिटल मार्गदर्शक, कधीही, कुठेही उपलब्ध'}
          </p>

          {/* Language Selector */}
          <div className="flex justify-center gap-3 mt-8">
            {(Object.keys(languageLabels) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                  language === lang
                    ? 'gradient-primary text-white shadow-lg'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                <Globe className="w-4 h-4" />
                {languageLabels[lang]}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-3d mb-8 animate-scale-in">
            {/* Chat Container */}
            <div className="h-[500px] overflow-y-auto mb-6 space-y-4 p-4 bg-gradient-to-b from-muted/30 to-muted/10 rounded-2xl">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 animate-fade-in ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'bot' ? 'bg-primary/10' : 'bg-secondary/10'
                  }`}>
                    {msg.sender === 'bot' ? (
                      <Bot className="w-5 h-5 text-primary" />
                    ) : (
                      <User className="w-5 h-5 text-secondary" />
                    )}
                  </div>
                  <div
                    className={`max-w-[70%] px-6 py-4 rounded-2xl shadow-sm ${
                      msg.sender === 'bot'
                        ? 'bg-card border border-border'
                        : 'gradient-primary text-white'
                    }`}
                    style={{
                      borderRadius: msg.sender === 'bot' ? '20px 20px 20px 4px' : '20px 20px 4px 20px'
                    }}
                  >
                    <p className={`whitespace-pre-wrap ${msg.sender === 'user' ? 'text-white' : 'text-foreground'}`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="px-6 py-4 rounded-2xl shadow-sm bg-card border border-border" style={{ borderRadius: '20px 20px 20px 4px' }}>
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-3 relative z-10">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholderByLang[language]}
                disabled={isLoading}
                className="flex-1 px-6 py-4 bg-input border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim()}
                className="gradient-primary text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {language === 'en' ? 'Send' : language === 'hi' ? 'भेजें' : 'पाठवा'}
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="card-3d animate-scale-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              {language === 'en' ? 'Popular Questions' : language === 'hi' ? 'लोकप्रिय प्रश्न' : 'लोकप्रिय प्रश्न'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {faqQuestionsByLang[language].map((question, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(question)}
                  disabled={isLoading}
                  className="text-left px-4 py-3 bg-muted/50 hover:bg-primary/10 rounded-xl transition-all text-sm border border-transparent hover:border-primary/20 disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
