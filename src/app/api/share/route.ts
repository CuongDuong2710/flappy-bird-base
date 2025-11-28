import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const score = searchParams.get('score') || '0';
  const tier = searchParams.get('tier') || 'Bronze';
  const emoji = searchParams.get('emoji') || '🥉';
  
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://flappy-bird-base.vercel.app';
  const imageUrl = `${appUrl}/images/og.png`;
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Flappy Bird Base - ${score} Points (${tier} Tier)</title>
  
  <!-- Open Graph -->
  <meta property="og:title" content="🎮 Scored ${score} points - ${tier} Tier ${emoji}">
  <meta property="og:description" content="Play Flappy Bird on Base Network and mint NFTs!">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:url" content="${appUrl}">
  
  <!-- Farcaster Frame -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="${imageUrl}">
  <meta property="fc:frame:image:aspect_ratio" content="1.91:1">
  <meta property="fc:frame:button:1" content="🎮 Play Now">
  <meta property="fc:frame:button:1:action" content="link">
  <meta property="fc:frame:button:1:target" content="${appUrl}">
  <meta property="fc:frame:button:1:post_url" content="${appUrl}">
  
  <!-- Redirect to mini app -->
  <meta http-equiv="refresh" content="0;url=${appUrl}">
</head>
<body>
  <h1>🎮 Flappy Bird on Base</h1>
  <p>Score: ${score} points - ${tier} Tier ${emoji}</p>
  <p>Redirecting to game...</p>
  <a href="${appUrl}">Click here if not redirected</a>
</body>
</html>
  `;
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
