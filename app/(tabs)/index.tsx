import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { auth } from "../../firebaseConfig";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  success: "#16A34A",
  danger: "#DC2626",
  warning: "#F59E0B",
  border: "#E5E7EB",
};

export default function HomeScreen() {
  const [feedItems, setFeedItems] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [totalXP, setTotalXP] = useState(250);
  const [reportsCount, setReportsCount] = useState(0);

  const user = auth.currentUser;
  const displayName = user?.displayName || "Nagrik User";

  const loadFeed = async () => {
    const savedPosts = await AsyncStorage.getItem("posts");
    const savedReports = await AsyncStorage.getItem("reports");
    const savedComments = await AsyncStorage.getItem("comments");

    const posts = savedPosts ? JSON.parse(savedPosts) : [];
    const reports = savedReports ? JSON.parse(savedReports) : [];
    const comments = savedComments ? JSON.parse(savedComments) : {};

    const allItems = [...posts, ...reports].sort((a, b) => {
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });

    const userPosts = posts.filter((item) => item.userId === user?.uid);
    const userReports = reports.filter((item) => item.userId === user?.uid);

    const postXP = userPosts.reduce((sum, item) => sum + (item.xp || 0), 0);
    const reportXP = userReports.reduce((sum, item) => sum + (item.xp || 0), 0);

    const counts = {};
    Object.keys(comments).forEach((key) => {
      counts[key] = comments[key]?.length || 0;
    });

    setCommentCounts(counts);
    setTotalXP(250 + postXP + reportXP);
    setReportsCount(userReports.length);
    setFeedItems(allItems);
  };

  useFocusEffect(
    useCallback(() => {
      loadFeed();
    }, [])
  );

  const toggleLike = (id) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const addComment = async (itemId) => {
    const savedComments = await AsyncStorage.getItem("comments");
    const comments = savedComments ? JSON.parse(savedComments) : {};

    const newComment = {
      id: Date.now().toString(),
      userId: user?.uid,
      name: displayName,
      text: "Great civic work 👏",
      createdAt: new Date().toISOString(),
    };

    const updated = {
      ...comments,
      [itemId]: [newComment, ...(comments[itemId] || [])],
    };

    await AsyncStorage.setItem("comments", JSON.stringify(updated));

    Alert.alert("Comment added ✅", "Added: Great civic work 👏");
    loadFeed();
  };

  const sharePost = async (item) => {
    try {
      await Share.share({
        message: `Check this civic action on Nagrik 🇮🇳\n\n${
          item.caption || item.description || "Civic contribution"
        }\n\nLet's build better public spaces together.`,
      });
    } catch (error) {
      Alert.alert("Share Error", "Could not share this post.");
    }
  };

  const ActionCard = ({ title, subtitle, icon, route }) => (
    <TouchableOpacity
      onPress={() => router.push(route)}
      style={{
        backgroundColor: colors.card,
        padding: 20,
        borderRadius: 22,
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 30, marginRight: 14 }}>{icon}</Text>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 21, fontWeight: "900", color: colors.text }}>
            {title}
          </Text>

          <Text style={{ color: colors.muted, marginTop: 6 }}>{subtitle}</Text>
        </View>
      </View>

      <Text style={{ fontSize: 28 }}>›</Text>
    </TouchableOpacity>
  );

  const nearbyAlerts = [
    {
      icon: "🚧",
      title: "Garbage issue nearby",
      desc: "One issue reported around Undri area.",
      color: colors.danger,
    },
    {
      icon: "🎯",
      title: "Challenge active",
      desc: "Cleanliness Mission is trending today.",
      color: colors.primary,
    },
    {
      icon: "🔥",
      title: "Streak reminder",
      desc: "Submit proof today to keep your civic streak alive.",
      color: colors.warning,
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 150 }}
    >
      <Text style={{ fontSize: 18, color: colors.muted }}>Welcome Back 👋</Text>

      <Text
        style={{
          fontSize: 34,
          fontWeight: "900",
          color: colors.text,
          marginTop: 4,
        }}
      >
        {displayName}
      </Text>

      <View
        style={{
          backgroundColor: colors.primary,
          padding: 24,
          borderRadius: 24,
          marginTop: 24,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 34, fontWeight: "900" }}>
          Nagrik 🇮🇳
        </Text>

        <Text style={{ color: "#fff", marginTop: 8, fontSize: 16 }}>
          India’s civic action platform.
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 28,
          }}
        >
          <View>
            <Text style={{ color: "#fff", fontSize: 28, fontWeight: "900" }}>
              {totalXP}
            </Text>
            <Text style={{ color: "#fff" }}>Your XP</Text>
          </View>

          <View>
            <Text style={{ color: "#fff", fontSize: 28, fontWeight: "900" }}>
              {feedItems.length}
            </Text>
            <Text style={{ color: "#fff" }}>Feed</Text>
          </View>

          <View>
            <Text style={{ color: "#fff", fontSize: 28, fontWeight: "900" }}>
              {reportsCount}
            </Text>
            <Text style={{ color: "#fff" }}>Reports</Text>
          </View>
        </View>
      </View>

      <Text
        style={{
          fontSize: 26,
          fontWeight: "900",
          color: colors.text,
          marginTop: 30,
        }}
      >
        Nearby Alerts
      </Text>

      {nearbyAlerts.map((alert, index) => (
        <View
          key={index}
          style={{
            backgroundColor: colors.card,
            padding: 18,
            borderRadius: 22,
            marginTop: 14,
            borderLeftWidth: 5,
            borderLeftColor: alert.color,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "900", color: colors.text }}>
            {alert.icon} {alert.title}
          </Text>

          <Text style={{ color: colors.muted, marginTop: 6 }}>
            {alert.desc}
          </Text>
        </View>
      ))}

      <Text
        style={{
          fontSize: 26,
          fontWeight: "900",
          color: colors.text,
          marginTop: 30,
        }}
      >
        Quick Actions
      </Text>

      <View style={{ flexDirection: "row", marginTop: 16 }}>
        <TouchableOpacity
          onPress={() => router.push("/learn")}
          style={{
            flex: 1,
            backgroundColor: colors.card,
            padding: 18,
            borderRadius: 22,
            marginRight: 8,
          }}
        >
          <Text style={{ fontSize: 28 }}>🧠</Text>
          <Text style={{ fontSize: 17, fontWeight: "900", marginTop: 10 }}>
            Learn
          </Text>
          <Text style={{ color: colors.muted, marginTop: 6 }}>
            Civic sense tips
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/report")}
          style={{
            flex: 1,
            backgroundColor: colors.card,
            padding: 18,
            borderRadius: 22,
            marginLeft: 8,
          }}
        >
          <Text style={{ fontSize: 28 }}>🚧</Text>
          <Text style={{ fontSize: 17, fontWeight: "900", marginTop: 10 }}>
            Report
          </Text>
          <Text style={{ color: colors.muted, marginTop: 6 }}>
            Civic issue
          </Text>
        </TouchableOpacity>
      </View>

      <ActionCard
        title="Leaderboard 🏆"
        subtitle="See top civic contributors"
        icon="🏆"
        route="/leaderboard"
      />

      <ActionCard
        title="Civic Assistant 🤖"
        subtitle="Smart civic suggestions"
        icon="🤖"
        route="/assistant"
      />

      <ActionCard
        title="Rewards Store 🎁"
        subtitle="Redeem XP for badges and perks"
        icon="🎁"
        route="/rewards"
      />

      <ActionCard
        title="Notifications 🔔"
        subtitle="Civic alerts and XP updates"
        icon="🔔"
        route="/notifications"
      />

      <ActionCard
        title="Civic Pledge 🇮🇳"
        subtitle="Join the Nagrik movement"
        icon="🇮🇳"
        route="/pledge"
      />

      <View
        style={{
          marginTop: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: "900", color: colors.text }}>
          Civic Feed
        </Text>

        <Text style={{ color: colors.success, fontWeight: "900" }}>
          ● Active
        </Text>
      </View>

      {feedItems.length === 0 ? (
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 22,
            padding: 20,
            marginTop: 18,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "900", color: colors.text }}>
            No feed yet
          </Text>

          <Text style={{ color: colors.muted, marginTop: 8 }}>
            Upload an action or report an issue to begin.
          </Text>
        </View>
      ) : (
        feedItems.map((item) => (
          <View
            key={item.id}
            style={{
              backgroundColor: colors.card,
              borderRadius: 22,
              padding: 18,
              marginTop: 18,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#FFF0E6",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 22 }}>
                    {item.type === "report" ? "🚧" : "👤"}
                  </Text>
                </View>

                <View>
                  <Text style={{ fontSize: 16, fontWeight: "900" }}>
                    {item.name || "Citizen"}
                  </Text>

                  <Text style={{ color: colors.muted }}>
                    {item.city || item.location || "India"}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor:
                    item.type === "report" ? "#FEE2E2" : "#DCFCE7",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                }}
              >
                <Text
                  style={{
                    color:
                      item.type === "report" ? colors.danger : colors.success,
                    fontWeight: "900",
                  }}
                >
                  {item.type === "report"
                    ? "Issue Reported 🚧"
                    : "AI Verified ✅"}
                </Text>
              </View>
            </View>

            <Text
              style={{
                color: colors.primary,
                marginTop: 14,
                fontWeight: "900",
              }}
            >
              {item.type === "report" ? item.issueType : item.category}
            </Text>

            <Text
              style={{
                marginTop: 8,
                fontSize: 16,
                lineHeight: 24,
                color: colors.text,
              }}
            >
              {item.type === "report" ? item.description : item.caption}
            </Text>

            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={{
                  width: "100%",
                  height: 240,
                  borderRadius: 18,
                  marginTop: 16,
                }}
              />
            ) : null}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 18,
              }}
            >
              <TouchableOpacity onPress={() => toggleLike(item.id)}>
                <Text
                  style={{
                    fontWeight: "900",
                    color: likedItems[item.id] ? colors.primary : colors.text,
                  }}
                >
                  {likedItems[item.id] ? "❤️ Liked" : "🤍 Like"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => addComment(item.id)}>
                <Text style={{ fontWeight: "900", color: colors.text }}>
                  💬 {commentCounts[item.id] || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => sharePost(item)}>
                <Text style={{ fontWeight: "900", color: colors.text }}>
                  ↗ Share
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontWeight: "900",
                  color:
                    item.type === "report" ? colors.danger : colors.success,
                }}
              >
                +{item.xp || 0} XP
              </Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}