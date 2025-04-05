import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import RegistroScreen from '../screens/RegistroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AddScoreScreen from '../screens/AddScoreScreen';
import StatsScreen from '../screens/StatsScreen';
import GameListScreen from '../screens/GameListScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={WelcomeScreen} />
      <Stack.Screen name="Tab" component={MyTabs} options={{ headerShown: false }}/>
      <Stack.Screen name="Registro" component={RegistroScreen} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="RegistroJuegos" component={AddScoreScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Juegos" component={GameListScreen} />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
    <MyStack />
    </NavigationContainer>
  )
}



const styles = StyleSheet.create({})