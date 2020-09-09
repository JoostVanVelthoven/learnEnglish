import React, { createContext, useReducer } from "react"

export interface State {
  numberOfValidChallenges: number
  items: Challenge[]

  numberOfChallenges: number
}

export interface Challenge {
  id: string
  isValid: boolean
}

const initialState: State = {
  items: [],
  numberOfChallenges: 0,

  numberOfValidChallenges: 0,
}

const reducer = (
  state: State,
  {
    type,
    id,
    isValid,
  }: { type: actions; string; id?: string; isValid: boolean }
) => {
  const newState = reducerMap(type, state, id, isValid)
  return newState
}
const AppContext = createContext<State>(initialState)
const { Provider } = AppContext

const StateProvider = ({ children }) => {
  //@ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState)
  const value: any = { state, dispatch }

  return <Provider value={value}>{children}</Provider>
}

export const AppProvider = StateProvider
export const AppConsumer = AppContext.Consumer

export default AppContext

export enum actions {
  initChallenge,

  setChallengeResult,
}

function reducerMap(
  type: actions,
  state: State,
  id: string,
  isValid?: boolean
) {
  switch (type) {
    case actions.initChallenge:
      return {
        ...state,
        numberOfChallenges: state.numberOfChallenges + 1,
        items: [...state.items, { id, isValid: false }],
      }
    case actions.setChallengeResult:
      const items = [...state.items]
      const item = items.find(a => a.id === id)

      item.isValid = isValid ?? false

      return {
        ...state,
        numberOfChallenges: state.numberOfChallenges + 1,
        items: items,
      }
  }
}