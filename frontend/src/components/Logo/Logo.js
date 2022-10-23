import React from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import Colors from "../../colors/colors";

export default function Logo(props) {
  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate("Home");
      }}
    >
      <View style={styles.container}>
        <Image
          style={{
            width: props.style.height,
            height: props.style.height,
            backgroundColor: Colors.backgroundGrey,
          }}
          source={require("./img/fruit.png")}
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.loveAgileText,
              { fontSize: props.style.height * 0.4 },
            ]}
          >
            I love agile
          </Text>
          <Text
            style={[
              styles.fruitPlaningPokerText,
              { fontSize: props.style.height * 0.25 },
            ]}
          >
            Fruit salad planing poker
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center"
  },
  textContainer: {
    paddingLeft: "2%",
    flexDirection: "column",
  },
  loveAgileText: {
    fontFamily: "RobotoMono_400Regular",
    height: "70%",
    color: Colors.textRed,
  },

  fruitPlaningPokerText: {
    fontFamily: "Roboto_400Regular",
    height: "30%",
    color: Colors.forestGreen,
  },
});
