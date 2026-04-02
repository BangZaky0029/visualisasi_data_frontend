import { Users, MapPin } from 'lucide-react';

interface CustomerDemographicsProps {
  data: any[];
  loading: boolean;
}

export const CustomerDemographics = ({ data, loading }: CustomerDemographicsProps) => {
  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Users className="text-primary w-5 h-5" />
        <h3 className="text-xl font-bold">Sebaran Geografis Pelanggan</h3>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col gap-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 bg-white/5 rounded-xl w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {data.map((city, index) => (
              <div 
                key={city.city} 
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold capitalize">{city.city.toLowerCase()}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MapPin className="w-2 h-2" />
                      Kota Terverifikasi
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{city.customer_count.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Pelanggan</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
