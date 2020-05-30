import React from 'react';
import { View, Dimensions, StyleSheet,ActivityIndicator,Animated,TouchableOpacity,Text } from 'react-native';
import SuCard from "../components/SuCard"
import CourseSchedule from "../components/CourseSchedule"
import Colors from "../util/Colors"
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from 'i18n-js';


const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height

export default class HomePage extends React.Component {
    constructor(props){
      super(props);
      this._isMounted = false
      this.transformValue = new Animated.Value(0)
      this.isExpand = false
      this.transformSeeAll = {
        transform:[
          {
            translateY: this.transformValue.interpolate({ 
              inputRange: [0,1],
              outputRange: [0,-SCREEN_HEIGHT],
              extrapolate: "clamp"
            })
          }, 
        ]
      }
      this.state = {
        courses: {},
        loading: true,
        suCardInfo:{},
        selected: null,
        currentCourses:{}
      }
    }

    updateScreen = () => {
      this.setState({state: this.state})
    }

    componentDidMount(){
      this._isMounted = true
      if(this._isMounted){
        this.fetchCourseData()
      }
    }

    animateCourseCard = (value) =>{
      Animated.timing(this.transformValue, {
        toValue: value,
        duration: 400,
        useNativeDriver: true,
      }).start()
    }

    changeSelectedDay = (index) => {
      this.setState({selected: index},()=>this.setCurrentDayCourses(this.state.selected + 1))
    }

    async fetchCourseData(){
      try {
        const courseApiCall = await fetch('https://www.sabanciuniv.edu/apps/test/course_schedule.php?termcode=201901');
        const courses = await courseApiCall.json();
        this.setState({courses: courses})
      } catch(err) {
        console.log(err)
        alert(i18n.t("internetfailed"))
      }
      this.fetchSuCardData()
    }

    async fetchSuCardData(){
      try {
        const cardApiCall = await fetch("https://mysu.sabanciuniv.edu/apps/test/sucard.php")  
        const cardInfo = await cardApiCall.json()
        this.setState({suCardInfo: cardInfo[0],loading:false})
      } catch(err) {
        console.log(err)
      }
    }

    parentCallback = (dataFromChild) => {
      this.setState({selected: dataFromChild-1},()=> this.setCurrentDayCourses())
    } 

    componentWillUnmount(){
      this._isMounted = false
    }

    setCurrentDayCourses(){
      switch (this.state.selected) {
        case 0:
          this.setState({currentCourses:this.state.courses.monday})
          break;
        case 1:
          this.setState({currentCourses:this.state.courses.tuesday})
          break;
        case 2:
          this.setState({currentCourses:this.state.courses.wednesday})
          break;
        case 3:
          this.setState({currentCourses:this.state.courses.thursday})
          break;
        case 4:
          this.setState({currentCourses:this.state.courses.friday})
          break;
    }
  }
    //seeAll part of course schedule

    seeAll = () =>{ 
      let days=[i18n.t("mon"),i18n.t("tue"),i18n.t("wed"),i18n.t("thu"),i18n.t("fri")]

      return(
        <Animated.View style={[styles.seeAll, this.transformSeeAll]}>
          <View style={{backgroundColor:Colors.blueDark.alpha1}}>
            <TouchableOpacity style={{top:20, zIndex: 100, left:SCREEN_WIDTH-36}} activeOpacity={0.9} onPress={()=>this.animateCourseCard(0)}>
              <Feather name={"x"} size={18} color={Colors.white.alpha08}/>
            </TouchableOpacity>
            <View style={styles.dayButtonContainer}>
            {days.map((day,index)=> {
              return(
                <TouchableOpacity key={index+"bb"} style={[styles.dayButton,{backgroundColor: this.state.selected === index ? Colors.lavanderDark.alpha1 : Colors.gray2}]} activeOpacity={0.9} onPress={()=> this.changeSelectedDay(index)}>
                  <Text style={{color:Colors.white.alpha1}}>
                    {day}
                  </Text>
                </TouchableOpacity>
              )
            })}
            </View>
          </View>
          <View style={styles.courseContainer}>
            <Text style={{fontSize:24,fontWeight:"500",marginLeft:20}}>
              {i18n.t("courses")}
            </Text>
            <ScrollView contentContainerStyle={{paddingTop:10}}>
              {this.renderRow()} 
            </ScrollView>
          </View>
        </Animated.View>
      )
    }

    //rendering course row
    
    renderRow = () =>{
      let arr = []
      if(this.state.currentCourses.recordcount !== undefined){
        for(let i = 0; i < this.state.currentCourses.recordcount;i++){
          let obj = (
            <View style={{flexDirection:"row",padding:10,alignItems:"center"}} key={i+"q"}>
              <View style={{backgroundColor:Colors.lavender.alpha06,borderRadius:10,justifyContent:"center",width:SCREEN_WIDTH*0.6,height:SCREEN_WIDTH*0.15,paddingLeft:10}}>
                <Text style={{fontSize:16,fontWeight:"600",color:"white"}} numberOfLines={2}>
                  {this.state.currentCourses.uniqueall[i]}
                </Text>
              </View>
              <View style={{flex:1,paddingLeft:30}}>
                <Text style={{fontSize:16,fontWeight:"500",textAlign:"center",color:Colors.darkGray.alpha1}}>
                  {this.state.currentCourses.begintime[i] + "-" + this.state.currentCourses.endtime[i]}
                </Text>
                <Text style={{marginTop:5,fontSize:16,fontWeight:"500",color:Colors.darkGray.alpha1,textAlign:"center"}}>
                  {this.state.currentCourses.buildingcode[i] + " " + this.state.currentCourses.roomcode[i]}
                </Text>
              </View>
            </View>
          )
          arr.push(obj)
        }
      }
      return arr
    }

    render(){
      if(this.state.loading){
        return(
          <ActivityIndicator style={{flex:1,width:SCREEN_WIDTH}}/>
        )
      }else{
        return(
          <View style={styles.container}>
            <SuCard suCardInfo={this.state.suCardInfo}/>
            <CourseSchedule courses={this.state.courses} seeAll={()=>this.animateCourseCard(1)} callBack={this.parentCallback}/>
            {this.seeAll()}
          </View>
        )
      }
    }
}

animateCourseCard = (value) =>{
  Animated.timing(this.transformValue, {
    toValue: value,
    duration: 400,
    useNativeDriver: true,
  }).start()
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: SCREEN_WIDTH,
  },
  dayButtonContainer:{
    width:SCREEN_WIDTH,
    height:SCREEN_WIDTH*0.35,
    flexDirection:"row",
    justifyContent:"space-evenly",
    alignItems:"center"
  },
  dayButton:{
    width:SCREEN_WIDTH*0.15,
    height: SCREEN_WIDTH*0.15,
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center"
  },
  seeAll:{
    position:"absolute",
    top:SCREEN_HEIGHT,
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT
  },
  shuttleRow:{
    width:SCREEN_WIDTH*0.9,
    height:SCREEN_WIDTH*0.2,
    backgroundColor:"white",
    borderRadius:5,
    flexDirection:"row",
  },
  courseContainer:{
    width:SCREEN_WIDTH,
    backgroundColor:Colors.white.alpha1,
    height:SCREEN_HEIGHT-SCREEN_WIDTH*0.6+20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    paddingTop:SCREEN_WIDTH*0.05,
    bottom:20
  }

  });