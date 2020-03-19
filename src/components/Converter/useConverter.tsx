import { useReducer, useCallback } from 'react'
import { useExchange, CalcExchangeSum } from '../../ExchangeContext'

// import type { CalcExchangeSum } from '../../ExchangeContext';

type State = typeof initialState
type Action = 
  { type: 'CHANGE_FROM_CURRENCY', payload: string }
  | { type: 'CHANGE_FROM_SUM', payload: string }
  | { type: 'CHANGE_TO_CURRENCY', payload: string }
  | { type: 'CHANGE_TO_SUM', payload: string }
  // for usage uncomment useFffect :76-79
  | { type: 'CONVERTER_REAL_TIME_REFRESH_TO_SUM' } 

const initialState = {
  fromCurrency: 'RUB',
  fromSum: '',
  toCurrency: 'USD',
  toSum: ''
}

function swapCncyIfEqual(
  currentCncy: string,
  otherNewCncy: string,
  otherPrevCncy: string
): string {
  return currentCncy === otherNewCncy ? otherPrevCncy : currentCncy
}

function getReducer(calcExchangeSum: CalcExchangeSum) {

  return function converterReducer(state: State, action: Action): State {
    switch (action.type) {
      case 'CHANGE_FROM_CURRENCY':
        const toCurrency = swapCncyIfEqual(state.toCurrency, action.payload, state.fromCurrency)
        return {
          ...state,
          fromCurrency: action.payload,
          toCurrency,
          toSum: calcExchangeSum(state.fromSum, action.payload, toCurrency)
        }
      case 'CHANGE_TO_CURRENCY':
        const fromCurrency = swapCncyIfEqual(state.fromCurrency, action.payload, state.toCurrency)
        return {
          ...state,
          fromCurrency,
          toCurrency: action.payload,
          toSum: calcExchangeSum(state.fromSum, fromCurrency, action.payload)
        }
      case 'CHANGE_FROM_SUM':
        return {
          ...state,
          fromSum: action.payload,
          toSum: calcExchangeSum(action.payload, state.fromCurrency, state.toCurrency)
        }
      case 'CHANGE_TO_SUM':
        return {
          ...state,
          fromSum: calcExchangeSum(action.payload, state.toCurrency, state.fromCurrency),
          toSum: action.payload
        }
      case 'CONVERTER_REAL_TIME_REFRESH_TO_SUM':
        return {
          ...state,
          toSum: calcExchangeSum(state.fromSum, state.fromCurrency, state.toCurrency)
        }
    }
  }
}

function useConverter() {
  const { calcExchangeSum } = useExchange()
  const [state, dispatch] = useReducer(getReducer(calcExchangeSum), initialState)
  const { fromCurrency, fromSum, toCurrency, toSum } = state;

  // useEffect(() => {
  //   dispatch({ type: 'CONVERTER_REAL_TIME_REFRESH_TO_SUM' });
  // }, [calcExchangeSum])

  const setFromCurrency = useCallback((currency: string) => {
    dispatch({ type: 'CHANGE_FROM_CURRENCY', payload: currency })
  }, [dispatch])

  const setFromSum = useCallback((sum: string) => {
    dispatch({ type: 'CHANGE_FROM_SUM', payload: sum })
  }, [dispatch])

  const setToCurrency = useCallback((currency: string) => {
    dispatch({ type: 'CHANGE_TO_CURRENCY', payload: currency })
  }, [dispatch])

  const setToSum = useCallback((sum: string) => {
    dispatch({ type: 'CHANGE_TO_SUM', payload: sum })
  }, [dispatch])

  return {
    setFromCurrency,
    setFromSum,
    setToCurrency,
    setToSum,
    fromCurrency,
    fromSum,
    toCurrency,
    toSum,
  }
}

export default useConverter