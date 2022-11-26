import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import uuid from 'react-uuid';

export default function App() {
  const NBR_OF_DICES = 2;
  const [gamesStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [diceImages, setDiceImages] = useState([]);
  const [status, setStatus] = useState('');
  const [wrong, setWrong] = useState(0);

  useEffect(() => {
    initialize();
  }, []);

  function initialize() {
    let images = [];
    for(let i = 0; i < NBR_OF_DICES; i++) {
      images[i] = require("./assets/dice-images/smiley.png");
    }
    setDiceImages(images)
  }

  function setImages(throws) {
    let images = [];
    for (let i = 0; i < throws.length; i++) {
      switch (throws[i]) {
        case 1: images[i] = require("./assets/dice-images/1.png"); break;
        case 2: images[i] = require("./assets/dice-images/2.png"); break;
        case 3: images[i] = require("./assets/dice-images/3.png"); break;
        case 4: images[i] = require("./assets/dice-images/4.png"); break;
        case 5: images[i] = require("./assets/dice-images/5.png"); break;
        case 6: images[i] = require("./assets/dice-images/6.png"); break;
        default: break;
      }
    }
    setDiceImages(images)
  }

  function throwDices() {
    let throws = [];
    for(let i = 0; i < NBR_OF_DICES; i++) {
      throws[i] = Math.floor(Math.random() * 6 + 1);
    }
    setImages(throws);
    setGameStarted(true);
    setStartTime(new Date());
  }

  function checkDices() {
    if (gamesStarted) {
      if (diceImages[0] === diceImages[1]) {
        setStatus("Reaction time: " + (new Date() - startTime) + " ms")
        throwDices();
      } else {
        setStatus("NOUP! Dices are not the same.");
        setWrong(wrong + 1);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reaction Time</Text>
      <Button
      style={styles.button}
      onPress={throwDices}
      title='Throw dices'>
      </Button>
      <View style={styles.flex}>
        {diceImages.map(dice => (
          <Image style={styles.dice} source={dice} key={uuid()}></Image>
        ))}
      </View>
      <Button
      style={styles.button}
      onPress={checkDices}
      title='Same Dices'>
      </Button>
      <Text style={styles.sum}>{status}</Text>
      {gamesStarted  && <Text style={styles.sum}>Wrong hits: {wrong}</Text>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    marginTop: 100,
    marginBottom: 30,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
  },
  flex: {
    flexDirection: 'row',
  },
  dice: {
    width: 80,
    height: 80,
    marginTop: 30,
    marginBottom: 15,
    marginRight:10,
  },
  sum: {
    fontSize: 20,
    marginTop: 10,
  }

});
