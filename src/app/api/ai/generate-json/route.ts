import { NextRequest, NextResponse } from 'next/server';
import { generateJsonBody, generateSmartJsonBody } from '@/lib/ai-agents';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, method, endpoint, context, existingSchema } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const result = await generateJsonBody({
      prompt,
      method,
      endpoint,
      context,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
