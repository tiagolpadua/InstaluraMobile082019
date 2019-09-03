import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/screens/Login';

const AppNavigator = createStackNavigator({
  Login: {
    screen: Login,
  },
});

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);
