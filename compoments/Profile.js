import React, { Component } from 'react'
import { View, Button} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
class ProfileCompoment extends Component {
    constructor(props){
        super(props);
    }
    componentWillUnmount(){
        //console.log('componentWillUnmount');
    }
    componentDidMount(){
        //console.log('componentDidMount');
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Profile"
                onPress={() => this.props.navigation.navigate('MainAll')}
            />
            </View>
            
        )
    }
}
const Stack = createNativeStackNavigator();

export default function Profile() {
  return (
    
      <Stack.Navigator initialRouteName='ProfileCompoment'>
        <Stack.Screen name="ProfileCompoment" component={ProfileCompoment} />
      </Stack.Navigator>

  );
}
