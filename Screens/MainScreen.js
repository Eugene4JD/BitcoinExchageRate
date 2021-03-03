import React from "react";
import {StatusBar} from 'react-native'
import styled, { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import bitcoinRequest from "../api/BitcoinRequest";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../Redux/themeActions";
import { lightTheme, darkTheme } from "../Theme";

export default function HomeScreen() {
  const [time, setTime] = useState({});
  const [bpi, setBpi] = useState({});
  const [disclaimer, setDisclaimer] = useState("");
  const [chosenBpi, setChosenBpi] = useState("USD");

  const theme = useSelector((state) => state.themeReducer.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    const doTranslation = async () => {
      const response = await bitcoinRequest.get();
      setTime(response.data.time);
      setDisclaimer(response.data.disclaimer);
      if (chosenBpi === "USD") {
        setBpi(response.data.bpi.USD);
      }
      if (chosenBpi === "EUR") {
        setBpi(response.data.bpi.EUR);
      }
      if (chosenBpi === "GBP") {
        setBpi(response.data.bpi.GBP);
      }
    };
    doTranslation();
  }, [chosenBpi]);

  const onButtonPressed = (term) => {
    if (term === "USD") {
      setChosenBpi("USD");
    }
    if (term === "EUR") {
      setChosenBpi("EUR");
    }
    if (term === "GBP") {
      setChosenBpi("GBP");
    }
  };
  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle={theme.STATUS_BAR_STYLE} />
      <Container>
        <TextContainer>
          <Text>
            1 bitcoin = {bpi.rate} {bpi.description}
          </Text>
          <Text>{time.updated}</Text>
        </TextContainer>

        <Button title="USD" onPress={() => onButtonPressed("USD")}>
          <ButtonText> Bitcoin to USD </ButtonText>
        </Button>
        <Button title="EUR" onPress={() => onButtonPressed("EUR")}>
          <ButtonText> Bitcoin to EUR </ButtonText>
        </Button>
        <Button title="GBP" onPress={() => onButtonPressed("GBP")}>
          <ButtonText> Bitcoin to GBP </ButtonText>
        </Button>

        <TextContainer>
          <Text>{disclaimer}</Text>
        </TextContainer>

        {theme.mode === "light" ? (
          <Button onPress={() => dispatch(switchTheme(darkTheme))}>
            <ButtonText>Change to Dark Theme</ButtonText>
          </Button>
        ) : (
          <Button onPress={() => dispatch(switchTheme(lightTheme))}>
            <ButtonText>Change to Light Theme</ButtonText>
          </Button>
        )}
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;
const TextContainer = styled.View`
  border: 1px solid ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  padding: 16px;
  border-radius: 6px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 24px;
  font-weight: 600;
`;

const Button = styled.TouchableOpacity`
  margin: 32px 0;
  background-color: ${(props) => props.theme.PRIMARY_BUTTON_COLOR};
  padding: 16px 32px;
  border-radius: 6px;
`;

const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${(props) => props.theme.PRIMARY_BUTTON_TEXT_COLOR};
`;
