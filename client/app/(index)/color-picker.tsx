import { backgroundColors, emojies } from "@/constants/theme";
import { useListCreationContext } from "@/context/ListCreationContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

export default function ColorPickerScreen() {
  const router = useRouter();
  const { setSelectedColor } = useListCreationContext();
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // You might want to navigate back or close the picker after selection
    router.back();
  }
  return (
    <FlatList
      numColumns={5}
      data={backgroundColors}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handleColorSelect(item)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 8,
          }}
        >
          <View
            style={{ backgroundColor: item, width: 44, height: 44, borderRadius: 10 }}
          />
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