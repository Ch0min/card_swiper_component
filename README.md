* dependencies:
- yarn add react-native-reanimated -> babel plugin: plugins: ['react-native-reanimated/plugin'],
- yarn add react-native-gesture-handler
- yarn add react-native-vector-icons



_____________________________________



TODO:
CF: Make 2 buttons for swiping left and right.



MAYBES?:
- Shadow on Cards?
- Card Stack Effect?
- CB: Fade animation when scrolling.
- CB: ScrollView if the description is longer than the Card.
- CF: Fix so that you can swipe instantly after the next card ( hard )



KINDA DONE / WIP: 
- fix elevation so opacity doesn't give this bright inner effect when swiping - commented out elevation in styles for now as a fix. Find a fix for shadows on android.


DONE: 
* Overall / CF&CB
/Week 3
- Split Card component into smaller components, CardFront, CardBack.
- Made LoadingSpinner component which can be reused. (Intentionally made it 1 sec delay)
- CF/CB: Make the NextCard opacity = 0 when flipping the card animation occurs, so you won't see the NextCard between the animation.
- CF/CB: When swiping on CardBack, reset back to FrontCard
- Refactoring and splitting components into smaller ones.



* CardFront
/Week 2:
- CF: Swipe function
- CF: Swipe animations
- CF: Swipe dummy-data implemented
- CF: Make a new view on the card, so it has 2 sections
- CF: Put icons on subheaders
- CF: Implement text at the bottom of section 1 - subheaders on card
/Week 3:
- CF: Flickering between current card and next card
- CF: Make so the nope and like labels appears a little later when panning
- CF: Implement center icon
- CF: Press on Icon Button makes Card Flip Animation
- CF: Loading spinner when loading the swipe screen


* CardBack
/Week 2:
- CB: Make Info Icon Button
- CB: Tapping on "i" icon, shows info on the backside
- CB: Tapping anywhere on CardBack goes back to FrontCard with Flip Animation
/Week 3:
- CB: Can't tap back if you are clicking at the same area as the like and nope labels
