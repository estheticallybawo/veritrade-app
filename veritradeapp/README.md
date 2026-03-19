# Veritrade Frontend - React Native with Expo

A mobile application for business verification and risk intelligence using AI-powered analysis. Veritrade provides comprehensive verification services including CAC registration checks, fraud detection, and deep business intelligence.

## Overview

Veritrade is a React Native application built with Expo that enables users to:
- Verify business details against CAC (Corporate Affairs Commission) records
- Track verification requests in real-time
- Access AI-powered business intelligence reports
- Manage subscription tiers and upgrade plans
- View comprehensive business risk assessments

## Current Implementation Status

###  Fully Implemented (Frontend)
- Complete UI/UX for all screens
- Authentication flow (Login screen)
- Business verification form
- Request tracking and history
- AI report visualization
- Subscription management UI
- Service layer architecture with API client
- Token-based authentication
- AsyncStorage session persistence

###  Ready for Backend Integration
- API services are fully built and configured
- Endpoints are defined and ready to connect
- Mock data available for development/testing (cacDatabase.ts)
- Environment configuration for dev/production APIs

###  Pending Implementation
- Backend API connection to production server
- Actual document upload functionality
- Payment gateway integration
- Push notifications
- Real-time WebSocket updates

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (Stack navigation with file-based routing)
- **UI Components**: React Native with custom styling
- **Icons**: Expo Vector Icons (Ionicons, Material Community Icons)
- **Animations**: React Native Animated API
- **Styling**: StyleSheet (React Native)
- **Storage**: AsyncStorage for token persistence
- **HTTP Client**: Fetch API with custom service layer
- **State Management**: React Context API + Service Layer

## Project Structure

```
veritradeapp/
├── app/                          # App screens (using Expo Router file-based routing)
│   ├── _layout.tsx               # Root layout with Stack navigation
│   ├── index.tsx                 # Splash screen with frame animation
│   ├── login.tsx                 # Authentication/Login screen
│   ├── home.tsx                  # Home/Dashboard screen
│   ├── verify-business.tsx       # Business verification form
│   ├── request-submitted.tsx     # Verification success screen
│   ├── request-detail.tsx        # Request details with lifecycle tracking
│   ├── verification-history.tsx  # Verification history list screen
│   ├── subscription.tsx          # Subscription/Pricing screen
│   ├── ai-loading.tsx            # AI analysis loading screen
│   └── ai-report.tsx             # AI intelligence report screen
├── services/                     # API service layer
│   ├── api.ts                    # Base API client with token management
│   ├── authentication.ts         # Authentication service (login/register)
│   └── verification.ts           # Verification request service
├── contexts/                     # React context for state management
│   └── VerificationContext.tsx   # Verification state context
├── data/                         # Mock data and local databases
│   └── cacDatabase.ts            # Mock CAC records for development
├── config/                       # Configuration files (empty)
├── types/                        # TypeScript type definitions (empty)
├── scripts/                      # Build/deployment scripts (empty)
├── assets/                       # Static assets
│   └── splash/                   # Splash screen animation frames
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── app.json                      # Expo configuration
```

## Key Screens

### 0. Splash Screen (`index.tsx`)
Animated entry screen displaying:
- Frame-by-frame animation (5 frames)
- Fade-in and scale effects
- Auto-navigation to login after animation
- Smooth transitions

### 1. Login Screen (`login.tsx`)
Authentication screen with:
- Email and password input fields
- Show/hide password toggle
- Form validation
- Token-based authentication
- AsyncStorage integration for session persistence
- Auto-redirect to home on successful login
- Error handling with user feedback

### 2. Home Screen (`home.tsx`)
The main dashboard displaying:
- Trust Integrity Score (75/100 with trend indicator)
- Security strength status
- VERIPULSE AI widget for launching AI insights
- Action cards (New Verify, Scan Invoice)
- Statistics (Verified, Pending, Alerts)
- Recent activity timeline
- Upgrade banner for premium tiers

### 3. Verify Business (`verify-business.tsx`)
User form for submitting verification requests with:
- Business name input
- RC/BN number with format validation
- CAC certificate upload capability
- Submit for review action

### 4. Request Submitted (`request-submitted.tsx`)
Success confirmation screen showing:
- Request ID and processing timeline
- Track Status button
- Dashboard navigation shortcut

### 5. Request Detail (`request-detail.tsx`)
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

### 6. Verification History (`verification-history.tsx`)
Complete history view displaying:
- List of all past verification requests
- Status indicators with color coding (verified, pending, rejected, flagged)
- Business name and registration number
- Submission dates
- Quick access to individual request details
- Empty state handling
- Pull-to-refresh functionality
- Loading states

### 7. AI Loading (`ai-loading.tsx`)
Loading state for AI analysis with:
- Animated brain icon
- Pulsing loading dots
- Auto-navigation to results after 3 seconds
- Descriptive text about data synthesis

### 8. AI Report (`ai-report.tsx`)
AI Intelligence Report with:
- Natural language summary
- Health Index and Risk Level metrics
- Tabbed content (Summary, Risk, Network)
- Dynamic metrics display
- Approval recommendations

### 9. Subscription/Business Model (`subscription.tsx`)
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
Splash (index.tsx)
└── Login → Home

Home
├── New Verify / REQUEST Tab → Verify Business → Request Submitted → Request Detail
├── Activity Cards → Request Detail (with entity-specific data)
├── Verification History → List of All Requests → Request Detail
├── LAUNCH INSIGHT → AI Loading → AI Report
└── Upgrade Banner → Subscription

Subscription
└── Back to Home

Request Detail
├── Download Certificate (for verified requests)
└── View Document
```

## Features

### Authentication & Session Management
- Email/password login system
- Token-based authentication
- Secure token storage with AsyncStorage
- Session persistence across app restarts
- Auto-redirect based on authentication state

### Real-Time Verification Tracking
- Submit business verification requests
- Monitor verification progress through lifecycle stages
- Track request status updates
- View complete verification history
- Pull-to-refresh for latest updates

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
- Color-coded status indicators

### API Integration (Fully Implemented)
- RESTful API service layer
- Centralized token management
- Error handling and response parsing
- Authentication endpoints (login/register)
- Verification submission and tracking
- Request history retrieval

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
npm install expo-linear-gradient expo-router expo-vector-icons @react-native-async-storage/async-storage
```

4. Configure API endpoint (Development vs Production):
   - Open `services/api.ts`
   - Update `API_BASE_URL` constant:
     ```typescript
     const API_BASE_URL = __DEV__ 
       ? 'http://localhost:5000/api'  // Development
       : 'https://your-production-api.com/api'; // Production
     ```

5. Start the development server:
```bash
npm start
```

6. Run on your device or emulator:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo app on your device

## Getting Started (Development Mode)

### Testing the App

1. **Launch the app** - You'll see the animated splash screen
2. **Login Screen** - Currently configured to work with backend API at `localhost:5000`
   - Register a new user or login with existing credentials
   - Token is automatically stored and managed
3. **Explore Features**:
   - View home dashboard with mock statistics
   - Submit verification requests (requires backend connection)
   - View verification history (requires backend connection)
   - Explore AI reports with demo data
   - Check subscription tiers

### Without Backend Server

The app is designed to work with a backend API, but you can still:
- Navigate through all screens
- View UI components and layouts
- Test animations and interactions
- Use mock CAC database data (see `data/cacDatabase.ts`)

### With Backend Server

1. Ensure backend server is running (see main project README)
2. Configure API endpoint in `services/api.ts`
3. All features will be fully functional:
   - User authentication
   - Verification submission
   - Request tracking
   - History retrieval

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

The app uses a hybrid approach combining React Context API with a service layer architecture:

### Context Layer
- **VerificationContext**: Manages local verification state, statistics, and provides methods for adding/updating verifications

### Service Layer
- **api.ts**: Base API client with HTTP methods (GET, POST, PATCH), token management, and error handling
- **authentication.ts**: Handles user login, registration, and logout operations
- **verification.ts**: Manages verification submission, request retrieval, status updates, and cancellations

### Data Layer
- **cacDatabase.ts**: Mock CAC database for development/testing with sample business records

This architecture separates concerns between:
- **UI State** (Context API) - Local component state and UI-specific data
- **API Communication** (Services) - Backend integration and data fetching
- **Persistent Storage** (AsyncStorage) - Token and user session data

### Future Enhancement
The app can easily integrate with Redux, Zustand, or other state management solutions for more complex data flows if needed.

## API Integration

The app has a fully implemented service layer for backend communication:

### Implemented Endpoints:
- **Authentication**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/logout` - User logout

- **Verification**
  - `POST /api/verifications/submit` - Submit new verification request
  - `GET /api/verifications/my-requests` - Fetch user's verification history
  - `GET /api/verifications/:id` - Get single verification details
  - `PATCH /api/verifications/:id/cancel` - Cancel verification request

- **Admin** (for future admin panel)
  - `GET /api/admin/verifications/pending` - Get pending verifications
  - `GET /api/admin/verifications?status=<status>` - Filter by status
  - `PATCH /api/admin/verifications/:id/approve` - Approve verification
  - `PATCH /api/admin/verifications/:id/reject` - Reject verification

### Configuration:
- Base URL configurable via `services/api.ts`
- Supports development (localhost) and production environments
- Automatic token injection in authenticated requests
- Response parsing and error handling

## Component Architecture

### Service Layer
The app implements a clean service layer architecture:

**Base API Service (`services/api.ts`)**
```typescript
- setToken(token: string) - Store authentication token
- getToken() - Retrieve stored token
- clearToken() - Remove token (logout)
- get<T>(endpoint, requiresAuth?) - HTTP GET request
- post<T>(endpoint, data, requiresAuth?) - HTTP POST request
- patch<T>(endpoint, data, requiresAuth?) - HTTP PATCH request
```

**Authentication Service (`services/authentication.ts`)**
```typescript
- register(data) - Register new user
- login(credentials) - Login user
- logout() - Logout and clear token
```

**Verification Service (`services/verification.ts`)**
```typescript
- submit(request) - Submit verification request
- getMyRequests() - Get user's verification history
- getById(id) - Get single verification
- cancel(id) - Cancel verification request
```

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
- Frame-by-frame splash screen
- Auto-scroll behavior
- Touch feedback

## Performance Optimizations

- Lazy screen loading with Expo Router
- Optimized re-renders with React hooks
- Efficient ListView with ScrollView
- Image optimization
- Minimal bundle size

## Key Dependencies

### Core Framework
- `expo` (~54.0.33) - Expo SDK
- `react` (19.1.0) - React library
- `react-native` (0.81.5) - React Native framework

### Navigation & Routing
- `expo-router` (~6.0.23) - File-based routing
- `@react-navigation/native` (^7.1.8) - Navigation core
- `@react-navigation/bottom-tabs` (^7.4.0) - Bottom tab navigation
- `react-native-screens` (~4.16.0) - Native screen optimization

### UI & Styling
- `expo-linear-gradient` (^15.0.8) - Gradient components
- `@expo/vector-icons` (^15.0.3) - Icon library

### Storage & State
- `@react-native-async-storage/async-storage` (^3.0.1) - Persistent storage

### Animations & Gestures
- `react-native-reanimated` (~4.1.1) - Advanced animations
- `react-native-gesture-handler` (~2.28.0) - Touch gestures

### Utilities
- `expo-constants` (~18.0.13) - App constants
- `expo-linking` (~8.0.11) - Deep linking
- `expo-status-bar` (~3.0.9) - Status bar control

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

- [ ] Backend integration with production API (services are ready)
- [ ] Admin panel for verification management
- [ ] Offline support with local caching
- [ ] Push notifications for verification updates
- [ ] Document scanning with OCR
- [ ] Export reports in PDF format
- [ ] Advanced filtering and search in history
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Secure biometric authentication
- [ ] Real-time status WebSocket updates
- [ ] Advanced analytics dashboard
- [ ] Profile management screen
- [ ] Document upload implementation
- [ ] Payment integration for subscriptions

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

1. Follow the existing code style and architecture
2. Use TypeScript for all new code
3. Add proper type annotations
4. Test on both iOS and Android
5. Update documentation for new features
6. **Service Layer**: Add new API endpoints in appropriate service files
7. **Screens**: Follow file naming convention (lowercase-with-hyphens.tsx)
8. **Error Handling**: Always implement proper error handling and user feedback
9. **Loading States**: Provide loading indicators for async operations

### Code Organization Guidelines
- **Services**: API integration code goes in `services/`
- **Contexts**: Global state management in `contexts/`
- **Screens**: Screen components in `app/`
- **Types**: TypeScript interfaces/types in `types/` (when created)
- **Data**: Mock/seed data in `data/`

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact the development team or create an issue on the project repository.

## Changelog

### v1.0.0 (Current Release)
- Animated splash screen with frame transitions
- Complete authentication system (login/register)
- Home dashboard with trust score visualization
- Business verification form with validation
- Request status tracking and lifecycle visualization
- Verification history screen with all past requests
- AI-powered intelligence reports with loading states
- Subscription tier management UI
- Full service layer implementation (API client, auth, verification)
- Token-based authentication with AsyncStorage
- Mock CAC database for development
- Stack navigation with Expo Router
- Comprehensive error handling and loading states
