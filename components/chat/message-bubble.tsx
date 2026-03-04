import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MessageHeader from "./message-header";

const MessageBubble = ({ message, isOwn, originalUserId, messageDate }: { message: string; isOwn: boolean; originalUserId: string; messageDate: string }) => {
  console.log("Rendering MessageBubble with message:", message, "isOwn:", isOwn, "originalUserId:", originalUserId, "messageDate:", messageDate);
  return (
    <View
      style={[
        styles.container,
        isOwn ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <View style={[styles.messageWrapper, isOwn && styles.messageWrapperRight]}>
        <MessageHeader originalUserId={originalUserId} messageDate={messageDate} />
        <View
          style={[
            styles.bubble,
            isOwn ? styles.rightBubble : styles.leftBubble,
          ]}
        >
          <Text style={[styles.text, isOwn && styles.textRight]}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  leftContainer: {
    justifyContent: "flex-start",
  },
  rightContainer: {
    justifyContent: "flex-end",
  },
  messageWrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
  },
  messageWrapperRight: {
    alignItems: "flex-end",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  senderName: {
    fontSize: 12,
    color: "#666",
  },
  messageDate: {
    fontSize: 10,
    color: "#999",
  },
  bubble: {
    padding: 10,
    borderRadius: 15,
  },
  leftBubble: {
    backgroundColor: "#e5e5ea",
    borderTopLeftRadius: 0,
  },
  rightBubble: {
    backgroundColor: "#007AFF",
    borderTopRightRadius: 0,
  },
  text: {
    color: "#000",
    flexWrap: "wrap",
  },
  textRight: {
    color: "#fff",
  },
});

export default MessageBubble;