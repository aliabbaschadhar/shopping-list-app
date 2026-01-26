import { ThemedText } from "@/components/themed-text";
import { useSignIn } from "@clerk/clerk-expo";
import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

export default function SignInScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = async () => {
    if (!isLoaded) return;
  }

  return (
    <BodyScrollView
      contentContainerStyle={{ padding: 16 }}
    >
      <TextInput
        label="Email Address"
        value={emailAddress}
        onChangeText={setEmailAddress}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Enter your email address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        keyboardType="default"
        autoCapitalize="none"
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button
        onPress={onSignInPress}
        loading={isSigningIn}
        disabled={!isLoaded || isSigningIn || !emailAddress || !password}
      >
        Sign In
      </Button>

      <View
        style={{ marginTop: 16, alignItems: "center", justifyContent: "center" }}
      >
        <ThemedText> Don't have an account? </ThemedText>
        <Button
          variant="ghost"
          onPress={() => router.push("/(auth)/sign-up")}
        >
          Sign Up
        </Button>
      </View>

      <View
        style={{ marginTop: 16, alignItems: "center", justifyContent: "center" }}
      >
        <ThemedText> Forgot Password? </ThemedText>
        <Button
          variant="ghost"
          onPress={() => router.push("/(auth)/reset-password")}
        >
          Reset Password
        </Button>
      </View>
    </BodyScrollView>
  );
}