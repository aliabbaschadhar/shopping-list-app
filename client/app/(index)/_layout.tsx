import { Stack } from "expo-router";

export default function HomeRoutesLayout() {
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios") ? {} : {
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
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  )
}