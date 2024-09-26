import { Button, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

const Page = () => {
  const router = useRouter();
  const onPressButton = () => {
    router.replace('/(tabs)')
  }
  return (
    <Pressable
      style={styles.container}

    >
      <ImageBackground
        source={require('@/assets/images/getting-started.jpg')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <StatusBar 
          barStyle={"light-content"}
        />
        <View style={styles.wrapper}>
          <Animated.Text
            entering={FadeInRight.delay(300).duration(500)}  
            style={styles.title}>Stay Updated!</Animated.Text>
          <Animated.Text 
            entering={FadeInRight.delay(700).duration(500)}
            style={styles.description}>
            Get breaking news and persionalized updates directly to your feed.
          </Animated.Text>
          <Animated.View
            entering={FadeInDown.delay(1200)}
          >
            <TouchableOpacity
              style={styles.btn}
              onPress={onPressButton}
            >
              <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: 'center'
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: 'center'
  },
  btn: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    marginVertical: 20,
    alignItems: 'center',
    borderRadius: 15
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700'
  }
});
