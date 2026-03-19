import { Stack } from 'expo-router';
import { VerificationProvider } from '../contexts/VerificationContext';
import { UserProvider } from '../contexts/UserContext';
import { OnboardingProvider } from '../contexts/OnboardingContext';

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <UserProvider>
        <VerificationProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
          <Stack.Screen name="home" />
          <Stack.Screen name="verify-business" />
          <Stack.Screen name="request-submitted" />
          <Stack.Screen name="request-detail" />
          <Stack.Screen name="verification-history" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="ai-loading" />
          <Stack.Screen name="ai-report" />
          <Stack.Screen name="subscription" />
        </Stack>
      </VerificationProvider>
      </UserProvider>
    </OnboardingProvider>
  );
}
