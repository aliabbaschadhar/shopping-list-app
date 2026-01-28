import IconCircle from "@/components/IconCircle";
import { ThemedText } from "@/components/themed-text";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { backgroundColors, Colors, emojies } from "@/constants/theme";
import { Href, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

const isValidUUID = (id: string | null) => {
  if (!id) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function NewListScreen() {
  const [listId, setListId] = useState("");
  const randomEmoji = useMemo(() => emojies[Math.floor(Math.random() * emojies.length)], []); // useMemo bcz it is an expensive operation and we don't want it run everytime when the component re-renders
  const randomBgColor = useMemo(() => backgroundColors[Math.floor(Math.random() * backgroundColors.length)], []);
  const isValidListId = useMemo(() => isValidUUID(listId), [listId]);

  const router = useRouter();


  const joinShoppingListCallback = (listId: string) => { };
  const handleJoinList = () => { };
  return (
    <BodyScrollView contentContainerStyle={{
      padding: 16,
      gap: 32,
    }}>

      <View style={{
        alignItems: "center",
        gap: 12,
        marginTop: 32,
      }}>
        <IconCircle
          style={{ marginBottom: 8 }}
          size={60}
          emoji={randomEmoji}
          backgroundColor={randomBgColor}
        />
        <ThemedText type="title">Better Together</ThemedText>
        <ThemedText
          type="defaultSemiBold"
          style={{ color: "gray", textAlign: "center" }}
        >
          Create shared shopping lists and collaborate with friends and family in real-time.
        </ThemedText>
      </View>

      <View style={{
        gap: 16,
      }}>
        <Button> Create new list</Button>

        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          marginTop: 16,
        }}>
          <View style={styles.line} />
          <ThemedText style={{ color: "gray" }}>
            Or join existing
          </ThemedText>
          <View style={styles.line} />
        </View>
      </View>

      <View
        style=
        {{
          gap: 16
        }}
      >
        <TextInput
          placeholder="Enter a list code"
          value={listId}
          onChangeText={setListId}
          onSubmitEditing={(e) => {
            joinShoppingListCallback(e.nativeEvent.text);
          }}
          containerStyle={{ marginBottom: 0 }}
        />
        <Button
          onPress={handleJoinList}
          disabled={!isValidListId}
        >
          Join List
        </Button>

        <Button
          variant="ghost"
          onPress={() => router.push("/(index)/list/new/scan" as Href)}
        >
          Scan QR Code
        </Button>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(150, 150, 150, 0.2)",
  }
});