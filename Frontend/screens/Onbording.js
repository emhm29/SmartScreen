import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from 'expo-image';

import { Border, Color, FontSize, FontFamily } from "./GlobalStyles";

const Onbording = () => {
  return (
    <View style={styles.onboard1}>
      <View style={[styles.onboard1Inner, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupChildPosition]} />
      </View>
      <Image
        style={styles.faa2946ebd7b68913d9f350b81991dIcon}
        contentFit="cover"
        source={require("../assets/57faa2946ebd7b68913d9f350b81991d-1.png")}
      />
      <Text style={styles.bienvenueSurNotre}>
        Bienvenue sur notre application ! Scannez facilement vos documents avec
        la caméra de votre smartphone et convertissez-les instantanément en PDF
        de haute qualité
      </Text>
      <View style={[styles.lifeIsShortAndTheWorldIsParent, styles.lifeLayout]}>
        <Text style={[styles.lifeIsShortContainer, styles.lifeLayout]}>
          <Text
            style={styles.lifeIsShort}
          >{`Life is short and the world is `}</Text>
          <Text style={styles.wide}>wide</Text>
        </Text>
        <Image
          style={styles.groupItem}
          contentFit="cover"
          source={require("../assets/vector-2524.png")}
        />
      </View>
      <Text style={styles.commencer}>Commencer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 56,
    width: 335,
    position: "absolute",
  },
  groupChildPosition: {
    left: -4,
    top: 0,
    backgroundColor: "#AF6A00",
     borderRadius: 20,
  },
  lifeLayout: {
    width: 309,
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_base,
    backgroundColor: Color.colorDarkgoldenrod,
    height: 56,
    width: 335,
    position: "absolute",
  },
  onboard1Inner: {
    top: 718,
    left: 20,
  },
  faa2946ebd7b68913d9f350b81991dIcon: {
    left: 0,
    borderRadius: 41,
    width: 365,
    height: 452,
    top: -20,
    position: "absolute",
  },
  bienvenueSurNotre: {
    top: 548,
    left: 55,
    fontSize: FontSize.size_lg,
    lineHeight: 24,
    fontFamily: FontFamily.amikoRegular,
    color: Color.colorBlack,
    width: 250,
    height: 560,
    textAlign: "center",
    position: "absolute",
  },
  lifeIsShort: {
    color: "#1b1e28",
  },
  wide: {
    color: "#ff7029",
  },
  lifeIsShortContainer: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    fontFamily: FontFamily.geometr415BlkBT,
    textAlign: "center",
    left: -2,
    top: 0,
  },
  groupItem: {
    top: 73,
    left: 180,
    width: 63,
    height: 11,
    position: "absolute",
  },
  lifeIsShortAndTheWorldIsParent: {
    top: 443,
    left: 33,
    height: 84,
  },
  commencer: {
    top: 736,
    left: 147,
    fontSize: FontSize.size_base,
    lineHeight: 20,
    fontFamily: FontFamily.interRegular,
    color: Color.shadesWhite,
    textAlign: "center",
    position: "absolute",
    color:"white"
        
  },
  onboard1: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.shadesWhite,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default Onbording;