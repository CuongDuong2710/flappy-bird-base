# Flappy Bird Base - Copilot Instructions

This is a classic Flappy Bird game built as a Farcaster Frame Mini App on Base Network. Players can play the game and mint NFTs based on their scores using their Farcaster wallet.

## Project Overview

- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS 4 for responsive design
- **Blockchain**: Base Network integration with Hardhat and Viem
- **Frame**: Farcaster Frame protocol implementation
- **Game**: Canvas-based Flappy Bird with physics simulation
- **NFTs**: ERC-721 tokens minted for game achievements
- **Deployment**: Optimized for Vercel deployment

## Key Features

- Canvas-based Flappy Bird gameplay
- Real-time physics and collision detection
- Dynamic score tracking and high scores
- Farcaster miniapp SDK integration
- NFT minting based on score tiers (Bronze, Silver, Gold, Legendary)
- Base Network blockchain connectivity
- Responsive UI optimized for mobile and desktop
- Farcaster Frame support for social sharing

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run compile` - Compile smart contracts
- `npm run deploy:base` - Deploy contracts to Base mainnet
- `npm run deploy:base-sepolia` - Deploy to Base Sepolia testnet

## Architecture

- `/contracts/` - Solidity smart contracts (FlappyBirdNFT)
- `/scripts/` - Hardhat deployment scripts
- `/src/app/api/` - Next.js API routes for frames, minting, images
- `/src/app/page.tsx` - Main landing page with game
- `/src/components/` - React components (FlappyBirdGame)
- `/public/` - Static assets and images

## Environment Setup

Required environment variables:
- `NEXT_PUBLIC_APP_URL` - Production URL
- `NEXT_PUBLIC_CDP_API_KEY` - Coinbase Developer Platform API key
- `NEXT_PUBLIC_BASE_RPC_URL` - Base network RPC endpoint
- `NEXT_PUBLIC_BASE_CHAIN_ID` - Base network chain ID (8453)
- `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` - Deployed NFT contract address
- `PRIVATE_KEY` - Wallet private key for deployment
- `BASESCAN_API_KEY` - Basescan API key for verification

## Game Mechanics

- Click or press SPACE to make the bird flap
- Avoid pipes and stay within screen bounds
- Each pipe passed = 1 point
- Score thresholds unlock NFT tiers:
  - Bronze: 10+ points
  - Silver: 25+ points
  - Gold: 50+ points
  - Legendary: 100+ points

## Smart Contract

The FlappyBirdNFT contract:
- ERC-721 standard for NFT minting
- Session-based minting prevents duplicates
- Tier-based rewards based on score
- Mint price: 0.0001 ETH on Base
- Max 10 NFTs per address
- Owner can batch mint and update metadata

## Deployment

The project is configured for deployment to:
- Vercel (recommended - use `vercel.json` config)
- Netlify (alternative hosting)
- Self-hosted (using Next.js standalone build)

See DEPLOYMENT_GUIDE.md for detailed deployment instructions.
