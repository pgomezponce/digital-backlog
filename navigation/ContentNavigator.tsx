import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import AddTask from '../components/TaskList/AddTask';
import TaskList from '../components/TaskList/TaskList';

const nav = createStackNavigator();

export default class ContentNavigator extends Component {
  render() {
    return (
      <nav.Navigator screenOptions={{headerShown:false}}>
        <nav.Screen name='List' component={TaskList}/>
        <nav.Screen name='Add Task' component={AddTask}/>
      </nav.Navigator>
    )
  }
}
