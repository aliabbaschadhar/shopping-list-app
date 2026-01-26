import { ThemedText } from "@/components/themed-text";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

export default function ScanScreen() {
  return (
    <BodyScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <ThemedText type="title">Scan Screen</ThemedText>
    </BodyScrollView>
  );
}