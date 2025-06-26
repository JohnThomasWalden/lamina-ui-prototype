"use client";
import React, { useRef, useState, useEffect } from "react";

interface ChartWrapperProps {
  children: (width: number) => React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  height?: number | string;
}

export default function ChartWrapper({ children, minWidth = 200, maxWidth = 1200, height = 320 }: ChartWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(minWidth);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          setWidth(Math.max(minWidth, Math.min(maxWidth, entry.contentRect.width)));
        }
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [minWidth, maxWidth]);

  return (
    <div ref={ref} style={{ width: "100%", height }}>
      {children(width)}
    </div>
  );
} 