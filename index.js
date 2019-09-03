import {AppRegistry, AsyncStorage} from 'react-native';
import {name as appName} from './app.json';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/screens/Login';
import Feed from './src/components/Feed';
import Splash from './src/screens/Splash.js';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Feed: {
      screen: Feed,
    },
    Splash: {
      screen: Splash,
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);
