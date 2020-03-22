import { useReducer, useCallback } from 'react'
import uniqueId from 'unique-string'
import { removeItemById } from '../../utils'

export type ConditionOperator = 'gt' | 'lt'
export type Notification = {
  id: string,
  changedToSum: string;
  conditionOperator: ConditionOperator;
  completed: boolean,
  fromCurrency: string;
  fromSum: string;
  toCurrency: string;
  toSum: string;
  startTime: string;
  endTime: string;
}

type NewNotification = Omit<Notification, 'id' | 'startTime' | 'endTime' | 'completed'>

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

function getTime(): string {
  const date = new Date()
  const currentDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  const time = `${date.getHours()}:${date.getMinutes()}}`
  return `${time} ${currentDate}`
}

function newNotification(notification: NewNotification): Notification {

  return {
    ...notification,
    id: uniqueId(),
    completed: false,
    startTime: getTime(),
    endTime: ''
  }
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
      const notification = newNotification(action.payload)
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [notification.id]: notification
        }
      }
    }
    case 'COMPLETE_NOTIFICATION': {
      const notification = {
        ...state.notifications[action.id],
        completed: true,
        endTime: getTime(),
      }
      
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.id]: notification
        }
      }
    }
    case 'REMOVE_NOTIFICATION':
      // state.notifications.splice(action.id, 1)
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
