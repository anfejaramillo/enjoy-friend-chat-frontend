import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MessageBubble = ({ message, isOwn }: { message: string; isOwn: boolean }) => {
  return (
    <View
      style={[
        styles.container,
        isOwn ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isOwn ? styles.rightBubble : styles.leftBubble,
        ]}
      >
        <Text style={styles.text}>{message}</Text>
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
  bubble: {
    maxWidth: "75%",
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
    color: "#fff",
  },
  text: {
    color: "#000",
  },
});

export default MessageBubble;