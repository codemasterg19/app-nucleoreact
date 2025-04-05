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
import Ionicons from 'react-native-vector-icons/Ionicons';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={WelcomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Tab" component={MyTabs} options={{ headerShown: false }}/>
      <Stack.Screen name="Registro" component={RegistroScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarActiveTintColor: '#10b981',      // verde activo
        tabBarInactiveTintColor: '#6b7280',    // gris inactivo
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: 60,
          paddingBottom: 6,
        },
        tabBarIcon: ({ focused, color, size }: any) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'RegistroJuegos') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Juegos') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
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