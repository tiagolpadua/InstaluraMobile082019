import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import InstaluraFetchService from '../services/InstaluraFetchService';
import Notificacao from './api/Notificacao';
import Post from './Post';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotos: [],
    };
  }

  componentDidMount() {
    let uri = '/fotos';
    const {navigation} = this.props;
    const usuario = navigation.getParam('usuario');
    if (usuario) {
      uri = `/public/fotos/${usuario}`;
    }

    InstaluraFetchService.get(uri).then(json => this.setState({fotos: json}));
  }

  carregar() {
    let uri = '/fotos';
    if (this.props.usuario) {
      uri = `/public/fotos/${this.props.usuario}`;
    }
    InstaluraFetchService.get(uri).then(json => this.setState({fotos: json}));
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

  verPerfilUsuario = idFoto => {
    const {navigation} = this.props;
    const foto = this.buscaPorId(idFoto);
    navigation.navigate('PerfilUsuario', {usuario: foto.loginUsuario});
  };

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {
    if (valorComentario === '') {
      return;
    }

    const listaOriginal = this.state.fotos;

    const foto = this.buscaPorId(idFoto);

    const comentario = {
      texto: valorComentario,
    };

    InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
      .then(c => [...foto.comentarios, c])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista,
        };
        this.atualizaFotos(fotoAtualizada);
        inputComentario.clear();
      })
      .catch(() => {
        this.setState({fotos: listaOriginal});
        Notificacao.exibe('Ops..', 'Algo deu errado ao comentar...');
      });
  };

  like = idFoto => {
    const listaOriginal = this.state.fotos;
    const foto = this.buscaPorId(idFoto);
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

        InstaluraFetchService.post(`/fotos/${idFoto}/like`).catch(e => {
          this.setState({fotos: listaOriginal});
          Notificacao.exibe('Ops..', 'Algo deu errado ao curtir...');
        });
      });
  };

  buscaPorId(idFoto) {
    return this.state.fotos.find(foto => foto.id === idFoto);
  }

  atualizaFotos(fotoAtualizada) {
    const fotos = this.state.fotos.map(foto =>
      foto.id === fotoAtualizada.id ? fotoAtualizada : foto,
    );
    this.setState({fotos});
  }

  render() {
    if (this.state.status === 'FALHA_CARREGAMENTO') {
      return (
        <TouchableOpacity onPress={this.carregar}>
          <Text style={styles.mensagem}>
            Não foi possível carregar o feed. Toque para tentar novamente
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <FlatList
          keyExtractor={item => item.id + ''}
          data={this.state.fotos}
          renderItem={({item}) => (
            <Post
              foto={item}
              likeCallback={this.like}
              comentarioCallback={this.adicionaComentario}
              verPerfilCallback={this.verPerfilUsuario}
            />
          )}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  mensagem: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
});
