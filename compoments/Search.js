import React, { Component } from 'react'
import { Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
class SearchCompoment extends Component {
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
                Search
            </Text>
        )
    }
}
const Stack = createNativeStackNavigator();

export default function Search() {
  return (
    
    <Stack.Navigator initialRouteName='SearchCompoment'>
        <Stack.Screen name="SearchCompoment" component={SearchCompoment} />
    </Stack.Navigator>

  );
}
