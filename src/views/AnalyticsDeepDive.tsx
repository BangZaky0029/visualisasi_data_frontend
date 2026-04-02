import { SellerLeaderboard } from '../components/analytics/SellerLeaderboard';
import { LogisticsEfficiency } from '../components/analytics/LogisticsEfficiency';
import { CategoryProfitability } from '../components/analytics/CategoryProfitability';
import { CustomerDemographics } from '../components/analytics/CustomerDemographics';
import { motion } from 'framer-motion';

interface AnalyticsDeepDiveProps {
  data: any;
  loadingStates: any;
}

export const AnalyticsDeepDive = ({ data, loadingStates }: AnalyticsDeepDiveProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pilar 1: Performa Penjual */}
        <SellerLeaderboard 
          data={data.sellerPerformance} 
          loading={loadingStates.sellerPerformance} 
        />

        {/* Pilar 2: Efisiensi Logistik */}
        <LogisticsEfficiency 
          data={data.avgDeliveryTime} 
          loading={loadingStates.avgDeliveryTime} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pilar 3: Profitabilitas Kategori */}
        <div className="lg:col-span-2">
          <CategoryProfitability 
            data={data.revenueByCategory} 
            loading={loadingStates.revenueByCategory} 
          />
        </div>

        {/* Pilar 4: Demografi Pelanggan */}
        <CustomerDemographics 
          data={data.customerGeo} 
          loading={loadingStates.customerGeo} 
        />
      </div>
    </motion.div>
  );
};
