import React from "react";
import { ScrollView, Text, View } from "react-native";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  success: "#16A34A",
  danger: "#DC2626",
  warning: "#F59E0B",
};

export default function ImpactScreen() {
  const cities = [
    { city: "Pune", score: 84, rank: 1, icon: "🥇" },
    { city: "Bangalore", score: 79, rank: 2, icon: "🥈" },
    { city: "Mumbai", score: 73, rank: 3, icon: "🥉" },
    { city: "Delhi", score: 61, rank: 4, icon: "🏅" },
    { city: "Hyderabad", score: 58, rank: 5, icon: "🏅" },
  ];

  const zones = [
    ["🔴 FC Road", "High Issue Zone", "14 active reports", colors.danger],
    ["🟠 Kothrud", "Improving Zone", "8 active reports", colors.warning],
    ["🟢 Baner", "Clean Zone", "3 active reports", colors.success],
    ["🔵 Viman Nagar", "Active Civic Zone", "5 active reports", colors.primary],
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 130 }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          padding: 26,
          borderRadius: 28,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 32, fontWeight: "900" }}>
          Civic Impact 🗺️
        </Text>

        <Text style={{ color: "#fff", marginTop: 10, fontSize: 16 }}>
          City rankings, heat zones, and civic health insights.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.card,
          padding: 22,
          borderRadius: 24,
          marginTop: 24,
        }}
      >
        <Text style={{ fontSize: 26, fontWeight: "900", color: colors.text }}>
          Pune Civic Score
        </Text>

        <Text
          style={{
            fontSize: 52,
            fontWeight: "900",
            color: colors.success,
            marginTop: 16,
          }}
        >
          84/100
        </Text>

        <Text style={{ color: colors.muted, marginTop: 8 }}>
          Pune is currently ranked #1 based on actions, reports, and civic participation.
        </Text>
      </View>

      <Text style={{ fontSize: 28, fontWeight: "900", color: colors.text, marginTop: 30 }}>
        City Rankings 🇮🇳
      </Text>

      {cities.map((item) => (
        <View
          key={item.city}
          style={{
            backgroundColor: item.city === "Pune" ? "#FFF0E6" : colors.card,
            borderRadius: 24,
            padding: 20,
            marginTop: 18,
            borderWidth: item.city === "Pune" ? 2 : 0,
            borderColor: item.city === "Pune" ? colors.primary : "transparent",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 30, marginRight: 12 }}>{item.icon}</Text>

              <View>
                <Text style={{ fontSize: 20, fontWeight: "900", color: colors.text }}>
                  #{item.rank} {item.city}
                </Text>
                <Text style={{ color: colors.muted, marginTop: 4 }}>
                  Civic participation score
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 14,
                paddingVertical: 9,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: colors.primary, fontWeight: "900" }}>
                {item.score}
              </Text>
            </View>
          </View>
        </View>
      ))}

      <Text style={{ fontSize: 28, fontWeight: "900", color: colors.text, marginTop: 30 }}>
        Pune Heat Zones
      </Text>

      {zones.map((zone, index) => (
        <View
          key={index}
          style={{
            backgroundColor: colors.card,
            padding: 20,
            borderRadius: 24,
            marginTop: 18,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "900", color: colors.text }}>
            {zone[0]}
          </Text>

          <Text style={{ color: zone[3], fontWeight: "900", marginTop: 8 }}>
            {zone[1]}
          </Text>

          <Text style={{ color: colors.muted, marginTop: 8 }}>
            {zone[2]}
          </Text>
        </View>
      ))}

      <View
        style={{
          backgroundColor: "#FFF0E6",
          padding: 20,
          borderRadius: 24,
          marginTop: 24,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "900", color: colors.text }}>
          AI Recommendation 🤖
        </Text>

        <Text style={{ color: colors.muted, marginTop: 10, lineHeight: 22 }}>
          Pune can stay #1 if citizens complete more cleanliness challenges and report high-issue zones like FC Road this week.
        </Text>
      </View>
    </ScrollView>
  );
}