import React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import { TopBar, BottomBar } from "../../components";
import Colors from "./../../colors/colors";


export default function NotFoundScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const fontSizeScale = 0.5 * (height + width);
  const fontSizeHeader = fontSizeScale * 0.0175;

  const stylesInner = StyleSheet.create({
    headerText: {
      fontFamily: "Roboto_700Bold",
      marginBottom: "0.5em",
      fontSize: fontSizeHeader,
      color:Colors.textRed
    },
  });
  

  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <StatusBar style="auto" />
      <TopBar
        style={{ height: height * 0.1, width: width }}
        navigation={navigation}
      />
      <View style={styles.containerBody}>
        <Text style={stylesInner.headerText}>The page or room could not be found.</Text>
      </View>
      <BottomBar         
            style={{ height: height, width: width }}
            navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingTop: StatusBar.currentHeight,
    padding: "2.5%",
    flexDirection: "column",
    display: "flex",
    backgroundColor: Colors.backgroundGreyTone,
  },
  containerBody: {
    width: "100%",
    paddingTop: "2.5%",
    paddingLeft: "5%",
  },
});
