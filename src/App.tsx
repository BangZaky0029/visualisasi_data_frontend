import { useState, useCallback } from 'react';
import { Activity } from 'lucide-react';
import { Sidebar, type TabId } from './components/Sidebar';
import { useDashboardData } from './hooks/useDashboardData';
import { DashboardOverview } from './views/DashboardOverview';
import { AnalyticsDeepDive } from './views/AnalyticsDeepDive';
import { DateFilter } from './components/DateFilter';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_START = '2017-01-01';
const DEFAULT_END = '2018-08-31';

const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>('Ringkasan');
  const [dateRange, setDateRange] = useState({ start: DEFAULT_START, end: DEFAULT_END });

  const { data, loadingStates, isGlobalLoading } = useDashboardData({
    startDate: dateRange.start,
    endDate: dateRange.end
  });

  const handleDateChange = useCallback((start: string, end: string) => {
    setDateRange({ start, end });
  }, []);

  const handleReset = useCallback(() => {
    setDateRange({ start: DEFAULT_START, end: DEFAULT_END });
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="space-y-1">
            <motion.h1
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
            >
              {activeTab} Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg font-medium opacity-80"
            >
              Analitik real-time dari Database E-commerce Olist.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <DateFilter
              startDate={dateRange.start}
              endDate={dateRange.end}
              onDateChange={handleDateChange}
              onReset={handleReset}
            />

            <div className="px-4 py-2 glass-card flex items-center gap-2 border-primary/20">
              <span className={`w-2 h-2 rounded-full ${isGlobalLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} />
              <span className="text-xs font-bold tracking-wide uppercase">{isGlobalLoading ? 'Memuat...' : 'Online'}</span>
            </div>
          </div>
        </header>

        {/* View Switcher */}
        <div className="mt-4 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + dateRange.start + dateRange.end}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {activeTab === 'Ringkasan' && (
                <DashboardOverview data={data} loadingStates={loadingStates} />
              )}

              {activeTab === 'Analitik' && (
                <AnalyticsDeepDive data={data} loadingStates={loadingStates} />
              )}

              {activeTab !== 'Ringkasan' && activeTab !== 'Analitik' && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Activity className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Halaman {activeTab}</h2>
                  <p className="text-muted-foreground mt-2">Fitur ini sedang dalam pengembangan.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
