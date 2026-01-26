import { ThemedText } from "@/components/themed-text";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Alert, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import type { ClerkAPIError } from "@clerk/types";

export default function SignUpScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    console.log("Sign Up button is pressed!");
    setIsLoading(true);
    setErrors([]);

    try {
      // start auth
      await signUp.create({
        emailAddress,
        password
      })
      // confirmation
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code"
      });
      setPendingVerification(true);
    } catch (e: any) {
      Alert.alert("Error", "Failed to sign up. Please try again.");
      if (e?.errors) {
        setErrors(e.errors);
      } else {
        console.error(e);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    console.log("Verify button is pressed!");
    setIsLoading(true);
    setErrors([]);

    try {
      const signUpAttempt = signUp.attemptEmailAddressVerification({
        code
      })

      if ((await signUpAttempt).status === "complete") {
        await setActive({ session: (await signUpAttempt).createdSessionId })
        router.replace("/");
      } else {
        console.log(signUpAttempt)
      }
    } catch (e: any) {
      Alert.alert("Error", "Failed to verify code. Please try again.");
      if (e?.errors) {
        setErrors(e.errors);
      } else {
        console.error(e);
      }
    } finally {
      setIsLoading(false);
    }
  }

  if (pendingVerification) {
    return (
      <BodyScrollView
        contentContainerStyle={{ padding: 16 }}
      >
        <TextInput
          value={code}
          label={`Enter the verification code we sent to ${emailAddress}`}
          placeholder="Enter your verification code"
          // onChange={(e) => setCode(e.nativeEvent.text)} // You can access the value in react native input through native but it is not recommended.
          onChangeText={setCode} // This is the recommended way.
        />
        <Button
          onPress={onVerifyPress}
          disabled={!code || isLoading}
          loading={isLoading}
        >
          Verify
        </Button>

        {errors.map((error) => (
          <ThemedText
            key={error.longMessage}
            style={{ color: 'red', marginTop: 8 }}
          >
            {error.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    )
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
        onPress={onSignUpPress}
        loading={isLoading}
        disabled={!isLoaded || isLoading || !emailAddress || !password}
      >
        Sign Up
      </Button>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: 'red', marginTop: 8 }}>{error.longMessage}</ThemedText>
      ))}

      <View
        style={{ marginTop: 16, alignItems: "center", justifyContent: "center" }}
      >
        <ThemedText> Do you have an account? </ThemedText>
        <Button
          variant="ghost"
          onPress={() => router.push("/(auth)")}
        >
          Sign In
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