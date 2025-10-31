import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import { Sprout, MapPin, Calendar, Leaf, Sparkles } from 'lucide-react';

export default function Recommend() {
  const [formData, setFormData] = useState({
    soilType: '',
    region: '',
    district: '',
    city: '',
    season: '',
  });
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getRecommendations = () => {
    const { soilType, region, district, city, season } = formData;

    if (!soilType || !region || !district || !city || !season) {
      setRecommendation({
        crop: 'Please fill all fields',
        details: 'All selections are required to provide a specific recommendation.'
      });
      return;
    }

    let recommendedCrop = 'Sugarcane';
    let details = 'Consider Sugarcane or other versatile crops suitable for your general region.';

    if (soilType === 'clay' && (region === 'south' || region === 'east') && season === 'kharif') {
      recommendedCrop = 'Rice (Paddy)';
      details = 'Clay soil is perfect for retaining the large amount of water needed for Rice cultivation during the monsoon (Kharif) season.';
    } else if ((soilType === 'loamy' || soilType === 'sandy') && region === 'north' && season === 'rabi') {
      recommendedCrop = 'Wheat';
      details = 'Requires moderate temperature and irrigation. Ideal Rabi crop for loamy/sandy soils in the Northern plains.';
    } else if ((soilType === 'sandy' || soilType === 'loamy') && region === 'west' && season === 'kharif') {
      recommendedCrop = 'Bajra (Pearl Millet)';
      details = 'Drought-tolerant, fast-growing crop ideal for semi-arid Western regions during the monsoon.';
    } else if (soilType === 'loamy' && region === 'west' && season === 'kharif') {
      recommendedCrop = 'Cotton';
      details = 'Grows well in well-drained loamy soil. Requires a long frost-free period and bright sunshine.';
    }

    setRecommendation({ crop: recommendedCrop, details });
  };

  return (
    <div className="min-h-screen py-12 relative">
      <Navigation />
      <ParticleBackground />
      
      <div className="container relative z-10 px-4 pt-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Recommendations</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Crop Recommendation System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get personalized crop suggestions powered by machine learning based on your soil type, location, and season
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-3d mb-8 animate-scale-in">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              Enter Your Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary" />
                  Soil Type
                </label>
                <select
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select Soil Type</option>
                  <option value="clay">Clay</option>
                  <option value="loamy">Loamy</option>
                  <option value="sandy">Sandy</option>
                  <option value="black">Black Soil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Region
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select Region</option>
                  <option value="north">North India</option>
                  <option value="south">South India</option>
                  <option value="east">East India</option>
                  <option value="west">West India</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Season
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select Season</option>
                  <option value="kharif">Kharif (Monsoon)</option>
                  <option value="rabi">Rabi (Winter)</option>
                  <option value="zaid">Zaid (Summer)</option>
                </select>
              </div>
            </div>

            <button
              onClick={getRecommendations}
              className="btn-3d w-full mt-8 gradient-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg"
            >
              <Sprout className="w-5 h-5" />
              Get Recommendations
            </button>
          </div>

          {recommendation && (
            <div className="card-3d animate-scale-in bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center gap-2">
                <Sprout className="w-6 h-6" />
                Recommended Crop
              </h3>
              
              <div className="bg-white/80 rounded-2xl p-6 mb-4">
                <h4 className="text-3xl font-bold text-primary mb-2">{recommendation.crop}</h4>
                <p className="text-muted-foreground leading-relaxed">{recommendation.details}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
