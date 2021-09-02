import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Layouts from '../utils/Layouts';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
//
import Tosale from './Tosale';
import Home from './Home';
import Search from './Search';
import Chathome from './Chathome';
import Profile from './Profile';
//
import Language from '../utils/Languages';
import * as SecureStore from 'expo-secure-store';

const AppTabs = createBottomTabNavigator();
let WORDS = Language('fr');

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng : false
        }
    }
    async _loadResourcesAsync(_this){
        const lang = await SecureStore.getItemAsync('language');
        _this.setState({lng : lang ?lang : 'fr'});
        //console.log("LNG:", lang);
        WORDS = Language(lang);
        return true;
    }
    render() {
        if(!this.state.lng)
        return (
            <AppLoading
            startAsync={() => this._loadResourcesAsync(this)}
            onFinish={() => {

               
                console.log('this.state.lng');
                
            }}
            onError={console.warn}
            />
        );
        else
        return (
                <AppTabs.Navigator
                    initialRouteName='Home'
                    
                     screenOptions={{
                        headerShown: false,
                        tabBarStyle: { 
                                        backgroundColor:'#000',
                                        height:Layouts.settingsTabNav.AppTabsNavigatorHeight,
                                        position: 'absolute',
                                        elevation:0,
                                     },
                    }}
                >
                    <AppTabs.Screen name="Home" 
                                    component={Home} 
                                    options={{
                                        title:'',
                                        tabBarIcon: ({focused}) => (
                                            <View style={{  alignItems:'center', 
                                                            justifyContent:'center',
                                                            top:Layouts.settingsTabNav.AppTabsScreenTop
                                                        }}>
                                                <Image source={require('../assets/home.png')} 
                                                       resizeMode='contain'
                                                       style={{
                                                           width:Layouts.settingsTabNav.AppTabsScreenImageWidth,
                                                           height:Layouts.settingsTabNav.AppTabsScreenImageHeight,
                                                           tintColor: focused ? '#fff':'#C8C8CE'
                                                       }} />
                                                <Text style={{
                                                    color: focused ? '#fff':'#C8C8CE',
                                                    fontSize:Layouts.settingsTabNav.AppTabsScreenTextSize
                                                }}>{WORDS.accueil}</Text>    
                                            </View>
                                        ),
                                    }}
                                    
                                    
                                    
                    />
                    <AppTabs.Screen name="Search" 
                                    component={Search} 
                                    options={{
                                        title:'',
                                        tabBarIcon: ({focused}) => (
                                            <View style={{  alignItems:'center', 
                                                            justifyContent:'center',
                                                            top:Layouts.settingsTabNav.AppTabsScreenTop
                                                        }}>
                                                <Image source={require('../assets/discover.png')} 
                                                       resizeMode='contain'
                                                       style={{
                                                           width:Layouts.settingsTabNav.AppTabsScreenImageWidth,
                                                           height:Layouts.settingsTabNav.AppTabsScreenImageHeight,
                                                           tintColor: focused ? '#fff':'#C8C8CE'
                                                       }} />
                                                <Text style={{
                                                    color: focused ? '#fff':'#C8C8CE',
                                                    fontSize:Layouts.settingsTabNav.AppTabsScreenTextSize
                                                }}>{WORDS.recherche}</Text>       
                                            </View>
                                        ),
                                    }}
                                    listeners={({navigation}) => ({
                                        tabPress: (e) => {
                                          // Prevent default action
                                          e.preventDefault();
                                    
                                          // Do something with the `navigation` object
                                          navigation.navigate('SearchModal');
                                          //console.log(props);
                                        },
                                      })}
                    />
                    <AppTabs.Screen name="Tosale" 
                                    component={Tosale} 
                                    options={{
                                        title: '',
                                        tabBarIcon: ({focused}) => (
                                            <View style={{  alignItems:'center', 
                                                            justifyContent:'center',
                                                            top:Layouts.settingsTabNav.AppTabsScreenTosaleTop,
                                                            borderRadius:Layouts.settingsTabNav.AppTabsScreenTosaleBorderRadius,
                                                            width:Layouts.settingsTabNav.AppTabsScreenTosaleWidth,
                                                            height:Layouts.settingsTabNav.AppTabsScreenTosaleHeight,
                                                            backgroundColor:'#de4b4b'

                                                        }}>
                                                <Ionicons name='camera' size={Layouts.settingsTabNav.AppTabsScreenTosaleIconSize} color='#fff'/>
                                            </View>
                                            
                                           
                                        ),
                                    }}
                                    listeners={({navigation}) => ({
                                        tabPress: (e) => {
                                          // Prevent default action
                                          e.preventDefault();
                                    
                                          // Do something with the `navigation` object
                                          navigation.navigate('TosaleModal');
                                          //console.log(props);
                                        },
                                      })}
                    
                    />
                    <AppTabs.Screen name="Chathome" 
                                    component={Chathome} 
                                    options={{
                                        title:'',
                                        tabBarIcon: ({focused}) => (
                                            <View style={{  alignItems:'center', 
                                                            justifyContent:'center',
                                                            top:Layouts.settingsTabNav.AppTabsScreenTop
                                                        }}>
                                                <Image source={require('../assets/message.png')} 
                                                       resizeMode='contain'
                                                       style={{
                                                           width:Layouts.settingsTabNav.AppTabsScreenImageWidth,
                                                           height:Layouts.settingsTabNav.AppTabsScreenImageHeight,
                                                           tintColor: focused ? '#fff':'#C8C8CE'
                                                       }} />
                                                <Text style={{
                                                    color: focused ? '#fff':'#C8C8CE',
                                                    fontSize:Layouts.settingsTabNav.AppTabsScreenTextSize
                                                }}>{WORDS.message}</Text>       
                                            </View>
                                        ),
                                    }}

                    />
                    <AppTabs.Screen name="Profile" 
                                    component={Profile} 
                                    options={{
                                        title:'',
                                        tabBarIcon: ({focused}) => (
                                            <View style={{  alignItems:'center', 
                                                            justifyContent:'center',
                                                            top:Layouts.settingsTabNav.AppTabsScreenTop
                                                        }}>
                                                <Image source={require('../assets/profile.png')} 
                                                       resizeMode='contain'
                                                       style={{
                                                           width:Layouts.settingsTabNav.AppTabsScreenImageWidth,
                                                           height:Layouts.settingsTabNav.AppTabsScreenImageHeight,
                                                           tintColor: focused ? '#fff':'#C8C8CE'
                                                       }} />
                                                <Text style={{
                                                    color: focused ? '#fff':'#C8C8CE',
                                                    fontSize:Layouts.settingsTabNav.AppTabsScreenTextSize
                                                }}>{WORDS.profil}</Text>       
                                            </View>
                                        ),
                                    }}
                                    listeners={({navigation}) => ({
                                        tabPress: (e) => {
                                          // Prevent default action
                                          e.preventDefault();
                                    
                                          // Do something with the `navigation` object
                                          navigation.navigate('ProfileModal');
                                          //console.log(props);
                                        },
                                      })}
                    />
                </AppTabs.Navigator>
        )
    }
}




const styles = StyleSheet.create({})
