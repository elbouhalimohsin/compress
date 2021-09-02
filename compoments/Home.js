import React, { Component, useState } from 'react'
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import VideoPlayer from './VideoPlayer'
import Layouts from '../utils/Layouts';
/* */
import Videos from '../service/api';
const  height = Layouts.window.height

//console.log(Videos.length);
const ListingMain = ({navigation}) => {
	const [selected, setSelected] = useState(0)
	const loadBackground =(index, current)=>
	{
		const nbrPages = 5;
		const min = current-nbrPages;
		const max = current+nbrPages;
		//console.log('index:',index,',current:', current,',min:', min,',max:', max);
		if(index >= min && index <=max)
		{
			//console.log(true?'OK':'  ','index:',index,',current:', current,',min:', min,',max:', max);
			
			return true;
		}

		return false;
	}
	return (
		<PagerView style={{height:height, backgroundColor:'#000'}}
			orientation='vertical'
			onPageSelected={e => setSelected(e.nativeEvent.position)}
			initialPage={0}>
			{Videos.map((item, index) => {
				//console.log(index);
				return (
					<View key={index} style={{flex: 1, flexDirection:'row'}}>
						<VideoPlayer
							item={item}
							isPlay={selected === index}
							okbackground={loadBackground(index, selected)}
							navigation={navigation}
						/>
					</View>
				)
			})}
		</PagerView>
	)
}

export default ListingMain
