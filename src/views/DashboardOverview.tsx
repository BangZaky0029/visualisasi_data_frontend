import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Clock, Star, ArrowUpRight } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { motion } from 'framer-motion';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

const LoadingBox = () => (
  <div className="flex items-center justify-center h-full min-h-[100px]">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.4)]" />
  </div>
);

interface DashboardOverviewProps {
  data: any;
  loadingStates: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export const DashboardOverview = ({ data, loadingStates }: DashboardOverviewProps) => {
  const totalRevenue = data.salesTrend.reduce((acc: number, curr: any) => acc + curr.revenue, 0);
  const totalOrders = data.orderStatus.reduce((acc: number, curr: any) => acc + curr.count, 0);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <StatCard 
            label="Total Pendapatan" 
            value={loadingStates.salesTrend ? "..." : `$${(totalRevenue / 1000000).toFixed(2)}M`} 
            icon={DollarSign} 
            trend="+12.5%" 
            trendUp={true} 
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard 
            label="Total Pesanan" 
            value={loadingStates.orderStatus ? "..." : totalOrders.toLocaleString()} 
            icon={ShoppingCart} 
            trend="+5.2%" 
            trendUp={true} 
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard 
            label="Rata-rata Pengiriman" 
            value={loadingStates.avgDeliveryTime ? "..." : `${data.avgDeliveryTime[0]?.avg_delivery_days || 12.5} Hari`} 
            icon={Clock} 
            trend="-1.2%" 
            trendUp={true} 
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard 
            label="Rata-rata Ulasan" 
            value={loadingStates.reviewScores ? "..." : "4.08"} 
            icon={Star} 
            trend="+0.3" 
            trendUp={true} 
          />
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sales Trend */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card p-6 min-h-[420px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-all duration-700" />
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight">Tren Pendapatan Bulanan</h3>
              <p className="text-xs text-muted-foreground mt-1">Performa penjualan berdasarkan waktu pembelian</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            {loadingStates.salesTrend ? (
              <LoadingBox />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.salesTrend}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
                    tickFormatter={(val) => `$${(val / 1000).toFixed(0)}rb`}
                  />
                  <Tooltip 
                    cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#818cf8', fontWeight: 'bold' }}
                    formatter={(value) => [`$${(Number(value)).toLocaleString()}`, 'Pendapatan']}
                    labelFormatter={(label) => `Bulan: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#6366f1" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Payment Methods Pie */}
        <motion.div variants={itemVariants} className="glass-card p-6 min-h-[420px] flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold tracking-tight">Metode Pembayaran</h3>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="h-[240px] w-full relative">
              {loadingStates.paymentMethods ? (
                <LoadingBox />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.paymentMethods}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={8}
                      dataKey="total_transactions"
                      nameKey="payment_type"
                      animationBegin={200}
                      animationDuration={1200}
                    >
                      {data.paymentMethods.map((_entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
              {/* Central text for donut */}
              {!loadingStates.paymentMethods && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-2xl font-black text-white">{data.paymentMethods.length}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Metode</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {data.paymentMethods.slice(0, 4).map((item: any, index: number) => (
              <div key={item.payment_type} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-[10px] text-muted-foreground font-bold uppercase truncate">{item.payment_type.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
