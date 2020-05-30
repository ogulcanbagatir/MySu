import React from 'react';
import { View, Text, Dimensions, StyleSheet, Easing, Animated, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import API from "../util/API"
import Colors from "../util/Colors"
const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
import Constants from "expo-constants"
import i18n from 'i18n-js';


export default class MenuScreen extends React.PureComponent {
    constructor(props){
      super(props);
      this.menu = []

      this.state = {
        menu: [],
        loading: true,
      }
    }

    componentDidMount(){
      this.getMenus()
    }
    
    updateScreen = () => {
      this.setState({state: this.state})
    }
    
    getMenus = () => {
      API.getMenu("2020-03-13","2020-03-13").then((response) => {
        this.setState({menu: response,loading: false},()=>this.setAllMenus())
      }).catch((e) => {
        console.log(e)
      })
    }

    setAllMenus(){
      for(let i = 0; i < this.state.menu.length; i++){
        let food = this.state.menu[i]
        let obj = {}
          obj = {meal: food, indexId: i, animVal: new Animated.Value(0),isSelected: false}
          this.menu.push(obj)
      }
    }

    setMealTime = (item) =>{
      if(item.meal.dinner === item.meal.lunch){
        return i18n.t("both")
      }
      else if(item.meal.dinner === true && item.meal.lunch === false){
        return i18n.t("dinner")
      }
      else if(item.meal.dinner === false && item.meal.lunch === true){
        return i18n.t("lunch")
      }
    }

    renderItem({item,index}){
      return(
        <View style={styles.rowContainer} activeOpacity={0.9}>
          <View style={[styles.circle,{backgroundColor:item.meal.calorie <= 200 ? Colors.green.alpha1 : item.meal.calorie > 200 && item.meal.calorie <= 400 ? Colors.yellow.alpha1 : item.meal.calorie > 400 ? Colors.red.alpha1 : Colors.gray }]}/>
          <Text style={{fontSize:15, fontWeight: "500", color: Colors.darkGrayDark.alpha1, flex: 1, marginLeft: 15, marginRight: 20}}>
            {this.props.language === "EN" ? item.meal.meal_en : item.meal.meal}
          </Text>
          <View>
            <Text style={{fontSize:15, color: Colors.blueDark.alpha1, fontWeight: "600", textAlign: "right"}}>
              {item.meal.calorie + " " + i18n.t("cal")}
            </Text>
            <Text style={{color: Colors.lavender.alpha1,textAlign:"center",marginTop:5}}>
              {this.setMealTime(item)}
            </Text>
          </View>
        </View>
      )
    }

    render(){
      return(
        <View style = {styles.container}>
          <View style={{width:SCREEN_WIDTH,flex:1}}>
            <FlatList 
              style={{flex:1}}
              data={this.menu}
              renderItem = {(item) => this.renderItem(item)}
              keyExtractor={(item, index) => "menu" + item.indexId + index }
              contentContainerStyle = {{padding:20}}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: SCREEN_WIDTH,
  },
  timeButton:{
    flex:1,
    justifyContent:"center",
    alignItems: 'center',
    height:36
  },
  selectedIndicator:{
    backgroundColor:"rgba(28,169,227,1.0)",
    borderRadius:5,
    flex:1,
    width:"100%"
  },
  indicatorContainer:{
    position:"absolute", 
    height:36,
    width:SCREEN_WIDTH*0.5-20,
    padding:3,
  },
  selectView:{
    flexDirection:"row",
    backgroundColor:'rgba(230,233,237, 0.5)',
    borderRadius:5,
    alignItems:"center",
    width:SCREEN_WIDTH*0.9,
    alignSelf:"center",
    marginTop:20
  },
  rowContainer:{
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: 20,
    shadowColor: Colors.black.alpha1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 7,
    shadowOpacity: 0.05,
    backgroundColor: Colors.white.alpha1,
    borderRadius: 10,
    marginTop: 15,
    height:64,
    width:"100%",
    alignItems:"center",
    flexDirection:"row",
  },
  circle:{
    width:7,
    height:7,
    borderRadius:4,
  },
  headerContainer:{
    width:SCREEN_WIDTH,
    paddingVertical:20
  },
  headerButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    width: 60,
  
  },  
  header:{
    height: Constants.statusBarHeight + 44,
    alignItems:"center",
    flexDirection:"row",
  },
  headerText:{
    fontSize: 17,
    fontWeight:"600",
    flex: 1, 
    textAlign: "center"
  },
  clearButton:{
    width:44,
    height:64,
    justifyContent:"center",
    alignItems:"center"
  },
  calorieContainer:{
    width:SCREEN_WIDTH,
    alignItems:"center",
    justifyContent:"space-evenly",
    flexDirection:"row",
    borderWidth: 1,
    borderColor: Colors.gray,
    shadowColor: Colors.black.alpha1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 7,
    shadowOpacity: 0.05,
    borderRadius:10,
    backgroundColor: Colors.white.alpha1,
  },
  calorieCardContent: {
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH + 4,
    backgroundColor: Colors.lightGray.alpha1,
    borderWidth: 2,
    borderColor: Colors.lightGrayDark.alpha1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
  },
  selectedItem:{
    height:"100%",
    position:"absolute",
    backgroundColor:Colors.blue.alpha1,
    alignItems:"flex-end",
    justifyContent:"center",
    borderRadius:10
  },
  totalCalorie:{
    width: SCREEN_WIDTH,
    height: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 50,
    justifyContent: 'center',
    alignItems:"center",
    borderWidth: 1,
    borderColor: Colors.gray,
    shadowColor: Colors.black.alpha1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 7,
    shadowOpacity: 0.05,
    backgroundColor: Colors.white.alpha1,
  }

  });