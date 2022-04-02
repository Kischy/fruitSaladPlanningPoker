
import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import Colors from "./../../colors/colors"


export default function Button(props) {
    let height = 20;
    let width = 200;
    let title = title = 'Button';
    let onPress = null;

    if (props.style.height !== undefined) {
        height = props.style.height;
    }
    if (props.style.width !== undefined) {
        width = props.style.width;
    }

    if (props.title !== undefined) {
        title = props.title;
    }

    if (props.onPress !== undefined) {
        onPress = props.onPress;
    }

    const fontSizeScale = 0.5 * (height + width);

    return (
        <Pressable style={[styles.button, { height: height, width: width }]} onPress={onPress}>
            <Text style={[styles.text, { fontSize: fontSizeScale * 0.15 }]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: Colors.forestGreen,
        margin: "0.3%"
    },
    text: {
        color: 'white',
        fontFamily: "Roboto_400Regular",
    },
})