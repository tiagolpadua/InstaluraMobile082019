import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('screen');

export default class AluraLingua extends Component {
  static navigationOptions = {
    mode: 'modal',
    title: 'Novidade para você',
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../resources/img/aluralingua.png')}
          style={styles.image}
        />
        <TouchableOpacity style={styles.botao} title="Aprenda Inglês">
          <Text style={styles.texto}>Aprenda Inglês</Text>
        </TouchableOpacity>
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
  image: {
    width,
  },
  botao: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    width: width * 0.7,
  },
  texto: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
});
