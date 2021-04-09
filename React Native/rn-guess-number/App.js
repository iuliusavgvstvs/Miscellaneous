import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import Header from "./components/Header";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  const startGameHandler = (userNumber) => {
    setSelectedNumber(userNumber);
    setRounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    setRounds(numOfRounds);
  };

  const configureNewGameHandler = () => {
    setRounds(0);
    setSelectedNumber(null);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (selectedNumber && rounds <= 0) {
    content = (
      <GameScreen userChoice={selectedNumber} onGameOver={gameOverHandler} />
    );
  } else if (rounds > 0) {
    content = (
      <GameOverScreen
        rounds={rounds}
        userNumber={selectedNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
