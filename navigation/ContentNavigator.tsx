import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Button,
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  Radio,
  Text,
} from "@ui-kitten/components";

import { database } from "firebase/app";
import { Platform } from "react-native";

const addIcon = (props) => (
    <Icon {...props} name='plus-circle-outline'/>
);

export class ContentNavigator extends Component {


  async asyncSetBacklog() {
    let data = await database()
      .ref(this.props.userUID + "/reminders")
      .once("value")
      .then(function (snapshot) {
        let ans = snapshot.val();

        return ans;
      });
    console.log(data);

    this.setState({ ...this.state, backlog: data });
  }

  constructor(props) {
    super(props);
    this.asyncSetBacklog();
    this.state = { backlog: [] };
  }

  render() {
    console.log(this.state);

    return (
      <Layout
        style={{
          backgroundColor: "#EF6969",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Text category="h1" style={{ paddingVertical: "2%" }}>
          Digital backlog
        </Text>
        <Layout
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: Platform.OS === "web" ? "50%" : "100%",
            minHeight: "80%",
            maxHeight: "90%",
            justifyContent:'space-between',
            alignItems:'center'
          }}
          level="1"
        >
          <Layout
            level="2"
            style={{
              borderRadius: 20,
              margin: 20,
              padding: 20,
              height: "50%",
              width:'90%',
              alignItems: "center",
            }}
          >
            <Text category="h2">Last time</Text>
            <Divider />
            <Layout
              level="3"
              style={{
                height: "90%",
                width: "99%",
                borderRadius: 20,
                padding: 20,
              }}
            >
              <Radio>Task for the day</Radio>
            </Layout>
          </Layout>
          <Layout
            level="2"
            style={{
              width: "90%",
              borderRadius:20,
              padding: 20,
              margin: 20,
              alignItems: "center",
            }}
          >
            <Button appearance='ghost' style={{width:'100%'}} accessoryLeft={addIcon}>Add a reminder</Button>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  userUID: state.user.userInfo.uid,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ContentNavigator);
