import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Truck } from 'lucide-react';

interface LogisticsEfficiencyProps {
  data: any[];
  loading: boolean;
}

export const LogisticsEfficiency = ({ data, loading }: LogisticsEfficiencyProps) => {
  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Truck className="text-primary w-5 h-5" />
        <h3 className="text-xl font-bold">Efisiensi Pengiriman per Wilayah</h3>
      </div>
      
      <div className="h-[300px] w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.slice(0, 15)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#334155" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="customer_state" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                width={40}
              />
              <Tooltip 
                cursor={{ fill: '#ffffff05' }}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                formatter={(value) => [`${value} Hari`, 'Rata-rata Pengiriman']}
              />
              <Bar 
                dataKey="avg_delivery_days" 
                fill="#8b5cf6" 
                radius={[0, 8, 8, 0]} 
                barSize={15}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-4 italic">
        * Menampilkan 15 wilayah dengan pengiriman tercepat.
      </p>
    </div>
  );
};
