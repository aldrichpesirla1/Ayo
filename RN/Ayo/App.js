import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {loginScreen, homeScreen, viewMedItemsScreen, medItemScreen } from './src/screens/index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={loginScreen} />
        <Stack.Screen name="Homes" component={homeScreen} />
        <Stack.Screen name="ViewMedItems" component={viewMedItemsScreen} />
        <Stack.Screen name="MedItems" component={medItemScreen} />
      </Stack.Navigator>      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
