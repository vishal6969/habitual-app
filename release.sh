#!/bin/bash
set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

step() { echo -e "\n${CYAN}▸ $1${NC}"; }
done_msg() { echo -e "${GREEN}✓ $1${NC}"; }

step "Clearing node_modules and lock file..."
rm -rf node_modules
rm -f package-lock.json

step "Installing dependencies..."
npm install

step "Running expo prebuild..."
npx expo prebuild --clean --platform android

step "Building AAB..."
cd android
./gradlew bundleRelease
cd ..

step "Building APK..."
cd android
./gradlew assembleRelease
cd ..

echo ""
done_msg "Builds complete:"
echo "  AAB → android/app/build/outputs/bundle/release/app-release.aab"
echo "  APK → android/app/build/outputs/apk/release/app-release.apk"
