import PresentPanel from '@/components/PresentPanel';
import { Top as FuturePanelTop, Bottom as FuturePanelBottom } from '@/components/FuturePanel';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-glass-bg p-6">
      {/* Header Bar */}
      <div className="mb-6 rounded-2xl px-8 py-4 shadow-glass bg-glass-dark backdrop-blur">
        <h1 className="text-2xl font-bold text-white tracking-tight">Lamina Dashboard</h1>
      </div>
      <div className="flex gap-6">
        {/* Left panel */}
        <div className="flex-[5] flex flex-col gap-4 min-w-0">
          <PresentPanel />
        </div>
        {/* Right panels */}
        <div className="flex-[7] flex flex-col gap-6 min-w-0">
          <FuturePanelTop />
          <FuturePanelBottom />
        </div>
      </div>
    </div>
  );
} 