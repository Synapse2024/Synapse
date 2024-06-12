import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../app/index';

describe('<App />', () => {
  it('has a 1 title', () => {
    render(<App/>);

  });
});