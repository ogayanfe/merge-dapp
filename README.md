# Merge — Decentralized Gig Marketplace

Merge is a decentralized gig marketplace that lets clients post jobs and escrow payments on-chain while contractors complete work and claim payouts. This repository contains the smart contracts, deployment scripts, and a Next.js frontend used to demo and develop the Merge protocol.

Key features

- On-chain job creation and management (Factory + Job contracts)
- Secure escrow via `GigEscrow` with release and dispute support
- Frontend UI for creating/listing jobs, accepting work, and handling payments
- Local development scripts and a burner wallet experience for fast testing

Tech stack

- Scaffoled ETH 2
- Solidity (contracts in `packages/hardhat/contracts`)
- Hardhat for compilation, testing, and local network (`packages/hardhat`)
- Next.js + TypeScript frontend (`packages/nextjs`)
- Viem/Wagmi + RainbowKit for wallet and RPC integration

Requirements

- Node.js (recommended >= 20)
- Yarn (classic v1 or v2+)
- Git

Quickstart (local development)

1. Clone repository and install dependencies from the repo root:

```bash
git clone <repo-url>
cd merge
yarn install
```

2. Start a local chain in one terminal:

```bash
yarn chain
```

3. Deploy contracts to the local chain in a second terminal:

```bash
yarn deploy
```

4. Start the Next.js frontend in a third terminal:

```bash
yarn start
```

Open http://localhost:3000 to use the app. The Debug/Contracts page lets you interact with deployed contracts and view events.

Development notes

- Contracts: `packages/hardhat/contracts` (see `GigEscrow.sol`, `MergeFactory.sol`)
- Frontend: `packages/nextjs` (app router, pages under `app/`, components in `components/`)
- Typechain types are generated into `packages/hardhat/typechain-types`
- Useful scripts (in `packages/hardhat/scripts`): account generation and helper utilities

Testing & formatting

- Run unit tests for contracts:

```bash
yarn hardhat:test
```

- Format codebase (root command runs format for all packages):

```bash
yarn format
```

Environment & secrets

Add any RPC keys or API keys to `.env` at the repo root if you plan to connect to public testnets. Do not commit private keys.

Repository layout (high level)

- `packages/hardhat` — Solidity contracts, deployments, tests, Hardhat config
- `packages/nextjs` — Frontend app (React + Next.js), hooks, components
- `packages/hardhat/deploy` — Deployment scripts used by `yarn deploy`

Contributing

Contributions, issues, and feature requests are welcome. Please open issues or PRs. For large changes, open an issue first to discuss scope and design.

License

This project uses the repository license. See `LICENCE` at the repository root for details.

If you want additional customization (project badges, screenshots, or developer docs), tell me what to include and I'll add it.
