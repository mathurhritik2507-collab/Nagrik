import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen() {
  const [permissionStatus, setPermissionStatus] = useState("checking");

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const settings = await Notifications.getPermissionsAsync();
    setPermissionStatus(settings.status);
  };

  const requestPermission = async () => {
    if (!Device.isDevice) {
      Alert.alert("Physical device needed", "Notifications work best on a real phone.");
      return;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionStatus(status);

    if (status === "granted") {
      Alert.alert("Notifications Enabled ✅", "Nagrik can now remind you.");
    } else {
      Alert.alert("Permission denied", "Please enable notifications from settings.");
    }
  };

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nagrik Reminder 🇮🇳",
        body: "Take one small civic action today and keep your streak alive!",
        sound: true,
      },
      trigger: {
        seconds: 3,
      },
    });

    Alert.alert("Test Sent ✅", "You’ll receive a notification in 3 seconds.");
  };

  const scheduleDailyReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Daily Civic Challenge 🎯",
        body: "Complete one verified challenge today and grow your civic streak.",
        sound: true,
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
      },
    });

    Alert.alert("Daily Reminder Set ✅", "You’ll get a reminder every day at 9:00 AM.");
  };

  const scheduleEveningReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Nagrik Check-in 🔔",
        body: "Did you upload, report, learn, or complete a civic challenge today?",
        sound: true,
      },
      trigger: {
        hour: 19,
        minute: 0,
        repeats: true,
      },
    });

    Alert.alert("Evening Reminder Set ✅", "You’ll get a reminder every day at 7:00 PM.");
  };

  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert("Notifications Cancelled", "All Nagrik reminders were cancelled.");
  };

  const items = [
    {
      icon: "🔥",
      title: "Streak reminder",
      message: "Daily nudges help users return and complete real civic work.",
      color: colors.primary,
    },
    {
      icon: "🎯",
      title: "Challenge reminder",
      message: "Users are reminded to submit photo proof instead of just clicking complete.",
      color: colors.warning,
    },
    {
      icon: "🤖",
      title: "AI civic suggestion",
      message: "Future push notifications can suggest nearby civic actions.",
      color: colors.success,
    },
    {
      icon: "🚧",
      title: "Issue follow-up",
      message: "Users can be reminded about their pending reports.",
      color: colors.danger,
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 140 }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          padding: 26,
          borderRadius: 28,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 34, fontWeight: "900" }}>
          Notifications 🔔
        </Text>

        <Text style={{ color: "#fff", marginTop: 10, fontSize: 16 }}>
          Civic alerts, reminders, XP nudges, and challenge motivation.
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
          Notification Permission
        </Text>

        <Text style={{ color: colors.muted, marginTop: 8 }}>
          Current status: {permissionStatus}
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: colors.primary,
            padding: 16,
            borderRadius: 18,
            alignItems: "center",
            marginTop: 18,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "900", fontSize: 16 }}>
            Enable Notifications
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "900",
          color: colors.text,
          marginTop: 30,
        }}
      >
        Reminder Actions
      </Text>

      <TouchableOpacity
        onPress={sendTestNotification}
        style={{
          backgroundColor: colors.card,
          padding: 20,
          borderRadius: 22,
          marginTop: 18,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "900", color: colors.text }}>
          Send Test Notification
        </Text>
        <Text style={{ color: colors.muted, marginTop: 8 }}>
          Sends a notification after 3 seconds.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={scheduleDailyReminder}
        style={{
          backgroundColor: colors.card,
          padding: 20,
          borderRadius: 22,
          marginTop: 18,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "900", color: colors.text }}>
          Set Daily Challenge Reminder
        </Text>
        <Text style={{ color: colors.muted, marginTop: 8 }}>
          Every day at 9:00 AM.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={scheduleEveningReminder}
        style={{
          backgroundColor: colors.card,
          padding: 20,
          borderRadius: 22,
          marginTop: 18,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "900", color: colors.text }}>
          Set Evening Civic Check-in
        </Text>
        <Text style={{ color: colors.muted, marginTop: 8 }}>
          Every day at 7:00 PM.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={cancelAllNotifications}
        style={{
          backgroundColor: "#FEE2E2",
          padding: 20,
          borderRadius: 22,
          marginTop: 18,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "900", color: colors.danger }}>
          Cancel All Reminders
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "900",
          color: colors.text,
          marginTop: 30,
        }}
      >
        Why Notifications Matter
      </Text>

      {items.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: colors.card,
            borderRadius: 24,
            padding: 20,
            marginTop: 18,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: "#FFF0E6",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 14,
            }}
          >
            <Text style={{ fontSize: 26 }}>{item.icon}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
                color: colors.text,
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                color: colors.muted,
                marginTop: 6,
                lineHeight: 21,
              }}
            >
              {item.message}
            </Text>

            <Text
              style={{
                color: item.color,
                fontWeight: "900",
                marginTop: 10,
              }}
            >
              Engagement Feature
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}