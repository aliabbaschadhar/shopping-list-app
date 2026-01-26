import { ThemedText } from "@/components/themed-text";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const { signOut } = useClerk();
  return (
    <BodyScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <ThemedText type="title">Home Screen</ThemedText>
      <Button onPress={signOut}>Sign Out</Button>
    </BodyScrollView>
  )
}