import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { appleBlue, backgroundColors, emojies } from "@/constants/theme";
import { useListCreationContext } from "@/context/ListCreationContext";
import { useAddShoppingListCallback } from "@/stores/ShoppingListsStore";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateNewListScreen() {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const { selectedEmoji, setSelectedEmoji, setSelectedColor, selectedColor } = useListCreationContext();
  const useAddShoppingList = useAddShoppingListCallback();
  const router = useRouter();


  useEffect(() => {
    setSelectedEmoji(emojies[Math.floor(Math.random() * emojies.length)]);
    setSelectedColor(backgroundColors[Math.floor(Math.random() * backgroundColors.length)]);

    return () => {
      setSelectedColor('');
      setSelectedEmoji('');
    }
  }, [])

  const handleCreateList = () => {
    if (!listName) {
      return;
    }

    const listId = useAddShoppingList(
      listName,
      description,
      selectedEmoji,
      selectedColor
    )

    //TODO: Navigate to the newly created list
    router.replace({
      pathname: "/(index)/list/[listId]",
      params: { listId: listId.toString() },
    })
  }

  return (

    <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Grocery Essentials"
          variant="ghost"
          value={listName}
          onChangeText={setListName}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          inputStyle={styles.titleInput}
          containerStyle={styles.titleInputContainer}
          autoFocus
        />
        <Link
          href={{
            pathname: "/emoji-picker"
          }}
          style={[styles.emojiButton, {
            borderColor: selectedColor,
          }]}
        >
          <View style={styles.emojiContainer}>
            <Text style={styles.emojiText}>{selectedEmoji}</Text>
          </View>
        </Link>
        <Link
          href={{
            pathname: "/color-picker"
          }}
          style={[styles.colorButton, {
            borderColor: selectedColor,
          }]}
        >
          <View style={styles.colorContainer}>
            <View style={[styles.colorCircle, {
              backgroundColor: selectedColor,
            }]} />
          </View>
        </Link>
      </View>

      <TextInput
        placeholder="Add a description (optional)"
        variant="ghost"
        inputStyle={styles.descriptionInput}
        onSubmitEditing={handleCreateList}
        value={description}
        onChangeText={setDescription}
        returnKeyLabel="done"
      />

      <Button
        onPress={handleCreateList}
        disabled={listName.trim().length === 0}
        variant='ghost'
      >
        Create List
      </Button>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleInput: {
    fontWeight: "600",
    fontSize: 28,
    padding: 0,
  },
  titleInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "auto",
    marginBottom: 0,
  },
  emojiButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  emojiContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  emojiText: {
    fontSize: 22,
  },
  descriptionInput: {
    padding: 0,
  },
  createButtonText: {
    color: appleBlue,
    fontWeight: "normal",
  },
  colorButton: {
    padding: 1,
    borderWidth: 3,
    borderRadius: 100,
  },
  colorContainer: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  colorCircle: {
    width: 26,
    height: 26,
    borderRadius: 100,
  },
});