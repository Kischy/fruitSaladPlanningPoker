import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Logo from "../Logo/Logo";
import Colors from "./../../colors/colors";


export default function TopBar(props) {
  const height = props.style.height;
  const width = props.style.width;
  const logoDim = (height + width * 0.025) * 0.8;
  const  mainText =  props.text === undefined ? null : props.text;
  const subText = props.subText === undefined ? null : props.subText;

  const renderAddText = () => {
    if(mainText === null) return [];
    if(subText === null) return []
    return (
      <View>
       <Text style={[styles.mainText, { fontSize: props.style.height * 0.4 }]}>{mainText}</Text>
       <Text style={[styles.subText, { fontSize: props.style.height * 0.25 }]}>{subText}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Logo style={{ height: logoDim }} navigation={props.navigation} />
      {renderAddText()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  mainText: {
    fontFamily: "RobotoMono_400Regular",
    height: "70%",
    color: Colors.textRed,
  },
  subText: {
    fontFamily: "Roboto_400Regular",
    height: "30%",
    color: Colors.forestGreen,
  },
});
