import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function LoginNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={LogInNavigator} />
    </Stack.Navigator>
  );
}

import { connect } from "react-redux";
import { auth } from "firebase";
import { sessionActions } from "../redux/actions";
import { bindActionCreators } from "redux";
import { Text, View } from "react-native";
import LogInNavigator from "./LogInNavigator";
import ContentNavigator from "./ContentNavigator";

export class index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.signIn({ user });
      }
    });
  }

  render() {
    if (!this.props.isLogged) {
      return (
        <NavigationContainer
          linking={LinkingConfiguration}
          theme={this.props.colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <LoginNavigator />
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={this.props.colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    );
  }
}

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Content" component={ContentNavigator} />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state: Object) => ({
  isLogged: state.user.isLogged,
});

function mapDispatchToProps(dispatch) {
  let signIn = sessionActions.signIn;

  return bindActionCreators({ signIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
