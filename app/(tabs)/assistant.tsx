import React, { useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const colors = {
  primary: "#FF6B00",
  background: "#F7F8FA",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  success: "#16A34A",
  border: "#E5E7EB",
};

export default function AssistantScreen() {
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Namaste 👋 I’m your Nagrik Civic Assistant. Ask me how to improve your civic score, what action to do today, or how to report an issue.",
    },
  ]);

  const getAIReply = (input) => {
    const text = input.toLowerCase();

    if (text.includes("score") || text.includes("xp")) {
      return "To improve your Civic Score, complete one challenge, upload one civic action with a clear photo, and report one real issue nearby. This gives you XP from multiple areas and improves your impact faster.";
    }

    if (text.includes("report") || text.includes("issue") || text.includes("garbage") || text.includes("pothole")) {
      return "You should report the issue with location, short description, and a clear photo. Example: 'Garbage dump near FC Road bus stop causing smell and traffic.' This makes the report useful for review.";
    }

    if (text.includes("today") || text.includes("action")) {
      return "Today’s best civic action: choose one small visible task — clean litter near your building, help someone follow traffic rules, water a public plant, or report one unsafe area.";
    }

    if (text.includes("learn") || text.includes("civic")) {
      return "Civic sense means respecting shared public spaces. Start with simple habits: don’t litter, follow signals, avoid unnecessary honking, save water, and report public issues responsibly.";
    }

    if (text.includes("leaderboard") || text.includes("rank")) {
      return "To climb the leaderboard, focus on consistency. Upload civic actions, complete daily challenges, and maintain your streak. Small daily actions matter more than one big action.";
    }

    if (text.includes("reward") || text.includes("badge")) {
      return "Rewards and badges are unlocked through XP. Keep uploading genuine civic actions and completing challenges. Future versions can connect these rewards with local brand partners.";
    }

    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return "Hello! 👋 I can help you decide what civic action to take, how to report an issue, or how to grow your Nagrik profile.";
    }

    return "Good question. My suggestion: take one small real civic action, document it clearly, and stay consistent. Nagrik is about building better public habits through daily action.";
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      text: message.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setTyping(true);
    Keyboard.dismiss();

    setTimeout(() => {
      const aiReply = {
        role: "ai",
        text: getAIReply(userMessage.text),
      };

      setMessages((prev) => [...prev, aiReply]);
      setTyping(false);
    }, 900);
  };

  const quickPrompt = (text) => {
    setMessage(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{
              padding: 20,
              paddingBottom: 170,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                backgroundColor: colors.primary,
                padding: 26,
                borderRadius: 28,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 32, fontWeight: "900" }}>
                Civic Assistant 🤖
              </Text>

              <Text
                style={{
                  color: "#fff",
                  marginTop: 10,
                  fontSize: 16,
                  lineHeight: 22,
                }}
              >
                Ask anything about civic actions, reports, XP, rewards, and public behavior.
              </Text>
            </View>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "900",
                color: colors.text,
                marginTop: 26,
              }}
            >
              Quick Questions
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 14 }}
            >
              {[
                "How do I improve my civic score?",
                "What action should I do today?",
                "How do I report garbage?",
                "How to climb leaderboard?",
              ].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => quickPrompt(item)}
                  style={{
                    backgroundColor: "#FFF0E6",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 999,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: colors.primary, fontWeight: "900" }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text
              style={{
                fontSize: 24,
                fontWeight: "900",
                color: colors.text,
                marginTop: 28,
              }}
            >
              Chat
            </Text>

            {messages.map((item, index) => (
              <View
                key={index}
                style={{
                  alignSelf: item.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    item.role === "user" ? colors.primary : colors.card,
                  padding: 15,
                  borderRadius: 20,
                  marginTop: 14,
                  maxWidth: "85%",
                }}
              >
                <Text
                  style={{
                    color: item.role === "user" ? "#fff" : colors.text,
                    lineHeight: 22,
                    fontSize: 15,
                    fontWeight: item.role === "user" ? "800" : "600",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            ))}

            {typing ? (
              <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: colors.card,
                  padding: 15,
                  borderRadius: 20,
                  marginTop: 14,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator color={colors.primary} />
                <Text style={{ color: colors.muted, marginLeft: 10 }}>
                  Nagrik AI is thinking...
                </Text>
              </View>
            ) : null}
          </ScrollView>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#fff",
              padding: 14,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Ask Nagrik AI..."
              placeholderTextColor={colors.muted}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 999,
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginRight: 10,
                backgroundColor: "#F9FAFB",
              }}
            />

            <TouchableOpacity
              onPress={sendMessage}
              style={{
                backgroundColor: colors.primary,
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20, fontWeight: "900" }}>
                ↑
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}