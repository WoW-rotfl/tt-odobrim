import { useReducer, useCallback } from 'react'
import { removeItemById } from '../../utils'
import storeapi, { Notification, NewNotification, ConditionOperator } from '../../api/storeapi'


type Action = 
  { type: 'CHANGE_CHANGED_TO_SUM', payload: string }
  | { type: 'CHANGE_CONDITION_OPERATOR', payload: ConditionOperator }
  | { type: 'ADD_NOTIFICATION', payload: Notification }
  | { type: 'COMPLETE_NOTIFICATION', id: string }
  | { type: 'REMOVE_NOTIFICATION', id: string }


type State = {
  changedToSum: string;
  conditionOperator: ConditionOperator;
  notifications: { [id: string]: Notification };
}

 
const initialState: State = {
  changedToSum: '',
  conditionOperator: 'gt',
  notifications: {},
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
    case 'ADD_NOTIFICATION': {
      const notification = storeapi.createNotification(action.payload)
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [notification.id]: notification
        }
      }
    }
    case 'COMPLETE_NOTIFICATION': {
      const notification = storeapi.completeNotification(action.id)
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.id]: notification
        }
      }
    }
    case 'REMOVE_NOTIFICATION':
      storeapi.removeNotification(action.id)
      return {
        ...state,
        notifications: removeItemById(action.id, state.notifications)
      }
  }
}


type Dispatchers = {
  setChangedToSum: (sum: string) => void;
  setConditionOperator: (operator: ConditionOperator) => void;
  addNotification: (notification: NewNotification) => void;
  completeNotification: (id: string) => void;
  removeNotification: (id: string) => void;
}

type NotifierState = Omit<State, 'notifications'> & { notifications: Notification[] }

function useNotifier(): [NotifierState, Dispatchers] {
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

  const completeNotification = useCallback((id) => {
    dispatch({ type: 'COMPLETE_NOTIFICATION', id })
  }, [dispatch])

  const removeNotification = useCallback((id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', id })
  }, [dispatch])

  return [
    {
      changedToSum,
      conditionOperator,
      notifications: Object.values(notifications)
    },
    {
      setChangedToSum,
      setConditionOperator,
      addNotification,
      completeNotification,
      removeNotification
    }
  ]
}

export default useNotifier
