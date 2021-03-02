import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import bitcoinRequest from "./api/BitcoinRequest";

export default function App() {
  const [time, setTime] = useState({});
  const [bpi, setBpi] = useState({});
  const [disclaimer,setDisclaimer] = useState("");
  const [chosenBpi, setChosenBpi] = useState("USD");

  useEffect(() => {
    const doTranslation = async () => {
      const response = await bitcoinRequest.get();
      setTime(response.data.time);
      setDisclaimer(response.data.disclaimer);
      if (chosenBpi === "USD")
      {
         setBpi(response.data.bpi.USD);
      }
      if (chosenBpi === "EUR")
      {
         setBpi(response.data.bpi.EUR);
      }
      if (chosenBpi === "GBP")
      {
         setBpi(response.data.bpi.GBP);
      }
    };
    doTranslation();
  },[chosenBpi]);

  const onButtonPressed = (term) => {
    if(term === "USD")
    {
      setChosenBpi("USD")
    }
    if(term === "EUR")
    {
      setChosenBpi("EUR")
    }
    if(term === "GBP")
    {
      setChosenBpi("GBP")
    }
  };
  return (
    <View style={styles.container}>
      <Text>1 bitcoin = {bpi.rate} {bpi.description}</Text>
      <Text>{time.updated}</Text>
      <Button title="USD" onPress={() => onButtonPressed("USD")} />
      <Button title="EUR" onPress={() => onButtonPressed("EUR")} />
      <Button title="GBP" onPress={() => onButtonPressed("GBP")} />
      <Text>{disclaimer}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
});
