import { appleBlue, zincColors } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, TextStyle, useColorScheme, ViewStyle } from "react-native";
import { ThemedText } from "../themed-text";


type ButtonVariants = "filled" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariants;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "filled",
  size = "md",
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const sizeStyles: Record<ButtonSize, { height: number; fontSize: number; padding: number }> = {
    sm: { height: 36, fontSize: 14, padding: 12 },
    md: { height: 44, fontSize: 16, padding: 16 },
    lg: { height: 52, fontSize: 18, padding: 20 },
  }
  const getVariantStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.6 : 1,
    }

    switch (variant) {
      case "filled":
        return {
          ...baseStyle,
          backgroundColor: isDark ? zincColors[50] : zincColors[900],
        }
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: isDark ? zincColors[700] : zincColors[300],
        }
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
        }
      default:
        return baseStyle;
    }
  }

  const getTextColor = () => {
    if (disabled) {
      return isDark ? zincColors[500] : zincColors[400];
    }
    switch (variant) {
      case "filled":
        return isDark ? zincColors[900] : zincColors[50];
      case "outline":
      case "ghost":
        return appleBlue;
    }
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={
        [
          getVariantStyle(),
          {
            height: sizeStyles[size].height,
            paddingHorizontal: sizeStyles[size].padding,
          }, style
        ] as ViewStyle[]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <ThemedText style={StyleSheet.flatten([
          {
            fontSize: sizeStyles[size].fontSize,
            color: getTextColor(),
            textAlign: "center",
            marginBottom: 0,
            fontWeight: "700",
          },
          textStyle
        ])}
        >{children}</ThemedText>
      )}
    </Pressable>
  )
}
export default Button;