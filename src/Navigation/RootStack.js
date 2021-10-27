import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import GiphyScreen from '../Screens/GiphyScreen';
import DetailViewScreen from '../Screens/DetailViewScreen';
import DataDisplayScreen from '../Screens/DataDisplayScreen';
import LoginScreen from '../Screens/LoginScreen';

const Stack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="GiphyScreen"
          component={GiphyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailViewScreen"
          component={DetailViewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DataDisplayScreen"
          component={DataDisplayScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
