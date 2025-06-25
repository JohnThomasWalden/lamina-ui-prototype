import { NextResponse } from 'next/server';
import mockBrief from '@/data/mock-brief.json';

export async function GET() {
  return NextResponse.json(mockBrief);
} 