import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';	

const Header = ({city,price, devise}) => {
	return (
		<View style={style.container}>
				<Icon2 name='map-marker-radius-outline' size={18} style={{opacity:0.8}} color='#fff'/>
				<Text style={style.menuNormal}>{city}</Text>
			<View style={style.separator}/>
			<Text style={style.menuBold}>{price} {devise}</Text>
		</View>
	)
}

export default Header

const style= StyleSheet.create({
	container :{
		top: 20,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		position: 'absolute',
		zIndex: 1,
	},
	menuBold:{
		color: '#fff',
		//letterSpacing: 0.8,
		marginLeft: 11,
		fontWeight: 'bold',
		//opacity: 0.8,
		fontSize: 18,
		//textShadowOffset: {width: 1, height: 1},
		textShadowRadius: 0.5,
		textShadowColor: 'black'
	},
	menuNormal:{
		color: '#fff',
		letterSpacing: 0.8,
		marginRight: 11,
		fontWeight: 'normal',
		//opacity:  0.8,
		fontSize: 18,
		//textShadowOffset: {width: 1, height: 1},
		textShadowRadius: 0.5,
		textShadowColor: 'black'
	},
	separator:{
		width: 2,
		height: 15,
		backgroundColor: '#d8d8d8',
		//opacity: 0.8,
		textShadowOffset: {width: 1, height: 1},
		textShadowRadius: 0.5,
		textShadowColor: 'black'

	}
});