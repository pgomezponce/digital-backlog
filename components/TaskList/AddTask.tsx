import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
} from "@ui-kitten/components";
import { Formik } from "formik";
import React, { Component } from "react";
import { Platform } from "react-native";
import * as firebase from "firebase";
import * as Yup from "yup";


const addIcon = (props) => <Icon {...props} name="plus-circle-outline" />;

const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("What do you want to store?"),
    tags: Yup.string().optional(),
  });



export default class AddTask extends Component {

  handleSend = (values: Object, actions:Object) => {


    let sendable = {
        title: values.title,
        tags: values.tags.split(','),
        created: Date.now(),
        isDone: false,
    }
    console.log(sendable);
    firebase.database().ref(firebase.auth().currentUser?.uid + '/reminders').push(sendable);
    this.props.navigation.goBack();
    
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
          Create a entry
        </Text>
        <Layout
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: Platform.OS === "web" ? "50%" : "100%",
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
              height: "95%",
              width: "90%",
              alignItems: "center",
            }}
          >
            <Formik
              initialValues={{
                title: "",
                tags:"",
              }}
              initialErrors={{
                  title:'',
                  tags:'',
              }}
              onSubmit={this.handleSend}
                validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <Layout
                  level="2"
                  style={{
                    width: Platform.OS === 'web' ? '90%' : '100%',
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Layout level='3' style={{padding: 20, borderRadius:20, height:'25%', justifyContent:'space-around'}}>
                      <Text category='h6' style={{textAlign:'center'}}>Provide some detail</Text>
                    <Input
                      keyboardType="default"
                      label="Title"
                      autoCapitalize="sentences"
                      autoCorrect={true}
                      placeholder="Drop the line!"
                      onBlur={handleBlur("title")}
                      onChangeText={handleChange("title")}
                    ></Input>


                    <Input
                      keyboardType="default"
                      label="Tags"
                      autoCapitalize="words"
                      autoCorrect={true}
                      placeholder="Write concepts related to the task, separated by ','"
                      onBlur={handleBlur("tags")}
                      onChangeText={handleChange("tags")}
                    ></Input>
                    
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
                    <Button accessoryLeft={addIcon} status='primary' disabled={!isValid} onPress={handleSubmit}>
                      Add it to the vault!
                    </Button>
                    <Button
                      appearance="ghost"
                      style={{ width: "100%" }}
                      status="danger"
                      onPress={() => {
                        this.props.navigation.goBack();
                      }}
                    >
                      Cancel
                    </Button>
                  </Layout>
                </Layout>
              )}
            </Formik>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
