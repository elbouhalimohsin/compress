import React, { Component } from 'react'
import { Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
class ChathomeCompoment extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log('componentDidMount');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }
    componentDidCatch(){
        console.log('componentDidCatch');
    }
    render() {
        return (
            <Text>
                Chathome
            </Text>
        )
    }
}
const Stack = createNativeStackNavigator();

export default function Chathome() {
  return (
    
      <Stack.Navigator initialRouteName='ChathomeCompoment'>
        <Stack.Screen name="ChathomeCompoment" component={ChathomeCompoment} />
      </Stack.Navigator>

  );
}
