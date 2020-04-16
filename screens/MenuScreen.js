import React from 'react';
import { View, Text, Dimensions, StyleSheet, Easing, Animated, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import API from "../util/API"
import Colors from "../util/Colors"
const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
import { Feather } from '@expo/vector-icons';
import Constants from "expo-constants"


export default class MenuScreen extends React.PureComponent {
    constructor(props){
      super(props);
      this.dinnerMenu = []
      this.lunchMenu = []
      this.transformValue = new Animated.Value(0)

      this.transformIndicator = {
        transform: [
        {
          translateX: this.transformValue.interpolate({ 
            inputRange: [0,1],
            outputRange: [0,SCREEN_WIDTH*0.5-20],
            extrapolate: "clamp"
          })
        }, 
      ]}
      this.state = {
        menu: [],
        loading: true,
        currentMenu: [],
        isDinnerSelected: true,
        totalCal: 0,
      }
    }

    componentDidMount(){
      this.getMenus()
    }

    animateIndicator = (value) => {
      Animated.spring(this.transformValue, {
          toValue: value,
          friction:10,
          useNativeDriver: true,
        }).start()
      }
    
    animateScale = (item) => {
      if(item.isSelected === false){
        Animated.timing(item.animVal, {
          toValue: SCREEN_WIDTH-40,
          duration:500,
        }).start(()=>{
          item.isSelected = true
          this.setState({totalCal: this.state.totalCal + item.meal.calorie})
        })
      }else{
        Animated.timing(item.animVal, {
          toValue: 0,
          duration:500,
        }).start(()=>{
          item.isSelected = false
          this.setState({totalCal: this.state.totalCal - item.meal.calorie})
        })
      }
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
        if(food.lunch === true){
          obj = {meal: food, indexId: i, animVal: new Animated.Value(0),isSelected: false}
          this.lunchMenu.push(obj)
        }
        if(food.dinner === true){
          obj = {meal: food, indexId: i + 100, animVal: new Animated.Value(0),isSelected: false}
          this.dinnerMenu.push(obj)
        }
      }
      console.log(this.dinnerMenu)
      this.setState({currentMenu: this.dinnerMenu})
    }

    dinnerClicked(){
      this.animateIndicator(0)
      this.setState({currentMenu : this.dinnerMenu, isDinnerSelected: true})
    }

    lunchClicked(){
      this.animateIndicator(1)
      this.setState({currentMenu : this.lunchMenu, isDinnerSelected: false, })
    }

    renderItem({item,index}){
      return(
        <TouchableOpacity style={styles.rowContainer} onPress={() =>{this.animateScale(item)}} activeOpacity={0.9}>
          <View style={styles.circle}/>
          <Text style={{fontSize:15, fontWeight: "500", color: Colors.darkGrayDark.alpha1, flex: 1, marginLeft: 15, marginRight: 20}}>
            {item.meal.meal}
          </Text>
          <Text style={{fontSize:15, color: Colors.blueDark.alpha1, fontWeight: "600", textAlign: "right"}}>
            {item.meal.calorie + " cal"}
          </Text>
          <Animated.View style={[styles.selectedItem,{width:item.animVal}]}>
            <Text style={{fontSize:15,fontWeight:"600",color:"white",marginRight:10}} numberOfLines={1}>
              {item.meal.calorie + " cal"}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      )
    }

    render(){
      return(
        <View style = {styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerButton} onPress={()=>this.props.navigation.goBack()}>
                <Feather name={"chevron-left"} size={20}/>
              </TouchableOpacity>
              <Text style={styles.headerText}>
                Daily Menu
              </Text>
              <TouchableOpacity style={styles.headerButton}>
                
              </TouchableOpacity>
            </View>
            <View style={styles.selectView}>
              <Animated.View style={[styles.indicatorContainer,this.transformIndicator]}>
                <View style={styles.selectedIndicator}/>
              </Animated.View>
              <TouchableOpacity style={styles.timeButton} onPress={()=>this.dinnerClicked()} activeOpacity={0.8}>
                <Text style={{color: this.state.isDinnerSelected ? "white" : "black"}}> 
                  Dinner
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.timeButton} onPress={()=>this.lunchClicked()} activeOpacity={0.8}>
                <Text style={{color: !this.state.isDinnerSelected ? "white" : "black"}}>
                  Lunch
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width:SCREEN_WIDTH,flex:1}}>
            <FlatList 
              style={{flex:1}}
              data={this.state.isDinnerSelected ? this.dinnerMenu : this.lunchMenu}
              renderItem = {(item) => this.renderItem(item)}
              keyExtractor={(item, index) => "menu" + item.indexId + index }
              contentContainerStyle = {{padding:20}}
            />
          </View>
          <View style={styles.totalCalorie}>
            <Text style={{fontSize:14,fontWeight:"500",color:Colors.blue.alpha08}}>
              Click on the menu item to add its calorie.
            </Text>
            <Text style={{fontSize:20,fontWeight:"600",color:"rgba(28,169,227,1.0)",marginTop:10}}>
              {"Total Calorie: " + this.state.totalCal + " cal"}
            </Text>
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
    backgroundColor:Colors.darkGrayDark.alpha1
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
    paddingTop: Constants.statusBarHeight,
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