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
        width: width * 0.65,
        position: "absolute",
    },
    smartScreen: {
        top: height * 0.3, 
        left: width * 0.24, 
        fontSize: width * 0.1, 
        color: Color.colorBlack,
        width: width * 0.6, 
        height: height * 0.1, 
        position: "absolute",
        textAlign: "left",
        fontFamily: FontFamily.amikoRegular,
    },
    byEmnaHomrani: {
        top: height * 0.97, 
        left: width * 0.33, 
        fontSize: FontSize.size_base,
        color: Color.shadesWhite,
        textAlign: "left",
        fontFamily: FontFamily.amikoRegular,
    },
    d65cdf8f27a20fd0ab9be06227bb74Icon: {
        top: height * 0.35, 
        left: width * 0.15, 
        height: height * 0.2, 
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
