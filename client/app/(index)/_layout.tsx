import { Stack } from "expo-router";

export default function HomeRoutesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: true }} />
    </Stack>
  )
}