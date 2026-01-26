import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import Loader from "@/components/loader";

export default function AuthRoutesLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) {
    // Checks if the auth state is loaded or not? If not, show a loader
    return <Loader />;
  }

  if (isSignedIn) {
    // If the user is signed in, redirect to the main app routes
    return (
      <Redirect href={"/(index)"} />
    );
  }
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios") ?
          {
          } : {
            headerLargeTitle: true,
            headerTransparent: true,
            headerBlurEffect: "systemChromeMaterial",
            headerLargeTitleShadowVisible: true,
            headerLargeStyle: {
              // NEW: Make the large title transparent to match the background
              backgroundColor: "transparent",
            }
          }
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Sign in" }} />
      <Stack.Screen name="sign-up" options={{ headerTitle: "Sign up" }} />
      <Stack.Screen name="reset-password" options={{ headerTitle: "Reset Password" }} />

    </Stack>
  )
}