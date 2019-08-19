import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import Controls from './Controls';

describe('<Controls />', () => {
    it('matches snapshot', () => {
      const tree = renderer.create(<Controls />); 
  

      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('shows unlocked and open as a default state', () => {
        const { getByText, queryByText } = render(<Controls />)
        getByText(/lock gate/i)
        getByText(/close gate/i)
    })
  });