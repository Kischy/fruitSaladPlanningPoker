import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

export default function Logo(props) {
    return (

        <View style={styles.container}>
            <Image
                style={{ width: props.style.height, height: props.style.height }}
                source={require('./img/fruit.png')}
            />
            <View style={styles.textContainer}>
                <Text style={[styles.loveAgileText, { fontSize: props.style.height * 0.4 }]}>I love agile</Text>
                <Text style={[styles.fruitPlaningPokerText, { fontSize: props.style.height * 0.25 }]}>Fruit salad planing poker</Text>
            </View>
        </View >
    );
};


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
        color: "#c44340",
    },

    fruitPlaningPokerText: {
        fontFamily: "Roboto_400Regular",
        height: "30%",
        color: "#4b6144",

    },
})