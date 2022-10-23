import React, { useState, useEffect } from "react";
import {
    View,
    useWindowDimensions,
    StyleSheet,
    StatusBar,
} from "react-native";
import { TopBar, Cards, Card, Button, BottomBar } from "../../components";
import firebaseApp from "../../firebase/config"
import { getDatabase, onValue, ref, update, get  } from 'firebase/database'
import { getAuth  } from 'firebase/auth'
import {get_value_by_ratio_triggers} from "./../../proportion"
import shuffle_array from "../../utility/shuffle_array";
import Colors from "./../../colors/colors";
import {
    addUserToExistingRoom,
  } from "../../firebase/callFirebaseCloudFunctions";

const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp); 
const possGameStates = {
    selectionPhase: 0,
    cardsRevealed: 1,
}

export default function RoomScreen({ route, navigation }) {
    const { height, width } = useWindowDimensions();
    const roomCode = route.params.roomCode;
    const cardWidth = width * get_value_by_ratio_triggers([0.175,0.15,0.125,0.085,0.065]);
    const cardHeigth = cardWidth * 2.0;

    const buttonWidth = width * 0.2;
    const buttonHeigth = height * 0.1;
    const [roomState, setRoomState] = useState(null);  
    const [roomRef, setRoomRef] = useState(null);
    const [userAreaRef, setUserAreaRef] = useState(null);

    useEffect(() => {
        const addUserToRoom = async () => {
            try {            
                await addUserToExistingRoom(roomCode);
            }
            catch(error) {
                navigation.navigate("NotFound");
            }
            setUserAreaRef(ref(db,'/rooms/' + roomCode + "/users/" + auth.currentUser.uid));   
            setRoomRef(ref(db, '/rooms/' + roomCode));             
          };

        addUserToRoom();        
    },[route]);

    useEffect(() => {
        if(roomRef === null) return;

        const getInitialRoomState = async () => {
            setRoomState((await get(roomRef)).val());
        }        
        getInitialRoomState();

        onValue(roomRef, sn => {
            setRoomState(sn.val());
         });
      }, [roomRef])


    const renderGameControlButton = () => {
        if(roomState === null) return;
        const title = roomState.gameState === possGameStates.selectionPhase ? "Reveal cards" : "Start new game";
        const newGameState = roomState.gameState === possGameStates.selectionPhase ? possGameStates.cardsRevealed : possGameStates.selectionPhase;
        return (<Button
            style={{ height: buttonHeigth, width: buttonWidth }}
            title={title}
            onPress={async () => {
                if(roomRef === null) return;
                await update(roomRef,{gameState: newGameState});
            }}/>);
    }

    const renderOtherUsersCards = () => {
        if(roomState === null) return [];
        const cards = [];
        for (const [key, value] of Object.entries(roomState.users)) {
            cards.push(
                <Card
                    key={key}
                    title={roomState.gameState === possGameStates.cardsRevealed && value.hasOwnProperty("selectedCard") ? value.selectedCard : ""}
                    selected={value.hasOwnProperty("selectedCard") && value.selectedCard !== null ? true : false}
                    style={{
                        height: cardHeigth,
                        width: cardWidth,
                    }}
                />
            );
        }
        return shuffle_array(cards);
        }


    return (
        <View style={[styles.container, { width: width, height: height }]}>
            <StatusBar style="auto" />
            <TopBar
                style={{ height: height * 0.1, width: width }}
                navigation={navigation}
                text={"Room"}
                subText={roomCode}
            />
            <View style={styles.containerBody}>
                <View style={styles.containerBodyTop}>
                    {renderOtherUsersCards()}
                </View>
                <View style={styles.containerBodyMiddle}>
                    {renderGameControlButton()}
                </View>
                <View style={styles.containerBodyBottom}>
                    <Cards
                        titles={roomState === null ? ["?"] : roomState.cardValues}
                        style={{ height: cardHeigth, width: cardWidth }}
                        onSelect={async (title) => {
                            if(userAreaRef === null) return;
                            await update(userAreaRef,{selectedCard: title});
                        }}
                    ></Cards>
                </View>
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
        backgroundColor: Colors.backgroundGreyTone
    },
    containerBody: {
        width: "100%",
        flexDirection: "column",

    },
    containerBodyMiddle: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
    },
    containerBodyTop: {
        width: "100%",
        flexDirection: "row",
        justifyContent:"center",

    },
    containerBodyBottom: {
        width: "100%",
    },
});
