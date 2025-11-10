#!/bin/bash
set -e

echo "Building contract..."
cargo build --release --target wasm32-unknown-unknown

echo "Starting devnet..."
linera-devnet start &

sleep 5

echo "Publishing & deploying..."
APP_ID=$(linera publish-and-create \
  target/wasm32-unknown-unknown/release/chainmail.wasm \
  --json-parameters '{}' \
  --json-argument '{}')

echo "ChainMail deployed!"
echo "APP_ID=$APP_ID"
echo "Use in frontend/.env: VITE_APP_ID=$APP_ID"
