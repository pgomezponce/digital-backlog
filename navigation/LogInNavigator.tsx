import React, { Component } from "react";
import { connect } from "react-redux";
import { sessionActions } from "../redux/actions";
import { Button, Divider, Input, Layout, Text } from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAvoidingView, View } from "react-native";
import { auth } from "firebase";

export class LogInNavigator extends Component {
  handleLostPassword = () => {
    console.error("Password forgotten, oh no :C");
  };

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("You need to put an email to access your Vault"),
    password: Yup.string()
      .required("You need the password to your Vault")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "A lowercase, uppercase, number and a special character and 8+ characters"
      ),
  });

  render() {
    return (
      <Layout
        style={{
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EF6969",
          height: "100%",
        }}
      >
        <Layout
          style={{
            borderRadius: 20,
            paddingVertical: "2%",
            paddingHorizontal: "4%",
            justifyContent: "center",
          }}
        >
          <Layout>
            <Text style={{ textAlign: "center" }} category="h1">
              Welcome to your digital backlog!
            </Text>
            <Divider />
          </Layout>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              auth()
                .createUserWithEmailAndPassword(values.email, values.password)
                .catch((error) => {
                  auth()
                    .signInWithEmailAndPassword(values.email, values.password)
                    .catch((error) => {
                      actions.setErrors({ general: error.message });
                    });
                });
            }}
            initialErrors={{
              email: "",
              password: "",
              general: "",
            }}
            validationSchema={this.validationSchema}
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
                style={{ justifyContent: "space-around", marginVertical: "2%" }}
              >
                <View
                  style={
                    errors.general
                      ? {
                          backgroundColor: "#EF6969",
                          borderRadius: 20,
                          padding: "2%",
                        }
                      : { borderRadius: 20, padding: "2%" }
                  }
                >
                  <KeyboardAvoidingView
                  behavior='padding'
                    style={
                      errors.email && touched.email
                        ? {
                            backgroundColor: "#EF6969",
                            borderRadius: 20,
                            padding: "2%",
                          }
                        : { borderRadius: 20, padding: "2%" }
                    }
                  >
                    <Input
                      keyboardType="email-address"
                      autoCapitalize='none'
                      label="email"
                      autoCorrect={false}
                      autoCompleteType='email'
                      placeholder="email@example.com"
                      value={values.email}
                      onBlur={handleBlur("email")}
                      onChangeText={handleChange("email")}
                    ></Input>
                    <Text>
                      {errors.email && touched.email ? errors.email : ""}
                    </Text>
                  </KeyboardAvoidingView>
                  <KeyboardAvoidingView
                  behavior='padding'
                    style={
                      errors.password && touched.password
                        ? {
                            backgroundColor: "#EF6969",
                            borderRadius: 20,
                            padding: "2%",
                          }
                        : { borderRadius: 20, padding: "2%" }
                    }
                  >
                    <Input
                      keyboardType="default"
                      label="password"
                      autoCapitalize='none'
                      autoCorrect={false}
                      autoCompleteType='password'
                      placeholder="Password"
                      value={values.password}
                      onBlur={handleBlur("password")}
                      secureTextEntry={true}
                      onChangeText={handleChange("password")}
                    ></Input>

                    <Text>
                      {errors.password && touched.password
                        ? errors.password
                        : ""}
                    </Text>
                  </KeyboardAvoidingView>

                  {errors.general ? (
                    <Text style={{ textAlign: "center", color: "white" }}>
                      {errors.general}
                    </Text>
                  ) : null}
                </View>

                <View style={{ padding: "2%", alignItems: "center" }}>
                  <Button disabled={!isValid} onPress={handleSubmit}>
                    Access the vault!
                  </Button>
                  <Button
                    style={{ marginVertical: "5%" }}
                    disabled={!isValid}
                    appearance="outline"
                    onPress={handleSubmit}
                  >
                    Sign Up for a Vault!
                  </Button>
                  <Button
                    appearance="ghost"
                    onPress={() => this.handleLostPassword()}
                  >
                    Forgot your password?
                  </Button>
                </View>
              </Layout>
            )}
          </Formik>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(sessionActions.signIn(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogInNavigator);
