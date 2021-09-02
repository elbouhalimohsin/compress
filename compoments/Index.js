import * as React from 'react';
import { useKeepAwake } from 'expo-keep-awake';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';
import Search from './Search';
import Chathome from './Chathome';
import Profile from './Profile';
import Tosale from './Tosale';

const Stack = createNativeStackNavigator();

export default function App() {
  useKeepAwake();
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='MainAll' screenOptions={{headerShown: false}}>
        <Stack.Screen name="MainAll" component={Main} />
        <Stack.Screen name="SearchModal" component={Search} />
        <Stack.Screen name="ChathomeModal" component={Chathome} />
        <Stack.Screen name="ProfileModal" component={Profile} />
        <Stack.Screen name="TosaleModal" component={Tosale} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
