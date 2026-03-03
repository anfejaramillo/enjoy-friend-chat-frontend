import { Image } from 'expo-image';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomeScreen() {

  const router = useRouter();

  const [groupId, setGroupId] = useState<string | null>(null); // Simulate group ID state

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
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it!</ThemedText>
        <ThemedText>
          Fill the "Group Name" to join to group's chat!!!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore through Click on Join button!</ThemedText>
        <ThemedText>
          Group Name to join to their chat:
          <View>
            <TextInput style={styles.input} placeholder="Enter Group Name" placeholderTextColor="gray" value={groupId || ''} onChangeText={setGroupId} />
            <Button title={"Join"} onPress={() => {
              if (groupId) {
                router.push({
                  pathname: "/chat/[groupId]",
                  params: { "groupId" : groupId }
                })
              }else{
                alert("Please enter a group name to join the chat.");
              }
            }}></Button>
          </View>
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 8,
    backgroundColor: 'lightgray',
    borderBlockColor: 'gray'
  }
});
