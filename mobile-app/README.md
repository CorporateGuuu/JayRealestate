# JAY Real Estate Mobile App

A React Native mobile application for JAY Real Estate, providing all the core functionality from the web version optimized for mobile devices.

## Features

### Core Functionality
- **Property Browsing**: Browse through premium off-plan properties in Dubai
- **Advanced Search**: Filter properties by location, type, price range, and bedrooms
- **Developer Showcase**: View properties from top developers (EMAAR, NAKHEEL, MERAAS, SOBHA, BINGHATTI)
- **Property Details**: Detailed property information with image galleries
- **Contact Integration**: Direct calling, WhatsApp, and email integration
- **Favorites**: Save and manage favorite properties
- **Push Notifications**: Property alerts and updates

### Mobile-Optimized Features
- **Touch-Friendly Interface**: Optimized for mobile interactions
- **Offline Support**: Cache property data for offline viewing
- **Location Services**: GPS integration for nearby properties
- **Camera Integration**: Property photo capture and sharing
- **Social Sharing**: Share properties via social media
- **Biometric Authentication**: Secure login with fingerprint/face ID

## Technology Stack

- **Framework**: React Native 0.73+
- **Language**: TypeScript
- **State Management**: Redux Toolkit / Zustand
- **Navigation**: React Navigation 6
- **UI Components**: React Native Elements / NativeBase
- **Maps**: React Native Maps
- **Storage**: AsyncStorage / MMKV
- **API**: Shared with web app (REST/GraphQL)
- **Push Notifications**: Firebase Cloud Messaging
- **Analytics**: Firebase Analytics
- **Crash Reporting**: Firebase Crashlytics

## Project Structure

```
mobile-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # App screens
│   ├── navigation/         # Navigation configuration
│   ├── services/           # API services
│   ├── store/              # State management
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types
│   └── assets/             # Images, fonts, etc.
├── android/                # Android-specific code
├── ios/                    # iOS-specific code
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+
- React Native CLI (`npm install -g @react-native-community/cli`)
- Android Studio (for Android development)
- Xcode 14+ (for iOS development)
- Java Development Kit (JDK) 11+
- Watchman (for macOS users)

### Installation

1. **Initialize React Native Project**
   ```bash
   cd jay-real-estate
   npx react-native init JayRealEstateMobile --template react-native-template-typescript
   cd JayRealEstateMobile
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # Copy the package.json dependencies from mobile-app/package.json
   ```

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Android Setup**
   - Open Android Studio
   - Configure Android SDK and emulator
   - Set ANDROID_HOME environment variable

5. **Run the app**
   ```bash
   # Start Metro bundler
   npm start

   # iOS (in another terminal)
   npm run ios

   # Android (in another terminal)
   npm run android
   ```

### Quick Setup Script
```bash
#!/bin/bash
# setup-mobile-app.sh

echo "Setting up JAY Real Estate Mobile App..."

# Create React Native project
npx react-native init JayRealEstateMobile --template react-native-template-typescript
cd JayRealEstateMobile

# Install dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
npm install @reduxjs/toolkit react-redux redux-persist
npm install react-native-vector-icons react-native-fast-image
npm install @react-native-async-storage/async-storage
npm install axios react-query

# iOS setup
cd ios && pod install && cd ..

echo "Setup complete! Run 'npm start' to start the development server."
```

## Development Guidelines

### Code Sharing with Web App
- Share TypeScript types and interfaces
- Reuse API service functions
- Share business logic and utilities
- Maintain consistent data models

### Mobile-Specific Considerations
- Optimize for touch interactions
- Handle different screen sizes and orientations
- Implement proper loading states
- Add offline functionality
- Follow platform-specific design guidelines

## Deployment

### iOS App Store
- Configure app signing
- Build release version
- Submit for review

### Google Play Store
- Generate signed APK/AAB
- Configure app listing
- Submit for review

## API Integration

The mobile app uses the same API endpoints as the web application:
- Properties API
- Search API
- Developer API
- Contact API
- User preferences API

## Performance Optimization

- Image lazy loading and caching
- List virtualization for large datasets
- Code splitting and lazy loading
- Bundle size optimization
- Memory management

## Testing

- Unit tests with Jest
- Component tests with React Native Testing Library
- E2E tests with Detox
- Device testing on multiple screen sizes

## Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation
4. Test on both iOS and Android
5. Submit pull request

## License

Private - JAY Real Estate
