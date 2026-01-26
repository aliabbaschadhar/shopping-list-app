import { ThemedText } from "@/components/themed-text";
import { useSignIn } from "@clerk/clerk-expo";
import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

export default function ResetPasswordScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [sendingOTP, setSendingOTP] = useState(false);

  const { signIn, isLoaded } = useSignIn();

  const router = useRouter();
  const onPress = async () => { }

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

      <Button
        onPress={onPress}
        loading={sendingOTP}
        disabled={!isLoaded || sendingOTP || !emailAddress}
      >
        Get OTP To Reset Password
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
    </BodyScrollView>
  );
}