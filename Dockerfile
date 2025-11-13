# USE FULL DEBIAN BASE (slim has broken glibc)
FROM rust:1.86

SHELL ["bash", "-c"]

# Install system deps
RUN apt-get update && apt-get install -y \
    pkg-config \
    protobuf-compiler \
    clang \
    make \
    curl \
    git \
    build-essential \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Linera CLI (with full deps)
RUN cargo install --locked linera-service@0.15.5 linera-storage-service@0.15.5

# Install Node.js + pnpm
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

# ADD WASM TARGET
RUN rustup target add wasm32-unknown-unknown

ENV PATH="/root/.cargo/bin:${PATH}"
WORKDIR /build

HEALTHCHECK CMD curl -f http://localhost:5173 || exit 1

ENTRYPOINT ["/bin/bash", "/build/run.bash"]