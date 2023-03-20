import {render, screen} from "@testing-library/react";
import Modal from "../Modal";
import React, {ReactNode} from "react";
import {DispatchContext, StateContext} from "../StateProvider";
import userEvent from "@testing-library/user-event";


describe('Modal component', function () {

    const mockState = {
        towers: [],
        disksCount: 3,
        movesCount: 0,
        isWin: true
    }
    const mockDispatch = jest.fn()
    const user = userEvent.setup()

    // @ts-ignore
    const customRender = (ui: ReactNode, {providerProps, ...renderOptions}) => {
        return render(
            <StateContext.Provider value={providerProps.state}>
                <DispatchContext.Provider value={providerProps.dispatch}>
                    {ui}
                </DispatchContext.Provider>
            </StateContext.Provider>,
            renderOptions,
        )
    }

    it('should be visible when opened', () => {
        const providerProps = {
            state: mockState,
            dispatch: mockDispatch
        }
        customRender(<Modal/>, {providerProps})
        expect(screen.getByTestId('modal-lighter')).toHaveStyle('z-index: 1000')
        expect(screen.getByTestId('modal-window')).toHaveStyle('top: 100px')
        expect(screen.getByTestId('modal-window')).toHaveStyle('z-index: 1001')
    })

    // it('should call the handleClick method when the Close button is clicked', async () => {
    //     const providerProps = {
    //         state: mockState,
    //         dispatch: dispatch
    //     }
    //     customRender(<Modal/>, {providerProps})
    //
    //     render(<Modal/>)
    //
    //     await user.click(screen.getByRole('button', {name: 'Close'}))
    //     expect(screen.getByTestId('modal-lighter')).toHaveStyle('z-index: -1')
    // })

    it('should be invisible when closed', function () {
        render(<Modal/>)
        expect(screen.getByTestId('modal-lighter')).toHaveStyle('z-index: -1')
        expect(screen.getByTestId('modal-window')).toHaveStyle('top: -500px')
        expect(screen.getByTestId('modal-window')).toHaveStyle('z-index: -1')
    })

})