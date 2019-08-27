import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Post from './Post';

const width = Dimensions.get('screen').width;
export default class Feed extends Component {
  render() {
    const fotos = [
      {id: 1, usuario: 'rafael'},
      {id: 2, usuario: 'alberto'},
      {id: 3, usuario: 'vitor'},
    ];
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item.id + ''}
        data={fotos}
        renderItem={({item}) => <Post foto={item} />}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  foto: {
    width: width,
    height: width,
  },
});
