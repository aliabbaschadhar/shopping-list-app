import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { useColorScheme } from '@/hooks/use-color-scheme';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

if (!publishableKey) {
  throw new Error("Clerk publishable key is not defined. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment variables.");
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView>
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      {/* ClerkLoaded ensures the app only renders after Clerk fully initializes and loads auth state. */}
      {/* This prevents race conditions, navigation errors, and flashing between auth states during startup. */}
      <ClerkLoaded>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Slot />
          {/* A Slot is a placeholder for navigation flow which will be rendered here based on whether the current user is authenticated or not. */}
          <StatusBar style="auto" />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
    </GestureHandlerRootView>
  );
}
