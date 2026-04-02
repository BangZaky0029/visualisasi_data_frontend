import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Package } from 'lucide-react';

interface CategoryProfitabilityProps {
  data: any[];
  loading: boolean;
}

export const CategoryProfitability = ({ data, loading }: CategoryProfitabilityProps) => {
  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Package className="text-primary w-5 h-5" />
        <h3 className="text-xl font-bold">Profitabilitas Kategori Produk</h3>
      </div>

      <div className="h-[350px] w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
              <XAxis 
                dataKey="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10 }}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <Tooltip 
                cursor={{ fill: '#ffffff05' }}
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <Bar 
                yAxisId="left"
                dataKey="total_revenue" 
                name="Total Pendapatan"
                fill="#6366f1" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
              <Bar 
                yAxisId="right"
                dataKey="total_orders" 
                name="Jumlah Pesanan"
                fill="#ec4899" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
