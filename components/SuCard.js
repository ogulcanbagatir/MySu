import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Colors from "../util/Colors"
import i18n from 'i18n-js';

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height


export default class SuCard extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      }
    }
  
    render(){
      return(
        <View style={{paddingTop:32}}> 
          <Text style={{marginLeft:15,fontSize:18,fontWeight:"600",marginBottom:10,color:Colors.blueDark.alpha1}}>
            SuCard
          </Text>
          <View style={{flexDirection:"row",justifyContent:"space-evenly",}}>
            <View style={[styles.suCard,{backgroundColor:Colors.blue.alpha1},this.props.cardStyle]}>
              <Text style={styles.suCardHeader}>
                {i18n.t("shuttle")}
              </Text>
              <Text style={styles.suCardRemaining}>
                {this.props.suCardInfo.transport.sum + " ₺"}
              </Text>
            </View>
            <View style={[styles.suCard,{backgroundColor:Colors.lavender.alpha1},this.props.cardStyle]}>
              <Text style={styles.suCardHeader}>
                {i18n.t("meal")}
              </Text>
              <Text style={styles.suCardRemaining}>
                {this.props.suCardInfo.meal.sum + " ₺"}
              </Text>
            </View>
            <View style={[styles.suCard,{backgroundColor:Colors.pink.alpha1},this.props.cardStyle]}>
              <Text style={styles.suCardHeader}>
                {i18n.t("print")}
              </Text>
              <Text style={styles.suCardRemaining}>
                {this.props.suCardInfo.print.sum + " ₺"}
              </Text>
            </View>                 
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
  suCard:{
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: 20,
    shadowColor: Colors.black.alpha1,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 7,
    shadowOpacity: 0.05,
    backgroundColor: Colors.white.alpha1,
    borderRadius: 10,
    width:SCREEN_WIDTH*0.3,
    height: 100,
    justifyContent:"center",
    alignItems:"center"
  },
  suCardHeader:{
    color:"white",
    fontSize:17,
    fontWeight:"600"
  },
  suCardRemaining:{
    color:"white",
    marginTop:5,
    fontSize:16,
    fontWeight:"500"
  },
  

  });