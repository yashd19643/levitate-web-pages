import { Link } from 'react-router-dom';
import ThreeScene from '@/components/ThreeScene';
import { Sprout, Shield, Droplets, MessageSquare, TrendingUp, Leaf } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <ThreeScene />
        
        <div className="container relative z-10">
          <div className="glass-effect max-w-4xl mx-auto rounded-3xl p-12 text-center animate-fade-in">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
              Welcome to Agri-Saarthi
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Your digital companion for modern farming. Get crop recommendations, disease detection, irrigation advice, and more!
            </p>
            <Link 
              to="/recommend" 
              className="btn-3d inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90"
            >
              <Sprout className="w-5 h-5" />
              Get Started with Recommendations
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary">
            Empowering Farmers with Technology
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Comprehensive tools and insights to maximize your agricultural productivity
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sprout,
                title: 'Crop Recommendation',
                description: 'Get personalized crop suggestions based on soil type, region, and season.',
                link: '/recommend',
                color: 'text-primary'
              },
              {
                icon: Shield,
                title: 'Disease Detection',
                description: 'Upload crop images to instantly detect diseases and get treatment advice.',
                link: '/detect',
                color: 'text-destructive'
              },
              {
                icon: Droplets,
                title: 'Irrigation Management',
                description: 'Smart irrigation scheduling with real-time weather monitoring.',
                link: '/irrigation',
                color: 'text-blue-500'
              },
              {
                icon: MessageSquare,
                title: 'Agri Assistant',
                description: 'Get instant answers to all your farming queries from our AI assistant.',
                link: '/chatbot',
                color: 'text-secondary'
              },
              {
                icon: TrendingUp,
                title: 'Market Insights',
                description: 'Stay updated with the latest crop prices and market trends.',
                link: '/recommend',
                color: 'text-accent'
              },
              {
                icon: Leaf,
                title: 'Sustainability Tips',
                description: 'Learn eco-friendly farming practices for sustainable agriculture.',
                link: '/chatbot',
                color: 'text-emerald-500'
              }
            ].map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="card-3d group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}/10 to-${feature.color}/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Active Farmers' },
              { number: '50+', label: 'Crop Varieties' },
              { number: '95%', label: 'Accuracy Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
