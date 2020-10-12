import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import * as eva from "@eva-design/eva";

import store from "./redux/store";
import { Provider } from "react-redux";

import { firebaseConfig } from "./constants/FirebaseCredentials";

import * as firebase from "firebase/app";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);
//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </Provider>
    );
  }
}
