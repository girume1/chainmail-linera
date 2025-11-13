#!/usr/bin/env bash
set -e

echo "Starting Linera Testnet Conway..."
linera net up --with-faucet --network conway

export LINERA_FAUCET_URL=http://localhost:8080
linera wallet init --faucet="$LINERA_FAUCET_URL"
linera wallet request-chain --faucet="$LINERA_FAUCET_URL"

echo "Building WASM contract..."
cd contract
cargo build --release --target wasm32-unknown-unknown
cd ..

echo "Publishing to Testnet Conway..."
APP_ID=$(linera publish-and-create \
  target/wasm32-unknown-unknown/release/chainmail.wasm \
  --json-parameters '{}' \
  --json-argument '{}')

echo "APP_ID=$APP_ID"
echo "VITE_APP_ID=$APP_ID" > ../frontend/.env

echo "Starting frontend..."
cd ../frontend
pnpm install
pnpm run dev --host 0.0.0.0 --port 5173