import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView,Button } from 'react-native';
import { Camera } from 'expo-camera';
import Layouts from '../utils/Layouts';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Video } from 'react-native-compressor';
import {schedulePushNotification} from './Notification';
import {setStore, getStore} from '../utils/storage';

export default  function Record() {
    //console.log(Camera);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] =useState(null);
    const [camera, setCamera] = useState(null);
    const [zoom, setZoom] = useState(0);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [loading, setLoading] = useState('----');
    const [record, setRecord] = useState();
    const [storagev, setStorage] = useState('');

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
                setHasAudioPermission(audioStatus.status === 'granted');
            })();
            

      }, []);
        const stopVideo = async () => {
            camera.stopRecording();
        } 

  const uploadVideo2 = async(uriFile)=>{
        let dataToLoad = new FormData();
        dataToLoad.append("action", 'newInsert');
        dataToLoad.append("video", {type : 'vido/mp4', uri:uriFile, name:'video'});
        fetch("https://megapro.out-app-crm.com/reactnative/data/put/",{
            method : 'post',
            body : dataToLoad
        }).then(response => response.json())
        .then(response => {
            //console.log(response);
            if(response.status)
            {
                setLoading(true);
                alert(':) '+response.message);
            }
            else
            {
                setLoading(true);
                alert('Err '+response.message);
            }

        }).catch(()=>{
            alert("Err Networking");
        });
  }
  const uploadVideo = async(uriFile, data) => {

  
    let dataToLoad = new FormData();
        dataToLoad.append("data", 'data');
        dataToLoad.append("video", {type : 'vido/mp4', uri:uriFile, name:'video.mp4'});
        var config = {
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
              setLoading(percentCompleted+ "% "+ Math.round(progressEvent.total/1000000)+'Mo');
              console.log(percentCompleted+ "% "+ Math.round(progressEvent.total/1000000)+'Mo');
            }
          };
            
         // axios.post("http://192.168.1.251/put.php", dataToLoad, config)
          axios.post("https://megapro.out-app-crm.com/test.php", dataToLoad, config)
          //axios.post("http://197.230.112.150/test.php", dataToLoad, config)
          .then(function (res) {
              console.log('DONE');
              
                    schedulePushNotification('Nouvell Annonce', 'Votre vidéo à été téléchargée avec succès', null, 5);
                    
                   // getStore('url_announce', (v) => setStorage(v) );
                    //console.log('Storage:', storagev, '\n');
                    //setStore('url_announce', JSON.stringify(uriFile) );
              
            })
            .catch(function (err) {
                console.log(err);
            });
  }

  const takeVideo = async () => {
    //console.log(await camera.getSupportedRatiosAsync()); 
    //console.log(await Camera.Constants.VideoQuality['4:3']); 
   // Camera.Constants 
    if(camera){
        const data = await camera.recordAsync({
            quality : Camera.Constants.VideoQuality['16:9'],
            videoBitrate : 2*1000*1000,
            maxDuration : 120,
            maxFileSize : 40*1000*1000,
            mute: false

        })
        setRecord(data.uri);
        //console.log(data.uri);
        //Sharing.shareAsync(data.uri);
        //return;
        //Sharing.shareAsync(data.uri);
        //console.log('FileSystem:', FileSystem.documentDirectory);
        //FileSystem.copyAsync(data.uri, FileSystem.documentDirectory+'testado.mp4');
        // const res = await FileSystem.uploadAsync("https://megapro.out-app-crm.com/reactnative/data/put", data.uri,{
        //     uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        //     httpMethod : 'POST',
        //     fieldName : 'video',
        //     mimeType : 'video/mp4',
        //     parameters:{
        //         "key" : 'dfdfdf'
        //         }
        // });

        // console.log(res);
        console.log(data.uri);
      try{  
        const result = await Video.compress(
          data.uri,
          {
            compressionMethod: 'auto',
          },
          (progress) => {
            
            console.log('Compression Progress Front: ', progress);
            
          }
        );

      } catch (err) {
        console.log('Error:', err);
      }
        //uploadVideo(data.uri, null);
        
        return;
        //const a = await FileSystem.readAsStringAsync(data.uri);
        
        //uploadVideo(data.uri, a);
        //console.log(a);


  }
}
  if (!hasAudioPermission || !hasCameraPermission ) {
    return <View />;
  }
  
    if (!hasAudioPermission || !hasCameraPermission) {
    return <Text>No access to camera</Text>;
  }
  const aa =async() =>  await camera.getAvailableVideoCodecsAsync();
  return (
      <SafeAreaView style={{flex: 1,margin: 0}}>
          
          <Camera style={{flex:1}}
                ref={ref => setCamera(ref)}
                type={type}
                ratio={'16:9'}
                zoom={zoom}
                quality={Camera.Constants.VideoQuality['4:3']}
                useCamera2Api={true}

                >
              <View
                  style={{
                      height: '40%',
                      backgroundColor: 'transparent',
                      flexDirection: 'row',
                      bottom:0,
                      position:'absolute'
                  }}>
                    <Text style={{top:10, left:10, position:'absolute', color:'#fff', backgroundColor:'#000', width:200}}>
                      {loading}
                    </Text>
                  <TouchableOpacity
                      style={{
                          //flex: 0.1,
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                          margin:10,
                      }}
                      onPress={() => {
                          setType(
                              type === Camera.Constants.Type.back
                                  ? Camera.Constants.Type.front
                                  : Camera.Constants.Type.back
                          );
                      } }>
                      <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          //flex: 0.1,
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                          margin:10,
                      }}
                       >
                  <Button title="Take video" onPress={() =>{  
                    
                    //console.log("Camera",camera);
                  
                    takeVideo()
                  } }/>
                  </TouchableOpacity>

                  <TouchableOpacity
                      style={{
                          //flex: 0.1,
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                          margin:10,
                      }}
                      >
                  <Button title="Stop Video"  onPress={() => stopVideo() }/>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={{
                          //flex: 0.1,
                          alignSelf: 'flex-end',
                          alignItems: 'center',
                          margin:10,
                      }}
                       >
                  <Button title="init user" onPress={() =>{  
                    
                    //console.log("Camera",camera);
                  
                    setStore('Account', '');
                  } }/>
                  </TouchableOpacity>
                  
                  
              </View>
          </Camera>
 
      </SafeAreaView>
  );
}

/*
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import Layouts from '../utils/Layouts';
function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  console.log(Camera.Constants);  
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
      
    <View style={{ flex: 1 }}>
        <StatusBar 
          translucent={false}
          backgroundColor='black'
          style="light"
        />
      <View style={{ flex: 1,  backgroundColor:'black' }}>
      <Camera style={{ justifyContent: "flex-end",
          alignItems: "center",
            
          //flex: 1,
          //width: 962,
         // height:1280 ,
        //   width: 411,
        //   height:556 ,
        height: Layouts.window.height,
        width: Layouts.window.width,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

          }} 
              type={type} 
              flashMode={{on:true}} 
              autoFocus='on' 
              //VideoCodec=''
              VideoQuality='480p'
              >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      </View>  
    </View>
  );
}
/*
Object {
    "AutoFocus": Object {
      "off": false,
      "on": true,
    },
    "FlashMode": Object {
      "auto": 3,
      "off": 0,
      "on": 1,
      "torch": 2,
    },
    "Type": Object {
      "back": 0,
      "front": 1,
    },
    "VideoCodec": undefined,
    "VideoQuality": Object {
      "1080p": 1,
      "2160p": 0,
      "480p": 3,
      "4:3": 4,
      "720p": 2,
    },
    "VideoStabilization": Object {},
    "WhiteBalance": Object {
      "auto": 0,
      "cloudy": 1,
      "fluorescent": 4,
      "incandescent": 5,
      "shadow": 3,
      "sunny": 2,
    },
  }
*/
  