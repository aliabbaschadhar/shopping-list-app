import { View, ViewStyle } from "react-native";
import { ThemedText } from "./themed-text";

interface IconCircleProps {
  size?: number;
  emoji: string;
  style?: ViewStyle;
  backgroundColor?: string;
}

export default function IconCircle({
  size = 48,
  backgroundColor = "lightblue",
  emoji,
  style,
}: IconCircleProps) {
  return (
    <View
      style={[
        {
          backgroundColor,
          width: size,
          height: size,
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <ThemedText style={{ fontSize: 22 }}>{emoji}</ThemedText>
    </View >
  )
}