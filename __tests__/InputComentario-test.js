import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import InputComentario from '../src/components/InputComentario';

it('Deve renderizar corretamente', () => {
  renderer.create(<InputComentario />);
});
