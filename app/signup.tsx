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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
};

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("Pune");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!name.trim() || !city.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Missing info", "Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      router.replace("/");
    } catch (error) {
      Alert.alert("Signup failed", error.message);
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
        Create account
      </Text>

      <Text style={{ color: colors.muted, marginTop: 8, fontSize: 16 }}>
        Start uploading, reporting, learning and earning XP.
      </Text>

      <View style={{ backgroundColor: colors.card, padding: 22, borderRadius: 24, marginTop: 30 }}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: 14,
          }}
        />

        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="City"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 14,
            padding: 14,
            marginTop: 14,
          }}
        />

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
            marginTop: 14,
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
          onPress={signup}
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
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")} style={{ marginTop: 18 }}>
          <Text style={{ textAlign: "center", color: colors.primary, fontWeight: "900" }}>
            Already have account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}