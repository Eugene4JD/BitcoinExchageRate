import React from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import themeReducer from "./Redux/themeReducer";

import MainScreen from "./Screens/MainScreen";

const store = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
