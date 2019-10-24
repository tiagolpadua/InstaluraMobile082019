import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import InputComentario from '../src/components/InputComentario';

it('Deve renderizar corretamente', () => {
  const inputComentario = renderer.create(
    <InputComentario idFoto={1} comentarioCallback={jest.fn} />,
  );
  expect(inputComentario).toMatchSnapshot();
});
