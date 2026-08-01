import { NextResponse } from 'next/server';
import { getServerStatus } from '@/lib/server-status';

// Always fetch live status on request — do not bake values at build time.
export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getServerStatus();
  return NextResponse.json(data);
}
