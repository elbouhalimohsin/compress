import React,{Component, useEffect} from 'react'

import { Video } from 'expo-av'
import { TouchableWithoutFeedback,
	     Dimensions,
		 ActivityIndicator,
		 View,
		 StyleSheet, 
		 Text,
		 TouchableOpacity, 
		 ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './Header'
import Layouts from '../utils/Layouts';


const {width, height} = Dimensions.get('window');


export default class  VideoPlayer extends Component {
	
	constructor(props){
        super(props);
		this.avideo = React.createRef(null);
		this.state = {
			actionUser : true,
			videoLoadBuffer: 0,
			progressVideo : 0,

		}
		this.stateNav = null;
		
    }
	componentDidUpdate({navigation}) {

		if(this.state.progressVideo)
		{
			if(this.stateNav != navigation.isFocused())
			{
				if(this.props.isPlay)
				{
					this.safePlay(this.stateNav = navigation.isFocused());
				} 
				
			}
		}
	}
    componentWillUnmount(){
        //console.log('componentWillUnmountVideo');
		//this.setState({actionUser : false});

    }
    componentDidMount(){
		//console.log('componentDidMount');
		if(this.props.isPlay) 
		this.setState({
				actionUser : true,
				videoLoadBuffer: 0,
				progressVideo : 0,
	
		});
    }
	onLoadStart = ()=> {
		this.setState({videoLoadBuffer : 1});
		this.setState({actionUser : true});
	}
	onLoad = () =>{
		this.setState({videoLoadBuffer : 0});
	}
	
	safePlay =(action) =>{
		if(this.state.actionUser)
		{
			action ? this.avideo.current.playAsync() : this.avideo.current.pauseAsync();
			this.setState({actionUser : action});
		}

	}
	
	tooglePlay =() =>{
		if(this.props.isPlay)
		{
			this.state.actionUser ? this.avideo.current.pauseAsync() : this.avideo.current.playAsync();
			this.setState({ actionUser : !this.state.actionUser});
		}
	}
	  
	onPlaybackStatusUpdate = (value)=>{
		
		this.setState({videoLoadBuffer : 1*(this.state.actionUser && this.state.progressVideo == value.positionMillis)});
		this.setState({
						progressVideo : value.positionMillis, 
						//actionUser: value.isPlaying
		});
	}
	render(){
		return this.props.okbackground ? ( 
			<>
			<Header city={this.props.item.city} price={this.props.item.price} devise={this.props.item.devise}/>
			<TouchableWithoutFeedback disabled={false} style={{height: height,
				width: width,
				backgroundColor: '#ddd'}} onPress={() =>{this.tooglePlay(); }}>   
			<Video
				style={styles.video}
				ref={this.avideo}
				rate={1.0}
				onLoadStart={this.onLoadStart}
				//posterSource={this.props.item.poster}
				//posterStyle={{height: height,width: width}}
				onLoad={this.onLoad}
				onPlaybackStatusUpdate={(playbackStatus) =>{  this.onPlaybackStatusUpdate(playbackStatus)}}
				volume={1.0}
				isMuted={false}
				shouldPlay={this.props.isPlay}
				useNativeControls={false}
				source={{ uri : this.props.item.video}}
				resizeMode='contain'
				isLooping={true}
				//posterSource={{uri:this.props.item.poster}}
				//usePoster={true}
			> 
			</Video>
			</TouchableWithoutFeedback> 
			<TouchableWithoutFeedback   onPress={() =>{ this.tooglePlay(); }}>
			<View style={{...styles.mainContainer,flex:1,backgroundColor:'transparent', position:'absolute'}}>
			
				
			<View style={styles.innerLeft}>
				<View style={styles.dataContainer}>
				  <Text style={styles.title} numberOfLines={1}>@{this.props.item.title}</Text>
				  <Text style={styles.description} numberOfLines={4}>
					{this.props.item.description}
				  </Text>
				  
				  <View style={styles.music}>
					<Icon2
					  name="account"
					  size={18}
					  color="#fff"
					  style={{marginRight: 10}}
					/>
					<Text style={{color: '#fff'}}>{this.props.item.user.name}</Text>
				  </View>
				</View>
			  </View>
	
			  <View style={styles.innerRight}>
				<View style={{height: 52,width: 52,alignItems: 'center',marginBottom: 25}}borderRadius={26} borderWidth={2} borderColor="#fff">
					<TouchableOpacity style={styles.btn} onPress={() =>console.log(this.props.item.id, 'back:',this.props.okbackground,',play', this.props.isPlay )}>
						<Icon2 name="book-open-page-variant" color="#fff" size={30} style={{textShadowRadius: 0.5,textShadowColor: 'black'}}/>
					</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.touchableOpacityRight}>		
						<Icon name="ios-heart" size={45} color="#e5e5e5" style={{textShadowRadius: 0.5,textShadowColor: 'black'}}/>
						<Text style={{color: '#fff', marginBottom: 25,textShadowRadius: 0.5,textShadowColor: 'black'}}>Favori</Text>
					</TouchableOpacity>	
					<TouchableOpacity style={styles.touchableOpacityRight}>		
						<Icon2 name="chat-processing" size={45} color="#e5e5e5"	style={{textShadowRadius: 0.5,textShadowColor: 'black'}}/>
						<Text style={{color: '#fff', marginBottom: 25,textShadowRadius: 0.5,textShadowColor: 'black'}}>Chat</Text>
					</TouchableOpacity>	
		
					<TouchableOpacity style={styles.touchableOpacityRight}>		
						<Icon2 name="arrow-decision" size={45} color="#4fce5d" style={{textShadowRadius: 0.5,textShadowColor: 'black'}}/>
						<Text style={{color: '#fff', marginBottom: Layouts.settingsTabNav.StatusBarHeight,textShadowRadius: 0.5,textShadowColor: 'black'}}>Partage </Text>
					</TouchableOpacity>	
			  	</View>
			</View>	
			</TouchableWithoutFeedback>
			<ActivityIndicator
					animating
					color='red'
					size="large"
					style={{opacity:this.state.videoLoadBuffer, position: 'absolute',
					top: height/2-50,
					left: width/2-30,
					height:100,
					right:100,
					width:50
					}}/>  
			  <Icon2
					onPress={() =>{
						this.tooglePlay();
					  }}
					name="play"
					size={100}
					color="#fff"
					style={{opacity:!this.state.actionUser?1:0, position: 'absolute',
					top: height/2-50,
					left: width/2-50,
					height:100,
					right:100
					}}/>
			</>
		) : null
	}
}

const styles = StyleSheet.create({
	touchableOpacityRight:{
		justifyContent: 'center', 
		alignContent: 'center', 
		alignItems: 'center',

	},
	video: {
		//backgroundColor: 'red',
		height: '100%',
		flex:1,
		width:'100%',
		position:'absolute'
	},
	mainContainer: {
	  //backgroundColor:'red',	
	  height: '100%',
	  flexDirection: 'row',
	  width: width,
	  position: 'absolute',
	  //justifyContent: 'center',
	  bottom: Layouts.settingsTabNav.AppTabsNavigatorHeight,
	  
	},
	innerLeft: {
	  //backgroundColor: '#6198cc',
	  width: '80%',
	  height: '100%',
	},
	innerRight: {
	  
      //backgroundColor: '#6155cc',
	  width: '20%',
	  height: '100%',
	  alignItems: 'center',
	  justifyContent:'flex-end',
	},
	btn: {
	  backgroundColor: '#6198cc',
	  width: 48,
	  height: 48,
	  borderRadius: 48,
	  elevation: 5,
	  justifyContent: 'center',
	  alignContent: 'center',
	  alignItems: 'center',
	  position: 'absolute',
	  //bottom: 0,
	},
	dataContainer: {
	  //backgroundColor: '#62563c',
	  //height: '35%',
	  width: '100%',
	  position: 'absolute',
	  bottom: Layouts.settingsTabNav.StatusBarHeight,
	  padding: 5,
	},
	title: {
	  fontSize:Layouts.settingsTabNav.FontSizeTextPlayer,	
	  fontWeight: 'bold',
	  color: '#fff',
	  height:15,
	  width:'80%',
	  textShadowRadius: 0.5,
	  textShadowColor: 'black'
	},
	description: {
	  color: '#fff',
	  fontSize:Layouts.settingsTabNav.FontSizeTextPlayer,	
	  //marginBottom: 15,
	  //height:60,
	  textShadowRadius: 0.5,
	  textShadowColor: 'black'
	},
	music: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  textShadowRadius: 0.5,
	  textShadowColor: 'black'
	},
  });
  