import { Image } from 'expo-image';
import { Button, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const [groupId, setGroupId] = useState<string>('');

  const goToChat = (id: string) => {
    if (!id) {
      alert('Please enter a valid group ID or choose a sample group.');
      return;
    }

    // Navigate to the dynamic chat route using the groupId as a param
    // This pushes to `/chat/[groupId]` and supplies the param so the chat page can read it
    router.push(
      {
        pathname: '/chat',
        params: { groupId: id }
      }
    );
  };

  const sampleGroups = ['friends', 'react-native', 'general'];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Enjoy Chat Friends — Overview</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">What this project does</ThemedText>
        <ThemedText>
          This is a small, serverless chat demo built with Expo and React Native. Key features:
        </ThemedText>
        <ThemedText>- Real-time messaging via WebSocket abstraction.</ThemedText>
        <ThemedText>- Per-group chat rooms identified by a groupId.</ThemedText>
        <ThemedText>- Message bubbles with sender names, timestamps and responsive wrapping.</ThemedText>
        <ThemedText>- Cross-platform UI using themed components and Expo Router for navigation.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">How to join a chat</ThemedText>
        <ThemedText>
          Enter a Group ID below (any short string) and tap "Join". You can also tap one of the sample groups.
        </ThemedText>

        <View style={styles.joinRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter Group ID (e.g. friends)"
            placeholderTextColor="gray"
            value={groupId}
            onChangeText={setGroupId}
          />
          <Button title="Join" onPress={() => goToChat(groupId)} />
        </View>

        <View style={styles.sampleList}>
          {sampleGroups.map((g) => (
            <Pressable key={g} onPress={() => goToChat(g)} style={styles.sampleButton}>
              <ThemedText style={styles.sampleButtonText}>{`Open chat: ${g}`}</ThemedText>
            </Pressable>
          ))}
        </View>
      </ThemedView>


      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Security considerations</ThemedText>
        <ThemedText>
          The content of your chat messages is stored and is avialable to be find FOR ANYONE that put the same GroupID that you just put.
          Do not share confidential information in the chat, as it is not private and is only meant for demonstration purposes. 
          The serverless backend is designed for simplicity and does not implement authentication or access controls for the shared messages.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Developer notes</ThemedText>
        <ThemedText>
          The chat route is implemented under `app/chat?groupId=X`. The chat page receives the
          `groupId` param from the router and uses it to join the correct WebSocket channel.
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  section: {
    gap: 8,
    marginBottom: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  joinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  sampleList: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  sampleButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#e5e5ea',
    borderRadius: 8,
    marginRight: 8,
    color: '#333',
  },
  sampleButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: 'lightgray',
  },
});
