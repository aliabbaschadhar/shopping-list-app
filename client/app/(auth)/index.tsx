import { ThemedText } from "@/components/themed-text";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Alert, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { ClerkAPIError } from "@clerk/types";

export default function SignInScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    setIsSigningIn(true);

    try {
      console.log("Sign In button pressed!")
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password
      })

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
      setIsSigningIn(false);
    } catch (err: any) {
      console.error("Sign in error:", err);
      Alert.alert("Error", "Failed to sign in. Please check your credentials.");
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
      }
    } finally {
      setIsSigningIn(false);
    }
  }, [isLoaded, emailAddress, password, router]);

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

      {errors.map((error, index) => (
        <ThemedText key={index} style={{ color: 'red', marginTop: 8 }}>
          {error.longMessage || error.message}
        </ThemedText>
      ))}

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