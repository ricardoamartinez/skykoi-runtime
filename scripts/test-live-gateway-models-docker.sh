#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE_NAME="${SKYKOI_IMAGE:-${SKYKOI_IMAGE:-SKYKOI:local}}"
CONFIG_DIR="${SKYKOI_CONFIG_DIR:-${SKYKOI_CONFIG_DIR:-$HOME/.SKYKOI}}"
WORKSPACE_DIR="${SKYKOI_WORKSPACE_DIR:-${SKYKOI_WORKSPACE_DIR:-$HOME/.SKYKOI/workspace}}"
PROFILE_FILE="${SKYKOI_PROFILE_FILE:-${SKYKOI_PROFILE_FILE:-$HOME/.profile}}"

PROFILE_MOUNT=()
if [[ -f "$PROFILE_FILE" ]]; then
  PROFILE_MOUNT=(-v "$PROFILE_FILE":/home/node/.profile:ro)
fi

echo "==> Build image: $IMAGE_NAME"
docker build -t "$IMAGE_NAME" -f "$ROOT_DIR/Dockerfile" "$ROOT_DIR"

echo "==> Run gateway live model tests (profile keys)"
docker run --rm -t \
  --entrypoint bash \
  -e COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  -e HOME=/home/node \
  -e NODE_OPTIONS=--disable-warning=ExperimentalWarning \
  -e SKYKOI_LIVE_TEST=1 \
  -e SKYKOI_LIVE_GATEWAY_MODELS="${SKYKOI_LIVE_GATEWAY_MODELS:-${SKYKOI_LIVE_GATEWAY_MODELS:-all}}" \
  -e SKYKOI_LIVE_GATEWAY_PROVIDERS="${SKYKOI_LIVE_GATEWAY_PROVIDERS:-${SKYKOI_LIVE_GATEWAY_PROVIDERS:-}}" \
  -e SKYKOI_LIVE_GATEWAY_MODEL_TIMEOUT_MS="${SKYKOI_LIVE_GATEWAY_MODEL_TIMEOUT_MS:-${SKYKOI_LIVE_GATEWAY_MODEL_TIMEOUT_MS:-}}" \
  -v "$CONFIG_DIR":/home/node/.SKYKOI \
  -v "$WORKSPACE_DIR":/home/node/.SKYKOI/workspace \
  "${PROFILE_MOUNT[@]}" \
  "$IMAGE_NAME" \
  -lc "set -euo pipefail; [ -f \"$HOME/.profile\" ] && source \"$HOME/.profile\" || true; cd /app && pnpm test:live"
