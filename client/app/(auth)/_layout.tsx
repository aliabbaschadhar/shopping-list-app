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
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ headerTitle: "Sign in" }} />
      <Stack.Screen name="sign-up" options={{ headerTitle: "Sign up" }} />
      <Stack.Screen name="reset-password" options={{ headerTitle: "Reset Password" }} />

    </Stack>
  )
}