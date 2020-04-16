import React from 'react';
import { Asset } from 'expo-asset';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


console.disableYellowBox = true;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

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
        MenuScreen: MenuScreen,
        ShuttleScreen: ShuttleScreen,
        FeedBackForm: FeedBackForm

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
import MenuScreen from "./screens/MenuScreen"
import MainScreen from "./screens/MainScreen"
import ShuttleScreen from "./screens/ShuttleScreen"
import FeedBackForm from "./screens/FeedBackForm"


