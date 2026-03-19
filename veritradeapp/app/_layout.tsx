import { Stack } from 'expo-router';
import { VerificationProvider } from '../contexts/VerificationContext';

export default function RootLayout() {
  return (
    <VerificationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="home" />
        <Stack.Screen name="verify-business" />
        <Stack.Screen name="request-submitted" />
        <Stack.Screen name="request-detail" />
        <Stack.Screen name="verification-history" />
        <Stack.Screen name="ai-loading" />
        <Stack.Screen name="ai-report" />
        <Stack.Screen name="subscription" />
      </Stack>
    </VerificationProvider>
  );
}
