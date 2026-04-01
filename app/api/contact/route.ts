import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Handle contact form submission
  return NextResponse.json({ message: 'Form submitted' })
}
