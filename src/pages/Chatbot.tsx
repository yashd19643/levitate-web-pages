import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import { Send, Bot, User, Sparkles, Zap } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! How can I help you with farming today?',
      sender: 'bot',
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: message.trim(),
        sender: 'user',
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setMessage('');

      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: 'Thank you for your question. Our agri-expert will get back to you shortly.',
          sender: 'bot',
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const faqQuestions = [
    'What crop is best for my soil?',
    'How do I detect common pests?',
    'How much water does my crop need?',
    'What are the latest market prices?'
  ];

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
            Your personalized AI-powered digital guide for all farming queries, available anytime, anywhere
          </p>
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
                        ? 'bg-white border border-border'
                        : 'gradient-primary text-white'
                    }`}
                    style={{
                      borderRadius: msg.sender === 'bot' ? '20px 20px 20px 4px' : '20px 20px 4px 20px'
                    }}
                  >
                    <p className={msg.sender === 'user' ? 'text-white' : 'text-foreground'}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question here..."
                className="flex-1 px-6 py-4 bg-input border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button
                onClick={handleSendMessage}
                className="btn-3d gradient-primary text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
                Send
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="card-3d animate-scale-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Popular Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {faqQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(question)}
                  className="text-left px-4 py-3 bg-muted/50 hover:bg-primary/10 rounded-xl transition-all text-sm border border-transparent hover:border-primary/20"
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
