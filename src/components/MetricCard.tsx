"use client";

import React from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  data?: number[];
  unit?: string;
  className?: string;
}

export default function MetricCard({ label, value, data = [], unit, className }: MetricCardProps) {
  // Sparkline dimensions
  const width = 120;
  const height = 28;
  const stroke = "#37A4FF"; // brandBlue
  const fill = "none";

  // Generate sparkline points
  let points = "";
  if (data.length >= 2) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    points = data
      .map((d, i) => {
        const x = (i / (data.length - 1)) * (width - 2) + 1;
        const y = height - 2 - ((d - min) / range) * (height - 4) + 1;
        return `${x},${y}`;
      })
      .join(" ");
  }

  return (
    <div className={`bg-glass-dark rounded-xl shadow-glass border border-slate-600 p-4 flex flex-col items-start min-w-[140px] ${className || ''}`.trim()}>
      <div className="text-2xl font-bold text-white flex items-baseline gap-1">
        {value}
        {unit && <span className="text-base text-slate-400 font-normal">{unit}</span>}
      </div>
      <div className="text-xs text-slate-300 mb-1">{label}</div>
      {data.length >= 2 && (
        <svg width={width} height={height} className="block mt-1" viewBox={`0 0 ${width} ${height}`}>
          <polyline
            fill={fill}
            stroke={stroke}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            points={points}
          />
        </svg>
      )}
    </div>
  );
} 