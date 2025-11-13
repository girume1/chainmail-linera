#!/bin/bash
set -e

echo "Installing Linera CLI..."
curl -sSL https://install.linera.io | sh
source ~/.bashrc

echo "Switching to Testnet Conway..."
linera wallet set-default-network conway

echo "Building contract..."
cd contract
cargo build --release --target wasm32-unknown-unknown
cd ..

echo "Deploying to Testnet Conway..."
APP_ID=$(linera publish-and-create \
  target/wasm32-unknown-unknown/release/chainmail.wasm \
  --json-parameters '{}' \
  --json-argument '{}')

echo "APP_ID=$APP_ID"
echo "VITE_APP_ID=$APP_ID" > ../frontend/.env

echo "ChainMail deployed to Testnet!"
echo "Open: https://chainmail-linera.vercel.app"