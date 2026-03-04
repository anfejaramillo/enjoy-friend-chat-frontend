// import { Image } from 'expo-image';

// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';

import MessageBar from "@/components/chat/message-bar";
import MessagesContainer from "@/components/chat/message-container";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { initializeWebSocket } from "@/assets/scripts/wsHandler";
import { useLocalSearchParams } from 'expo-router';

import { v4 as uuid } from 'uuid';

const ChatScreen = () => {
  //Initialize refVariables
  var initialLoad = useRef(true);
  var socket = useRef<WebSocket | null>(null);
  var myConnectionIdRef = useRef<string | null>(null); // Ref to store the current user's connection ID
  // Destructure the parameters directly
  let { groupId } = useLocalSearchParams();
  groupId = Array.isArray(groupId) ? groupId[0] : groupId; // Ensure groupId is a string

  console.log("Received groupId from params:", groupId);

  if (!groupId) {
    groupId = "default-group"; // Fallback to a default group ID if not provided
    console.warn("No groupId provided in params. Using default group ID:", groupId);
  }

  const currentUserId = useRef(uuid()); // Simulate current user ID
  // State to hold the real-time data received from the WebSocket
  const [messages, setMessages] = useState<Array<{ messageId: string; text: string; userId: string, groupId: string, date: string }>>([
    //{ id: 1, text: "Hello!", userId: currentUserId },
  ]);

  socket.current = initializeWebSocket(setMessages, groupId, initialLoad, socket, myConnectionIdRef); // Initialize WebSocket and pass the state updater

  const handleSend = (text: string) => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN && text.trim() !== "") {
      const newMessage = {
        messageId: uuid(),
        text,
        userId: currentUserId.current,
        groupId: groupId, // Include the groupId in the message
        date: new Date().getTime().toString(), // Add a date field for sorting
      };

      const messageToSend = {
        action: "newMessage",
        payload: newMessage,
      };
      //console.log("Sending message:", messageToSend);
      socket.current.send(JSON.stringify(messageToSend)); // Send the new message to the server
      setMessages((prev) => {
        return [newMessage, ...prev]
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>Welcome to chat: {groupId}</Text>
      </View>
      <MessagesContainer
        messages={messages}
        currentUserId={currentUserId.current}
      />
      <MessageBar onSend={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    height: 60,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0051a8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
