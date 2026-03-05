#!/usr/bin/env bash
set -euo pipefail

cd /repo

export SKYKOI_STATE_DIR="/tmp/SKYKOI-test"
export SKYKOI_CONFIG_PATH="${SKYKOI_STATE_DIR}/SKYKOI.json"

echo "==> Build"
pnpm build

echo "==> Seed state"
mkdir -p "${SKYKOI_STATE_DIR}/credentials"
mkdir -p "${SKYKOI_STATE_DIR}/agents/main/sessions"
echo '{}' >"${SKYKOI_CONFIG_PATH}"
echo 'creds' >"${SKYKOI_STATE_DIR}/credentials/marker.txt"
echo 'session' >"${SKYKOI_STATE_DIR}/agents/main/sessions/sessions.json"

echo "==> Reset (config+creds+sessions)"
pnpm SKYKOI reset --scope config+creds+sessions --yes --non-interactive

test ! -f "${SKYKOI_CONFIG_PATH}"
test ! -d "${SKYKOI_STATE_DIR}/credentials"
test ! -d "${SKYKOI_STATE_DIR}/agents/main/sessions"

echo "==> Recreate minimal config"
mkdir -p "${SKYKOI_STATE_DIR}/credentials"
echo '{}' >"${SKYKOI_CONFIG_PATH}"

echo "==> Uninstall (state only)"
pnpm SKYKOI uninstall --state --yes --non-interactive

test ! -d "${SKYKOI_STATE_DIR}"

echo "OK"
