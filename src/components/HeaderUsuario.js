import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class HeaderUsuario extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.painelFoto}>
          <Image
            style={styles.fotoDoPerfil}
            source={{uri: this.props.fotoDePerfil}}
          />

          <View style={styles.usuarioInfo}>
            <Text style={styles.posts}>{this.props.posts}</Text>
            <Text style={styles.texto}>publicações</Text>
          </View>
        </View>
        <Text style={styles.nomeDeUsuario}>{this.props.usuario}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  painelFoto: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  fotoDoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  usuarioInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  posts: {
    marginRight: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  },
  texto: {
    fontSize: 20,
  },
  nomeDeUsuario: {
    fontWeight: 'bold',
    color: '#000',
  },
});
