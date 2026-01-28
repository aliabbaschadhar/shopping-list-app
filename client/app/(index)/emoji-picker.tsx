import { emojies } from "@/constants/theme";
import { useListCreationContext } from "@/context/ListCreationContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

export default function EmojiPickerScreen() {
  const router = useRouter();
  const { setSelectedEmoji } = useListCreationContext();
  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    // You might want to navigate back or close the picker after selection
    router.back();
  }
  return (
    <FlatList
      numColumns={5}
      data={emojies}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleEmojiSelect(item)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 40 }}
          >
            {item}
          </Text>
        </Pressable>
      )}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets // to avoid content being hidden under navigation bars
      // contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
      }}
    />
  )
}