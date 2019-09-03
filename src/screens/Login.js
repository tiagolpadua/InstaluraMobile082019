import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

const width = Dimensions.get('screen').width;
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      usuario: 'rafael',
      senha: '123456',
      mensagem: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  efetuaLogin = () => {
    const {navigation} = this.props;
    const uri = 'https://instalura-api.herokuapp.com/api/public/login';
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: this.state.usuario,
        senha: this.state.senha,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
      }),
    };
    fetch(uri, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Não foi possível efetuar login');
      })
      .then(token => {
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('usuario', this.state.usuario);

        // https://reactnavigation.org/docs/en/stack-actions.html#reset
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Feed'})],
        });
        navigation.dispatch(resetAction);
      })
      .catch(error => this.setState({mensagem: error.message}));
  };

  logout() {
    AsyncStorage.removeItem('usuario');
    AsyncStorage.removeItem('token');
    // ir para a tela de logout
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Instalura</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            defaultValue={this.state.usuario}
            autoCapitalize="none"
            placeholder="Usuário..."
            onChangeText={texto => this.setState({usuario: texto})}
          />
          <TextInput
            style={styles.input}
            defaultValue={this.state.senha}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Senha..."
            onChangeText={texto => this.setState({senha: texto})}
          />
          <Button title="Login" onPress={this.efetuaLogin} />
        </View>
        <Text style={styles.mensagem}>{this.state.mensagem}</Text>
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
  form: {
    width: width * 0.8,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  mensagem: {
    marginTop: 15,
    color: '#e74c3c',
  },
});
