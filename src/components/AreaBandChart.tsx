"use client";

import ChartWrapper from "./ChartWrapper";

interface ForecastPoint {
  date: string;
  min: number;
  max: number;
  expected: number;
}

interface AreaBandChartProps {
  series: ForecastPoint[];
}

export default function AreaBandChart({ series }: AreaBandChartProps) {
  const maxValue = Math.max(...series.map(s => s.max));
  const minValue = Math.min(...series.map(s => s.min));
  const range = maxValue - minValue;

  const getYPosition = (value: number) => {
    return 100 - ((value - minValue) / range) * 100;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">ROAS Forecast</h3>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500/30 rounded"></div>
            <span>Range</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Expected</span>
          </div>
        </div>
      </div>
      <ChartWrapper height={192 /* h-48 */}>
        {(width) => (
          <div className="relative bg-slate-700 rounded-lg p-4" style={{ width }}>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-400">
              <span>{maxValue.toFixed(1)}x</span>
              <span>{((maxValue + minValue) / 2).toFixed(1)}x</span>
              <span>{minValue.toFixed(1)}x</span>
            </div>
            {/* Chart area */}
            <div className="ml-8 relative">
              <svg className="w-full" width={width - 64} height={192 - 32} viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#475569" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
                {/* Area band (min to max) */}
                <path
                  d={series.map((point, index) => {
                    const x = (index / (series.length - 1)) * 100;
                    const yMin = getYPosition(point.min);
                    const yMax = getYPosition(point.max);
                    return index === 0 
                      ? `M ${x} ${yMin} L ${x} ${yMax}` 
                      : `L ${x} ${yMax} L ${x} ${yMin}`;
                  }).join(' ') + ' Z'}
                  fill="rgba(59, 130, 246, 0.3)"
                  stroke="none"
                />
                {/* Expected line */}
                <path
                  d={series.map((point, index) => {
                    const x = (index / (series.length - 1)) * 100;
                    const y = getYPosition(point.expected);
                    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                  }).join(' ')}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Data points */}
                {series.map((point, index) => {
                  const x = (index / (series.length - 1)) * 100;
                  const y = getYPosition(point.expected);
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="2"
                      fill="#3b82f6"
                      stroke="#1e40af"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400 mt-2">
                {series.map((point, index) => (
                  <span key={index} className="transform -rotate-45 origin-left">
                    {formatDate(point.date)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </ChartWrapper>
    </div>
  );
} 