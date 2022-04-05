import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Card from "../Card/Card";
import { View } from "react-native-web";

export default function Cards(props) {
    const modes = {
        onlyOneSelebtable: 0,
    };
    const mode = modes.onlyOneSelebtable;
    const titles = props.titles !== undefined ? props.titles : [];  
    const onSelect = props.onSelect !== undefined ? props.onSelect : null;  
    const [selected, setSelected] = useState(
        new Array(titles.length).fill(false)
    );

    const clickCard = (index) => {
        let newSelected = selected;
        if (mode === modes.onlyOneSelebtable) {
            newSelected = new Array(titles.length).fill(false);
        }
        newSelected[index] = !selected[index];
        setSelected([...newSelected]);
        if(newSelected[index] && onSelect !== null) onSelect(titles[index]);
        else if(newSelected[index] == false && onSelect !== null) onSelect("");
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
