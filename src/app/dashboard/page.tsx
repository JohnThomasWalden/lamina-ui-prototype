import PresentPanel from '@/components/PresentPanel';
import FuturePanel from '@/components/FuturePanel';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Left panel - Present (4 cols, full height) */}
        <div className="col-span-4">
          <PresentPanel />
        </div>
        
        {/* Right side - Future (8 cols, 2 rows) */}
        <div className="col-span-8 grid grid-rows-2 gap-6">
          {/* Top-right - Future Forecasts */}
          <FuturePanel.Top />
          
          {/* Bottom-right - Past Performance */}
          <FuturePanel.Bottom />
        </div>
      </div>
    </div>
  );
} 