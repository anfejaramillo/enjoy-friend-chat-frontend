import React from "react";

//var initialLoad = useRef(true);
//var socket = useRef<WebSocket | null>(null);
//const myConnectionIdRef = useRef<string | null>(null); // Ref to store the current user's connection ID
export function initializeWebSocket(
    setMessages: React.Dispatch<React.SetStateAction<Array<{ messageId: string; text: string; userId: string, groupId: string, date: string }>>>,
    groupId: string,
    initialLoad: React.RefObject<boolean>,
    socket: React.RefObject<WebSocket | null>,
    myConnectionIdRef: React.RefObject<string | null>
)
    : WebSocket {
    // WebSocket connection URL
    const webSocketURL = process.env.EXPO_PUBLIC_WS_SERVER_API_URL || 'ws://localhost:3001';
    // Create a new WebSocket instance
    if (!socket.current || socket.current.readyState === WebSocket.CLOSED) {
        socket.current = new WebSocket(webSocketURL);

        socket.current.onopen = () => {
            console.log('WebSocket connected.');
            if (initialLoad.current) {
                //console.log("Requesting messages for groupId:", groupId);
                socket.current?.send(JSON.stringify({
                    //type: "getMessagesByGroupId",
                    action: "getMessagesByGroupId",
                    payload: {
                        groupId: groupId
                    },
                } as any));
                initialLoad.current = false; // Set to false after the initial load
            }
        };

        // Event handler for when the WebSocket receives a message
        socket.current.onmessage = (event) => {
            //Here come the connection ID
            console.log("WebSocket message received:", event);
            // Parse the received message
            const data = JSON.parse(event.data);

            if (data.connectionId) {
                myConnectionIdRef.current =
                    myConnectionIdRef.current || data.connectionId;
            }
            switch (data.type) {
                case "newMessage":
                    // Update the state with the new message
                    setMessages((prev) => {
                        console.log("prev messages:", prev);
                        console.log("Received new message:", data.payload);
                        return [data.payload, ...prev]
                    }
                    );
                    break;
                case "getMessagesByGroupId":
                    // Update the state with the messages for the group
                    if (!data.payload || !Array.isArray(data.payload)) {
                        console.warn("Received invalid payload for getMessagesByGroupId:", data.payload);
                        break;
                    }
                    //console.log("Received messages for group:", data.payload);
                    let orderedMessages = data.payload.sort((a: any, b: any) => Number.parseInt(b.date) - Number.parseInt(a.date));
                    //console.log("Ordered messages:", orderedMessages);
                    setMessages(orderedMessages);
                    // setMessages(data.payload);
                    break;
                default:
                    console.warn('Unknown message type:', data.type);
            }
        };

        // Event handler for WebSocket errors
        socket.current.onerror = (error) => {
            console.log('WebSocket error:', error);
        };
    }
    return socket.current;
}
