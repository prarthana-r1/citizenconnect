import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from chatbot' });
}

export async function POST(request: Request) {
  const data = await request.json();
  // Process the data or simulate a chatbot response
  return NextResponse.json({ message: `Received: ${data.userMessage}` });
}
