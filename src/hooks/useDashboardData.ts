import { useState, useEffect } from 'react';
import api from '../api';

interface DashboardFilters {
  startDate?: string;
  endDate?: string;
}

export const useDashboardData = (filters: DashboardFilters = {}) => {
  const [data, setData] = useState<any>({
    salesTrend: [],
    topCategories: [],
    customerGeo: [],
    orderStatus: [],
    paymentMethods: [],
    reviewScores: [],
    sellerPerformance: [],
    avgDeliveryTime: [],
    revenueByCategory: [],
  });

  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    salesTrend: true,
    topCategories: true,
    customerGeo: true,
    orderStatus: true,
    paymentMethods: true,
    reviewScores: true,
    sellerPerformance: true,
    avgDeliveryTime: true,
    revenueByCategory: true,
  });

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const fetchMetric = async (key: string, endpoint: string) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [key]: true }));
      
      const params: any = {};
      if (filters.startDate) params.start_date = filters.startDate;
      if (filters.endDate) params.end_date = filters.endDate;

      const response = await api.get(endpoint, { params });
      
      setData((prev: any) => ({ ...prev, [key]: response.data }));
      setLoadingStates((prev) => ({ ...prev, [key]: false }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [key]: err.message || `Failed to fetch ${key}` }));
      setLoadingStates((prev) => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    const metrics = [
      ['salesTrend', '/sales-trend'],
      ['topCategories', '/top-categories'],
      ['customerGeo', '/customer-geo'],
      ['orderStatus', '/order-status'],
      ['paymentMethods', '/payment-methods'],
      ['reviewScores', '/review-scores'],
      ['sellerPerformance', '/seller-performance'],
      ['avgDeliveryTime', '/avg-delivery-time'],
      ['revenueByCategory', '/revenue-by-category'],
    ];

    metrics.forEach(([key, endpoint]) => fetchMetric(key, endpoint));
  }, [filters.startDate, filters.endDate]); // Re-run when dates change

  const isGlobalLoading = Object.values(loadingStates).every(v => v === true);
  const anyError = Object.values(errors).find(e => e !== null);

  return { data, loadingStates, errors, isGlobalLoading, anyError };
};
