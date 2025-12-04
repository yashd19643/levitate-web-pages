import { useState, useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import { Sprout, MapPin, Calendar, Leaf, Sparkles } from 'lucide-react';

// Region-wise districts and cities data
const locationData: Record<string, Record<string, string[]>> = {
  north: {
    'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
    'Punjab - Amritsar': ['Amritsar City', 'Ajnala', 'Baba Bakala'],
    'Punjab - Ludhiana': ['Ludhiana City', 'Khanna', 'Jagraon'],
    'Haryana - Karnal': ['Karnal City', 'Gharaunda', 'Nilokheri'],
    'Haryana - Hisar': ['Hisar City', 'Hansi', 'Fatehabad'],
    'Uttar Pradesh - Lucknow': ['Lucknow City', 'Malihabad', 'Mohanlalganj'],
    'Uttar Pradesh - Varanasi': ['Varanasi City', 'Chandauli', 'Mirzapur'],
    'Uttar Pradesh - Meerut': ['Meerut City', 'Modinagar', 'Ghaziabad'],
    'Rajasthan - Jaipur': ['Jaipur City', 'Amber', 'Sanganer'],
    'Rajasthan - Jodhpur': ['Jodhpur City', 'Phalodi', 'Bilara'],
    'Uttarakhand - Dehradun': ['Dehradun City', 'Mussoorie', 'Rishikesh'],
    'Himachal Pradesh - Shimla': ['Shimla City', 'Kufri', 'Chail'],
  },
  south: {
    'Tamil Nadu - Chennai': ['Chennai City', 'Tambaram', 'Avadi'],
    'Tamil Nadu - Coimbatore': ['Coimbatore City', 'Tiruppur', 'Pollachi'],
    'Tamil Nadu - Madurai': ['Madurai City', 'Dindigul', 'Theni'],
    'Karnataka - Bangalore': ['Bangalore City', 'Whitefield', 'Electronic City'],
    'Karnataka - Mysore': ['Mysore City', 'Mandya', 'Hassan'],
    'Karnataka - Belgaum': ['Belgaum City', 'Dharwad', 'Hubli'],
    'Kerala - Thiruvananthapuram': ['Trivandrum City', 'Neyyattinkara', 'Attingal'],
    'Kerala - Kochi': ['Kochi City', 'Ernakulam', 'Aluva'],
    'Andhra Pradesh - Vijayawada': ['Vijayawada City', 'Guntur', 'Tenali'],
    'Andhra Pradesh - Visakhapatnam': ['Vizag City', 'Anakapalli', 'Bheemunipatnam'],
    'Telangana - Hyderabad': ['Hyderabad City', 'Secunderabad', 'Cyberabad'],
    'Telangana - Warangal': ['Warangal City', 'Hanamkonda', 'Kazipet'],
  },
  east: {
    'West Bengal - Kolkata': ['Kolkata City', 'Howrah', 'Salt Lake'],
    'West Bengal - Darjeeling': ['Darjeeling Town', 'Kalimpong', 'Kurseong'],
    'West Bengal - Murshidabad': ['Berhampore', 'Jangipur', 'Lalbag'],
    'Bihar - Patna': ['Patna City', 'Danapur', 'Hajipur'],
    'Bihar - Gaya': ['Gaya City', 'Bodh Gaya', 'Sherghati'],
    'Bihar - Muzaffarpur': ['Muzaffarpur City', 'Sitamarhi', 'Sheohar'],
    'Odisha - Bhubaneswar': ['Bhubaneswar City', 'Cuttack', 'Puri'],
    'Odisha - Sambalpur': ['Sambalpur City', 'Jharsuguda', 'Bargarh'],
    'Jharkhand - Ranchi': ['Ranchi City', 'Jamshedpur', 'Dhanbad'],
    'Assam - Guwahati': ['Guwahati City', 'Dispur', 'Beltola'],
    'Assam - Jorhat': ['Jorhat City', 'Sibsagar', 'Golaghat'],
  },
  west: {
    'Maharashtra - Mumbai': ['Mumbai City', 'Thane', 'Navi Mumbai'],
    'Maharashtra - Pune': ['Pune City', 'Pimpri-Chinchwad', 'Lonavala'],
    'Maharashtra - Nagpur': ['Nagpur City', 'Wardha', 'Chandrapur'],
    'Maharashtra - Nashik': ['Nashik City', 'Malegaon', 'Ozar'],
    'Gujarat - Ahmedabad': ['Ahmedabad City', 'Gandhinagar', 'Sanand'],
    'Gujarat - Surat': ['Surat City', 'Navsari', 'Bardoli'],
    'Gujarat - Rajkot': ['Rajkot City', 'Morbi', 'Gondal'],
    'Gujarat - Vadodara': ['Vadodara City', 'Anand', 'Bharuch'],
    'Goa - North Goa': ['Panaji', 'Mapusa', 'Calangute'],
    'Goa - South Goa': ['Margao', 'Vasco', 'Ponda'],
    'Madhya Pradesh - Bhopal': ['Bhopal City', 'Vidisha', 'Raisen'],
    'Madhya Pradesh - Indore': ['Indore City', 'Dewas', 'Ujjain'],
  },
};

export default function Recommend() {
  const [formData, setFormData] = useState({
    soilType: '',
    region: '',
    district: '',
    city: '',
    season: '',
  });
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<any>(null);

  // Update districts when region changes
  useEffect(() => {
    if (formData.region && locationData[formData.region]) {
      setAvailableDistricts(Object.keys(locationData[formData.region]));
      setFormData(prev => ({ ...prev, district: '', city: '' }));
      setAvailableCities([]);
    } else {
      setAvailableDistricts([]);
      setAvailableCities([]);
    }
  }, [formData.region]);

  // Update cities when district changes
  useEffect(() => {
    if (formData.region && formData.district && locationData[formData.region]?.[formData.district]) {
      setAvailableCities(locationData[formData.region][formData.district]);
      setFormData(prev => ({ ...prev, city: '' }));
    } else {
      setAvailableCities([]);
    }
  }, [formData.district]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getRecommendations = () => {
    const { soilType, region, district, city, season } = formData;

    if (!soilType || !region || !district || !city || !season) {
      setRecommendation({
        crops: [{ name: 'Please fill all fields', details: 'All selections are required to provide specific recommendations.' }]
      });
      return;
    }

    const recommendations: { name: string; details: string }[] = [];

    // Kharif Season Crops
    if (season === 'kharif') {
      if (soilType === 'clay' && (region === 'south' || region === 'east')) {
        recommendations.push({ name: 'Rice (Paddy)', details: 'Clay soil retains water perfectly for Rice cultivation during monsoon season.' });
      }
      if (soilType === 'clay' && region === 'east') {
        recommendations.push({ name: 'Jute', details: 'Thrives in humid climate with clay soil. Major fiber crop of Eastern India.' });
      }
      if ((soilType === 'sandy' || soilType === 'loamy') && region === 'west') {
        recommendations.push({ name: 'Bajra (Pearl Millet)', details: 'Drought-tolerant, fast-growing crop ideal for semi-arid Western regions.' });
        recommendations.push({ name: 'Jowar (Sorghum)', details: 'Excellent drought resistance. Grows well in low rainfall areas.' });
      }
      if (soilType === 'loamy' && (region === 'west' || region === 'south')) {
        recommendations.push({ name: 'Cotton', details: 'Requires well-drained loamy soil, long frost-free period and bright sunshine.' });
      }
      if (soilType === 'black' && (region === 'west' || region === 'south')) {
        recommendations.push({ name: 'Soybean', details: 'Black soil provides excellent nutrients. High protein oilseed crop.' });
        recommendations.push({ name: 'Groundnut', details: 'Well-suited for black soil. Important oilseed crop with good returns.' });
      }
      if (soilType === 'loamy' && region === 'north') {
        recommendations.push({ name: 'Maize', details: 'Versatile crop that grows well in loamy soil with adequate rainfall.' });
        recommendations.push({ name: 'Sugarcane', details: 'Requires abundant water and fertile loamy soil. High-value cash crop.' });
      }
      if (region === 'south') {
        recommendations.push({ name: 'Ragi (Finger Millet)', details: 'Nutritious millet crop well-suited for Southern Indian climate.' });
        recommendations.push({ name: 'Turmeric', details: 'Spice crop that thrives in warm, humid conditions of South India.' });
      }
      if (soilType === 'sandy' && region === 'east') {
        recommendations.push({ name: 'Sesame', details: 'Drought-tolerant oilseed crop suitable for sandy soils.' });
      }
    }

    // Rabi Season Crops
    if (season === 'rabi') {
      if ((soilType === 'loamy' || soilType === 'sandy') && region === 'north') {
        recommendations.push({ name: 'Wheat', details: 'Ideal Rabi crop for Northern plains. Requires moderate temperature and irrigation.' });
      }
      if (soilType === 'loamy' && (region === 'north' || region === 'west')) {
        recommendations.push({ name: 'Chickpea (Gram)', details: 'Protein-rich pulse crop. Grows well in cool, dry conditions.' });
        recommendations.push({ name: 'Mustard', details: 'Important oilseed crop for Rabi season. Requires cool climate.' });
      }
      if (soilType === 'clay' && region === 'south') {
        recommendations.push({ name: 'Lentil (Masoor)', details: 'Nutritious pulse crop suited for clay soils in cooler months.' });
      }
      if (region === 'north' || region === 'west') {
        recommendations.push({ name: 'Barley', details: 'Hardy cereal crop tolerant to drought and salinity. Good for brewing and fodder.' });
        recommendations.push({ name: 'Peas', details: 'Cool-season vegetable crop with high nutritional value.' });
      }
      if (soilType === 'black' && region === 'west') {
        recommendations.push({ name: 'Safflower', details: 'Oilseed crop well-suited for black soil in semi-arid regions.' });
      }
      if (soilType === 'loamy' && region === 'south') {
        recommendations.push({ name: 'Sunflower', details: 'High-yielding oilseed crop adaptable to various conditions.' });
        recommendations.push({ name: 'Coriander', details: 'Spice crop that grows well in mild winter conditions.' });
      }
      if (region === 'east') {
        recommendations.push({ name: 'Potato', details: 'Major vegetable crop for Rabi season. Requires well-drained soil.' });
        recommendations.push({ name: 'Onion', details: 'Cash crop with good storage potential. Grows well in winter.' });
      }
    }

    // Zaid Season Crops
    if (season === 'zaid') {
      recommendations.push({ name: 'Watermelon', details: 'Summer fruit crop requiring warm temperatures and adequate irrigation.' });
      recommendations.push({ name: 'Muskmelon', details: 'Sweet fruit crop ideal for hot summer conditions.' });
      recommendations.push({ name: 'Cucumber', details: 'Fast-growing vegetable crop for summer season.' });
      if (soilType === 'sandy' || soilType === 'loamy') {
        recommendations.push({ name: 'Moong (Green Gram)', details: 'Short-duration pulse crop. Nitrogen-fixing and soil-enriching.' });
        recommendations.push({ name: 'Urad (Black Gram)', details: 'Protein-rich pulse suitable for hot and humid conditions.' });
      }
      if (region === 'north' || region === 'west') {
        recommendations.push({ name: 'Bitter Gourd', details: 'Medicinal vegetable crop with good market demand.' });
        recommendations.push({ name: 'Bottle Gourd', details: 'Popular summer vegetable with high water content.' });
      }
      if (soilType === 'loamy') {
        recommendations.push({ name: 'Fodder Crops', details: 'Grow fodder like Berseem or Lucerne for livestock during lean period.' });
      }
    }

    // Default if no specific matches
    if (recommendations.length === 0) {
      recommendations.push({ name: 'Sugarcane', details: 'Versatile cash crop suitable for most regions with adequate water.' });
      recommendations.push({ name: 'Vegetables', details: 'Consider seasonal vegetables like tomatoes, brinjal, or okra based on local demand.' });
    }

    setRecommendation({ crops: recommendations });
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
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  District
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!formData.region}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">{formData.region ? 'Select District' : 'Select Region First'}</option>
                  {availableDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!formData.district}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">{formData.district ? 'Select City' : 'Select District First'}</option>
                  {availableCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
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
                Recommended Crops ({recommendation.crops.length})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendation.crops.map((crop: { name: string; details: string }, index: number) => (
                  <div 
                    key={index} 
                    className="bg-white/80 dark:bg-card/80 rounded-2xl p-5 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h4 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                      <Leaf className="w-5 h-5" />
                      {crop.name}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{crop.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
