
import React from 'react';
import { View, Platform, Text, Dimensions, StyleSheet, Easing, Animated, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
import Colors from "../util/Colors"
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.PureComponent {
    constructor(props){
      super(props);
      this.state = {
      }
    }

    render(){
      return(
        <View style = {styles.container}>
          <View style={styles.boxContainer}>
            <TouchableOpacity style={styles.box} activeOpacity={0.8} onPress={()=>this.props.navigation.navigate("MenuScreen")}>
              <Text style={styles.text}>
                Menu Screen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} activeOpacity={0.8} onPress={()=>this.props.navigation.navigate("ShuttleScreen")}>
              <Text style={styles.text}>
                Shuttle Screen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} activeOpacity={0.8} onPress={()=>this.props.navigation.navigate("FeedBackForm")}>
              <Text style={styles.text}>
                Feedback Form
                </Text>
            </TouchableOpacity>
          </View>
          
        </View>
      )
    }
    
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: SCREEN_WIDTH,
      justifyContent: 'center',
  },
  boxContainer:{
    height:SCREEN_WIDTH,
    width:SCREEN_WIDTH,
    alignItems:"center",
    justifyContent: 'space-evenly'
  },
  box:{
    width:SCREEN_WIDTH*0.7,
    height:75,
    borderWidth: 1,
    borderColor: Colors.gray,
    shadowColor: Colors.black.alpha1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 7,
    shadowOpacity: 0.05,
    borderRadius:10,
    backgroundColor: Colors.white.alpha1,
    alignItems:"center",
    justifyContent: 'center',
  },
  text:{
    fontSize:20,
    color:Colors.black5,
    
  }

  });