# Veritrade Frontend - React Native with Expo

A mobile application for business verification and risk intelligence using AI-powered analysis. Veritrade provides comprehensive verification services including CAC registration checks, fraud detection, and deep business intelligence.

## Overview

Veritrade is a React Native application built with Expo that enables users to:
- Verify business details against CAC (Corporate Affairs Commission) records
- Track verification requests in real-time
- Access AI-powered business intelligence reports
- Manage subscription tiers and upgrade plans
- View comprehensive business risk assessments

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **UI Components**: React Native with custom styling
- **Icons**: Expo Vector Icons (Ionicons, Material Community Icons)
- **Animations**: React Native Animated API
- **Styling**: StyleSheet (React Native)

## Project Structure

```
veritradeapp/
├── app/                          # App screens (using Expo Router file-based routing)
│   ├── _layout.tsx               # Root layout
│   ├── index.tsx                 # Entry point
│   ├── home.tsx                  # Home/Dashboard screen
│   ├── verify-business.tsx       # Business verification form
│   ├── request-submitted.tsx     # Verification success screen
│   ├── request-detail.tsx        # Request details with lifecycle tracking
│   ├── subscription.tsx          # Subscription/Pricing screen
│   ├── ai-loading.tsx            # AI analysis loading screen
│   └── ai-report.tsx             # AI intelligence report screen
├── components/                   # Reusable components (placeholder)
├── contexts/                     # React context for state management
│   └── VerificationContext.tsx   # Verification state context
├── constants/                    # App constants
│   └── theme.ts                  # Design tokens and theme
├── hooks/                        # Custom hooks (placeholder)
├── assets/                       # Static assets
│   ├── images/
│   └── splash/
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── app.json                      # Expo configuration
```

## Key Screens

### 1. Home Screen (`home.tsx`)
The main dashboard displaying:
- Trust Integrity Score (75/100 with trend indicator)
- Security strength status
- VERIPULSE AI widget for launching AI insights
- Action cards (New Verify, Scan Invoice)
- Statistics (Verified, Pending, Alerts)
- Recent activity timeline
- Upgrade banner for premium tiers

### 2. Verify Business (`verify-business.tsx`)
User form for submitting verification requests with:
- Business name input
- RC/BN number with format validation
- CAC certificate upload capability
- Submit for review action

### 3. Request Submitted (`request-submitted.tsx`)
Success confirmation screen showing:
- Request ID and processing timeline
- Track Status button
- Dashboard navigation shortcut

### 4. Request Detail (`request-detail.tsx`)
Comprehensive request tracking displaying:
- Business verification status (Verified/Pending)
- Entity details (name, RC number)
- Lifecycle tracking with 4 stages:
  - Submitted
  - Document Verification
  - CAC Matching
  - Final Trust Result
- Action buttons (Download Certificate, View Document)
- Dynamic status visualization

### 5. AI Loading (`ai-loading.tsx`)
Loading state for AI analysis with:
- Animated brain icon
- Pulsing loading dots
- Auto-navigation to results after 3 seconds
- Descriptive text about data synthesis

### 6. AI Report (`ai-report.tsx`)
AI Intelligence Report with:
- Natural language summary
- Health Index and Risk Level metrics
- Tabbed content (Summary, Risk, Network)
- Dynamic metrics display
- Approval recommendations

### 7. Subscription/Business Model (`subscription.tsx`)
Pricing and tier management displaying:
- **SME Starter**: ₦0/Forever (Current)
  - 5 Scans/month
  - Basic CAC Check
  - Email Support
- **SME Pro**: ₦15,000/Monthly (Best Value)
  - Unlimited Scans
  - Deep Fraud Detection
  - Priority Support
  - Bulk Export
  - Risk API Access
- **VERITRADE Elite**: ₦50,000/Monthly
  - Everything in Pro
  - Physical Site Verification
  - Dedicated Account Manager
  - Custom Integration Support
  - Legal Documentation Support
  - Advanced Analytics
- Enterprise contact section

## Navigation Flow

```
Home
├── New Verify / REQUEST Tab → Verify Business → Request Submitted → Request Detail
├── Activity Cards → Request Detail (with entity-specific data)
├── LAUNCH INSIGHT → AI Loading → AI Report
└── Upgrade Banner → Subscription

Subscription
└── Back to Home
```

## Features

### Real-Time Verification Tracking
- Submit business verification requests
- Monitor verification progress through lifecycle stages
- Track request status updates

### AI-Powered Business Intelligence
- Automated data synthesis from 50+ data points
- Natural language summaries
- Risk assessment and health scoring
- Director network analysis

### Subscription Management
- Multiple tier options
- Feature comparison
- Upgrade functionality
- Enterprise contact options

### Status Management
- Verified requests with documentation download
- Pending requests with review status
- Lifecycle visualization with step indicators
- Real-time status updates

## Styling & Theme

The app uses a professional color scheme:
- **Primary Dark**: `#1E3A5F` (Navy blue)
- **Dark Header**: `#0F3057` (Deep navy for AI screens)
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)
- **Background**: `#F9FAFB` (Off-white)
- **Text**: `#1A1A1A` (Dark gray)
- **Muted**: `#9CA3AF` (Light gray)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. Navigate to the project directory:
```bash
cd veritradeapp
```

2. Install dependencies:
```bash
npm install
```

3. Install required Expo packages:
```bash
npm install expo-linear-gradient expo-router expo-vector-icons
```

4. Start the development server:
```bash
npm start
```

5. Run on your device or emulator:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo app on your device

## Available Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Build for production
eas build --platform ios
eas build --platform android
```

## State Management

Currently using React hooks and Context API for state management. The `VerificationContext` is set up for managing verification-related state.

### Future Enhancement
The app is structured to easily integrate with Redux, Zustand, or other state management solutions for more complex data flows.

## API Integration Points

The app is ready for integration with backend APIs:
- Verification submission endpoint
- Request tracking API
- User authentication
- AI analysis service
- Subscription management API

## Component Architecture

### Reusable Components (Ready for Expansion)
- Custom buttons with multiple variants
- Card components
- Status indicators
- Lifecycle timeline components
- Metric displays
- Loading states

### Animations
- Fade-in and scale animations
- Pulsing dot animations
- Auto-scroll behavior
- Touch feedback

## Performance Optimizations

- Lazy screen loading with Expo Router
- Optimized re-renders with React hooks
- Efficient ListView with ScrollView
- Image optimization
- Minimal bundle size

## Testing

To add testing:

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native

# Add test script to package.json
"test": "jest"
```

## Deployment

### iOS
```bash
eas build --platform ios
eas submit --platform ios
```

### Android
```bash
eas build --platform android
eas submit --platform android
```

## Future Enhancements

- [ ] Offline support with local caching
- [ ] Push notifications for verification updates
- [ ] Document scanning with OCR
- [ ] Export reports in PDF format
- [ ] Advanced filtering and search
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Secure biometric authentication
- [ ] Real-time status WebSocket updates
- [ ] Advanced analytics dashboard

## File Naming Conventions

- Screen files: lowercase with hyphens (e.g., `verify-business.tsx`)
- Component files: PascalCase (to be implemented)
- Constants: camelCase
- Types/Interfaces: PascalCase

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Commit changes
git commit -m "Add feature description"

# Push to origin
git push origin feature/feature-name

# Create pull request
```

## Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### Dependency Conflicts
```bash
rm -rf node_modules package-lock.json
npm install
```

### Expo Cache
```bash
expo start -c
```

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Add proper type annotations
4. Test on both iOS and Android
5. Update documentation for new features

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact the development team or create an issue on the project repository.

## Changelog

### v1.0.0 (Initial Release)
- Home dashboard with trust score visualization
- Business verification form
- Request status tracking
- AI-powered intelligence reports
- Subscription tier management
- Bottom navigation
- Dynamic request detail pages
