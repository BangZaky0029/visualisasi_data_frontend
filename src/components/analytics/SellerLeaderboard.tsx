import { Award, TrendingUp, ShoppingBag } from 'lucide-react';

interface SellerLeaderboardProps {
  data: any[];
  loading: boolean;
}

export const SellerLeaderboard = ({ data, loading }: SellerLeaderboardProps) => {
  const truncateId = (id: string) => `${id.substring(0, 8)}...`;

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Award className="text-primary w-5 h-5" />
        <h3 className="text-xl font-bold">10 Penjual Teratas</h3>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col gap-4 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 bg-white/5 rounded-xl w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-white/5">
                  <th className="pb-3 font-medium">PERINGKAT</th>
                  <th className="pb-3 font-medium">ID PENJUAL</th>
                  <th className="pb-3 font-medium text-right">PESANAN</th>
                  <th className="pb-3 font-medium text-right">PENDAPATAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.map((seller, index) => (
                  <tr key={seller.seller_id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 font-mono text-xs text-muted-foreground group-hover:text-white">
                      {truncateId(seller.seller_id)}
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1 font-semibold">
                        <ShoppingBag className="w-3 h-3 text-muted-foreground" />
                        {seller.total_orders.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1 font-bold text-emerald-400">
                        <TrendingUp className="w-3 h-3" />
                        ${(seller.total_revenue / 1000).toFixed(1)}k
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
