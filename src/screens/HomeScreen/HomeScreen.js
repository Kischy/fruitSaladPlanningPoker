import React from 'react';
import { View, useWindowDimensions, StyleSheet, StatusBar, Text } from 'react-native'
import { TopBar, Button } from '../../components';
import createNewRoom from '../../firebase/createNewRoom';


export default function HomeScreen({ navigation }) {
    const { height, width } = useWindowDimensions();
    const fontSizeScale = 0.5 * (height + width);

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
            <View style={{ alignItems: "center" }}>
                <Button style={{ height: height * 0.1, width: width * 0.15 }} 
                title={"Start new game"} 
                onPress={async () => {
                    await createNewRoom();
                    navigation.navigate("Details")}} />
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