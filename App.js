import 'react-native-gesture-handler';
import React, {useState, useEffect} from "react";
import {StyleSheet, View, Image, Pressable, useWindowDimensions} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useAnimatedGestureHandler,
    interpolate, withSpring, runOnJS
} from "react-native-reanimated";
import {GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";

import users from "./assets/data/users";
import Card from "./src/components/TinderCard";
import Like from "./assets/images/LIKE.png";
import Nope from "./assets/images/nope.png";


const ROTATION = 60
const SWIPE_VELOCITY = 800

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(currentIndex + 1)

    const currentProfile = users[currentIndex]
    const nextProfile = users[nextIndex]


    const {width: screenWidth} = useWindowDimensions()
    const hiddenTranslateX = 2 * screenWidth
    const translateX = useSharedValue(0) // main points: -width   0    width
    const rotate = useDerivedValue(() => interpolate(translateX.value,
        [0, hiddenTranslateX],
        [0, ROTATION]
    ) + "deg")               // main points: -60deg  0deg  60deg

    const cardStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: translateX.value
        },
            {
                rotate: rotate.value
            }
        ]
    }))

    const nextCardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(translateX.value,
                    [-hiddenTranslateX, 0, hiddenTranslateX],
                    [1, 0.8, 1])
            }
        ],
        opacity: interpolate(translateX.value,
            [-hiddenTranslateX, 0, hiddenTranslateX],
            [1, 0.5, 1])
    }))

    const likeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value,
            [0, hiddenTranslateX / 5],
            [0, 1])
    }))
    const nopeStyle = useAnimatedStyle(() => ({
        opacity: interpolate(translateX.value,
            [0, -hiddenTranslateX / 5],
            [0, 1])
    }))


    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, context) => {
            context.startX = translateX.value
        },
        onActive: (event, context) => {
            translateX.value = context.startX + event.translationX
        },
        onEnd: (event) => {
            if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
                translateX.value = withSpring(0)
                return
            }
            translateX.value = withSpring(event.velocityX > 0 ? hiddenTranslateX : -hiddenTranslateX,
                {},
                () => runOnJS(setCurrentIndex)(currentIndex + 1))

            // translateX.value = withSpring(hiddenTranslateX * Math.sign(event.velocityX),
            //     {},
            //     () => runOnJS(setCurrentIndex)(currentIndex + 1)
            // )

        }
    })

    useEffect(() => {
        translateX.value = 0
        setNextIndex(currentIndex + 1)
    }, [currentIndex, translateX]);


    return (
        <GestureHandlerRootView style={styles.pageContainer}>
            {nextProfile && (
                <View style={styles.nextCardContainer}>
                    <Animated.View style={[styles.animatedCard, nextCardStyle]}>
                        <Card user={nextProfile}/>
                    </Animated.View>
                </View>
            )}

            {currentProfile && (
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={[styles.animatedCard, cardStyle]}>
                        <Animated.Image source={Like} style={[styles.labels, {left: 10}, likeStyle]}/>
                        <Animated.Image source={Nope} style={[styles.labels, {right: 10}, nopeStyle]}/>
                        <Card user={currentProfile}/>
                    </Animated.View>
                </PanGestureHandler>
            )}
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    animatedCard: {
        width: "90%",
        height: "70%",
        justifyContent: "center",
        alignItems: "center"
    },
    nextCardContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    labels: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        position: "absolute",
        top: 10,
        zIndex: 1,
        elevation: 1
    }
})

export default App