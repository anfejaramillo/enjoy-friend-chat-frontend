import { RecordingPresets } from 'expo-audio';
import { Platform } from 'react-native';

export const Recording = Platform.select({
  default: {
    RecordingPresets: RecordingPresets.LOW_QUALITY
  }
});
