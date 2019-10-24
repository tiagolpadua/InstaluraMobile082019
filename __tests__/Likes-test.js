import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Likes from '../src/components/Likes';
import foto from './foto.json';

it('Deve renderizar corretamente', () => {
  const likes = renderer.create(<Likes foto={foto} likeCallback={jest.fn} />);
  expect(likes).toMatchSnapshot();
});
