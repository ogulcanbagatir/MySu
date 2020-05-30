import React from 'react';
import { View,  Text, Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
import Colors from "../util/Colors"
import { FontAwesome} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from 'i18n-js';

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
const today = new Date().getDay()

export default class CourseSchedule extends React.Component {
    constructor(props){
      super(props);
      this.currentCourses = {}

      this.state = {
        courseDay : today,
      }
    }

    componentDidMount(){
        this.currentDayCourses()
    }

    //send courseDay data so seall component.
    sendSelectedDay = () =>{
      this.props.callBack(this.state.courseDay)
      this.props.seeAll()
    }

    //put whitespace in to the expected positions in course names.
    arrangeCourseNames(i){       
      let name = this.currentCourses.coursecode[i]
      let pos = 0
      if(name[name.length -1] === "R" || name[name.length -1] ===  "L" || name[name.length -1] === "D" ){
        pos = name.length - 4
      }
      else{
        pos = name.length - 3
      }
      return [name.slice(0, pos),name.slice(pos)].join(' ')
    }

    //choose current day courses
    currentDayCourses(){
      switch (this.state.courseDay) {
        case 1:
          this.currentCourses = this.props.courses.monday
          break;
        case 2:
          this.currentCourses = this.props.courses.tuesday
          break;
        case 3:
          this.currentCourses = this.props.courses.wednesday
          break;
        case 4:
          this.currentCourses = this.props.courses.thursday
          break;
        case 5:
          this.currentCourses = this.props.courses.friday
          break;
        case 6:
          this.currentCourses = this.props.courses.monday
          this.setState({courseDay: 1})
        case 0:
          this.currentCourses = this.props.courses.monday
          this.setState({courseDay: 1})
      }
      this.forceUpdate()
    }

    //when day changed by user using arrow buttons.
    changeCurrentDay(isForward){
      if(isForward){
        this.setState({courseDay: this.state.courseDay === 5 ? 1 : this.state.courseDay + 1},()=>this.currentDayCourses())
      }else{
        this.setState({courseDay: this.state.courseDay === 1 ? 5 : this.state.courseDay - 1},()=>this.currentDayCourses())
      }
    }


    renderCourse = () => {
      if(this.currentCourses.recordcount === undefined){
        return (
        <View style={{width:SCREEN_WIDTH,position:"absolute",backgroundColor:Colors.dark25,height:SCREEN_HEIGHT}}>
          <Text style={{fontSize:16,fontWeight:"600",color:Colors.red.alpha1,textAlign:"center",textAlignVertical:"center"}}> 
            {"Internet connection failed!"}
          </Text>
        </View>
        )
      }else{
        let arr = []
        for(let i = 0; i < this.currentCourses.recordcount; i++){
          let obj = (
          <View style={styles.courseCard} key={i+"course"}>
            <Text style={{textAlign:"center",color: Colors.blueDark.alpha1,fontWeight:"600",fontSize:18}}>
              {this.arrangeCourseNames(i)}
            </Text>
            <Text style={{textAlign:"center",marginTop:5,color: Colors.blue.alpha1,fontSize:14}}>
              {this.currentCourses.buildingcode[i] + " " + this.currentCourses.roomcode[i]}
            </Text> 
            <Text style={{textAlign:"center",marginTop:5,color: Colors.lavender.alpha1}}>
              {this.currentCourses.begintime[i] + "-" + this.currentCourses.endtime[i]}
            </Text>        
          </View>
          )
        arr.push(obj)
        }
        return arr
      }
    }

    render(){
      let days = [i18n.t("monday"),i18n.t("monday"),i18n.t("tuesday"),i18n.t("wednesday"),i18n.t("thursday"),i18n.t("friday"),i18n.t("monday")]
      return(
      <View style={{justifyContent:"center",marginTop:48}}>
        <View style={{justifyContent:"space-between",flexDirection:"row",paddingHorizontal:15,paddingBottom:7.5}}>
          <View style={{flexDirection:"row",alignItems:"center",right:5}}>
            <TouchableOpacity style={{padding:10}} onPress={()=> this.changeCurrentDay(false)}>
              <FontAwesome name={"chevron-left"} color={Colors.lavanderDark.alpha08} size={14}/>
            </TouchableOpacity>
            <Text style={{color: Colors.blueDark.alpha08 ,fontSize:18,fontWeight:"500"}}>
              {days[this.state.courseDay]}
            </Text>
            <TouchableOpacity style={{padding:10}} onPress={()=> this.changeCurrentDay(true)}>
              <FontAwesome name={"chevron-right"} color={Colors.lavanderDark.alpha08} size={14}/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{alignSelf:"center"}} activeOpacity={0.8} onPress={this.sendSelectedDay}>
            <Text style={{color:Colors.blueDark.alpha08,fontWeight:"500",fontSize:15}}>
              {i18n.t("seeAll")}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView 
            contentContainerStyle={{paddingBottom: 15, paddingTop: 5}} 
            horizontal 
            showsHorizontalScrollIndicator={false}
            >
            {this.renderCourse()}
          </ScrollView>
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
  courseCard:{
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: 20,
    shadowColor: Colors.black.alpha1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 7,
    shadowOpacity: 0.05,
    backgroundColor: Colors.white.alpha1,
    borderRadius: 10,
    height:100,
    width: 150,
    marginHorizontal:10,
    justifyContent:"center",
  },

})