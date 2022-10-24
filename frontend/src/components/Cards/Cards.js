import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Card from "../Card/Card";
import { View } from "react-native-web";

export default function Cards(props) {
    const titles = props.titles !== undefined ? props.titles : [];  
    const onSelect = props.onSelect !== undefined ? props.onSelect : null;  
    const clickable = props.clickable !== undefined ? props.clickable : true;   
    const selected = props.selectedCards !== undefined && props.selectedCards !== null
     ? props.selectedCards : new Array(titles.length).fill(false);   
    
    if(selected.length != titles.length)
    {
        throw "Titles and selected cards array must have same length";
    }

    const clickCard = (index) => {
        if(selected[index] === false) {
            onSelect(index, titles[index])
        }
        else {
            onSelect(index, null)
        }
        return;
    };

    const renderCards = () => {
        const cards = [];
        for (let i = 0; i < titles.length; ++i) {
            const title = titles[i];
            cards.push(
                <Card
                    key={i}
                    title={title}
                    selected={selected[i]}
                    style={{
                        height: props.style.height,
                        width: props.style.width,
                    }}
                    onPress={() => {
                        if(clickable === false) return;
                        clickCard(i);
                    }}
                />
            );
        }
        return cards;
    };

    return <View style={styles.container}>{renderCards()}</View>;
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
