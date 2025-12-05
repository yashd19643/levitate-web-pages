import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { User, Phone, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const detailsSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  phone_number: z.string().trim().min(10, 'Phone number must be at least 10 digits').max(15),
  city: z.string().trim().min(2, 'City must be at least 2 characters').max(100),
});

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const INDIAN_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 
  'Ahmedabad', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana',
  'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Srinagar',
  'Aurangabad', 'Dhanbad', 'Amritsar', 'Allahabad', 'Ranchi', 'Howrah',
  'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai',
  'Raipur', 'Kota', 'Chandigarh', 'Guwahati', 'Solapur', 'Hubli', 'Tiruchirappalli'
];

export default function UserDetailsModal({ open, onOpenChange, onSuccess }: UserDetailsModalProps) {
  const { user, refreshProfile } = useAuth();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login first');
      return;
    }

    const validation = detailsSchema.safeParse({ 
      name, 
      phone_number: phoneNumber, 
      city 
    });
    
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('profiles').upsert({
      user_id: user.id,
      name: validation.data.name,
      phone_number: validation.data.phone_number,
      city: validation.data.city,
    }, { onConflict: 'user_id' });

    if (error) {
      toast.error('Failed to save details. Please try again.');
    } else {
      toast.success('Details saved successfully!');
      await refreshProfile();
      onOpenChange(false);
      onSuccess?.();
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-effect border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Complete Your Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">City</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                required
              >
                <option value="">Select your city</option>
                {INDIAN_CITIES.sort().map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Save & Continue'
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
