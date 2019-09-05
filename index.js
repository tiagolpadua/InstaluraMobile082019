import {AppRegistry, YellowBox} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {name as appName} from './app.json';
import Feed from './src/components/Feed';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash.js';
import AluraLingua from './src/components/AluraLingua.js';

YellowBox.ignoreWarnings(['Require cycle:']);

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Feed: {
      screen: Feed,
    },
    PerfilUsuario: {
      screen: Feed,
    },
    Splash: {
      screen: Splash,
    },
    AluraLingua: {
      screen: AluraLingua,
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);
