import React from "react";
import { StyleSheet, Text, View } from "react-native";


const MessageHeader = ({ originalUserId, messageDate }: { originalUserId: string; messageDate: string }) => {
    console.log("Rendering MessageHeader with originalUserId:", originalUserId, "and messageDate:", messageDate);
    return (
        <View style={styles.headerRow}>
            <Text style={styles.senderName}>{originalUserId ? originalUserId.substring(0, 5) : "Unknown User"}</Text>
            <Text style={styles.messageDate}>{messageDate}</Text>
        </View>
    );
}
const styles = StyleSheet.create({

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
    }
});

export default MessageHeader;