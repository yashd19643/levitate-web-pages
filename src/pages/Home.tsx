import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThreeScene from '@/components/ThreeScene';
import Navigation from '@/components/Navigation';
import AnimatedCounter from '@/components/AnimatedCounter';
import ScrollReveal from '@/components/ScrollReveal';
import UserDetailsModal from '@/components/UserDetailsModal';
import { useAuth } from '@/contexts/AuthContext';
import { Sprout, Shield, Droplets, MessageSquare, TrendingUp, Leaf, ArrowRight, Star, LogIn, User } from 'lucide-react';

export default function Home() {
  const { user, profile, signOut } = useAuth();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (!user) {
      navigate('/auth');
    } else if (!profile) {
      setShowDetailsModal(true);
    } else {
      navigate('/irrigation');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <ThreeScene />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float" />
          <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container relative z-10 px-4">
          <div className="glass-effect max-w-5xl mx-auto rounded-3xl p-8 md:p-16 text-center">
            {/* User Status */}
            {user && (
              <div className="absolute top-4 right-4 flex items-center gap-3">
                {profile && (
                  <span className="text-sm text-muted-foreground">
                    Welcome, <span className="text-primary font-medium">{profile.name}</span>
                  </span>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-in">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Agriculture</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent animate-fade-in leading-tight">
              Welcome to Agri-Saarthi
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 mb-10 max-w-3xl mx-auto animate-fade-in leading-relaxed">
              Your intelligent digital companion for modern farming. Get crop recommendations, disease detection, irrigation advice, and expert guidance!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              <button 
                onClick={handleGetStarted}
                className="btn-3d group inline-flex items-center gap-3 gradient-primary text-white px-8 py-5 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                {!user ? (
                  <>
                    <LogIn className="w-6 h-6" />
                    Login to Get Started
                  </>
                ) : !profile ? (
                  <>
                    <User className="w-6 h-6" />
                    Complete Profile
                  </>
                ) : (
                  <>
                    <Sprout className="w-6 h-6" />
                    Go to Irrigation
                  </>
                )}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link 
                to="/chatbot" 
                className="btn-3d inline-flex items-center gap-3 bg-white/80 backdrop-blur text-foreground px-8 py-5 rounded-2xl text-lg font-semibold border-2 border-border hover:border-primary transition-all"
              >
                <MessageSquare className="w-6 h-6" />
                Ask Assistant
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container px-4">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Empowering Farmers with Technology
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive AI-powered tools and insights to maximize your agricultural productivity and sustainability
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sprout,
                title: 'Crop Recommendation',
                description: 'Get personalized crop suggestions based on soil type, region, and season using advanced ML algorithms.',
                link: '/recommend',
                gradient: 'from-primary/20 to-primary/5',
                iconColor: 'text-primary'
              },
              {
                icon: Shield,
                title: 'Disease Detection',
                description: 'Upload crop images to instantly detect diseases and get AI-powered treatment recommendations.',
                link: '/detect',
                gradient: 'from-destructive/20 to-destructive/5',
                iconColor: 'text-destructive'
              },
              {
                icon: Droplets,
                title: 'Irrigation Management',
                description: 'Smart irrigation scheduling with real-time weather monitoring and automated control systems.',
                link: '/irrigation',
                gradient: 'from-blue-500/20 to-blue-500/5',
                iconColor: 'text-blue-500'
              },
              {
                icon: MessageSquare,
                title: 'Agri Assistant',
                description: 'Get instant answers to all your farming queries from our 24/7 AI-powered agricultural expert.',
                link: '/chatbot',
                gradient: 'from-secondary/20 to-secondary/5',
                iconColor: 'text-secondary'
              },
              {
                icon: TrendingUp,
                title: 'Market Insights',
                description: 'Stay updated with the latest crop prices, market trends, and predictive analytics.',
                link: '/recommend',
                gradient: 'from-accent/20 to-accent/5',
                iconColor: 'text-accent'
              },
              {
                icon: Leaf,
                title: 'Sustainability Tips',
                description: 'Learn eco-friendly farming practices and regenerative agriculture techniques for long-term success.',
                link: '/chatbot',
                gradient: 'from-emerald-500/20 to-emerald-500/5',
                iconColor: 'text-emerald-500'
              }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Link
                  to={feature.link}
                  className="card-3d group cursor-pointer h-full relative overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-background to-muted flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-card-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {feature.description}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="container relative z-10 px-4">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { number: 10000, suffix: '+', label: 'Active Farmers', description: 'Trust our platform' },
                { number: 50, suffix: '+', label: 'Crop Varieties', description: 'In our database' },
                { number: 95, suffix: '%', label: 'Accuracy Rate', description: 'Disease detection' },
                { number: 24, suffix: '/7', label: 'Support', description: 'Always available' }
              ].map((stat, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="text-center group">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-foreground mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container px-4">
          <ScrollReveal>
            <div className="glass-effect rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Ready to Transform Your Farm?
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Join thousands of farmers already using Agri-Saarthi to increase yields and reduce costs
                </p>
                <button 
                  onClick={handleGetStarted}
                  className="btn-3d inline-flex items-center gap-3 gradient-primary text-white px-10 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
                >
                  <Sprout className="w-6 h-6" />
                  Start Now - It's Free
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* User Details Modal */}
      <UserDetailsModal 
        open={showDetailsModal} 
        onOpenChange={setShowDetailsModal}
        onSuccess={() => navigate('/irrigation')}
      />
    </div>
  );
}
