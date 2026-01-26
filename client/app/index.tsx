import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import Loader from "@/components/loader";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Loader />;
  }

  // Redirect to the appropriate route based on auth state
  if (isSignedIn) {
    return <Redirect href="/(index)" />;
  }

  return <Redirect href="/(auth)" />;
}
