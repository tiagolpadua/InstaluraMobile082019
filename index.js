import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/screens/Login';
import Feed from './src/components/Feed';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Feed: {
      screen: Feed,
    },
  },
  {
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);
