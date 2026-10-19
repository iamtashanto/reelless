#!/usr/bin/env sh
# Copies the files the standalone server needs but `next build` doesn't place in it.
set -e
cp -R public .next/standalone/public
mkdir -p .next/standalone/.next
cp -R .next/static .next/standalone/.next/static
mkdir -p .next/standalone/assets
cp -R assets/og .next/standalone/assets/og
mkdir -p logs
echo "Standalone build ready: node .next/standalone/server.js"
