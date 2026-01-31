import { ThemedText } from "@/components/themed-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function ListScreen() {
  const router = useRouter();
  const { listId } = useLocalSearchParams() as { listId: string };
  return (
    <>
      <FlatList
        data={[listId]}
        renderItem={({ item }) => <ThemedText>{item}</ThemedText>}
        contentInsetAdjustmentBehavior="automatic"
      />
    </>
  )
}