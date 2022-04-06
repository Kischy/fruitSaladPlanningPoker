import React from "react";
import { StyleSheet, View } from "react-native";
import Logo from "../logo/Logo";
import Button from "../Button/Button";

export default function TopBar(props) {
  let height = props.style.height;
  let width = props.style.width;
  let logoDim = (height + width * 0.025) * 0.8;

  return (
    <View style={styles.container}>
      <Logo style={{ height: logoDim }} navigation={props.navigation} />
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
});
