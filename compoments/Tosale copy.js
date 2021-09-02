// import React, { Component } from 'react'
// import { Text } from 'react-native'
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

// class TosaleCompoment extends Component {
//     constructor(props){
//         super(props);
//     }
//     componentDidMount(){
//         console.log('componentDidMount');
//     }
//     componentDidUpdate(){
//         console.log('componentDidUpdate');
//     }
//     componentDidCatch(){
//         console.log('componentDidCatch');
//     }
//     render() {
//         return (
//             <Text>
//                 Tosale
//             </Text>
//         )
//     }
// }
 const Stack = createNativeStackNavigator();

 export default function Tosale() {
   return (
    
       <Stack.Navigator initialRouteName='TosaleCompoment'>
         <Stack.Screen name="TosaleCompoment" component={TosaleCompoment} />
       </Stack.Navigator>

   );
}



 function TosaleCompoment() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: 200,
    height:300
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});