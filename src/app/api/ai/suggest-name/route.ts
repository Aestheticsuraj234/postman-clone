import { NextRequest, NextResponse } from 'next/server';
import { suggestRequestName } from '@/lib/ai-agents';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspaceName, method, url, description } = body;

    if (!workspaceName || !method) {
      return NextResponse.json(
        { error: 'Workspace name and method are required' },
        { status: 400 }
      );
    }

    const result = await suggestRequestName({
      workspaceName,
      method,
      url,
      description
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