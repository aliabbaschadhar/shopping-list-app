import { ThemedText } from "@/components/themed-text";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { ClerkAPIError } from "@clerk/types";

export default function ResetPasswordScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const { signIn, isLoaded, setActive } = useSignIn();

  const router = useRouter();
  const onResetPasswordPress = useCallback(async () => {
    if (!isLoaded) return;
    setErrors([]);
    try {
      console.log("Reset Password button is pressed!")
      // start reset password flow
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress
      });

      setPendingVerification(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
        console.error(JSON.stringify(err, null, 2));
      }
    }
  }, [isLoaded, signIn, emailAddress]);

  const onVerifyPress = useCallback(async () => {
    if (!isLoaded) return;
    setErrors([]);
    console.log("Verify & Reset Password button is pressed!");

    try {
      const signInAttempt = signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password
      });

      if ((await signInAttempt).status === "complete") {
        await setActive({ session: (await signInAttempt).createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setErrors(err.errors);
        console.error(JSON.stringify(err, null, 2));
      }
    }
  }, [isLoaded, signIn, code, password, setActive, router]);

  if (pendingVerification) {
    return (
      <BodyScrollView
        contentContainerStyle={{ padding: 16 }}
      >
        <TextInput
          label="Verification Code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          placeholder="Enter the verification code"
        />

        <TextInput
          label="New Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter your new password"
        />
        {errors.map((error) => (
          <ThemedText
            key={error.longMessage}
            style={{ color: 'red', marginTop: 8 }}
          >
            {error.longMessage}
          </ThemedText>
        ))}

        <Button
          onPress={onVerifyPress}
          loading={false}
          disabled={!isLoaded || !code || !password}
          style={{ margin: 16 }}
        >
          Verify & Reset Password
        </Button>
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

      <Button
        onPress={onResetPasswordPress}
        loading={false}
        disabled={!isLoaded || !emailAddress}
        style={{ margin: 16 }}
      >
        Get OTP To Reset Password
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
  );
}