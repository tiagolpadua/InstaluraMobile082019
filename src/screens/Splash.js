import React, {Component} from 'react';
import {StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
export default class Splash extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const {navigation} = this.props;

    AsyncStorage.getItem('token').then(token => {
      let initial;
      if (token) {
        initial = 'Feed';
      } else {
        initial = 'Login';
      }

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: initial})],
      });
      navigation.dispatch(resetAction);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Instalura</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 26,
  },
});
