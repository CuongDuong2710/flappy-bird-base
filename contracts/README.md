# Flappy Bird Base NFT Contract

Smart contract for minting achievement NFTs in the Flappy Bird Base game.

## Contract Details

- **Standard**: ERC-721 (NFT)
- **Network**: Base (Ethereum L2)
- **Compiler**: Solidity 0.8.20
- **Dependencies**: OpenZeppelin Contracts v5.4.0

## Features

- ✅ ERC-721 compliant NFT minting
- ✅ 4-tier reward system based on score
- ✅ Session-based minting (prevents duplicates)
- ✅ Per-address minting limits (10 max)
- ✅ Configurable mint price (default 0.0001 ETH)
- ✅ Owner-controlled metadata URIs
- ✅ Batch minting for events
- ✅ Reentrancy protection
- ✅ Withdrawal function for contract balance

## NFT Tiers

| Tier | Minimum Score | Token URI |
|------|--------------|-----------|
| Bronze | 10 | bronzeURI |
| Silver | 25 | silverURI |
| Gold | 50 | goldURI |
| Legendary | 100 | legendaryURI |

## Functions

### Public Functions

#### `mintFlappyBirdNFT(bytes32 sessionId, uint256 score, uint256 gameTime, uint256 jumps)`
Mint an NFT based on game performance.

**Parameters:**
- `sessionId`: Unique identifier for the game session
- `score`: Final score (number of pipes passed)
- `gameTime`: Time survived in seconds
- `jumps`: Total number of jumps made

**Requirements:**
- Score must be ≥ 10
- Session must not have been used before
- Sender must have < 10 minted NFTs
- Must include mint fee (0.0001 ETH)

#### `getTierForScore(uint256 score)`
Get the tier name for a given score.

**Returns:** String ("Bronze", "Silver", "Gold", "Legendary", or "Ineligible")

#### `getTierRequirements()`
Get score thresholds for all tiers.

**Returns:** (bronze, silver, gold, legendary) thresholds

### Owner Functions

#### `batchMint(address[] recipients, string[] tiers)`
Mint multiple NFTs to different addresses (owner only).

#### `updateMetadataURI(string tier, string newURI)`
Update the metadata URI for a specific tier.

#### `updateMintPrice(uint256 newPrice)`
Change the minting fee.

#### `withdraw()`
Withdraw accumulated ETH from contract to owner.

## Deployment

```bash
# Compile
npm run compile

# Deploy to Base Sepolia
npm run deploy:base-sepolia

# Deploy to Base Mainnet
npm run deploy:base

# Verify on Basescan
npm run verify
```

## Security

- Uses OpenZeppelin's audited contracts
- ReentrancyGuard prevents reentrancy attacks
- Ownable ensures only owner can modify settings
- Session validation prevents duplicate minting
- Per-address limits prevent spam

## Events

- `BirdMinted(address player, uint256 tokenId, string tier, uint256 score)`
- `GameSessionVerified(bytes32 sessionId, address player, uint256 score)`
- `MetadataUpdated(string tier, string newURI)`
- `MintPriceUpdated(uint256 newPrice)`

## License

MIT
