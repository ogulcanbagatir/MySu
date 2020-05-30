import React from 'react';
import { View,KeyboardAvoidingView, Text, Dimensions, StyleSheet, TouchableOpacity,Keyboard } from 'react-native';
import * as Device from 'expo-device';
import Constants from "expo-constants";
import Colors from "../util/Colors";
import {AntDesign} from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import i18n from 'i18n-js';


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
        isChecked: [false,false,false,false,false] //to check wheter any stars clicked
      }
    }

    //getting device info
    componentDidMount(){
      this.checkDevice()
    }

    //rerendering after language change
    updateScreen = () => {
      this.setState({state: this.state})
    }
    
    //sending data to server
    submit = () =>{
      let data = {
        deviceType: deviceType,
        deviceName: deviceName,
        comment: this.state.comment,
        rate: this.rate
      }
      fetch("https://postman-echo.com/post", {  
        method: "POST",
        body:  JSON.stringify(data)
      })
      .then(function(response){ 
      return response.json();   
      })
      .then(function(data){ 
      console.log(data)
      })
      Keyboard.dismiss()
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
        <KeyboardAvoidingView style = {styles.container}  behavior={"padding"}>
          <View style={styles.boxContainer}>
            <Text style={{fontSize:20,fontWeight:"600",color:Colors.blueDark.alpha1,paddingTop:10}}>
              {i18n.t("rate")}
            </Text>
            <View style={{flexDirection:"row",marginTop:16}}>
              {this.state.isChecked.map((item,index) => {
                return(
                  <TouchableOpacity key={index+"a"} onPress={()=> this.starClicked(index)} activeOpacity={1} >
                    <AntDesign name={ this.state.isChecked[index] ? "star" : "staro"} size={20} color={Colors.blue.alpha1}/>
                  </TouchableOpacity>
                )
              })}
            </View>
            <TextInput 
              style={styles.inputBox}
              placeholder={i18n.t("comment")}
              onChangeText={(text)=>this.setState({comment: text})}
              multiline={true}
              autoCompleteType={"off"}
              autoCorrect={false}
            />
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={this.submit}>
              <Text style={{fontSize:20,fontWeight:"500",color:Colors.blueDark.alpha1}}>
                {i18n.t("submit")}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    marginTop:16,
    paddingTop:20,
  },
  boxContainer:{
    width:SCREEN_WIDTH,
    height:"70%",
    alignItems:"center",
    justifyContent:"center",
    paddingTop:16
  },
  submitButton:{
    width:SCREEN_WIDTH*0.4,
    height:64,
    backgroundColor: Colors.white.alpha1,
    borderRadius:10,
    marginTop:16,
    alignItems:"center",
    justifyContent:"center",
  }

  });