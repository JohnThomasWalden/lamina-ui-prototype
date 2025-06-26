"use client";

import ChartWrapper from "./ChartWrapper";

interface RadialBarChartProps {
  startAngle: number;
  endAngle: number;
  value?: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  // Convert angles to radians
  const start = (Math.PI / 180) * startAngle;
  const end = (Math.PI / 180) * endAngle;
  // Start point
  const x1 = cx + r * Math.cos(start);
  const y1 = cy + r * Math.sin(start);
  // End point
  const x2 = cx + r * Math.cos(end);
  const y2 = cy + r * Math.sin(end);
  // Large arc flag
  const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  return [
    `M ${x1} ${y1}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`
  ].join(' ');
}

export default function RadialBarChart({
  startAngle = 180,
  endAngle = 0,
  value = 0,
  maxValue = 100,
  size = 200,
  strokeWidth = 18,
  children
}: RadialBarChartProps) {
  // Responsive: size will be set by ChartWrapper
  return (
    <ChartWrapper minWidth={120} maxWidth={400} height={size}>
      {(width) => {
        const radius = (width - strokeWidth) / 2;
        const center = width / 2;
        // Arc paths
        const backgroundArcPath = describeArc(center, center, radius, startAngle, endAngle);
        const progress = Math.min(Math.max(value / maxValue, 0), 1);
        const progressAngle = startAngle + (endAngle - startAngle) * progress;
        const progressArcPath = describeArc(center, center, radius, startAngle, progressAngle);
        // Color
        const getColor = (progress: number) => {
          if (progress < 0.3) return '#ef4444'; // red
          if (progress < 0.7) return '#f59e0b'; // yellow
          return '#10b981'; // green
        };
        return (
          <div className="relative inline-block" style={{ width, height: width }}>
            <svg width={width} height={width} className="transform -rotate-90">
              {/* Background arc (very light) */}
              <path
                d={backgroundArcPath}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                opacity="0.25"
              />
              {/* Progress arc (vibrant, thick, rounded) */}
              <path
                d={progressArcPath}
                fill="none"
                stroke={getColor(progress)}
                strokeWidth={strokeWidth + 2}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
                filter="drop-shadow(0 2px 8px rgba(16,185,129,0.25))"
              />
            </svg>
            {/* Content overlay */}
            {children && (
              <div className="absolute inset-0 flex items-center justify-center">
                {children}
              </div>
            )}
          </div>
        );
      }}
    </ChartWrapper>
  );
} 