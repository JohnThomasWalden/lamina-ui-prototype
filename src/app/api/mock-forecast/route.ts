import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import mockForecast from '@/data/mock-forecast.json';

export async function GET() {
  let data = mockForecast;
  try {
    const publicPath = path.join(process.cwd(), 'public', 'mock-brief.json');
    const file = await fs.readFile(publicPath, 'utf-8');
    const brief = JSON.parse(file);
    // Map outlook_windows to outlook
    const outlook = (brief.outlook_windows || []).map((w: Record<string, unknown>) => ({
      window: `${w.horizon}-day`,
      roas: Number(w.roas_delta),
      confidence: Number(w.confidence) >= 80
        ? 'high'
        : Number(w.confidence) >= 65
          ? 'medium'
          : 'low',
      trend: Number(w.roas_delta) > 0
        ? 'up'
        : Number(w.roas_delta) < 0
          ? 'down'
          : 'stable',
      budget: 0, // Placeholder, as not present in brief
      conversions: 0 // Placeholder
    }));
    // Map forecast_insights to forecastSeries
    const forecastSeries = (brief.forecast_insights || []).map((f: Record<string, unknown>, i: number) => ({
      date: `2025-06-${String(10 + i).padStart(2, '0')}`,
      min: f.p10,
      max: f.p90,
      expected: f.p50
    }));
    data = { outlook, forecastSeries };
  } catch {
    // fallback to imported mockForecast
  }
  return NextResponse.json(data);
} 