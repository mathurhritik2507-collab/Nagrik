import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from "expo-router";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  text: "#111827",
  muted: "#6B7280",
};

export default function OnboardingScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: 28,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 48,
          fontWeight: "900",
          color: colors.primary,
        }}
      >
        Nagrik 🇮🇳
      </Text>

      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          color: colors.text,
          marginTop: 24,
          lineHeight: 38,
        }}
      >
        Small actions. Better India.
      </Text>

      <Text
        style={{
          fontSize: 17,
          color: colors.muted,
          marginTop: 18,
          lineHeight: 26,
        }}
      >
        Learn civic sense, upload positive actions, report issues, complete
        challenges, earn XP, and help your city become cleaner and better.
      </Text>

      <View
        style={{
          marginTop: 40,
          backgroundColor: "#fff",
          padding: 22,
          borderRadius: 26,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "900", color: colors.text }}>
          What you can do
        </Text>

        <Text style={{ color: colors.muted, marginTop: 14, fontSize: 16 }}>
          🧹 Upload civic actions
        </Text>

        <Text style={{ color: colors.muted, marginTop: 12, fontSize: 16 }}>
          🚧 Report public issues
        </Text>

        <Text style={{ color: colors.muted, marginTop: 12, fontSize: 16 }}>
          🧠 Learn civic sense
        </Text>

        <Text style={{ color: colors.muted, marginTop: 12, fontSize: 16 }}>
          🏆 Compete on leaderboards
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={{
          backgroundColor: colors.primary,
          padding: 18,
          borderRadius: 20,
          alignItems: "center",
          marginTop: 36,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "900",
          }}
        >
          Start Civic Journey
        </Text>
      </TouchableOpacity>
    </View>
  );
}