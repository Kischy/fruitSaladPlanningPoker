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
    clearAllCardsOfExistingRoom,
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
    const [disableGameButton, setDisableGameButton] = useState(false);
    const [clearRoomsCards, setClearRoomsCards] = useState(false);
    const [shuffleOtherUsersCards, setShuffleOtherUsersCards] = useState(false);
    const [currentGameState, setCurrentGameState] = useState(null);
    const [firstLoadOfRoom, setFirstLoadOfRoom] = useState(false);
    const [roomState, setRoomState] = useState(null);  
    const [roomRef, setRoomRef] = useState(null);
    const [userAreaRef, setUserAreaRef] = useState(null);
    const [selectedCards, setSelectedCards] = useState(null);

    const unselectAllCards = async () => {
        setSelectedCards(new Array(roomState.cardValues.length).fill(false))
        if(clearRoomsCards) {
            await clearAllCardsOfExistingRoom(roomCode);
            setClearRoomsCards(false);
        }
    }

    const reselectPreviouslySelectedCard = async () => {
        const userData = (await get(userAreaRef)).val();
        if(userData.hasOwnProperty("selectedCard") == false) return;
        let newSelectedCards = new Array(roomState.cardValues.length).fill(false);
        const selectedIndex = roomState.cardValues.indexOf(userData.selectedCard);
        newSelectedCards[selectedIndex] = true;
        setSelectedCards([...newSelectedCards]);
    }

    useEffect(() => {
        setFirstLoadOfRoom(true);
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

      useEffect(() => {
        if(roomState === null) return;
        if(roomState.hasOwnProperty("gameState") === false) return;
        setCurrentGameState(roomState.gameState);
      },[roomState])

      useEffect(() => {
        if(currentGameState === null) return;
        if(firstLoadOfRoom === true) 
        {
            reselectPreviouslySelectedCard();
            setFirstLoadOfRoom(false);
            return;
        }

        if(currentGameState !== possGameStates.selectionPhase &&
            currentGameState !== possGameStates.cardsRevealed) return;

        setDisableGameButton(true);
        setTimeout(() => {
            setDisableGameButton(false);
        }, 1000);

        if(currentGameState === possGameStates.selectionPhase)
        {
            unselectAllCards();
            setShuffleOtherUsersCards(false);
        }
        else if(currentGameState === possGameStates.cardsRevealed)
        {
            setShuffleOtherUsersCards(true);
        }

      },[currentGameState])


    const renderGameControlButton = () => {
        if(roomState === null) return;
        const title = currentGameState === possGameStates.selectionPhase ? "Reveal cards" : "Start new game";
        const newGameState = currentGameState === possGameStates.selectionPhase ? possGameStates.cardsRevealed : possGameStates.selectionPhase;
        return (<Button
            style={{ height: buttonHeigth, width: buttonWidth }}
            title={title}
            disabled={disableGameButton}
            onPress={async () => {
                if(roomRef === null) return;
                if (newGameState === possGameStates.selectionPhase) {
                    setClearRoomsCards(true);
                }
                await update(roomRef,{gameState: newGameState});
            }}/>);
    }

    const renderOtherUsersCards = (shuffleCards) => {
        if(roomState === null) return [];
        const cards = [];
        for (const [key, value] of Object.entries(roomState.users)) {
            cards.push(
                <Card
                    key={key}
                    title={currentGameState === possGameStates.cardsRevealed && value.hasOwnProperty("selectedCard") ? value.selectedCard : ""}
                    selected={value.hasOwnProperty("selectedCard") && value.selectedCard !== null ? true : false}
                    style={{
                        height: cardHeigth,
                        width: cardWidth,
                    }}
                />
            );
        }
        return shuffleCards ? shuffle_array(cards) : cards;
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
                    {renderOtherUsersCards(shuffleOtherUsersCards)}
                </View>
                <View style={styles.containerBodyMiddle}>
                    {renderGameControlButton()}
                </View>
                <View style={styles.containerBodyBottom}>
                    <Cards
                        titles={roomState === null ? ["?"] : roomState.cardValues}
                        style={{ height: cardHeigth, width: cardWidth }}
                        onSelect={async (index, title) => {            
                            let newSelectedCards = new Array(roomState.cardValues.length).fill(false);
                            newSelectedCards[index] = title === null ? false : true;
                            setSelectedCards([...newSelectedCards]);                            
                            if(userAreaRef === null) return;
                            await update(userAreaRef,{selectedCard: title});
                        }}
                        clickable = {currentGameState === possGameStates.selectionPhase &&
                                    currentGameState !== possGameStates.cardsRevealed}
                        selectedCards={selectedCards}
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
