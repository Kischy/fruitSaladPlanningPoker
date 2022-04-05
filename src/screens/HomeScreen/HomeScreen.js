import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
} from "react-native";
import { TopBar, Button } from "../../components";
import {
  createNewRoom,
  addUserToExistingRoom,
} from "../../firebase/callFirebaseCloudFunctions";
import Colors from "./../../colors/colors";

export default function HomeScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [inputRoomCode, setInputRoomKey] = useState("");
  const fontSizeScale = 0.5 * (height + width);

  const buttonWidth = width * 0.2;
  const buttonHeigth = height * 0.1;

  return (
    <View style={[styles.container, { width: width, height: height }]}>
      <StatusBar style="auto" />
      <TopBar
        style={{ height: height * 0.1, width: width }}
        navigation={navigation}
      />
      <View style={styles.containerBody}>
        <Text style={[styles.textBody, { fontSize: fontSizeScale * 0.025 }]}>
          🍇🍏🍒🍍🍉🍅🥑
        </Text>
        <Text style={[styles.textBody, { fontSize: fontSizeScale * 0.05 }]}>
          Fruit salad planning poker for agile developpement
        </Text>
        <Text style={[styles.textBody, { fontSize: fontSizeScale * 0.025 }]}>
          🍇🍏🍒🍍🍉🍅🥑
        </Text>
      </View>
      <View style={styles.containerButtons}>
        <Button
          style={{ height: buttonHeigth, width: buttonWidth }}
          title={"Create new room"}
          onPress={async () => {
            const roomCode = await createNewRoom();
            navigation.navigate("Room", { roomCode: roomCode });
          }}
        />
        <View style={styles.containerJoinRoom}>
          <Button
            style={{ height: buttonHeigth, width: buttonWidth }}
            title={"Join room"}
            onPress={async () => {
              await addUserToExistingRoom(inputRoomCode);
              navigation.navigate("Room", { roomCode: inputRoomCode });
            }}
          />
          <TextInput
            style={[
              styles.joinRoomInput,
              {
                height: buttonHeigth,
                width: buttonWidth * 1.5,
                fontSize: fontSizeScale * 0.02,
              },
            ]}
            placeholder="Enter room code"
            onChangeText={(text) => {
              setInputRoomKey(text);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    padding: "2.5%",
  },
  containerBody: {
    width: "100%",
    paddingTop: "5%",
    paddingLeft: "15%",
  },
  containerButtons: {
    paddingTop: "1%",
    alignItems: "center",
  },
  containerJoinRoom: {
    paddingTop: "1%",
    alignItems: "center",
    flexDirection: "row",
  },
  joinRoomInput: {
    paddingLeft: "1%",
    borderWidth: 3,
    borderRadius: 4,
    elevation: 3,
    borderColor: Colors.forestGreen,
  },
  textBody: {
    fontFamily: "Roboto_700Bold",
  },
});
