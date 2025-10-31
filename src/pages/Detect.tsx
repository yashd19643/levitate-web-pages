import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import { Camera, Shield, AlertCircle, CheckCircle, Leaf } from 'lucide-react';

export default function Detect() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDetectDisease = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setDetectionResult({
        disease: 'Early Blight',
        confidence: '95%',
        advice: 'Apply a fungicide containing mancozeb or chlorothalonil. Ensure proper air circulation around plants and remove infected leaves to prevent spread.',
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 relative">
      <ParticleBackground />
      
      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-destructive to-accent bg-clip-text text-transparent">
            Disease Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image of your crop to instantly detect diseases and get treatment advice
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="card-3d animate-scale-in">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Camera className="w-6 h-6 text-primary" />
              Upload Image
            </h3>
            
            <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-all mb-6">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <p className="text-lg font-medium mb-2">Click to upload image</p>
                <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                {selectedImage && (
                  <p className="mt-4 text-sm text-primary font-medium">
                    Selected: {selectedImage.name}
                  </p>
                )}
              </label>
            </div>

            <button
              onClick={handleDetectDisease}
              disabled={!selectedImage || isAnalyzing}
              className="btn-3d w-full gradient-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Detect Disease
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="card-3d animate-scale-in" style={{ animationDelay: '100ms' }}>
            {detectionResult ? (
              <>
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-semibold">Detection Results</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Detected Disease</h4>
                    <p className="text-3xl font-bold text-primary">{detectionResult.disease}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Confidence: <span className="font-semibold text-foreground">{detectionResult.confidence}</span>
                    </p>
                  </div>

                  <div className="bg-accent/10 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-accent" />
                      Recommended Treatment
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {detectionResult.advice}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all">
                      Consult Expert
                    </button>
                    <button className="flex-1 py-3 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-all">
                      Save Report
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Shield className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-muted-foreground">No Results Yet</h3>
                <p className="text-muted-foreground">
                  Upload an image to detect diseases
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Camera, title: 'Clear Images', tip: 'Use well-lit, focused images for better accuracy' },
            { icon: Leaf, title: 'Affected Area', tip: 'Capture the affected parts of the plant clearly' },
            { icon: AlertCircle, title: 'Early Detection', tip: 'Detect diseases early for effective treatment' }
          ].map((item, index) => (
            <div key={index} className="card-3d text-center" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
