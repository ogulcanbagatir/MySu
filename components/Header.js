import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from "../util/Colors"
import Constants from "expo-constants";
import { FontAwesome } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
//headerStyle prop can be used to override style of header.

export default class Header extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      }
    }
    componentDidMount(){
    }


    render(){
      return(
      <View style={[styles.header,this.props.headerStyle]}> 
        <View style={{flex:1,paddingLeft:15}}>
          <TouchableOpacity onPress={this.props.changeLanguage}>
            <Text style={{color:Colors.lavanderDark.alpha1,fontSize:16,fontWeight:"600"}}>
              {this.props.language}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:2,alignItems:"center"}}>
          <Text style={{fontSize:20,color:Colors.blueDark.alpha1,fontWeight:"600"}}>
            {this.props.headerText}
          </Text>
        </View>
        <TouchableOpacity style={{flex:1,alignItems:"flex-end",paddingRight:15}}>
          <FontAwesome name={"search"} size={18} color={Colors.lavender.alpha1}/>
        </TouchableOpacity>
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
    alignItems:"center",
    flexDirection:"row",
    height: 44 + Constants.statusBarHeight,
    paddingTop:Constants.statusBarHeight,
    borderBottomWidth:0.3,
    borderLeftWidth:0.3,
    borderRightWidth:0.3,
    borderColor:Colors.blue.alpha03,
    shadowColor: Colors.black.alpha1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 7,
    shadowOpacity: 0.05,
  },
})
