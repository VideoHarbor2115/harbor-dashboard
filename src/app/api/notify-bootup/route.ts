import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    ok: true,
    message: 'Bootup notification received. Email delivery is not configured yet — coming soon.',
  });
}
