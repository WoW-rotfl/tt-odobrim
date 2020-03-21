import { useReducer, useCallback } from 'react'

type Notification = {
  id: string,
  changedToSum: string;
  fromCurrency: string;
  fromSum: string;
  toCurrency: string;
  toSum: string;
  startTime: string;
  endTime: string;
}

export type ConditionOperator = 'gt' | 'lt'
type Action = 
  { type: 'CHANGE_CHANGED_TO_SUM', payload: string }
  | { type: 'CHANGE_CONDITION_OPERATOR', payload: ConditionOperator }
  | { type: 'ADD_NOTIFICATION', payload: Notification }
  | { type: 'REMOVE_NOTIFICATION', id: string }


type State = {
  changedToSum: string;
  conditionOperator: ConditionOperator;
  notifications: Notification[];
}

 
const initialState: State = {
  changedToSum: '',
  conditionOperator: 'gt',
  notifications: [],
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CHANGE_CHANGED_TO_SUM':
      return {
        ...state,
        changedToSum: action.payload
      }
    case 'CHANGE_CONDITION_OPERATOR':
      return {
        ...state,
        conditionOperator: action.payload
      }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          { ...action.payload },
          ...state.notifications
        ]
      }
    case 'REMOVE_NOTIFICATION':
      // state.notifications.splice(action.id, 1)
      return {
        ...state,
        notifications: [
          ...state.notifications
        ]
      }
  }
}

type Dispatchers = {
  setChangedToSum: (sum: string) => void;
  setConditionOperator: (operator: ConditionOperator) => void;
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

function useNotifier(): [State, Dispatchers] {
  const [
    { changedToSum, notifications, conditionOperator },
    dispatch
  ] = useReducer(reducer, initialState)

  const setChangedToSum = useCallback((sum) => {
    dispatch({ type: 'CHANGE_CHANGED_TO_SUM', payload: sum })
  }, [dispatch])

  const setConditionOperator = useCallback((operator) => {
    dispatch({ type: 'CHANGE_CONDITION_OPERATOR', payload: operator })
  }, [dispatch])

  const addNotification = useCallback((notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  }, [dispatch])

  const removeNotification = useCallback((id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', id })
  }, [dispatch])

  return [
    {
      changedToSum,
      conditionOperator,
      notifications: [...notifications]
    },
    {
      setChangedToSum,
      setConditionOperator,
      addNotification,
      removeNotification
    }
  ]
}

export default useNotifier
