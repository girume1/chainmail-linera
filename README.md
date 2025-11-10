# ChainMail — E2EE DMs on Linera

**Private, gasless, end-to-end encrypted messaging on Linera microchains.**

[![Buildathon Wave 2+](https://img.shields.io/badge/Buildathon-Wave%202%2B-success)](https://linera.io/buildathon)

## Live Demo (Testnet Conway)
[https://chainmail-linera.vercel.app](https://chainmail-linera.vercel.app)

> Register `@alice` → send to `@bob` → only Bob can decrypt.

## Features
- E2EE with per-user public keys
- On-chain username registry
- Private inbox per microchain
- Real-time polling
- No backend. No gas per message.

## Buildathon Compliance
- Uses official template
- Compiles & runs
- Functional Linera contract
- Live on **Testnet Conway**
- `VERIFY.md` included

## Quick Start
```bash
git clone https://github.com/girume1/chainmail-linera.git
cd chainmail-linera
curl -sSL https://install.linera.io | sh
linera-devnet start &
./scripts/deploy.sh
