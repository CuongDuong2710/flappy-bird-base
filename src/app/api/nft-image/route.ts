import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tier = searchParams.get('tier') || 'bronze';

  const tierData: Record<string, { emoji: string; color: string; name: string }> = {
    bronze: { emoji: '🥉', color: '#CD7F32', name: 'Bronze' },
    silver: { emoji: '🥈', color: '#C0C0C0', name: 'Silver' },
    gold: { emoji: '🥇', color: '#FFD700', name: 'Gold' },
    legendary: { emoji: '💎', color: '#9333EA', name: 'Legendary' },
  };

  const data = tierData[tier.toLowerCase()] || tierData.bronze;

  // Generate NFT image as SVG
  const svg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${data.color};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${data.color};stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <rect width="512" height="512" fill="url(#bgGradient)"/>
      
      <!-- Border -->
      <rect x="20" y="20" width="472" height="472" fill="none" stroke="#fff" stroke-width="4" rx="24"/>
      
      <!-- Title -->
      <text x="256" y="100" font-family="Arial, sans-serif" font-size="42" font-weight="bold" text-anchor="middle" fill="#fff">
        Flappy Bird NFT
      </text>
      
      <!-- Tier Emoji -->
      <text x="256" y="280" font-family="Arial, sans-serif" font-size="120" text-anchor="middle">
        ${data.emoji}
      </text>
      
      <!-- Tier Name -->
      <text x="256" y="380" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="#fff">
        ${data.name} Tier
      </text>
      
      <!-- Footer -->
      <text x="256" y="450" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#fff" opacity="0.9">
        Base Network
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}
