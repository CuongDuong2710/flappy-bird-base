# Flappy Bird Base - Deployment Guide 🚀

Complete step-by-step guide for deploying Flappy Bird Base to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Smart Contract Deployment](#smart-contract-deployment)
4. [Application Deployment](#application-deployment)
5. [Farcaster Frame Setup](#farcaster-frame-setup)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Accounts & Tools

- ✅ Node.js 18+ and npm installed
- ✅ Git installed
- ✅ Vercel account (or Netlify)
- ✅ Base network wallet with ETH for gas
- ✅ Coinbase Developer Platform account
- ✅ Basescan API key (for contract verification)
- ✅ Farcaster account (optional, for testing)

### Estimated Costs

- Contract deployment: ~$5-10 USD in ETH on Base
- Vercel hosting: Free tier available
- Domain (optional): $10-15/year

## Environment Setup

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd flappy-bird-base
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# Application URL (update after Vercel deployment)
NEXT_PUBLIC_APP_URL=https://flappy-bird-base.vercel.app

# Get from https://portal.cdp.coinbase.com
NEXT_PUBLIC_CDP_API_KEY=your_cdp_api_key_here

# Base Network
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_CHAIN_ID=8453

# Contract address (fill after deployment)
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=

# Deployment keys (KEEP SECURE!)
PRIVATE_KEY=your_wallet_private_key
BASESCAN_API_KEY=your_basescan_api_key
```

### 3. Get Required API Keys

#### Coinbase Developer Platform API Key

1. Go to https://portal.cdp.coinbase.com
2. Create new project
3. Generate API key
4. Copy to `NEXT_PUBLIC_CDP_API_KEY`

#### Basescan API Key

1. Go to https://basescan.org
2. Sign up / Log in
3. Navigate to API Keys
4. Create new API key
5. Copy to `BASESCAN_API_KEY`

#### Wallet Private Key

⚠️ **SECURITY WARNING**: Never commit your private key to Git!

```bash
# Export from MetaMask or your wallet
# Add to .env file
PRIVATE_KEY=0x...
```

## Smart Contract Deployment

### 1. Compile Contract

```bash
npm run compile
```

Verify compilation succeeds without errors.

### 2. Test Deployment (Base Sepolia Testnet)

```bash
# Get testnet ETH from https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
npm run deploy:base-sepolia
```

Save the contract address output.

### 3. Production Deployment (Base Mainnet)

```bash
# Ensure your wallet has ~$10 worth of ETH on Base
npm run deploy:base
```

**Save the contract address!** Example output:

```
✅ FlappyBirdNFT deployed to: 0x1234567890abcdef...
```

### 4. Verify Contract on Basescan

```bash
# Replace with your deployed address
npx hardhat verify --network base YOUR_CONTRACT_ADDRESS YOUR_DEPLOYER_ADDRESS
```

Or use the shorthand:

```bash
npm run verify
```

### 5. Update Environment

Add contract address to `.env`:

```env
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x1234567890abcdef...
```

## Application Deployment

### Option 1: Vercel (Recommended)

#### A. Via Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import from GitHub
4. Select `flappy-bird-base` repository

#### B. Configure Build Settings

- **Framework**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install --legacy-peer-deps`

#### C. Add Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_APP_URL=https://flappy-bird-base.vercel.app
NEXT_PUBLIC_CDP_API_KEY=your_cdp_api_key
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_CHAIN_ID=8453
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x...
```

⚠️ **DO NOT** add `PRIVATE_KEY` or `BASESCAN_API_KEY` to Vercel (only needed for local deployment)

#### D. Deploy

Click "Deploy" - Vercel will:
1. Install dependencies
2. Build Next.js app
3. Deploy to production
4. Provide URL

#### E. Update Environment with Production URL

Go back to Vercel Environment Variables and update:

```
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

Redeploy for changes to take effect.

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

Configure environment variables in Netlify dashboard.

### Option 3: Self-Hosted

```bash
# Build production bundle
npm run build

# Start server (use PM2 for production)
npm install -g pm2
pm2 start npm --name "flappy-bird" -- start
```

## Farcaster Frame Setup

### 1. Test Frame Locally

Use Frame Validator: https://warpcast.com/~/developers/frames

Enter your URL: `https://your-app.vercel.app`

### 2. Share in Warpcast

Create a cast with your app URL:

```
🐦 Check out Flappy Bird Base! 

Play the classic game and mint NFTs on @base 🎮

https://your-app.vercel.app
```

The frame will automatically render.

### 3. Verify Frame Metadata

Check that these meta tags are present (view page source):

```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="..." />
<meta property="fc:frame:button:1" content="🐦 Play Flappy Bird" />
```

## Testing

### Functional Testing Checklist

- [ ] Game loads without errors
- [ ] Bird flaps on click/spacebar
- [ ] Pipes generate and move
- [ ] Collision detection works
- [ ] Score increments correctly
- [ ] Game over triggers properly
- [ ] Restart works
- [ ] NFT mint modal appears at score 10+
- [ ] Farcaster SDK initializes
- [ ] API routes respond correctly

### Performance Testing

```bash
# Build and analyze
npm run build

# Check bundle size
# Next.js will output bundle analysis
```

### Smart Contract Testing

Test minting on testnet first:

1. Play game to score 10+
2. Click "Mint NFT"
3. Approve transaction in wallet
4. Verify NFT appears in wallet
5. Check on Basescan

## Troubleshooting

### Build Errors

**Error**: `Cannot find module 'next'`

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Error**: TypeScript errors

```bash
npx tsc --noEmit
# Fix reported errors
```

### Contract Deployment Errors

**Error**: Insufficient funds

```bash
# Get more ETH on Base
# Transfer from L1 using bridge.base.org
```

**Error**: Contract verification failed

```bash
# Ensure Basescan API key is correct
# Wait 30 seconds after deployment
# Try verification again
```

### Runtime Errors

**Error**: `Cannot read property 'fid' of undefined`

- Farcaster SDK not initialized
- Test outside of Farcaster frame context
- Fallback to guest mode should activate

**Error**: NFT minting fails

- Check contract address is correct
- Verify wallet has funds
- Check Base RPC URL is working
- Ensure score meets minimum (10+)

### Vercel Deployment Issues

**Error**: Build timeout

```json
// vercel.json
{
  "builds": [{
    "src": "package.json",
    "use": "@vercel/next",
    "config": { "maxDuration": 60 }
  }]
}
```

**Error**: Environment variables not working

- Redeploy after adding env vars
- Check variable names match exactly
- Ensure `NEXT_PUBLIC_` prefix for client-side vars

## Post-Deployment

### 1. Monitor Application

- Vercel Analytics: Traffic and performance
- Basescan: Contract interactions
- Error tracking: Set up Sentry or similar

### 2. Update Contract Metadata

Create and host NFT metadata JSON files:

```json
{
  "name": "Flappy Bird Bronze",
  "description": "Bronze tier achievement in Flappy Bird Base",
  "image": "https://your-app.vercel.app/api/nft-image?tier=bronze",
  "attributes": [
    { "trait_type": "Tier", "value": "Bronze" },
    { "trait_type": "Network", "value": "Base" }
  ]
}
```

Update contract URIs if needed:

```bash
# Call updateMetadataURI function on contract
```

### 3. Marketing & Community

- Share on Farcaster
- Post in Base Discord
- Tweet about launch
- Create demo video

## Maintenance

### Regular Tasks

- Monitor contract balance (from minting fees)
- Check for errors in Vercel logs
- Update dependencies monthly
- Test game functionality weekly

### Withdrawing Funds

Contract owner can withdraw accumulated ETH:

```solidity
// Call withdraw() function from owner address
// Sends all contract balance to owner
```

## Security Checklist

- [ ] Private keys never committed to Git
- [ ] `.env` in `.gitignore`
- [ ] Contract verified on Basescan
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation on all APIs
- [ ] Regular security audits

## Support & Resources

- **Base Docs**: https://docs.base.org
- **Farcaster Frames**: https://docs.farcaster.xyz/developers/frames
- **Vercel Docs**: https://vercel.com/docs
- **OpenZeppelin**: https://docs.openzeppelin.com
- **Hardhat**: https://hardhat.org/docs

---

**Deployment Complete!** 🎉

Your Flappy Bird game is now live on Base Network!

Share your deployment: `https://your-app.vercel.app`
