import React, {Component} from 'react';
import {Dimensions, FlatList, Platform, StyleSheet} from 'react-native';
import Post from './Post';

const width = Dimensions.get('screen').width;
export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      fotos: [],
    };
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({fotos: json}));
  }

  render() {
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item.id + ''}
        data={this.state.fotos}
        renderItem={({item}) => <Post foto={item} />}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? 20 : 0,
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
