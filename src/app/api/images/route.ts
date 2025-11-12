import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const score = searchParams.get('score') || '0';

  // Generate SVG image
  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="1200" height="630" fill="url(#skyGradient)"/>
      
      <!-- Title -->
      <text x="600" y="150" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#2563EB">
        🐦 Flappy Bird Base
      </text>
      
      <!-- Score -->
      ${score !== '0' ? `
      <text x="600" y="280" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="#374151">
        Final Score: ${score}
      </text>
      ` : ''}
      
      <!-- Subtitle -->
      <text x="600" y="${score !== '0' ? '380' : '280'}" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="#6B7280">
        Play & Mint NFTs on Base Network
      </text>
      
      <!-- Call to action -->
      <text x="600" y="${score !== '0' ? '480' : '380'}" font-family="Arial, sans-serif" font-size="28" text-anchor="middle" fill="#9CA3AF">
        Tap to flap, avoid pipes, earn rewards! 🎮
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=60',
    },
  });
}
