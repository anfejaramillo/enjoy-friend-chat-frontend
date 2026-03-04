import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MessageBubble from "./message-bubble";

interface MessagesContainerProps {
  messages: Array<{ messageId: string; text: string; userId: string, groupId: string, date: string }>;
  currentUserId: string;
}

const MessagesContainer = ({ messages, currentUserId }: MessagesContainerProps) => {
  console.log("Rendering MessagesContainer with messages:", messages);
  console.log("Current user ID:", currentUserId);
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.messageId}
        renderItem={({ item }) => (
          <MessageBubble
            message={item.text}
            isOwn={item.userId === currentUserId}
            originalUserId={item.userId}
            messageDate={new Date(Number.parseInt(item.date)).toLocaleString()} // Format the date as needed
          />
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
        inverted // newest messages at bottom
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});

export default MessagesContainer;