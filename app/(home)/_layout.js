import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Colors } from "../../src/components/styled";

const { brand, brandLight } = Colors;

export default function HomeLayout() {
  return (
    <Tabs
      initialRouteName="(user)"
      screenOptions={{
        tabBarActiveTintColor: brand,
        tabBarInactiveTintColor: brandLight,
      }}
    >
      <Tabs.Screen
        name="(user)"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="measures"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bars" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comment" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
