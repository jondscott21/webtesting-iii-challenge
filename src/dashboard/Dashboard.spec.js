import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';
import Display from '../display/Display';


describe('<Dashboard />', () => {
    it('close gate button toggles to open on click and div toggles closed', () => {
        const { getByText, queryByText } = render(<Dashboard />)
        const closeButton = getByText(/close gate/i)
        expect(queryByText(/closed/i)).toBeFalsy()
        expect(queryByText(/open gate/i)).toBeFalsy()
        expect(queryByText(/close gate/i)).toBeTruthy()
        fireEvent.click(closeButton)
        expect(queryByText(/closed/i)).toBeTruthy()
        expect(queryByText(/open gate/i)).toBeTruthy()
        expect(queryByText(/close gate/i)).toBeFalsy()
        fireEvent.click(closeButton)
        expect(queryByText(/closed/i)).toBeFalsy()
        expect(queryByText(/open gate/i)).toBeFalsy()
        expect(queryByText(/close gate/i)).toBeTruthy()
    })

    it(`'close gate' button disables and enables 'lock gate' button`, () => {
        const { getByText } = render(<Dashboard />)
        const closeButton = getByText(/close gate/i)
        const lockButton = getByText(/lock gate/i)
        expect(lockButton.disabled).toBe(true);
        fireEvent.click(closeButton)
        expect(lockButton.disabled).toBe(false);
        fireEvent.click(closeButton)
        expect(lockButton.disabled).toBe(true);
    })

    it(`'lock gate' button disables and enables 'close gate' button`, () => {
        const { getByText } = render(<Dashboard />)
        const closeButton = getByText(/close gate/i)
        const lockButton = getByText(/lock gate/i)
        expect(closeButton.disabled).toBe(false);
        fireEvent.click(closeButton)
        fireEvent.click(lockButton)
        expect(closeButton.disabled).toBe(true);
        fireEvent.click(lockButton)
        expect(closeButton.disabled).toBe(false);
    })

    it(`lock gate button toggles on click after it's 'closed'`, () => {
        const { getByText, queryByText } = render(<Dashboard />)
        const closeButton = getByText(/close gate/i)
        const lockButton = getByText(/lock gate/i)
        expect(queryByText(/Lock Gate/)).toBeTruthy()
        expect(queryByText(/Unlocked Gate/)).toBeFalsy()
        fireEvent.click(closeButton)
        fireEvent.click(lockButton)
        expect(queryByText(/Lock Gate/)).toBeFalsy()
        expect(queryByText(/Unlock Gate/)).toBeTruthy()
        fireEvent.click(lockButton)
        expect(queryByText(/Lock Gate/)).toBeTruthy()
        expect(queryByText(/Unlocked Gate/)).toBeFalsy()
    })

    it(`toggles 'open div' class types on 'close' button click`, () => {
        const { getByText } = render(<Dashboard />)
        const closeButton = getByText(/close gate/i)
        const openDiv = getByText(/open/i)
        expect(openDiv.className).toBe('led green-led')
        fireEvent.click(closeButton)
        expect(openDiv.className).toBe('led red-led')
        fireEvent.click(closeButton)
        expect(openDiv.className).toBe('led green-led')
    })

    it(`toggles 'lock div' class types on 'lock' button click`, () => {
        const { getByText } = render(<Dashboard />)
        const closeButton = getByText(/close gate/i)
        const lockButton = getByText(/lock gate/i)
        const lockDiv = getByText(/unlocked/i)
        expect(lockDiv.className).toBe('led green-led')
        fireEvent.click(closeButton)
        fireEvent.click(lockButton)
        expect(lockDiv.className).toBe('led red-led')
        fireEvent.click(lockButton)
        expect(lockDiv.className).toBe('led green-led')
    })
})

