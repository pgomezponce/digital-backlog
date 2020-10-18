import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Divider,
  Icon,
  Layout,
  Radio,
  Text,
} from "@ui-kitten/components";

import { database } from "firebase/app";
import { auth } from "firebase/app";

import { Dimensions, Platform } from "react-native";

const addIcon = (props) => <Icon {...props} name="plus-circle-outline" />;

function taskBullet(props: Object) {
  let content = props[1];
  let id = props[0];
  return (
    <Radio
      checked={content.isDone}
      style={{ marginVertical: 2 }}
      key={content.title}
      onChange={() => {
        database()
          .ref(auth().currentUser?.uid + "/reminders/" + id + "/isDone")
          .set(!content.isDone);
      }}
      onPress={() => {}}
      onLongPress={() => {
        database()
          .ref(auth().currentUser?.uid + "/reminders/" + id)
          .remove();
      }}
    >
      {content.title}
    </Radio>
  );
}

export class TaskList extends Component {
  async asyncSetBacklog() {
    let data = await database()
      .ref(this.props.userUID + "/reminders")
      .once("value")
      .then(function (snapshot) {
        return snapshot;
      });

    this.updateTasks(data);
  }

  updateTasks(val) {
    this.setState({ ...this.state, backlog: val.val() });
  }

  constructor(props) {
    super(props);
    this.asyncSetBacklog();
    this.state = { backlog: {} };

    database()
      .ref(this.props.userUID + "/reminders")
      .on("value", (snap) => this.updateTasks(snap));
  }

  showTasks() {
    if (this.state.backlog) {
      let attempt = Object.entries(this.state.backlog);

      let ans = attempt.map(function (obj: Object) {
        return taskBullet(obj);
      });

      return ans;
    }
    return null;
  }

  render() {
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
            width:
              Platform.OS === "web" && Dimensions.get("screen").width > 500
                ? "50%"
                : "100%",
            minHeight: "80%",
            maxHeight: "90%",
            justifyContent: "space-between",
            alignItems: "center",
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
              width: "90%",
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
              {this.showTasks()}
            </Layout>
          </Layout>

          <Layout
            level="2"
            style={{
              width: "90%",
              borderRadius: 20,
              padding: 20,
              margin: 20,
              alignItems: "center",
            }}
          >
            <Button
              appearance="ghost"
              style={{ width: "100%" }}
              accessoryLeft={addIcon}
              onPress={() => {
                this.props.navigation.navigate("Add Task");
              }}
            >
              Add a reminder
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
