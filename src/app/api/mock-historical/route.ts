import { NextResponse } from 'next/server';
import mockHistorical from '@/data/mock-historical.json';

export async function GET() {
  return NextResponse.json(mockHistorical);
} 