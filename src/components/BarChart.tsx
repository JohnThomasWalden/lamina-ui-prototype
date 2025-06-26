"use client";

interface HistoricalPoint {
  date: string;
  roas: number;
  spend: number;
  conversions: number;
}

interface BarChartProps {
  data: HistoricalPoint[];
}

export default function BarChart({ data }: BarChartProps) {
  const maxROAS = Math.max(...data.map(d => d.roas));
  const maxSpend = Math.max(...data.map(d => d.spend));
  const maxConversions = Math.max(...data.map(d => d.conversions));

  const getBarHeight = (value: number, maxValue: number) => {
    return (value / maxValue) * 100;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Sample every 7th data point to avoid overcrowding
  const sampledData = data.filter((_, index) => index % 7 === 0);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Historical Performance</h3>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>ROAS</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Spend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Conversions</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-48 bg-slate-700 rounded-lg p-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-400">
          <span>{maxROAS.toFixed(1)}x</span>
          <span>{(maxROAS / 2).toFixed(1)}x</span>
          <span>0x</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-8 h-full relative">
          <div className="flex items-end justify-between h-full gap-1">
            {sampledData.map((point, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                {/* ROAS bar */}
                <div 
                  className="w-full bg-green-500 rounded-t"
                  style={{ 
                    height: `${getBarHeight(point.roas, maxROAS)}%`,
                    minHeight: '2px'
                  }}
                ></div>
                
                {/* Spend bar */}
                <div 
                  className="w-full bg-blue-500"
                  style={{ 
                    height: `${getBarHeight(point.spend / 10, maxSpend / 10)}%`,
                    minHeight: '2px'
                  }}
                ></div>
                
                {/* Conversions bar */}
                <div 
                  className="w-full bg-purple-500 rounded-b"
                  style={{ 
                    height: `${getBarHeight(point.conversions * 2, maxConversions * 2)}%`,
                    minHeight: '2px'
                  }}
                ></div>
                
                {/* X-axis label */}
                <div className="text-xs text-slate-400 mt-2 transform -rotate-45 origin-left">
                  {formatDate(point.date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">
            {data[data.length - 1]?.roas.toFixed(1)}x
          </div>
          <div className="text-xs text-slate-400">Current ROAS</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">
            ${data[data.length - 1]?.spend.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Daily Spend</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-500">
            {data[data.length - 1]?.conversions}
          </div>
          <div className="text-xs text-slate-400">Conversions</div>
        </div>
      </div>
    </div>
  );
} 