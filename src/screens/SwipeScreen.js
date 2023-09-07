import React from "react";
import {ActivityIndicator, StyleSheet, View, Text} from "react-native";

import users from "../../assets/data/users";
import Card from "../components/Card";

import SwipeLogic from "../components/SwipeLogic";


const SwipeScreen = () => {
    const onSwipeLeft = (user) => {
        console.warn("Swipe Left", user.name)   // write here for backend data logic
    }
    const onSwipeRight = (user) => {
        console.warn("Swipe Right", user.name) // write here for backend data logic
    }

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.heading}>What's on your mind</Text>
            <SwipeLogic
                data={users}
                renderItem={({item}) => <Card user={item} />}
                onSwipeLeft={onSwipeLeft}
                onSwipeRight={onSwipeRight}
            />

            <ActivityIndicator style={styles.loadingSpinner}/>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
        backgroundColor: "#5ba970",
    },
    heading: {
        position: "absolute",
        top: "10%",
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        alignItems: "center",
        zIndex: 1
    },
    loadingSpinner: {
        size: "large",
        justifyContent: "center"

    }
})

export default SwipeScreen