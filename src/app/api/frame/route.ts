import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { score } = body;

    // Return Frame HTML
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://flappy-bird-base.vercel.app';
    
    const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/api/images?score=${score || 0}" />
    <meta property="fc:frame:button:1" content="🎮 Play Again" />
    <meta property="fc:frame:button:2" content="🏆 View Leaderboard" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
  </head>
  <body>
    <h1>Flappy Bird Base</h1>
  </body>
</html>
    `;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Frame error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://flappy-bird-base.vercel.app';
  
  const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${baseUrl}/api/images" />
    <meta property="fc:frame:button:1" content="🐦 Play Flappy Bird" />
    <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
  </head>
  <body>
    <h1>Flappy Bird Base</h1>
  </body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
