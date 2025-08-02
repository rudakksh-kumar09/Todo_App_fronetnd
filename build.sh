#!/bin/bash
# Render build script - Forces dependency installation
echo "🚀 Starting build process..."
echo "📦 Installing ALL dependencies (including dev dependencies)..."
npm install --production=false --verbose
echo "🔍 Checking if react-scripts is available..."
npx react-scripts --version
echo "🏗️ Building React app..."
npm run build
echo "✅ Build complete!"
