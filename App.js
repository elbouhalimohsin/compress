import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView,Button } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'react-native-compressor';

export default  function App() {
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] =useState(null);
    const [camera, setCamera] = useState(null);
    const [zoom, setZoom] = useState(0);
    const [type, setType] = useState(Camera.Constants.Type.back);

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


  const takeVideo = async () => {
    if(camera){
        const data = await camera.recordAsync({
            quality : Camera.Constants.VideoQuality['16:9'],
            videoBitrate : 2*1000*1000,
            maxDuration : 120,
            maxFileSize : 40*1000*1000,
            mute: false
        })
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

      return;


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
