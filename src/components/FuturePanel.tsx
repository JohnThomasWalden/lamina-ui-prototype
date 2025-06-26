"use client";

import { useState, useEffect } from 'react';
import HorizonTable from './HorizonTable';
import AreaBandChart from './AreaBandChart';
import BarChart from './BarChart';
import MetricCard from './MetricCard';

interface ForecastData {
  outlook: Array<{
    window: string;
    roas: number;
    confidence: 'high' | 'medium' | 'low';
    trend: 'up' | 'down' | 'stable';
    budget: number;
    conversions: number;
  }>;
  forecastSeries: Array<{
    date: string;
    min: number;
    max: number;
    expected: number;
  }>;
}

interface HistoricalData {
  historicalMetrics: Array<{
    date: string;
    roas: number;
    spend: number;
    conversions: number;
  }>;
}

// Top panel for Future Forecasts
export function Top() {
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadForecastData = async () => {
      try {
        const response = await fetch('/api/mock-forecast');
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error('Failed to load forecast data:', error);
        // Fallback data
        setForecastData({
          outlook: [
            { window: "10-day", roas: 1.4, confidence: "high", trend: "up", budget: 2500, conversions: 180 },
            { window: "30-day", roas: 1.6, confidence: "medium", trend: "up", budget: 7500, conversions: 520 },
            { window: "60-day", roas: 1.8, confidence: "medium", trend: "stable", budget: 15000, conversions: 1050 },
            { window: "90-day", roas: 2.1, confidence: "low", trend: "up", budget: 22500, conversions: 1580 }
          ],
          forecastSeries: [
            { date: "2024-01-01", min: 1.2, max: 1.8, expected: 1.5 },
            { date: "2024-01-02", min: 1.3, max: 1.9, expected: 1.6 },
            { date: "2024-01-03", min: 1.4, max: 2.0, expected: 1.7 },
            { date: "2024-01-04", min: 1.5, max: 2.1, expected: 1.8 },
            { date: "2024-01-05", min: 1.6, max: 2.2, expected: 1.9 },
            { date: "2024-01-06", min: 1.7, max: 2.3, expected: 2.0 },
            { date: "2024-01-07", min: 1.8, max: 2.4, expected: 2.1 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    loadForecastData();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.35)] p-4">
        <h2 className="text-xl font-semibold text-white mb-4">Future Forecasts</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded mb-2"></div>
          <div className="h-4 bg-slate-700 rounded mb-2"></div>
          <div className="h-4 bg-slate-700 rounded mb-2"></div>
          <div className="h-4 bg-slate-700 rounded"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.35)] p-4">
      <h2 className="text-xl font-semibold text-white mb-4">Future Forecasts</h2>
      <div className="bg-slate-700 rounded-lg p-4 mb-4">
        {forecastData && <HorizonTable windows={forecastData.outlook} />}
      </div>
      <div className="bg-slate-700 rounded-lg p-4">
        {forecastData && <AreaBandChart series={forecastData.forecastSeries} />}
      </div>
    </section>
  );
}

// Bottom panel for Past Performance
export function Bottom() {
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        const response = await fetch('/api/mock-historical');
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error('Failed to load historical data:', error);
        // Fallback data
        setHistoricalData({
          historicalMetrics: [
            { date: "2023-12-25", roas: 3.9, spend: 430, conversions: 68 },
            { date: "2023-12-26", roas: 3.7, spend: 415, conversions: 65 },
            { date: "2023-12-27", roas: 4.0, spend: 440, conversions: 70 },
            { date: "2023-12-28", roas: 3.8, spend: 425, conversions: 67 },
            { date: "2023-12-29", roas: 4.1, spend: 450, conversions: 72 },
            { date: "2023-12-30", roas: 3.9, spend: 435, conversions: 69 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    loadHistoricalData();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.35)] p-4">
        <h2 className="text-xl font-semibold text-white mb-4">Past Performance</h2>
        <div className="animate-pulse">
          <div className="h-32 bg-slate-700 rounded"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-800/80 backdrop-blur rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.35)] p-4">
      <h2 className="text-xl font-semibold text-white mb-4">Past Performance</h2>
      <div className="bg-slate-700 rounded-lg p-4">
        {historicalData && (
          <div className="w-full flex flex-row justify-between">
            <MetricCard
              label="ROAS"
              value={`${historicalData.historicalMetrics[historicalData.historicalMetrics.length - 1].roas.toFixed(1)}x`}
              data={historicalData.historicalMetrics.map(d => d.roas)}
              className="flex-1 mx-2"
            />
            <MetricCard
              label="Spend"
              value={`$${historicalData.historicalMetrics[historicalData.historicalMetrics.length - 1].spend.toLocaleString()}`}
              data={historicalData.historicalMetrics.map(d => d.spend)}
              className="flex-1 mx-2"
            />
            <MetricCard
              label="Conversions"
              value={historicalData.historicalMetrics[historicalData.historicalMetrics.length - 1].conversions}
              data={historicalData.historicalMetrics.map(d => d.conversions)}
              className="flex-1 mx-2"
            />
          </div>
        )}
        {/* {historicalData && <BarChart data={historicalData.historicalMetrics} />} */}
      </div>
    </section>
  );
} 