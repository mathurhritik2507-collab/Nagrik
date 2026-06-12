import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  success: "#16A34A",
};

export default function PledgeScreen() {
  const [taken, setTaken] = useState(false);

  const takePledge = () => {
    setTaken(true);

    Alert.alert(
      "Pledge Taken 🇮🇳",
      "You are now part of the Nagrik Civic Movement."
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 130 }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          padding: 28,
          borderRadius: 28,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 34, fontWeight: "900" }}>
          Civic Pledge 🇮🇳
        </Text>

        <Text style={{ color: "#fff", marginTop: 10, fontSize: 16 }}>
          Join the movement for cleaner, safer, more responsible public spaces.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 28,
          padding: 26,
          marginTop: 26,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "900", color: colors.text }}>
          I pledge as a Nagrik
        </Text>

        <Text
          style={{
            fontSize: 20,
            lineHeight: 32,
            color: colors.text,
            marginTop: 24,
            fontWeight: "700",
          }}
        >
          “I promise to keep public spaces clean, respect civic rules, report
          issues responsibly, avoid damaging public property, and inspire others
          to become better citizens.”
        </Text>

        <TouchableOpacity
          onPress={takePledge}
          disabled={taken}
          style={{
            backgroundColor: taken ? "#DCFCE7" : colors.primary,
            padding: 18,
            borderRadius: 20,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: taken ? colors.success : "#fff",
              fontSize: 18,
              fontWeight: "900",
            }}
          >
            {taken ? "Pledge Taken ✅" : "Take Civic Pledge"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: "#FFF0E6",
          padding: 22,
          borderRadius: 24,
          marginTop: 24,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "900", color: colors.text }}>
          Why this matters
        </Text>

        <Text style={{ color: colors.muted, marginTop: 10, lineHeight: 22 }}>
          Civic sense improves safety, cleanliness, traffic discipline, public
          respect, and quality of life for everyone.
        </Text>
      </View>
    </ScrollView>
  );
}