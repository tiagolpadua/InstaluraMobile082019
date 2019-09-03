import AsyncStorage from '@react-native-community/async-storage';

export default class InstaluraFetchService {
  static get(recurso) {
    const uri = 'https://instalura-api.herokuapp.com/api' + recurso;
    const jsonPromisse = AsyncStorage.getItem('token')
      .then(token => {
        return {
          headers: new Headers({
            'X-AUTH-TOKEN': token,
          }),
        };
      })
      .then(requestInfo => fetch(uri, requestInfo))
      .then(resposta => resposta.json());
    return jsonPromisse;
  }
}
