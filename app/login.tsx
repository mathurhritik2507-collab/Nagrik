import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing info", "Enter email and password.");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/");
    } catch (error) {
      Alert.alert("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: "center" }}>
      <Text style={{ fontSize: 46, fontWeight: "900", color: colors.primary }}>
        Nagrik 🇮🇳
      </Text>

      <Text style={{ fontSize: 28, fontWeight: "900", color: colors.text, marginTop: 18 }}>
        Welcome back
      </Text>

      <Text style={{ color: colors.muted, marginTop: 8, fontSize: 16 }}>
        Login and continue your civic journey.
      </Text>

      <View style={{ backgroundColor: colors.card, padding: 22, borderRadius: 24, marginTop: 30 }}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: 14,
          }}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: 14,
            marginTop: 14,
          }}
        />

        <TouchableOpacity
          onPress={login}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#999" : colors.primary,
            padding: 17,
            borderRadius: 18,
            marginTop: 22,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "900", fontSize: 17 }}>
              Login
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/signup")} style={{ marginTop: 18 }}>
          <Text style={{ textAlign: "center", color: colors.primary, fontWeight: "900" }}>
            New user? Create account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}