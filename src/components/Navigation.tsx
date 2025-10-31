import { Link, useLocation } from 'react-router-dom';
import { Home, Sprout, Shield, Droplets, MessageSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/recommend', icon: Sprout, label: 'Recommend' },
    { path: '/detect', icon: Shield, label: 'Detect' },
    { path: '/irrigation', icon: Droplets, label: 'Irrigation' },
    { path: '/chatbot', icon: MessageSquare, label: 'Assistant' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Agri-Saarthi
                </h1>
                <p className="text-xs text-muted-foreground">Digital Farming Companion</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'gradient-primary text-white shadow-lg'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 glass-effect rounded-2xl p-4 transform transition-all duration-300 ${
            isOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl font-medium mb-2 transition-all animate-fade-in ${
                  isActive
                    ? 'gradient-primary text-white shadow-lg'
                    : 'text-foreground hover:bg-muted'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
