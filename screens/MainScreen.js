
import React from 'react';
import { View, Dimensions, StyleSheet, Animated, TouchableOpacity } from 'react-native';
const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
import Colors from "../util/Colors"
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Header from "../components/Header"
import HomePage from "./HomePage"
import ShuttleScreen from "./ShuttleScreen"
import Menu from "./MenuScreen"
import FeedbackForm from "./FeedBackForm"
import i18n from 'i18n-js';
import { AsyncStorage } from 'react-native';

export default class MainScreen extends React.PureComponent {
    constructor(props){
      super(props);
      
      this.tabIndexValue = new Animated.Value(0)
      this.tabBgScaleValue = new Animated.Value(0)
      this.tabBgScaleFlag = false

      this.tabBgTransform = {
        transform: [{
          translateX: this.tabIndexValue.interpolate({ 
            inputRange: [0, 1, 2, 3],
            outputRange: [0, SCREEN_WIDTH/4, SCREEN_WIDTH/2, SCREEN_WIDTH/4*3],
        })},
        {
          scaleX: this.tabBgScaleValue.interpolate({ 
            inputRange: [0, 0.5, 1],
            outputRange: [1, 2, 1],
        })}
      ]}

      this.state = {
        headerText:"mySU",
        stop:{},
        language: "",
        activeTab: 0
      }
    }

    componentDidMount(){
      this.getLang()
    }

    //getting chosen language from local
    async getLang(){
      let lang = await AsyncStorage.getItem("language")
      if(lang !== null){
        i18n.locale = lang
        this.setState({language: lang.toUpperCase()})
    }
  }
    //setting language 
    changeLanguage = () =>{
      if(this.state.language == "EN"){
        AsyncStorage.setItem("language","tr")
        i18n.locale = "tr"
        this.setState({language:"TR"})        
      }else{
        AsyncStorage.setItem("language","en")
        i18n.locale = "en"
        this.setState({language:"EN"})
      }
        this.setState({state: this.state})
        this.homeRef.updateScreen()
        this.shuttleRef.updateScreen()
        this.menuRef.updateScreen()
        this.feedbackRef.updateScreen()
        this.tabPressed(this.state.activeTab)
    }

    //tabview animation
    tabPressed(index) {
      Animated.parallel([
        Animated.spring(this.tabBgScaleValue, {
          toValue: this.tabBgScaleFlag ? 0 : 1,
          useNativeDriver: true,
          friction: 6
        }),
        Animated.spring(this.tabIndexValue, {
          toValue: index,
          useNativeDriver: true,
          friction: 6
        })
      ]).start()
      this.tabBgScaleFlag = !this.tabBgScaleFlag
      this.mainScroll.getNode().scrollTo({x: index * SCREEN_WIDTH, y: 0, animated: false})
      this.changeHeader(index)
    }

    callbackFunction = (childData) => {
      this.setState({stop: childData},()=>this.props.navigation.navigate("MapView",{stops:this.state.stop}))
    }

    //change header title when new tab pressed
    changeHeader(index){
      switch(index){
        case 0:
          this.setState({headerText:"mySU", activeTab: index})
          break;
        case 1:
          this.setState({headerText: i18n.t("shuttle"), activeTab: index})
          break;
        case 2:
          this.setState({headerText: i18n.t("menu"), activeTab: index})
          break;
        case 3:
          this.setState({headerText: i18n.t("feedBack"), activeTab: index})
          break;
      }
    }

    //tabbar component
    tabbarComponent (){
      return(
        <View style={{alignSelf:"flex-end",backgroundColor:Colors.white.alpha1}}>
          <View style={{height:56,width:SCREEN_WIDTH,flexDirection:"row"}}> 
            <Animated.View style={[styles.tabBgView, this.tabBgTransform]}/>
            <TouchableOpacity style={styles.tabButtons} activeOpacity={0.9} onPress={()=>this.tabPressed(0)}>
              <FontAwesome5 name={"home"} size={22} color={Colors.blue.alpha1}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButtons} activeOpacity={0.9} onPress={()=>this.tabPressed(1)}>
              <FontAwesome5 name={"bus"} size={20} color={Colors.blue.alpha1} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButtons} activeOpacity={0.9} onPress={()=>this.tabPressed(2)}>
              <MaterialIcons name={"restaurant-menu"} size={25} color={Colors.blue.alpha1}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButtons} activeOpacity={0.9} onPress={()=>this.tabPressed(3)}>
              <FontAwesome5 name={"pencil-alt"} size={20} solid color={Colors.blue.alpha1}/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    render(){
      return(
        <View style={styles.container}>
          <Header headerText={this.state.headerText} language={this.state.language} changeLanguage={this.changeLanguage}/>
          <Animated.ScrollView 
            style={{width:SCREEN_WIDTH}} 
            horizontal 
            scrollEnabled = {false}
            ref = {ref => this.mainScroll = ref}
            >
            <View style={{flex:1,width:SCREEN_WIDTH}}>
              <HomePage
                ref={ref => this.homeRef = ref}
              />
            </View>
            <View style={{flex:1,width:SCREEN_WIDTH}}>
              <ShuttleScreen 
                ref={ref => this.shuttleRef = ref}
                parentCallback={this.callbackFunction}
              />
            </View>
            <View style={{flex:1,width:SCREEN_WIDTH}}>
              <Menu 
                ref={ref => this.menuRef = ref}
                language={this.state.language}
              />
            </View>
            <View style={{flex:1,width:SCREEN_WIDTH}}>
              <FeedbackForm
                ref={ref => this.feedbackRef = ref}
              />
            </View>
          </Animated.ScrollView>
          {this.tabbarComponent()}
        </View>        
      )
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: SCREEN_WIDTH,
  },
  text:{
    fontSize:20,
    color:Colors.black5,
    textAlign:"center"
  },
  tabButtons:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  tabBgView: {
    position: "absolute",
    height: 2,
    left: "2.5%",
    backgroundColor: Colors.blue.alpha05,
    width: "20%",
  }

  });