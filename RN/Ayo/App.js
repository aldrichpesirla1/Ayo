import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {loginScreen, signupScreen, roleSelectScreen, homeScreen, viewMedItemsScreen, medItemScreen } from './src/screens/index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Log In">
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Log In" component={loginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Sign Up" component={signupScreen} />
        <Stack.Screen options={{headerShown: false}} name="Select Role" component={roleSelectScreen} />
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
