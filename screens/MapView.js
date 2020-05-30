import React from 'react';
import { View, Dimensions, StyleSheet,ActivityIndicator } from 'react-native';
import MapView,{ Marker } from 'react-native-maps';


const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height

export default class Sample extends React.Component {
    constructor(props){
      super(props);
      this.stop = []
      this.state = {
        stops:{},
        latitude:null,
        longitude:null,
        markers:[]
      }
    }

    //getting current position of user. Can be used in further developments such as route shown on map.(Some permessions can be necessary to take. Documentations should be read before using it.

    componentDidMount(){
      this.setState({stops:this.props.navigation.getParam("stops")},()=>this.setCoord())
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },);
        },
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
    }

    setCoord = () =>{
      let keys = Object.keys(this.state.stops)
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i]
          this.stop.push(this.state.stops[key])
        }
        this.setState({markers:this.stop})
    }

    render(){
      console.log(this.state.markers)
      if(this.state.markers.length === 0){
        return(
          <ActivityIndicator/>
        )
      }else{
        return(
          <View style = {styles.container}>
            <MapView style={{flex:1,width:SCREEN_WIDTH}}
              initialRegion={{latitude: parseFloat(this.state.markers[0].STOP_COORDS.substring(0,9)),longitude: parseFloat(this.state.markers[0].STOP_COORDS.substring(10,this.state.markers[0].STOP_COORDS.length+1)),latitudeDelta: 0.01,longitudeDelta: 0.01,}}
              showsUserLocation
            >
              {this.state.markers.map((item,index)=>{
              return(
                <Marker 
                  key={index + "m"}
                  coordinate={{latitude: parseFloat(item.STOP_COORDS.substring(0,9)),longitude: parseFloat(item.STOP_COORDS.substring(10,item.STOP_COORDS.length+1))}}
                  title={item.STOP_NAME_ENG}
                />
              )
            })}
            </MapView>
          </View>
        )
      }

    }
    
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      width: SCREEN_WIDTH,
  },

  });