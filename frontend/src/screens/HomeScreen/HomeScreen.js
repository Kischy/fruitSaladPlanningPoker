import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  Modal,
  Pressable
} from "react-native";
import { TopBar, Button, BottomBar } from "../../components";
import {
  createNewRoom,
} from "../../firebase/callFirebaseCloudFunctions";
import Colors from "./../../colors/colors";

export default function HomeScreen({ navigation }) {
  const { height, width } = useWindowDimensions();
  const [inputRoomCode, setInputRoomKey] = useState("");
  const [inputCards, setInputCards] = useState("");
  const [roomDialogVisible, setRoomDialogVisible] = useState(false);
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

      <Modal
        animationType={"slide"}
        transparent={false}
        visible={roomDialogVisible}
        onRequestClose={() => { setRoomDialogVisible(false); }}
      >
        <View style={[styles.closeModalView]}>
            <Pressable onPress={() => setRoomDialogVisible(false)}>
              <Text style={{fontSize: fontSizeScale * 0.025, color: Colors.forestGreen }} >X</Text>
            </Pressable>
        </View> 
        <View style={[styles.modalView]}> 
          <Text style={[styles.textBody, { fontSize: fontSizeScale * 0.025 }]}>Create new room</Text>
          <View style={{ padding: "1%", flexDirection: "row" }}>
            <Button
              style={{ height: buttonHeigth / 2, width: buttonWidth * 0.75 }}
              title={"Standard fruit"}
              onPress={() => {
                setInputCards("🍇, 🍏 ,🍒 ,🍍 ,🍉 ,🍅 , 🥑");
              }}
            />
            <Button
              style={{ height: buttonHeigth / 2, width: buttonWidth * 0.75 }}
              title={"Fibonacci"}
              onPress={() => {
                setInputCards("0, 1, 2, 3, 5, 8, 13, 21, 34, ?");
              }}
            />
          </View>
          <TextInput
            style={[
              styles.joinRoomInput,
              {
                height: buttonHeigth / 2,
                width: buttonWidth * 2,
                fontSize: fontSizeScale * 0.02,
              },
            ]}
            placeholder="Enter comma seperated symbols"
            value={inputCards}
            onChangeText={(text) => {
              setInputCards(text);
            }}
          />
          <Button
            style={{ height: buttonHeigth, width: buttonWidth }}
            title={"Create"}
            onPress={async () => {
              const roomCode = await createNewRoom(inputCards);
              navigation.navigate("Room", { roomCode: roomCode });
              setRoomDialogVisible(false);
            }}
          />
        </View>
      </Modal>

      <View style={styles.containerBody}>
        <Text style={[styles.textBody, { fontSize: fontSizeScale * 0.025 }]}>
          🍇🍏🍒🍍🍉🍅🥑
        </Text>
        <Text style={[styles.textBody, { fontSize: fontSizeScale * 0.05 }]}>
          Fruit salad planning poker for agile development
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
            setRoomDialogVisible(true);
          }}
        />
        <View style={styles.containerJoinRoom}>
          <Button
            style={{ height: buttonHeigth, width: buttonWidth }}
            title={"Join room"}
            onPress={async () => {
              if(!inputRoomCode) return;
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
              setInputRoomKey(text.trim());
            }}
          />
        </View>
      </View>
      <BottomBar         
      style={{ height: height, width: width }}
      navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({

  modalView: {
    paddingTop: StatusBar.currentHeight,
    padding: "2.5%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%"
  },
  closeModalView: {
    margin: "2.5%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  container: {
    paddingTop: StatusBar.currentHeight,
    padding: "2.5%",
    flexDirection: "column",
    flexGrow: 1, 
    backgroundColor: Colors.backgroundGreyTone,
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
