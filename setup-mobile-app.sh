#!/bin/bash

# JAY Real Estate Mobile App Setup Script
# This script sets up the React Native mobile application

set -e

echo "🏠 Setting up JAY Real Estate Mobile App..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if React Native CLI is installed
if ! command -v npx react-native &> /dev/null; then
    echo "📦 Installing React Native CLI..."
    npm install -g @react-native-community/cli
fi

# Create the mobile app directory if it doesn't exist
if [ ! -d "mobile-app-build" ]; then
    echo "📱 Creating React Native project..."
    npx react-native init JayRealEstateMobile --template react-native-template-typescript
    mv JayRealEstateMobile mobile-app-build
else
    echo "📱 Mobile app directory already exists"
fi

cd mobile-app-build

echo "📦 Installing core dependencies..."

# Navigation dependencies
npm install @react-navigation/native@^6.1.9
npm install @react-navigation/stack@^6.3.20
npm install @react-navigation/bottom-tabs@^6.5.11
npm install react-native-screens@^3.29.0
npm install react-native-safe-area-context@^4.8.2
npm install react-native-gesture-handler@^2.14.1

# State management
npm install @reduxjs/toolkit@^2.0.1
npm install react-redux@^9.0.4
npm install redux-persist@^6.0.0

# UI and utilities
npm install react-native-vector-icons@^10.0.3
npm install react-native-fast-image@^8.6.3
npm install react-native-linear-gradient@^2.8.3
npm install react-native-modal@^13.0.1

# Storage and data
npm install @react-native-async-storage/async-storage@^1.21.0
npm install axios@^1.6.5

# Forms and pickers
npm install react-native-picker-select@^9.1.3

# Development dependencies
npm install --save-dev @types/react@^18.2.6
npm install --save-dev @testing-library/react-native@^12.4.3

echo "📋 Copying source files..."

# Copy source files from the mobile-app template
if [ -d "../mobile-app/src" ]; then
    cp -r ../mobile-app/src ./
    echo "✅ Source files copied"
else
    echo "⚠️  Source template not found. You'll need to create the src directory manually."
fi

# Copy package.json scripts
if [ -f "../mobile-app/package.json" ]; then
    echo "📄 Updating package.json scripts..."
    # This would require jq or manual editing
    echo "⚠️  Please manually update package.json scripts from mobile-app/package.json"
fi

# iOS setup
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Setting up iOS dependencies..."
    cd ios
    if command -v pod &> /dev/null; then
        pod install
        echo "✅ iOS pods installed"
    else
        echo "⚠️  CocoaPods not found. Please install CocoaPods and run 'pod install' in the ios directory."
    fi
    cd ..
else
    echo "⚠️  iOS setup skipped (not on macOS)"
fi

# Android setup instructions
echo "🤖 Android Setup Instructions:"
echo "1. Install Android Studio"
echo "2. Configure Android SDK (API level 31+)"
echo "3. Set ANDROID_HOME environment variable"
echo "4. Create an Android Virtual Device (AVD)"

# Create environment configuration
echo "⚙️  Creating environment configuration..."
cat > .env << EOL
# JAY Real Estate Mobile App Environment Configuration
API_BASE_URL=http://localhost:3000/api
API_BASE_URL_PROD=https://jay-real-estate.vercel.app/api
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
FIREBASE_PROJECT_ID=your_firebase_project_id
EOL

echo "✅ Environment file created (.env)"

# Create Metro configuration
echo "⚙️  Creating Metro configuration..."
cat > metro.config.js << 'EOL'
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
EOL

echo "✅ Metro configuration created"

# Create README for the mobile app
echo "📖 Creating mobile app README..."
cat > README.md << 'EOL'
# JAY Real Estate Mobile App

React Native mobile application for JAY Real Estate.

## Quick Start

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Development

- Edit files in the `src/` directory
- Hot reloading is enabled by default
- Use Redux DevTools for state debugging

## Building

```bash
# Android
npm run build:android

# iOS
npm run build:ios
```
EOL

echo ""
echo "🎉 Mobile app setup complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. cd mobile-app-build"
echo "2. npm start (start Metro bundler)"
echo "3. npm run ios (for iOS) or npm run android (for Android)"
echo ""
echo "📱 Your JAY Real Estate mobile app is ready for development!"
echo ""
echo "⚠️  Don't forget to:"
echo "- Configure your API endpoints in .env"
echo "- Set up Firebase for push notifications"
echo "- Add your Google Maps API key"
echo "- Configure app icons and splash screens"
echo ""
