"use client";

interface OutlookItem {
  window: string;
  roas: number;
  confidence: 'high' | 'medium' | 'low';
  trend: 'up' | 'down' | 'stable';
  budget: number;
  conversions: number;
}

interface HorizonTableProps {
  windows: OutlookItem[];
}

export default function HorizonTable({ windows }: HorizonTableProps) {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-600">
            <th className="text-left py-2 px-2 text-slate-300 font-medium">Window</th>
            <th className="text-left py-2 px-2 text-slate-300 font-medium">ROAS</th>
            <th className="text-left py-2 px-2 text-slate-300 font-medium">Confidence</th>
            <th className="text-left py-2 px-2 text-slate-300 font-medium">Budget</th>
            <th className="text-left py-2 px-2 text-slate-300 font-medium">Conversions</th>
          </tr>
        </thead>
        <tbody>
          {windows.map((item, index) => (
            <tr key={index} className="border-b border-slate-700 hover:bg-slate-600/50">
              <td className="py-2 px-2 text-slate-200">
                <div className="flex items-center gap-2">
                  <span>{item.window}</span>
                  <span className="text-lg">{getTrendIcon(item.trend)}</span>
                </div>
              </td>
              <td className="py-2 px-2 text-slate-200 font-medium">
                {item.roas.toFixed(1)}x
              </td>
              <td className="py-2 px-2">
                <span className={`inline-block w-3 h-3 rounded-full ${getConfidenceColor(item.confidence)} mr-2`}></span>
                <span className="text-slate-200 capitalize">{item.confidence}</span>
              </td>
              <td className="py-2 px-2 text-slate-200">
                {formatCurrency(item.budget)}
              </td>
              <td className="py-2 px-2 text-slate-200">
                {item.conversions.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 