#!/bin/bash
# Render build script
echo "Installing dependencies..."
npm install --production=false
echo "Building React app..."
npm run build
echo "Build complete!"
