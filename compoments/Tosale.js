import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Record from './Record';
import Login from './Login';
import Running from './Running';

import {getStore} from '../utils/storage';
import AppLoading from 'expo-app-loading';
import * as SecureStore from 'expo-secure-store';
import { createIconSetFromFontello } from '@expo/vector-icons';
const Stack = createNativeStackNavigator();
                    
export default class Tosale extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      action : 'Wait', // Wait : pas de decision la fct async recherche encore la val de l'action
                       // Login: pas de session il doit s'authentifier
                       // Record : vers l'enregistrement d'une nouvell annonce
                       // Running : vers l'ecrant du traitement de la derniere annonce   
      lastAnnonce : {},
      Account : {},
         
    }
  }
  
  componentDidMount(){
    console.warn("Hello");
    //this.forceUpdate();
  }

  async _loadResourcesAsync(_this) {
      const annonce = await SecureStore.getItemAsync('Annouce')
      const account = await SecureStore.getItemAsync('Account')
      _this.setState({lastAnnonce : annonce});
      _this.setState({Account : account});
  }

  render(){
    //console.log('Render :', this.state.action);
    if(this.state.action == 'Wait')
        return (
          <AppLoading
            startAsync={() => this._loadResourcesAsync(this)}
            onFinish={() => {
              if(!this.state.Account)
                return this.setState({action:'Login'});
              else
              if(this.state.lastAnnonce)
                return this.setState({action:'Running'});
              else
                return this.setState({action:'Record'});
              
            }}
            onError={console.warn}
          />
        );
    else
    {  
        return (
          <Stack.Navigator initialRouteName={`${this.state.action}Component`} screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginComponent" component={Login} />
            <Stack.Screen name="RunningComponent" component={Running} />
            <Stack.Screen name="RecordComponent" component={Record} />
          </Stack.Navigator> 
          );
    }
  }
}

