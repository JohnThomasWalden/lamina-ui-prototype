// This API route serves mock brief data.
// It prefers public/mock-brief.json if available, otherwise falls back to src/data/mock-brief.json (legacy).
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import mockBrief from '@/data/mock-brief.json';

export async function GET() {
  let data = mockBrief;
  try {
    // Try to read from public/mock-brief.json as a fallback
    const publicPath = path.join(process.cwd(), 'public', 'mock-brief.json');
    const file = await fs.readFile(publicPath, 'utf-8');
    data = JSON.parse(file);
  } catch (e) {
    // If reading fails, fallback to imported mockBrief
  }
  return NextResponse.json(data);
} 