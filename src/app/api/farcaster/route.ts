import { NextRequest, NextResponse } from 'next/server';

// Farcaster authentication and user info endpoint
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fid, username, displayName } = body;

    // Here you would validate Farcaster authentication
    // For now, return user info
    
    return NextResponse.json({
      success: true,
      user: {
        fid,
        username,
        displayName,
      },
    });
  } catch (error: any) {
    console.error('Farcaster API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'Flappy Bird Base',
    version: '1.0.0',
    description: 'Farcaster Frame Mini App',
  });
}
