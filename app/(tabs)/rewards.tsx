import React from "react";
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

export default function RewardsScreen() {
  const rewards = [
    {
      icon: "🏅",
      title: "Civic Starter Badge",
      cost: 100,
      desc: "Unlock your first public civic badge.",
    },
    {
      icon: "🧹",
      title: "Cleanliness Champion Badge",
      cost: 250,
      desc: "Show your commitment to clean public spaces.",
    },
    {
      icon: "🎟️",
      title: "Partner Coupon",
      cost: 500,
      desc: "Future reward from cafes, stores, or civic partners.",
    },
    {
      icon: "👑",
      title: "City Hero Status",
      cost: 1000,
      desc: "Premium public recognition for top contributors.",
    },
  ];

  const redeemReward = (reward) => {
    Alert.alert(
      "Reward Preview 🎁",
      `${reward.title} will be redeemable when partner rewards go live.`
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
          padding: 26,
          borderRadius: 28,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 34, fontWeight: "900" }}>
          Rewards Store 🎁
        </Text>

        <Text style={{ color: "#fff", marginTop: 10, fontSize: 16 }}>
          Redeem XP for badges, status, and future civic partner rewards.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 26,
          padding: 22,
          marginTop: 24,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "900", color: colors.text }}>
          Available XP
        </Text>

        <Text
          style={{
            fontSize: 52,
            fontWeight: "900",
            color: colors.primary,
            marginTop: 10,
          }}
        >
          750
        </Text>

        <Text style={{ color: colors.muted }}>
          Demo XP balance for rewards preview.
        </Text>
      </View>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "900",
          color: colors.text,
          marginTop: 30,
        }}
      >
        Rewards
      </Text>

      {rewards.map((reward, index) => (
        <View
          key={index}
          style={{
            backgroundColor: colors.card,
            borderRadius: 24,
            padding: 20,
            marginTop: 18,
          }}
        >
          <Text style={{ fontSize: 36 }}>{reward.icon}</Text>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "900",
              color: colors.text,
              marginTop: 12,
            }}
          >
            {reward.title}
          </Text>

          <Text style={{ color: colors.muted, marginTop: 8, lineHeight: 22 }}>
            {reward.desc}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 18,
            }}
          >
            <Text style={{ color: colors.success, fontWeight: "900" }}>
              {reward.cost} XP
            </Text>

            <TouchableOpacity
              onPress={() => redeemReward(reward)}
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 18,
                paddingVertical: 11,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "900" }}>
                Redeem
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}