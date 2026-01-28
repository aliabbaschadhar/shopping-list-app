import { ThemedText } from "@/components/themed-text";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { appleBlue } from "@/constants/theme";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreateNewListScreen() {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const handleCreateList = () => { }
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
            pathname: "/"
          }}
          style={styles.emojiButton}
        >
          <View style={styles.emojiContainer}>
            <Text>{"🥇"}</Text>
          </View>
        </Link>
        <Link
          href={{
            pathname: "/"
          }}
          style={styles.colorButton}
        >
          <View style={styles.colorContainer}>
            <View style={{
              width: 16,
              height: 16,
              borderRadius: 100,
              backgroundColor: appleBlue,
            }} />
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
});