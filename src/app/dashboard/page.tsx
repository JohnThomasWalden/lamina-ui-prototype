import PresentPanel from '@/components/PresentPanel';
import { Top as FuturePanelTop, Bottom as FuturePanelBottom } from '@/components/FuturePanel';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header Bar */}
      <div className="mb-6 rounded-2xl px-8 py-4 shadow-lg bg-gradient-to-r from-emerald-700/40 to-slate-900/40">
        <h1 className="text-2xl font-bold text-white tracking-tight">Lamina Dashboard</h1>
      </div>
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Left panel - Present (4 cols, full height) */}
        <div className="col-span-4">
          <PresentPanel />
        </div>
        
        {/* Right side - Future (8 cols, 2 rows) */}
        <div className="col-span-8 grid grid-rows-2 gap-6">
          {/* Top-right - Future Forecasts */}
          <FuturePanelTop />
          
          {/* Bottom-right - Past Performance */}
          <FuturePanelBottom />
        </div>
      </div>
    </div>
  );
} 