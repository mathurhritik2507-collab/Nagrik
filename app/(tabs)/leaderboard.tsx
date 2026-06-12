import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
};

export default function LeaderboardScreen() {
  const [hritikXP, setHritikXP] = useState(250);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), async (snapshot) => {
      const firebasePosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const savedReports = await AsyncStorage.getItem("reports");
      const parsedReports = savedReports ? JSON.parse(savedReports) : [];

      const postXP = firebasePosts.reduce(
        (total, post) => total + (post.xp || 0),
        0
      );

      const reportXP = parsedReports.reduce(
        (total, report) => total + (report.xp || 0),
        0
      );

      setHritikXP(250 + postXP + reportXP);
    });

    return () => unsubscribe();
  }, []);

  const users = [
    { name: "Hritik", city: "Pune", xp: hritikXP },
    { name: "Priya", city: "Delhi", xp: 520 },
    { name: "Aarav", city: "Mumbai", xp: 410 },
    { name: "Sneha", city: "Bangalore", xp: 330 },
  ].sort((a, b) => b.xp - a.xp);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "🏅";
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
    >
      <View style={{ backgroundColor: colors.primary, padding: 26, borderRadius: 28 }}>
        <Text style={{ color: "#fff", fontSize: 34, fontWeight: "900" }}>
          Leaderboard 🏆
        </Text>

        <Text style={{ color: "#fff", marginTop: 10, fontSize: 16 }}>
          India’s top civic contributors this week.
        </Text>
      </View>

      <Text style={{ fontSize: 28, fontWeight: "900", marginTop: 30, color: colors.text }}>
        Top Citizens 🇮🇳
      </Text>

      {users.map((user, index) => (
        <View
          key={user.name}
          style={{
            backgroundColor: user.name === "Hritik" ? "#FFF0E6" : colors.card,
            borderRadius: 22,
            padding: 20,
            marginTop: 18,
            borderWidth: user.name === "Hritik" ? 2 : 0,
            borderColor: user.name === "Hritik" ? colors.primary : "transparent",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 28, marginRight: 12 }}>
                {getMedal(index)}
              </Text>

              <View>
                <Text style={{ fontSize: 18, fontWeight: "900", color: colors.text }}>
                  #{index + 1} {user.name}
                </Text>

                <Text style={{ color: colors.muted, marginTop: 4 }}>
                  {user.city}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: colors.primary, fontWeight: "900" }}>
                {user.xp} XP
              </Text>
            </View>
          </View>
        </View>
      ))}

      <View style={{ backgroundColor: colors.card, borderRadius: 22, padding: 22, marginTop: 30 }}>
        <Text style={{ fontSize: 22, fontWeight: "900", color: colors.text }}>
          Your Rank 🚀
        </Text>

        <Text style={{ marginTop: 10, color: colors.muted, lineHeight: 22 }}>
          Your rank updates live from Firebase posts and your submitted reports.
        </Text>
      </View>
    </ScrollView>
  );
}