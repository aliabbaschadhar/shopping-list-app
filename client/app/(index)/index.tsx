import { ThemedText } from "@/components/themed-text";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { appleBlue } from "@/constants/theme";
import { useClerk } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const { signOut } = useClerk();
  const router = useRouter();

  const renderHeaderRight = () => {
    return (
      <Pressable
        onPress={() => router.push("/(index)/list/new")}
      >
        <IconSymbol name="plus" color={appleBlue} />
      </Pressable>
    )
  }

  const renderHeaderLeft = () => {
    return (
      <Pressable
        onPress={() => router.push("/(index)/profile")}
      >
        <IconSymbol name="gearshape" size={24} color={appleBlue} />
      </Pressable>
    )
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
      <BodyScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
        <ThemedText type="title">Home Screen</ThemedText>
        <Button onPress={signOut}>Sign Out</Button>
      </BodyScrollView>
    </>
  );
}