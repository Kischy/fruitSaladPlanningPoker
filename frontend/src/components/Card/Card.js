import React, { useState } from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
import Colors from "./../../colors/colors";

export default function Card(props) {
    const selected = props.selected !== undefined ? props.selected : false;
    let width = props.style.width !== undefined ? props.style.width : 20;
    let height =
        props.style.height !== undefined ? props.style.height : width * 2;
    let title = props.title !== undefined ? props.title : "Card";
    let onPress = props.onPress !== undefined ? props.onPress : null;
    const fontSizeScale = 0.75 * (height + width);

    return (
        <Pressable
            style={[
                styles.button,
                {
                    height: height,
                    width: width,
                    backgroundColor: selected
                        ? Colors.forestGreen
                        : "transparent",
                },
            ]}
            onPress={() => {
                if (onPress !== null) onPress();
            }}
        >
            <Text style={[styles.text, { fontSize: fontSizeScale * 0.15,color: selected ? "white" : "black" }]}>
                {title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        elevation: 3,
        borderWidth: 2,
        borderColor: Colors.forestGreen,
        margin: "0.3%",
    },
    text: {
        color: "white",
        fontFamily: "Roboto_400Regular",
    },
});
