import { useState, useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import { Droplets, Thermometer, Cloud, Activity, Power } from 'lucide-react';

export default function Irrigation() {
  const [sensorData, setSensorData] = useState({
    moisture: 65,
    temperature: 28,
    rainfall: 15,
    humidity: 72,
  });

  const [manualControl, setManualControl] = useState({
    pump1: false,
    pump2: false,
    pump3: false
  });

  useEffect(() => {
    // Simulate sensor data updates
    const interval = setInterval(() => {
      setSensorData(prev => ({
        moisture: Math.max(30, Math.min(90, prev.moisture + (Math.random() - 0.5) * 5)),
        temperature: Math.max(20, Math.min(40, prev.temperature + (Math.random() - 0.5) * 2)),
        rainfall: Math.max(0, Math.min(50, prev.rainfall + (Math.random() - 0.5) * 5)),
        humidity: Math.max(40, Math.min(95, prev.humidity + (Math.random() - 0.5) * 3)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const togglePump = (pump: keyof typeof manualControl) => {
    setManualControl(prev => ({ ...prev, [pump]: !prev[pump] }));
  };

  return (
    <div className="min-h-screen py-12 relative">
      <ParticleBackground />
      
      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-primary bg-clip-text text-transparent">
            Irrigation Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Smart irrigation scheduling with real-time weather monitoring
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
                  style={{ width: `${item.label === 'Temperature' ? (sensorData.temperature / 40) * 100 : 
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

        {/* Recommendations */}
        <div className="mt-8 card-3d animate-scale-in" style={{ animationDelay: '200ms' }}>
          <h3 className="text-2xl font-semibold mb-4">Smart Recommendations</h3>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
            <p className="text-lg">
              💡 Based on current soil moisture ({sensorData.moisture.toFixed(1)}%) and weather conditions, 
              it's recommended to {sensorData.moisture < 50 ? 
                'increase irrigation frequency' : 
                'maintain current irrigation schedule'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
