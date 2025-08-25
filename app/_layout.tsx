import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "./components/InitialLayout";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  // update the native navigation bar on Android.
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#000000");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    console.log(
      "onLayout triggered, fontsLoaded:",
      fontsLoaded,
      "fontError:",
      fontError
    );
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    } else if (fontError) {
      console.error("Font loading error:", fontError);
      // Fallback: hide splash screen after 5 seconds
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 5000);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null; // Prevent rendering until fonts are loaded or an error occurs
  }

  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "white" }}
          onLayout={onLayoutRootView}
        >
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </ClerkAndConvexProvider>
  );
}
