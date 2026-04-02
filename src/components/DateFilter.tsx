import { Calendar as CalendarIcon, X } from 'lucide-react';

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
  onReset: () => void;
}

export const DateFilter = ({ startDate, endDate, onDateChange, onReset }: DateFilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 glass-card rounded-2xl border-white/5 shadow-2xl">
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-primary" />
        <span className="text-sm font-semibold text-muted-foreground mr-2">Filter Periode:</span>
      </div>

      <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/10 group focus-within:border-primary/50 transition-all">
        <div className="flex flex-col px-3 py-1">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Mulai</label>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => onDateChange(e.target.value, endDate)}
            className="bg-transparent border-none outline-none text-sm font-medium text-white w-32 [color-scheme:dark]"
          />
        </div>
        
        <div className="w-px h-8 bg-white/10" />

        <div className="flex flex-col px-3 py-1">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Selesai</label>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => onDateChange(startDate, e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-medium text-white w-32 [color-scheme:dark]"
          />
        </div>
      </div>

      <button 
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-muted-foreground hover:text-white transition-all"
      >
        <X className="w-4 h-4" />
        Atur Ulang
      </button>

      <div className="hidden lg:flex items-center ml-auto gap-2 text-[11px] text-muted-foreground bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Menampilkan data historis Olist
      </div>
    </div>
  );
};
