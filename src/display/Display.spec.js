import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import Display from './Display';

describe('<Display />', () => {
    it('matches snapshot', () => {
      const tree = renderer.create(<Display />);

      expect(tree.toJSON()).toMatchSnapshot();
    });

    it('shows unlocked and open as a default state', () => {
        const { getByText } = render(<Display />)
        getByText(/unlocked/i)
        getByText(/open/i)
    })

    it(`changes based on whether props are true or false`, () => {

        const { getByText, rerender } = render(<Display locked={false} closed={false} />)

        const openDiv = getByText(/open/i);
        const lockedDiv = getByText(/unlocked/i);
        expect(openDiv.className).toBe('led green-led');
        expect(lockedDiv.className).toBe('led green-led');
        expect(openDiv.textContent).toBe('Open');
        expect(lockedDiv.textContent).toBe('Unlocked');

        rerender(<Display locked={true} closed={true} />)
        
        expect(openDiv.className).toBe('led red-led');
        expect(lockedDiv.className).toBe('led red-led');
        expect(openDiv.textContent).toBe('Closed');
        expect(lockedDiv.textContent).toBe('Locked');
    })
  });