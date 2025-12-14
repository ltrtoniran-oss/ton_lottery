# TON Lottery Smart Contract 🎰

A decentralized lottery smart contract written in **Tact** for the TON Blockchain. This contract allows users to buy tickets with TON, tracks participants, and randomly selects 3 unique winners to distribute the prize pool.

## Features

- **Ticket Purchase**: Users can buy tickets (price: 1 TON).
- **Weekly Draws**: The lottery runs on a 1-week interval (configurable).
- **Unique Winners**: The draw logic attempts to select 3 _different_ winners for 1st, 2nd, and 3rd place.
- **Prize Distribution**:
  - 1st Place: 50% of the pot
  - 2nd Place: 25% of the pot
  - 3rd Place: 15% of the pot
  - Reserve/Fee: 10% (kept in contract for storage/gas)
- **Owner Control**: Only the owner can trigger the draw manually if needed (though it's time-based).
- **Transparency**: Recent winners are stored on-chain and can be queried via `lastWinners`.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- A TON Wallet (Mnemonic phrase) with some TON for gas.

## Installation

1.  Navigate to the project directory:
    ```bash
    cd contracts
    ```
2.  Install dependencies (if not installed in root):
    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the project root (or `contracts/` if running independently) with your wallet mnemonic:

```env
TON_MNEMONIC="word1 word2 ... word24"
```

## Compilation

To compile the Tact contract to FunC/BOC:

```bash
npx tact --config tact.config.json
```

## Testing

Run the test suite (using Sandbox) to verify logic:

```bash
npm run test
# or
npx jest
```

## Deployment

### Testnet

1.  Ensure your `.env` wallet has Testnet TON (use @testgiver_ton_bot).
2.  Run the deploy script:
    ```bash
    npx tsx scripts/deploy.ts
    ```

### Mainnet

1.  Ensure your `.env` wallet has Real TON (~0.5 TON is usually enough for deployment).
2.  Edit `scripts/deploy.ts`:
    Change `network: 'testnet'` to `network: 'mainnet'`.
3.  Run the deploy script:
    ```bash
    npx tsx scripts/deploy.ts
    ```

## Contract Logic (`lottery.tact`)

The main logic resides in `src/lottery.tact`.

- `receive("buy")`: Accepts payments and records the sender.
- `receive("draw")`: Checks if time is up, selects winners using random seeds, and sends payouts.
- `get fun lastWinners()`: Returns the addresses of the last 3 winners.

## Security Notes

- The contract uses a basic `random` implementation. For high-stakes lotteries, verifiable randomness (VRF) or commit-reveal schemes are recommended.
- `force_draw` has been removed for Mainnet safety; draws are strictly time-enforced or triggered by `receive("draw")` which checks the time.

## License

MIT
