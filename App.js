import React from 'react';
import { createAppContainer  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import i18n from 'i18n-js';
import Languages from "./util/Languages"



console.disableYellowBox = true; //development purposes
//setting language settings
i18n.fallbacks = true;
i18n.translations = Languages;
i18n.defaultLocale = 'en';


export default class App extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      deviceType: "UNKNOWN",
      deviceReady: false
    }
  }

  componentDidMount() {
  }

  render() {
    /*------NAVIGATION SETUP------**/
    const MainStack = createStackNavigator(
      { 
        MainScreen: MainScreen,
        ShuttleScreen: ShuttleScreen,
        HomePage: HomePage,
        MapView: MapView,
      },
      {
        initialRouteName: "MainScreen",
        mode: "card",    
        headerMode: "none",
      }
    );
    
    const AppContainerMobile = createAppContainer(MainStack);
      return ( 
        <AppContainerMobile/>
      )
  }
}


//screens_mobile
import MainScreen from "./screens/MainScreen"
import ShuttleScreen from "./screens/ShuttleScreen"
import HomePage from "./screens/HomePage"
import MapView from "./screens/MapView"



