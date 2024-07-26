import * as React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Color, FontSize, Border } from "./GlobalStyles";

const { width, height } = Dimensions.get('window');

const Launch = () => {
  const navigation = useNavigation();
  useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate('Home');
      }, 1500);
      return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.launch}>
            <Text style={[styles.smartScreen, styles.smartScreenTypo]}>Smart Screen</Text>
            <Text style={[styles.byEmnaHomrani, styles.byEmnaHomraniLayout]}>
                By Emna Homrani
            </Text>
            <Image
                style={[
                    styles.d65cdf8f27a20fd0ab9be06227bb74Icon,
                    styles.byEmnaHomraniLayout,
                ]}
                contentFit="cover"
                source={require("../assets/logos.png")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    smartScreenTypo: {
        textAlign: "left",
        fontFamily: FontFamily.amikoRegular,
    },
    byEmnaHomraniLayout: {
        width: width * 0.65, // Adjust width relative to screen width
        position: "absolute",
    },
    smartScreen: {
        top: height * 0.3, // Adjust top relative to screen height
        left: width * 0.24, // Adjust left relative to screen width
        fontSize: width * 0.1, // Adjust font size relative to screen width
        color: Color.colorBlack,
        width: width * 0.6, // Adjust width relative to screen width
        height: height * 0.1, // Adjust height relative to screen height
        position: "absolute",
        textAlign: "left",
        fontFamily: FontFamily.amikoRegular,
    },
    byEmnaHomrani: {
        top: height * 0.97, // Adjust top relative to screen height
        left: width * 0.33, // Adjust left relative to screen width
        fontSize: FontSize.size_base,
        color: Color.shadesWhite,
        textAlign: "left",
        fontFamily: FontFamily.amikoRegular,
    },
    d65cdf8f27a20fd0ab9be06227bb74Icon: {
        top: height * 0.35, // Adjust top relative to screen height
        left: width * 0.15, // Adjust left relative to screen width
        height: height * 0.2, // Adjust height relative to screen height
    },
    launch: {
        flex: 1,
        borderRadius: Border.br_xl,
        backgroundColor: "#AF6A00",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Launch;
