import AsyncStorage from '@react-native-community/async-storage';

export default class InstaluraFetchService {
  static makeRequest(recurso, method = 'GET', dados) {
    const uri = 'https://instalura-api.herokuapp.com/api' + recurso;
    return AsyncStorage.getItem('token')
      .then(token => {
        return {
          method: method,
          body: JSON.stringify(dados),
          headers: new Headers({
            'Content-type': 'application/json',
            'X-AUTH-TOKEN': token,
          }),
        };
      })
      .then(requestInfo => fetch(uri, requestInfo))
      .then(resposta => {
        if (resposta.ok) {
          return resposta.json();
        }
        throw new Error('Não foi possível completar a operação');
      });
  }

  static get(recurso) {
    return InstaluraFetchService.makeRequest(recurso);
  }

  static post(recurso, dados) {
    return InstaluraFetchService.makeRequest(recurso, 'POST', dados);
  }
}
