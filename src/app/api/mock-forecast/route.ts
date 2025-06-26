import { NextResponse } from 'next/server';
import mockForecast from '@/data/mock-forecast.json';

export async function GET() {
  return NextResponse.json(mockForecast);
} 