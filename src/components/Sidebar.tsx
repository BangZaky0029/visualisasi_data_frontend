import { LayoutDashboard, BarChart3, Users, Settings, Package, ShoppingCart } from 'lucide-react';

export type TabId = 'Ringkasan' | 'Analitik' | 'Pesanan' | 'Produk' | 'Pelanggan' | 'Pengaturan';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const menuItems: { icon: any; label: TabId }[] = [
  { icon: LayoutDashboard, label: 'Ringkasan' },
  { icon: BarChart3, label: 'Analitik' },
  { icon: ShoppingCart, label: 'Pesanan' },
  { icon: Package, label: 'Produk' },
  { icon: Users, label: 'Pelanggan' },
  { icon: Settings, label: 'Pengaturan' },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="w-64 h-screen glass-card rounded-none border-y-0 border-l-0 flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <BarChart3 className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-xl tracking-tight">Olist Analitik</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onTabChange(item.label)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.label
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-muted-foreground hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
          <div>
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-muted-foreground">Akun Premium</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
