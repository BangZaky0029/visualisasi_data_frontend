import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export const StatCard = ({ label, value, icon: Icon, trend, trendUp }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend && (
          <div className={`px-2 py-1 rounded-lg text-xs font-bold ${trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }`}>
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <p className="stat-value mt-1">{value}</p>
      </div>
    </motion.div>
  );
};
