import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Droplets, Thermometer, Cloud, Activity, Power, Sparkles, MapPin, User, AlertCircle } from 'lucide-react';

// City-specific irrigation data
const CITY_IRRIGATION_DATA: Record<string, { moisture: number; temperature: number; rainfall: number; humidity: number; recommendation: string }> = {
  'Mumbai': { moisture: 75, temperature: 30, rainfall: 25, humidity: 85, recommendation: 'High humidity detected. Reduce irrigation frequency to prevent waterlogging.' },
  'Delhi': { moisture: 45, temperature: 38, rainfall: 5, humidity: 55, recommendation: 'Hot and dry conditions. Increase irrigation frequency and consider drip irrigation.' },
  'Bangalore': { moisture: 60, temperature: 26, rainfall: 15, humidity: 70, recommendation: 'Moderate conditions. Maintain current irrigation schedule.' },
  'Hyderabad': { moisture: 50, temperature: 34, rainfall: 8, humidity: 60, recommendation: 'Warm weather. Consider early morning irrigation to reduce evaporation.' },
  'Chennai': { moisture: 55, temperature: 32, rainfall: 12, humidity: 78, recommendation: 'High humidity. Monitor soil moisture before irrigating.' },
  'Kolkata': { moisture: 70, temperature: 31, rainfall: 20, humidity: 82, recommendation: 'Humid conditions. Reduce irrigation to prevent root rot.' },
  'Pune': { moisture: 58, temperature: 28, rainfall: 18, humidity: 65, recommendation: 'Good growing conditions. Maintain regular irrigation schedule.' },
  'Ahmedabad': { moisture: 40, temperature: 36, rainfall: 3, humidity: 50, recommendation: 'Very dry conditions. Increase irrigation significantly and use mulching.' },
  'Jaipur': { moisture: 35, temperature: 37, rainfall: 2, humidity: 45, recommendation: 'Desert climate. Heavy irrigation needed. Consider shade structures.' },
  'Lucknow': { moisture: 52, temperature: 33, rainfall: 10, humidity: 62, recommendation: 'Moderate heat. Water crops during cooler parts of the day.' },
};

const DEFAULT_DATA = { moisture: 55, temperature: 30, rainfall: 10, humidity: 65, recommendation: 'Maintain standard irrigation practices based on crop requirements.' };

export default function Irrigation() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  
  const cityData = profile?.city ? (CITY_IRRIGATION_DATA[profile.city] || DEFAULT_DATA) : DEFAULT_DATA;
  
  const [sensorData, setSensorData] = useState({
    moisture: cityData.moisture,
    temperature: cityData.temperature,
    rainfall: cityData.rainfall,
    humidity: cityData.humidity,
  });

  const [manualControl, setManualControl] = useState({
    pump1: false,
    pump2: false,
    pump3: false
  });

  // Update sensor data when profile changes
  useEffect(() => {
    if (profile?.city) {
      const data = CITY_IRRIGATION_DATA[profile.city] || DEFAULT_DATA;
      setSensorData({
        moisture: data.moisture,
        temperature: data.temperature,
        rainfall: data.rainfall,
        humidity: data.humidity,
      });
    }
  }, [profile?.city]);

  useEffect(() => {
    // Simulate sensor data updates with city-specific baseline
    const interval = setInterval(() => {
      const baseData = profile?.city ? (CITY_IRRIGATION_DATA[profile.city] || DEFAULT_DATA) : DEFAULT_DATA;
      setSensorData(prev => ({
        moisture: Math.max(30, Math.min(90, baseData.moisture + (Math.random() - 0.5) * 10)),
        temperature: Math.max(20, Math.min(45, baseData.temperature + (Math.random() - 0.5) * 4)),
        rainfall: Math.max(0, Math.min(50, baseData.rainfall + (Math.random() - 0.5) * 5)),
        humidity: Math.max(40, Math.min(95, baseData.humidity + (Math.random() - 0.5) * 6)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [profile?.city]);

  const togglePump = (pump: keyof typeof manualControl) => {
    setManualControl(prev => ({ ...prev, [pump]: !prev[pump] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 relative">
      <Navigation />
      <ParticleBackground />
      
      <div className="container relative z-10 px-4 pt-20">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">Smart IoT Integration</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-primary bg-clip-text text-transparent">
            Irrigation Management
          </h1>
          
          {/* City-specific header */}
          {profile?.city ? (
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-xl font-semibold text-primary">{profile.city}</span>
              <span className="text-muted-foreground">- Personalized for your location</span>
            </div>
          ) : user ? (
            <div className="flex items-center justify-center gap-2 mb-4 text-amber-500">
              <AlertCircle className="w-5 h-5" />
              <span>Complete your profile to get location-specific data</span>
              <button 
                onClick={() => navigate('/')}
                className="underline hover:text-amber-400"
              >
                Add City
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 mb-4 text-amber-500">
              <User className="w-5 h-5" />
              <span>Login to get personalized irrigation data for your city</span>
              <button 
                onClick={() => navigate('/auth')}
                className="underline hover:text-amber-400"
              >
                Login
              </button>
            </div>
          )}
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Smart irrigation scheduling with real-time weather monitoring and automated control systems
          </p>
        </div>

        {/* Sensor Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Droplets, label: 'Soil Moisture', value: `${sensorData.moisture.toFixed(1)}%`, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { icon: Thermometer, label: 'Temperature', value: `${sensorData.temperature.toFixed(1)}°C`, color: 'text-accent', bg: 'bg-accent/10' },
            { icon: Cloud, label: 'Rainfall', value: `${sensorData.rainfall.toFixed(1)}mm`, color: 'text-primary', bg: 'bg-primary/10' },
            { icon: Activity, label: 'Humidity', value: `${sensorData.humidity.toFixed(1)}%`, color: 'text-secondary', bg: 'bg-secondary/10' }
          ].map((item, index) => (
            <div key={index} className="card-3d animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
              </div>
              
              {/* Visual indicator bar */}
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color.replace('text-', 'bg-')} transition-all duration-500`}
                  style={{ width: `${item.label === 'Temperature' ? (sensorData.temperature / 45) * 100 : 
                                   item.label === 'Soil Moisture' ? sensorData.moisture :
                                   item.label === 'Rainfall' ? (sensorData.rainfall / 50) * 100 : 
                                   sensorData.humidity}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Manual Control */}
          <div className="card-3d animate-scale-in">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Power className="w-6 h-6 text-primary" />
              Pump Control
            </h3>
            
            <div className="space-y-4">
              {(['pump1', 'pump2', 'pump3'] as const).map((pump, index) => (
                <div key={pump} className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${manualControl[pump] ? 'bg-primary' : 'bg-muted'} flex items-center justify-center transition-colors`}>
                      <Droplets className={`w-5 h-5 ${manualControl[pump] ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="font-semibold">Pump {index + 1}</p>
                      <p className="text-sm text-muted-foreground">
                        {manualControl[pump] ? 'Running' : 'Stopped'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => togglePump(pump)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all ${
                      manualControl[pump]
                        ? 'bg-destructive text-white hover:bg-destructive/90'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {manualControl[pump] ? 'Stop' : 'Start'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Irrigation Schedule */}
          <div className="card-3d animate-scale-in" style={{ animationDelay: '100ms' }}>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              Irrigation Schedule
            </h3>
            
            <div className="space-y-4">
              {[
                { time: '06:00 AM', duration: '30 min', status: 'completed' },
                { time: '12:00 PM', duration: '45 min', status: 'active' },
                { time: '06:00 PM', duration: '30 min', status: 'scheduled' }
              ].map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      schedule.status === 'completed' ? 'bg-primary' :
                      schedule.status === 'active' ? 'bg-accent animate-pulse' :
                      'bg-muted-foreground'
                    }`} />
                    <div>
                      <p className="font-semibold">{schedule.time}</p>
                      <p className="text-sm text-muted-foreground">{schedule.duration}</p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    schedule.status === 'completed' ? 'bg-primary/10 text-primary' :
                    schedule.status === 'active' ? 'bg-accent/10 text-accent' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {schedule.status}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 btn-3d gradient-primary text-white py-3 rounded-xl font-semibold">
              Update Schedule
            </button>
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="mt-8 card-3d animate-scale-in" style={{ animationDelay: '200ms' }}>
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Smart Recommendations
            {profile?.city && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                for {profile.city}
              </span>
            )}
          </h3>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
            <p className="text-lg">
              💡 {profile?.city ? (CITY_IRRIGATION_DATA[profile.city]?.recommendation || DEFAULT_DATA.recommendation) : (
                sensorData.moisture < 50 ? 
                  'Based on current soil moisture, increase irrigation frequency.' : 
                  'Maintain current irrigation schedule.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
