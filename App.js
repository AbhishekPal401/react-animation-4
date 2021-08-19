import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Image ,Dimensions} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import Animated, {useAnimatedGestureHandler,useSharedValue,useAnimatedStyle,withSpring} from 'react-native-reanimated'

const imageUrl='https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

export default function App() {

  const scale =useSharedValue(1);
  const focalX=useSharedValue(0);
  const focalY=useSharedValue(0);

  const {width,height}=Dimensions.get('window');

  const pinchHandler=useAnimatedGestureHandler({
    onActive:(event)=>{ scale.value=event.scale,focalX.value=event.focalX,focalY.value=event.focalY },
    onEnd:()=>{scale.value= withSpring(1,{stiffness:150,damping:50}) }
  });

  const scaleStyle=useAnimatedStyle(()=>{
    return{
      transform:[{translateX:focalX.value},{translateY:focalY.value},{translateX:-width/2},{translateY:-height/2},
        {scale:scale.value},{translateX:-focalX.value},{translateY:-focalY.value},{translateX:width/2},{translateY:height/2}]
    }
  })

  const focalPointStyle=useAnimatedStyle(()=>{
    return{
      transform:[{translateX:focalX.value},{translateY:focalY.value}]
    }
  })

  const AnimatedImage=Animated.createAnimatedComponent(Image)

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{flex: 1,}}>
      
      <AnimatedImage source={{ uri:imageUrl }} style={[{flex:1,},scaleStyle]} />
      <Animated.View style={[styles.focalpoint,focalPointStyle]}/>
      </Animated.View>
     
      
       
    </PinchGestureHandler>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focalpoint:{
    ...StyleSheet.absoluteFillObject,
    width:30,
    height:30,
    borderRadius:15,
    backgroundColor:'red'
  },
});
