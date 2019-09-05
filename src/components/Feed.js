import React, {Component} from 'react';
import {FlatList, ScrollView} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Notificacao from '../api/Notificacao';
import InstaluraFetchService from '../services/InstaluraFetchService';
import HeaderUsuario from './HeaderUsuario';
import Post from './Post';
import AsyncStorage from '@react-native-community/async-storage';

export default class Feed extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('usuario', 'Instalura'),
    };
  };

  constructor() {
    super();
    this.state = {
      fotos: [],
    };
  }

  update = () => {
    let uri = '/fotos';
    const {navigation} = this.props;
    const usuario = navigation.getParam('usuario');
    if (usuario) {
      uri = `/public/fotos/${usuario}`;
    }

    InstaluraFetchService.get(uri).then(json => this.setState({fotos: json}));
  };

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {
    if (valorComentario === '') {
      return;
    }

    const foto = this.buscaPorId(idFoto);

    const novoComentario = {
      texto: valorComentario,
    };

    InstaluraFetchService.post(`/fotos/${idFoto}/comment`, novoComentario)
      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista,
        };
        this.atualizaFotos(fotoAtualizada);
        inputComentario.clear();
      });
  };

  like = idFoto => {
    const foto = this.buscaPorId(idFoto);
    const {fotos: listaOriginal} = this.state;
    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => {
        let novaLista = [];
        if (!foto.likeada) {
          novaLista = [...foto.likers, {login: usuarioLogado}];
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuarioLogado;
          });
        }
        return novaLista;
      })
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista,
        };
        this.atualizaFotos(fotoAtualizada);

        InstaluraFetchService.post(`/fotos/${idFoto}/like`).catch(() => {
          this.setState({fotos: listaOriginal});
          Notificacao.exibe('Ops..', 'Algo deu errado!');
        });
      });
  };

  verPerfilUsuario = idFoto => {
    const {navigation} = this.props;
    const foto = this.buscaPorId(idFoto);
    navigation.navigate('PerfilUsuario', {
      usuario: foto.loginUsuario,
      fotoDePerfil: foto.urlPerfil,
    });
  };

  atualizaFotos = fotoAtualizada => {
    const {fotos} = this.state;
    const fotosAtualizadas = fotos.map(f =>
      f.id === fotoAtualizada.id ? fotoAtualizada : f,
    );
    this.setState({fotos: fotosAtualizadas});
  };

  exibeHeader() {
    const {navigation} = this.props;
    const {fotos} = this.state;
    const usuario = navigation.getParam('usuario');
    const fotoDePerfil = navigation.getParam('fotoDePerfil');
    return (
      usuario && (
        <HeaderUsuario
          usuario={usuario}
          fotoDePerfil={fotoDePerfil}
          posts={fotos.length}
        />
      )
    );
  }

  buscaPorId(idFoto) {
    const {fotos} = this.state;
    return fotos.find(f => f.id === idFoto);
  }

  render() {
    const {fotos} = this.state;
    return (
      <ScrollView>
        <NavigationEvents onWillFocus={() => this.update()} />
        {this.exibeHeader()}
        <FlatList
          keyExtractor={item => `${item.id}`}
          data={fotos}
          renderItem={({item}) => (
            <Post
              foto={item}
              likeCallback={this.like}
              comentarioCallback={this.adicionaComentario}
              verPerfilCallback={this.verPerfilUsuario}
            />
          )}
        />
      </ScrollView>
    );
  }
}
