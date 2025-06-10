# JAY Real Estate Mobile App - Deployment Guide

This guide covers the deployment process for both iOS App Store and Google Play Store.

## Pre-Deployment Checklist

### 1. App Configuration
- [ ] Update app name, version, and bundle identifier
- [ ] Configure app icons for all required sizes
- [ ] Set up splash screens for different screen densities
- [ ] Configure deep linking and URL schemes
- [ ] Set up push notification certificates/keys

### 2. Environment Configuration
- [ ] Configure production API endpoints
- [ ] Set up Firebase project for production
- [ ] Configure Google Maps API keys
- [ ] Set up analytics and crash reporting
- [ ] Configure app signing certificates

### 3. Testing
- [ ] Test on multiple device sizes and OS versions
- [ ] Verify all features work offline
- [ ] Test push notifications
- [ ] Verify app performance and memory usage
- [ ] Test app store compliance (privacy, content guidelines)

## iOS Deployment

### 1. Xcode Configuration

```bash
# Open iOS project in Xcode
cd ios && open JayRealEstate.xcworkspace
```

**Configure in Xcode:**
- Bundle Identifier: `com.jayrealestate.mobile`
- Version: `1.0.0`
- Build Number: `1`
- Deployment Target: iOS 13.0+
- Team: Your Apple Developer Team
- Signing: Automatic or Manual

### 2. App Store Connect Setup

1. **Create App Record**
   - Log in to App Store Connect
   - Create new app with bundle identifier
   - Fill in app information, description, keywords
   - Upload app screenshots and metadata

2. **App Privacy**
   - Configure data collection practices
   - Add privacy policy URL
   - Set age rating

### 3. Build and Upload

```bash
# Clean and build for release
cd ios
xcodebuild clean -workspace JayRealEstate.xcworkspace -scheme JayRealEstate
xcodebuild archive -workspace JayRealEstate.xcworkspace -scheme JayRealEstate -archivePath JayRealEstate.xcarchive

# Upload to App Store Connect
xcodebuild -exportArchive -archivePath JayRealEstate.xcarchive -exportPath ./build -exportOptionsPlist ExportOptions.plist
```

**Or use Xcode GUI:**
1. Product → Archive
2. Window → Organizer
3. Select archive → Distribute App
4. App Store Connect → Upload

### 4. TestFlight (Optional)
- Upload build to TestFlight for beta testing
- Add internal/external testers
- Collect feedback before public release

### 5. App Store Review
- Submit for review in App Store Connect
- Respond to any review feedback
- Monitor review status

## Android Deployment

### 1. Generate Signing Key

```bash
# Generate upload key
keytool -genkeypair -v -storetype PKCS12 -keystore upload-keystore.keystore -alias upload -keyalg RSA -keysize 2048 -validity 10000

# Move keystore to android/app
mv upload-keystore.keystore android/app/
```

### 2. Configure Gradle

**android/gradle.properties:**
```properties
MYAPP_UPLOAD_STORE_FILE=upload-keystore.keystore
MYAPP_UPLOAD_KEY_ALIAS=upload
MYAPP_UPLOAD_STORE_PASSWORD=your_store_password
MYAPP_UPLOAD_KEY_PASSWORD=your_key_password
```

**android/app/build.gradle:**
```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

### 3. Build Release APK/AAB

```bash
# Build release AAB (recommended)
cd android
./gradlew bundleRelease

# Build release APK
./gradlew assembleRelease

# Output files:
# AAB: android/app/build/outputs/bundle/release/app-release.aab
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### 4. Google Play Console Setup

1. **Create App**
   - Log in to Google Play Console
   - Create new application
   - Fill in app details and store listing

2. **Upload App Bundle**
   - Go to Release → Production
   - Create new release
   - Upload AAB file
   - Add release notes

3. **Content Rating**
   - Complete content rating questionnaire
   - Get appropriate age rating

4. **App Content**
   - Add privacy policy
   - Configure target audience
   - Set up data safety section

### 5. Release Management

**Internal Testing:**
```bash
# Upload to internal testing track
# Test with internal team
```

**Closed Testing:**
```bash
# Create closed testing track
# Add test users via email lists
```

**Open Testing:**
```bash
# Create open testing track
# Public beta testing
```

**Production:**
```bash
# Release to production
# Monitor crash reports and user feedback
```

## Continuous Deployment

### GitHub Actions (iOS)

```yaml
# .github/workflows/ios-deploy.yml
name: iOS Deployment

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Install pods
        run: cd ios && pod install
      
      - name: Build and upload to TestFlight
        run: |
          # Add your build and upload commands
```

### GitHub Actions (Android)

```yaml
# .github/workflows/android-deploy.yml
name: Android Deployment

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build AAB
        run: cd android && ./gradlew bundleRelease
      
      - name: Upload to Play Store
        # Add upload commands
```

## Post-Deployment

### 1. Monitoring
- Set up crash reporting (Firebase Crashlytics)
- Monitor app performance metrics
- Track user engagement and retention
- Monitor app store reviews and ratings

### 2. Updates
- Plan regular updates with new features
- Fix bugs and performance issues
- Update dependencies and security patches
- Maintain compatibility with new OS versions

### 3. Marketing
- App Store Optimization (ASO)
- Social media promotion
- User acquisition campaigns
- Collect and respond to user feedback

## Troubleshooting

### Common iOS Issues
- Code signing errors: Check certificates and provisioning profiles
- Build failures: Update Xcode and dependencies
- App Store rejection: Review guidelines and fix issues

### Common Android Issues
- Keystore issues: Ensure correct keystore configuration
- Build failures: Check Gradle and SDK versions
- Play Store rejection: Review policy compliance

## Support

For deployment issues:
1. Check React Native documentation
2. Review platform-specific guides (iOS/Android)
3. Consult app store guidelines
4. Contact platform support if needed
