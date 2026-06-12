import React from "react";
import {
    ScrollView,
    Text,
    View,
} from "react-native";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  success: "#16A34A",
  danger: "#DC2626",
};

export default function LearnScreen() {
  const lessons = [
    {
      icon: "🗑️",
      title: "Don’t litter in public spaces",
      doText: "Use dustbins or carry waste until you find one.",
      dontText: "Throwing wrappers, bottles, or food waste on roads.",
      xp: 10,
    },
    {
      icon: "🚦",
      title: "Follow traffic discipline",
      doText: "Wait at signals, wear helmet, and use zebra crossings.",
      dontText: "Wrong-side driving, honking unnecessarily, or jumping signals.",
      xp: 10,
    },
    {
      icon: "🔇",
      title: "Reduce noise pollution",
      doText: "Keep music and vehicle horns controlled in public areas.",
      dontText: "Loud speakers, unnecessary honking, and shouting in public.",
      xp: 10,
    },
    {
      icon: "🚰",
      title: "Save public water",
      doText: "Report leakage and avoid wasting water in public taps.",
      dontText: "Leaving taps open or ignoring water leakage.",
      xp: 10,
    },
    {
      icon: "🏛️",
      title: "Respect public property",
      doText: "Use parks, buses, stations, and public walls responsibly.",
      dontText: "Writing on walls, breaking seats, or damaging signs.",
      xp: 10,
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 130,
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          padding: 26,
          borderRadius: 28,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 34,
            fontWeight: "900",
          }}
        >
          Learn Civic Sense 🧠
        </Text>

        <Text
          style={{
            color: "#fff",
            marginTop: 10,
            fontSize: 16,
            lineHeight: 22,
          }}
        >
          Simple lessons to build better public habits.
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
        Quick Lessons
      </Text>

      {lessons.map((lesson, index) => (
        <View
          key={index}
          style={{
            backgroundColor: colors.card,
            borderRadius: 24,
            padding: 20,
            marginTop: 18,
          }}
        >
          <Text style={{ fontSize: 36 }}>
            {lesson.icon}
          </Text>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "900",
              color: colors.text,
              marginTop: 12,
            }}
          >
            {lesson.title}
          </Text>

          <View
            style={{
              backgroundColor: "#DCFCE7",
              padding: 14,
              borderRadius: 16,
              marginTop: 16,
            }}
          >
            <Text
              style={{
                color: colors.success,
                fontWeight: "900",
              }}
            >
              ✅ Do
            </Text>

            <Text
              style={{
                color: colors.text,
                marginTop: 6,
                lineHeight: 22,
              }}
            >
              {lesson.doText}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#FEE2E2",
              padding: 14,
              borderRadius: 16,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                color: colors.danger,
                fontWeight: "900",
              }}
            >
              ❌ Don’t
            </Text>

            <Text
              style={{
                color: colors.text,
                marginTop: 6,
                lineHeight: 22,
              }}
            >
              {lesson.dontText}
            </Text>
          </View>

          <Text
            style={{
              color: colors.primary,
              fontWeight: "900",
              marginTop: 16,
            }}
          >
            Learn +{lesson.xp} XP
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}