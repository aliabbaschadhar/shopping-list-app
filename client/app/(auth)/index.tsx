import { ThemedText } from "@/components/themed-text";
import { useSignIn } from "@clerk/clerk-expo";
import { View } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";

export default function SignInScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();


  return <View>
    <ThemedText type="title">Sign In Screen</ThemedText>
    <Link href={"/(auth)/sign-up"}>Go to Sign Up</Link>
    <Link href={"/(auth)/reset-password"}>Go to Reset Password</Link>
    <Button >Hello</Button>
    <TextInput label="Email Address" value={emailAddress} onChangeText={setEmailAddress} />
  </View>;
}