/**
 * https://medium.com/@joseph.michael.sample/async-actions-with-usereducer-d75a2c5dc55c
 * https://medium.com/solute-labs/configuring-thunk-action-creators-and-redux-dev-tools-with-reacts-usereducer-hook-5a1608476812
 */
import { useReducer, useRef, useCallback } from 'react'

const useEnhancedReducer = (reducer, initialState) => {
  const lastState = useRef(initialState)
  const reducerWapper = useCallback(
    (state, action) => {
      const result = reducer(state, action)
      lastState.current = result
      return result
    },
    [reducer],
  )

  const [state, dispatch] = useReducer(reducerWapper, initialState)
  const getState = useCallback(() => lastState.current, [])

  const enhancedDispatch = useCallback(
    action => {
      if (typeof action === 'function') {
        return action(enhancedDispatch, getState)
      } else {
        if (action.payload instanceof Promise) {
          return action.payload.then(result => {
            return dispatch({ type: action.type, payload: result })
          })
        } else {
          return dispatch(action)
        }
      }
    },
    [getState],
  )

  return [state, enhancedDispatch, getState]
}

export default useEnhancedReducer
