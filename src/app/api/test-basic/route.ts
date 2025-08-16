import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Basic API endpoint working',
    environment: process.env.NODE_ENV,
    cwd: process.cwd(),
    timestamp: new Date().toISOString(),
  })
}
