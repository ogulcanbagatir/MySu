import React from 'react';
import { View,KeyboardAvoidingView, Platform, Text, Dimensions, StyleSheet, Easing, Animated, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import * as Device from 'expo-device';
import Constants from "expo-constants";
import Colors from "../util/Colors";
import { Feather } from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';


const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
let deviceType = ""
let deviceName = ""


export default class FeedBackForm extends React.Component {
    constructor(props){
      super(props);
      this.stars = []
      this.rate = 0
      this.state = {
        comment: "",
        isChecked: [false,false,false,false,false]
      }
    }

    componentDidMount(){
      this.checkDevice()
    }
    submit = () =>{
      console.log("DEVICE TYPE: " + deviceType)
      console.log("DEVICE NAME: " + deviceName)
      console.log("COMMENT: " + this.state.comment)
      console.log("RATE: " + this.rate)
    }
    checkDevice() {
      Device.getDeviceTypeAsync().then((response) => {
        deviceType =  Device.DeviceType[response]
        deviceName = Device.deviceName
        
      }).catch((e) => {
        console.log("DEVICE TYPE IS UNKNOWN!")
      })
    } 

    starClicked(index){
      let arr = this.state.isChecked
      let k = index
      for(let i = 0; i < index+1; i++){
        arr[i] = true
      }
      for(;k+1 < arr.length; k++){
        arr[k+1] = false
      }
      this.rate = index+1
      this.setState({isChecked: arr})
      
    }

    render(){
      return(
        <View style = {styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={{width:44,height:"100%",alignItems:"center",justifyContent:"center",marginTop:Constants.statusBarHeight*0.5}} onPress={()=>this.props.navigation.goBack()}>
              <Feather name={"chevron-left"} size={20} />
            </TouchableOpacity>
            <Text style={{fontSize:18,fontWeight:"600",marginTop:Constants.statusBarHeight*0.5,flex:1,textAlign:"center"}}>
              FeedBackForm
            </Text>
            <View style={{width:44,height:"100%"}}>
            </View>
          </View>
          <KeyboardAvoidingView style={styles.boxContainer} behavior={"padding"}>
            <Text style={{fontSize:20,fontWeight:"600",color:Colors.blueDark.alpha1}}>
              Rate MySu
            </Text>
            <View style={{flexDirection:"row",marginTop:30}}>
              {this.state.isChecked.map((item,index) => {
                return(
                  <TouchableOpacity onPress={()=> this.starClicked(index)} activeOpacity={1} >
                    <AntDesign name={ this.state.isChecked[index] ? "star" : "staro"} size={20} color={Colors.blue.alpha1}/>
                  </TouchableOpacity>
                )
              })}
            </View>
            <TextInput 
              style={styles.inputBox}
              placeholder={"Please leave a comment."}
              onChangeText={(text)=>this.setState({comment: text})}
              multiline={true}
            />
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={this.submit}>
              <Text style={{fontSize:20,fontWeight:"500",color:Colors.blueDark.alpha1}}>
                Submit
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      )
    }
    
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: SCREEN_WIDTH,
  },
  header:{
    height: Constants.statusBarHeight + 64,
    width:SCREEN_WIDTH,
    borderWidth: 1,
    borderColor: Colors.gray,
    shadowColor: Colors.black.alpha1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 7,
    shadowOpacity: 0.05,
    borderRadius:10,
    alignItems:"center",
    justifyContent:"space-evenly",
    flexDirection:"row"
  },
  inputBox:{
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: 20,
    shadowColor: Colors.black.alpha1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 7,
    shadowOpacity: 0.05,
    backgroundColor: Colors.white.alpha1,
    borderRadius: 10,
    height:150,
    width:"80%",
    marginTop:30,
    paddingTop:20,
  },
  boxContainer:{
    width:SCREEN_WIDTH,
    height:"70%",
    alignItems:"center",
    justifyContent:"center",
  },
  submitButton:{
    width:SCREEN_WIDTH*0.4,
    height:64,
    backgroundColor: Colors.white.alpha1,
    borderRadius:10,
    marginTop:20,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:50
  }

  });