import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {Button, FlatList} from 'react-native';
import Post from './Post';

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

  static navigationOptions = ({navigation}) => ({
    title: 'Instalura',
    headerRight: (
      <Button
        title="Logout"
        onPress={() => {
          AsyncStorage.removeItem('usuario');
          AsyncStorage.removeItem('token');
          navigation.navigate('Login');
        }}
      />
    ),
  });

  adicionaComentario = (valorComentario, inputComentario) => {
    if (valorComentario === '') {
      return;
    }
    const novaLista = [
      ...this.state.foto.comentarios,
      {
        id: valorComentario,
        login: 'meuUsuario',
        texto: valorComentario,
      },
    ];
    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista,
    };
    this.setState({foto: fotoAtualizada});
    inputComentario.clear();
  };

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {
    if (valorComentario === '') {
      return;
    }
    const foto = this.buscaPorId(idFoto);
    const novaLista = [
      ...foto.comentarios,
      {
        id: valorComentario,
        login: 'meuUsuario',
        texto: valorComentario,
      },
    ];
    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista,
    };
    const fotos = this.atualizaFotos(fotoAtualizada);
    this.setState({fotos});
    inputComentario.clear();
  };

  like = idFoto => {
    const foto = this.buscaPorId(idFoto);
    let novaLista = [];
    if (!foto.likeada) {
      novaLista = [...foto.likers, {login: 'meuUsuario'}];
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'meuUsuario';
      });
    }
    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista,
    };
    const fotos = this.atualizaFotos(fotoAtualizada);
    this.setState({fotos});
  };

  buscaPorId(idFoto) {
    return this.state.fotos.find(foto => foto.id === idFoto);
  }

  atualizaFotos(fotoAtualizada) {
    return this.state.fotos.map(foto =>
      foto.id === fotoAtualizada.id ? fotoAtualizada : foto,
    );
  }

  render() {
    return (
      <FlatList
        keyExtractor={item => item.id + ''}
        data={this.state.fotos}
        renderItem={({item}) => (
          <Post
            foto={item}
            likeCallback={this.like}
            comentarioCallback={this.adicionaComentario}
          />
        )}
      />
    );
  }
}
