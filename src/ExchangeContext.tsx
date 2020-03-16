import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react'
import repidapi from './api/rapidapi';


type ExchangeRates = { [currency: string]: number }
type Props = { children: React.ReactNode }
type Context = { getRate: (currency: string) => number | undefined } | undefined

// type Action = 
//   { type: 'LOAD_RATES_SUCCESS', payload: ExchangeRates }
//   | 


const initialState = {}
const ExchangeContext = createContext<Context>(undefined)
const { Provider, Consumer } = ExchangeContext
const exchangeUpdInterval = 15e12

// function exchangeReducer()


function ExchangeProvider({ children }: Props) {
  const [rates, setRates] = useState<ExchangeRates>(initialState)

  const fetchRates = useCallback(async () => {

    function hasRatesChanged(newRates: ExchangeRates): boolean {
      return JSON.stringify(rates) !== JSON.stringify(newRates)
    }

    const newRates = await repidapi()

      if (hasRatesChanged(newRates)) {
        setRates(newRates)
      }
  }, [rates])

  // useEffect(() => { fetchRates() }, [])

  useEffect(() => {
    const intervalId = setInterval(fetchRates, exchangeUpdInterval)

    return () => {
      clearInterval(intervalId)
    }
  }, [fetchRates])

  const getRate = useCallback((currency: string): number | undefined => {
    return rates[currency]
  }, [rates])

  return (
    <Provider value={{ getRate }}>
      {children}
    </Provider>
  )
}

function useExchange() {
  const context = useContext(ExchangeContext)
  if (context === undefined) {
    throw new Error('useExchange must be used with ExchangeProvider')
  }
  return context;
}

// export default ExchangeContext

export { ExchangeProvider, Consumer as ExchangeConsumer, useExchange }
