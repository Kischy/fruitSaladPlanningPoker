import React, { useState, useEffect } from "react";
import {
    View,
    useWindowDimensions,
    StyleSheet,
    StatusBar,
    Text,
} from "react-native";
import { TopBar, Cards, Card } from "../../components";
import firebaseApp from "../../firebase/config"
import { getDatabase, onValue, ref, update  } from 'firebase/database'
import { getAuth  } from 'firebase/auth'

const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export default function RoomScreen({ route, navigation }) {
    const { height, width } = useWindowDimensions();
    const roomCode = route.params.roomCode;
    const cardWidth = width * 0.075;
    const cardHeigth = cardWidth * 2.0;
    const [roomState, setRoomState] = useState(null); 
    const roomRef = ref(db, '/rooms/' + roomCode);
    const userAreaRef = ref(db,'/rooms/' + roomCode + "/users/" + auth.currentUser.uid);

    useEffect(async () => {
        onValue(roomRef, sn => {
            setRoomState(sn.val());
            // console.log(sn.val());
         });
    },[]);

    const renderOtherUsersCards = () => {
        if(roomState === null) return [];
        const cards = [];
        for (const [key, value] of Object.entries(roomState.users)) {
            cards.push(
                <Card
                    key={key}
                    title={value.hasOwnProperty("selectedCard") ? value.selectedCard : ""}
                    selected={true}
                    style={{
                        height: cardHeigth,
                        width: cardWidth,
                    }}
                />
            );
        }
        return cards;
        }


    return (
        <View style={[styles.container, { width: width, height: height }]}>
            <StatusBar style="auto" />
            <TopBar
                style={{ height: height * 0.1, width: width }}
                navigation={navigation}
            />
            <Text>{roomCode}</Text>
            <View style={styles.containerBody}>
                <View style={styles.containerBodyTop}>
                    {renderOtherUsersCards()}
                </View>
                <View style={styles.containerBodyBottom}>
                    <Cards
                        titles={roomState === null ? ["?"] : roomState.cardValues}
                        style={{ height: cardHeigth, width: cardWidth }}
                        onSelect={async (title) => {
                            await update(userAreaRef,{selectedCard: title});
                        }}
                    ></Cards>
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
        flexDirection: "column",
    },
    containerBodyTop: {
        width: "100%",
        height: "50%",
        flexDirection: "row",
        justifyContent:"center"
    },
    containerBodyBottom: {
        width: "100%",
        height: "30%",
    },
});
