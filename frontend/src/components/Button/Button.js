import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import Colors from "./../../colors/colors";

export default function Button(props) {
    let height = props.style.height !== undefined ? props.style.height : 20;
    let width = props.style.width !== undefined ? props.style.width : 200;
    let title = props.title !== undefined ? props.title : "Button";
    let onPress = props.onPress !== undefined ? props.onPress : null;
    let disabled = props.disabled !== undefined ? props.disabled : false;
    const fontSizeScale = 0.4 * (height + width);

    const styles = StyleSheet.create({
        button: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            elevation: 3,
            backgroundColor: disabled === false ? Colors.forestGreen : Colors.textRed,
            margin: "0.3%",
        },
        text: {
            color: "white",
            fontFamily: "Roboto_400Regular",
        },
    });    

    return (
        <Pressable
            style={[styles.button, { height: height, width: width }]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, { fontSize: fontSizeScale * 0.15 }]}>
                {disabled === false ? title : "⛔"}
            </Text>
        </Pressable>
    );
}

