import Button from "@/components/ui/button";
import { ListCreationProvider } from "@/context/ListCreationContext";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, router, Stack } from "expo-router";

export default function HomeRoutesLayout() {
  const { user } = useUser();

  if (!user) {
    // If user is not signed in
    return <Redirect href={"/(auth)"} />;
  }

  return (
    <ListCreationProvider>
      <Stack
        screenOptions={{
          ...(process.env.EXPO_OS !== "ios") ? {
            headerTitleAlign: "center"
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
        <Stack.Screen name="index" options={{
          headerShown: true,
          headerTitle: "Shopping Lists"
        }} />
        <Stack.Screen name="profile" options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.70, 1],
          sheetCornerRadius: 18,
        }} />
        <Stack.Screen name="list/new/index" options={{
          headerShown: false,
          presentation: "formSheet",
          sheetCornerRadius: 18,
          sheetAllowedDetents: [0.90],
          sheetGrabberVisible: true,
        }} />
        <Stack.Screen name="list/new/create" options={{
          headerShown: true,
          headerTitle: "Create New List",
        }} />
        <Stack.Screen name="list/new/scan" options={{
          presentation: "fullScreenModal",
          headerLargeTitle: false,
          headerShown: true,
          headerTitle: "Scan QR Code",
          headerLeft: () => (
            <Button variant="ghost" onPress={() => router.back()}>Cancel</Button>
          )
        }} />
        <Stack.Screen
          name="emoji-picker"
          options={{
            headerShown: true,
            headerTitle: "Choose an Emoji",
            presentation: "formSheet",
            sheetAllowedDetents: [0.50, 0.75, 1],
            sheetGrabberVisible: true,
            sheetCornerRadius: 18,
          }} />
        <Stack.Screen
          name="color-picker"
          options={{
            headerShown: true,
            headerTitle: "Choose a Color",
            presentation: "formSheet",
            sheetAllowedDetents: [0.50, 0.75, 1],
            sheetGrabberVisible: true,
            sheetCornerRadius: 18,
          }} />
      </Stack>
    </ListCreationProvider>
  )
}