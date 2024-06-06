import { View, Pressable, Text } from "react-native";

export default function Button({ label, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}
