import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import mockHistorical from '@/data/mock-historical.json';

export async function GET() {
  let data = mockHistorical;
  try {
    const publicPath = path.join(process.cwd(), 'public', 'mock-brief.json');
    const file = await fs.readFile(publicPath, 'utf-8');
    const brief = JSON.parse(file);
    // Map historical_series to historicalMetrics
    const historicalMetrics = (brief.historical_series || []).map((h: any, i: number) => ({
      date: h.date,
      roas: h.roas,
      spend: 1000 + i * 100, // Dummy spend value
      conversions: 50 + i * 5 // Dummy conversions value
    }));
    data = { historicalMetrics };
  } catch (e) {
    // fallback to imported mockHistorical
  }
  return NextResponse.json(data);
} 