import React, {useState} from 'react';
import { View, useWindowDimensions, StyleSheet, StatusBar, Text, TextInput  } from 'react-native'
import { TopBar, Button } from '../../components';
import {createNewRoom, addUserToExistingRoom} from '../../firebase/callFirebaseCloudFunctions';
import Colors from "./../../colors/colors"


export default function HomeScreen({ navigation }) {
    const { height, width } = useWindowDimensions();
    const [roomCode, setRoomKey] = useState('');
    const fontSizeScale = 0.5 * (height + width);

    const buttonWidth = width * 0.2;
    const buttonHeigth = height * 0.1;

    const fontSizeScaleButton = 0.5 * (buttonWidth + buttonHeigth);

    return (
        <View style={[styles.container,
        { width: width, height: height, }]} >
            <StatusBar style="auto" />
            <TopBar style={{ height: height * 0.1, width: width }} />
            <View style={styles.containerBody} >
                <Text style={[styles.textBody, { fontSize: fontSizeScale * 0.025 }]}>🍇🍏🍒🍍🍉🍅🥑</Text>
                <Text style={[styles.textBody, { fontSize: fontSizeScale * 0.075 }]}>Fruit salad planning poker for agile developpement</Text>
                <Text style={[styles.textBody, { fontSize: fontSizeScale * 0.025 }]}>🍇🍏🍒🍍🍉🍅🥑</Text>
            </View>
            <View style={styles.containerButtons}>
            <Button style={{ height: buttonHeigth, width: buttonWidth}} 
                title={"Create new room"} 
                onPress={async () => {
                    const roomCode = await createNewRoom();
                    navigation.navigate("Details", {roomCode: roomCode})}} />
            <View style={styles.containerJoinRoom}>
                <Button style={{ height: buttonHeigth, width: buttonWidth }} 
                    title={"Join room"} 
                    onPress={async () => {
                        await addUserToExistingRoom(roomCode);
                        navigation.navigate("Details", {roomCode: roomCode})}} />
                <TextInput style={[styles.joinRoomInput,
                { height: buttonHeigth, width: buttonWidth * 1.5, fontSize: fontSizeScale * 0.025 }]}
                 placeholder='Enter room code'
                 onChangeText={(text) => {
                    setRoomKey(text);
                 }}/>
            </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        padding: "2.5%",
    },
    containerBody: {
        width: "70%",
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
        flexDirection:"row",
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
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    }
})