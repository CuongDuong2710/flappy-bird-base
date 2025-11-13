# Flappy Bird Base - Mini App 🐦

A classic Flappy Bird game built as a Farcaster Frame on Base Network. Players can play the game and mint NFTs based on their scores using their Farcaster wallet.

## 🎮 Features

- **Classic Flappy Bird Gameplay**: Tap to flap, avoid pipes, and earn points
- **Canvas-Based Rendering**: Smooth 60fps gameplay with custom graphics
- **NFT Rewards System**: Mint NFTs based on your score achievements
- **Farcaster Integration**: Seamless wallet connection via Farcaster
- **Base Network**: Fast and low-cost transactions on Coinbase's L2
- **Responsive Design**: Optimized for mobile and desktop

## 🏆 NFT Tiers

| Tier | Score Required | Emoji |
|------|---------------|-------|
| Bronze | 10+ points | 🥉 |
| Silver | 25+ points | 🥈 |
| Gold | 50+ points | 🥇 |
| Legendary | 100+ points | 💎 |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- A wallet with Base Network funds for contract deployment
- Farcaster account (for testing)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd flappy-bird-base

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env
```

### Environment Setup

Edit `.env` and configure:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_CDP_API_KEY=your_cdp_api_key
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_CHAIN_ID=8453
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=  # Add after deployment
PRIVATE_KEY=your_private_key
BASESCAN_API_KEY=your_basescan_key
```

### Smart Contract Deployment

```bash
# Compile contracts
npm run compile

# Deploy to Base Sepolia (testnet)
npm run deploy:base-sepolia

# Deploy to Base Mainnet
npm run deploy:base

# Verify contract on Basescan
npm run verify
```

Update `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` in `.env` with the deployed contract address.

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📂 Project Structure

```
flappy-bird-base/
├── contracts/              # Solidity smart contracts
│   └── FlappyBirdNFT.sol  # NFT minting contract
├── scripts/               # Deployment scripts
│   └── deploy.ts          # Contract deployment
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   │   ├── frame/     # Farcaster Frame endpoint
│   │   │   ├── images/    # Dynamic image generation
│   │   │   ├── mint-nft/  # NFT minting API
│   │   │   └── nft-image/ # NFT metadata images
│   │   ├── components/    # App-level components
│   │   ├── layout.tsx     # Root layout with metadata
│   │   ├── page.tsx       # Landing page
│   │   └── globals.css    # Global styles
│   └── components/
│       └── FlappyBirdGame.tsx  # Main game component
├── public/                # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── hardhat.config.js
└── vercel.json
```

## 🎯 Gameplay

1. Click the canvas or press SPACE to make the bird flap
2. Navigate through pipes without hitting them
3. Each pipe successfully passed earns 1 point
4. Game ends if you hit a pipe, ground, or ceiling
5. Reach score thresholds to unlock NFT minting

## 🔗 Smart Contract

The `FlappyBirdNFT` contract (ERC-721):

- Mints unique NFTs for game achievements
- 4 tier levels based on score
- Prevents duplicate session minting
- Costs 0.0001 ETH per mint
- Limits 10 NFTs per address
- Supports batch minting (owner only)

### Contract Functions

```solidity
// Mint NFT with game results
function mintFlappyBirdNFT(
  bytes32 sessionId,
  uint256 score,
  uint256 gameTime,
  uint256 jumps
) external payable

// Get tier for score
function getTierForScore(uint256 score) external pure returns (string)

// Get tier requirements
function getTierRequirements() external pure returns (uint256, uint256, uint256, uint256)
```

## 🌐 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Blockchain**: Hardhat + Ethers.js
- **Smart Contracts**: Solidity 0.8.20
- **NFT Standard**: ERC-721 (OpenZeppelin)
- **Network**: Base (Ethereum L2)
- **Farcaster**: Mini App SDK
- **Wallet**: Viem for Web3 interactions

## 📱 Farcaster Frame

The app works as a Farcaster Frame:

- Share in Warpcast casts
- Play directly in frame
- Mint NFTs with connected wallet
- Share scores with friends

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Test contract compilation
npm run compile
```

## 🔐 Security

- Game sessions verified server-side
- Contract uses ReentrancyGuard
- Score validation prevents cheating
- Private keys stored securely in `.env`
- Rate limiting on minting

## 📄 License

MIT License - see LICENSE file

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

- GitHub Issues: Report bugs
- Documentation: See DEPLOYMENT_GUIDE.md
- Base Discord: Community support

## 🎨 Credits

- Original Flappy Bird by Dong Nguyen
- Built for Base Network
- Farcaster Frame integration
- NFT artwork and game design

---

Built with ❤️ for the Base ecosystem 🐦
