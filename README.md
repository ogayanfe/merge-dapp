# Merge — Decentralized Gig Marketplace

<br/>
<div align="center">
  <img src="demo/social.png" alt="Merge Protocol" width="100%" />
</div>

<br/>

## About

Welcome to the **Merge Protocol**! Merge is a decentralized gig marketplace that lets clients post jobs and escrow payments on-chain, while freelancers and contractors can securely complete work and claim payouts.

By running on-chain, Merge eliminates the need for trusted third parties, heavily reduces fees compared to traditional platforms, and provides a transparent, secure environment for both clients and freelancers.

### 🎥 [Watch the Video Demo](https://www.youtube.com/watch?v=YNMicX9gEmk)

### 🌐 [Try the Live Demo](https://mergeprotocol.netlify.app/)

## Key Features

- **On-Chain Job Management:** Create, manage, and browse gig listings seamlessly through the Factory and Job smart contracts.
- **Secure Escrow Payments:** Funds are locked in the `GigEscrow` smart contract. Payments are trustlessly released upon job completion.
- **Built-in Dispute Resolution:** Dispute support allows for fair resolution if a disagreement occurs between client and freelancer.
- **Intuitive User Interface:** A modern Next.js frontend UI for creating jobs, accepting work, handling communications, and tracking payments.
- **Developer-Friendly:** Local development scripts and a burner wallet experience allow for rapid testing and iteration.

---

## Tech Stack

- **Framework:** [Scaffold-ETH 2](https://scaffoldeth.io/)
- **Smart Contracts:** Solidity (contracts located in `packages/hardhat/contracts`)
- **Blockchain Environment:** Hardhat for local compilation, testing, and network interaction (`packages/hardhat`)
- **Frontend:** Next.js + TypeScript (`packages/nextjs`)
- **Web3 Integration:** Viem / Wagmi + RainbowKit for wallet connection and RPC integration

## Requirements

- Node.js (recommended >= 20)
- Yarn (classic v1 or v2+)
- Git

## Quickstart (Local Development)

1. **Clone the repository and install dependencies:**

   ```bash
   git clone <repo-url>
   cd merge
   yarn install
   ```

2. **Start a local local blockchain:**

   In your first terminal window, run:

   ```bash
   yarn chain
   ```

3. **Deploy the smart contracts:**

   In a second terminal window, run:

   ```bash
   yarn deploy
   ```

4. **Start the Next.js frontend:**

   In a third terminal window, run:

   ```bash
   yarn start
   ```

Open [http://localhost:3000](http://localhost:3000) to use the app locally. The Debug/Contracts page lets you interact with deployed contracts and view events.

## Development Notes

- **Contracts:** Found in `packages/hardhat/contracts` (check out `GigEscrow.sol` and `MergeFactory.sol`).
- **Frontend:** Found in `packages/nextjs` (App router pages are under `app/`, and components in `components/`).
- **Types:** Typechain types automatically generate into `packages/hardhat/typechain-types`.
- **Scripts:** Useful deployment and utility scripts are in `packages/hardhat/scripts`.

## Testing & Formatting

- **Run unit tests for contracts:**

  ```bash
  yarn hardhat:test
  ```

- **Format the codebase (runs across all packages):**
  ```bash
  yarn format
  ```

## Environment & Secrets

Add any necessary RPC or API keys to the `.env` file at the repository root if you plan to connect to public testnets. **Never commit your private keys!**

## Architecture

- `packages/hardhat`: Solidity smart contracts, deployments, tests, and Hardhat configuration.
- `packages/nextjs`: React + Next.js frontend application with hooks and UI components.
- `packages/hardhat/deploy`: Custom deployment scripts used by the `yarn deploy` command.

## Contributing

We welcome contributions, issues, and feature requests! Please open an issue or pull request. For significant changes or new features, please open an issue first to discuss your ideas and the intended design.

## License

This project uses the repository license. See the `LICENCE` file at the repository root for more details.
