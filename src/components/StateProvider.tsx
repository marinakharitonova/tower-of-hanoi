import React, {ReactNode, useContext, useReducer} from "react";
import {Action, appReducer, createInitialState, initialState, State} from "../reducers/appReducer";

const StateContext = React.createContext<State>(initialState)
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {
})

type StateProviderProps = {
    children?: ReactNode
}

/**
 * Renders a component that provides state and dispatch method
 * to the child components using a context
 */
const StateProvider = ({children}: StateProviderProps) => {
    const [state, dispatch] = useReducer(appReducer, initialState, createInitialState)

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export default StateProvider

/** Returns the current state from the context */
export const useAppState = () => useContext(StateContext)

/** Returns the dispatch method from the context */
export const useDispatch = () => useContext(DispatchContext)

