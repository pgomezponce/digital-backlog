import * as React from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import { connect } from "react-redux";

import { sessionActions } from "../redux/actions";
import { bindActionCreators } from "redux";
import { auth } from "firebase";

class TabOneScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.signIn({user});
      }
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EditScreenInfo path="/screens/TabOneScreen.js" />
      </View>
    );
  }
}

const mapStateToProps = (state: Object) => ({
  user: state.user,
});

function mapDispatchToProps(dispatch) {
  let sign_in = sessionActions.signIn;
  return {
    signIn: (user) => {
      dispatch(sign_in(user));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabOneScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
