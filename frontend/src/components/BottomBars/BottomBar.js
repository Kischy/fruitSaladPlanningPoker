import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Linking,
  Image
} from "react-native";
import { Pressable } from "react-native-web";
import Colors from "./../../colors/colors";

export default function BottomBar(props ) {
  const navigation = props.navigation;
  const height = props.style.height;
  const width = props.style.width;
  const fontSizeScale = 0.55 * (height + width);
  return (
    <View style={styles.containerBottom}>
      <Pressable style={styles.gitHubLinkPressable} onPress={() => {Linking.openURL('https://github.com/Kischy/fruitSaladPlanningPoker')}}>
        <Text style={[styles.textBottom, { fontSize: fontSizeScale * 0.011, marginRight: "0.3em" }]}>
          Visit this project on Github 
        </Text>
        <Image
            style={{
              height: height * 0.015,
              width: height  * 0.015,
            }}
            source={require("./img/GitHub-Mark-32px.png")}
          />
      </Pressable>
      <Pressable style={styles.linkToPrivacyStatement} onPress={() => {navigation.navigate("PrivacyPolicy");}} >
          <Text style={[styles.textBottom, { fontSize: fontSizeScale * 0.011, marginRight: "0.3em" }]}>
            Privacy statement
          </Text>
        </Pressable>
    </View>
      );
}

const styles = StyleSheet.create({

  containerBottom: {
    justifyContent:"space-between",
    marginTop: "auto",
    flexDirection: "row",
    backgroundColor: Colors.backgroundGreyTone,
  },
  gitHubLinkPressable: {
    flexDirection: "row",
    alignItems: "center",  
  },
  linkToPrivacyStatement: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",  
  },
  textBottom: {
    fontFamily: "Roboto_400Regular",
    color: Colors.forestGreen,
    textAlign: 'center',
  },
  containerBottomText: {
  },

});
