import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react'
import rapidapi from './api/rapidapi';

export type CalcExchangeSum = (fromSum: string, fromCncy: string, toCncy: string) => string
type ExchangeRates = { [currency: string]: number }
type Props = { children: React.ReactNode }
type Context = { calcExchangeSum: CalcExchangeSum, loading: boolean } | undefined


const initialState = {}
const ExchangeContext = createContext<Context>(undefined)
const { Provider, Consumer } = ExchangeContext
const exchangeUpdInterval = 5e3


function randomInteger(min: number, max: number): number {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomRates() {
  return {
    RUB: Number(`0.0${randomInteger(1328, 1639)}`),
    USD: 1,
    EUR: Number(`1.${randomInteger(10000, 14730)}`),
    JPY: Number(`0.00${randomInteger(891, 980)}`),
    GBP: Number(`1.${randomInteger(20224, 34751)}`)
    
  }
}


function ExchangeProvider({ children }: Props) {
  const [rates, setRates] = useState<ExchangeRates>(initialState)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchRates() {
      const newRates = await rapidapi()
      setRates(newRates)
      setLoading(false)
    }

    fetchRates()
  }, [])


  // rapid api has request limits and low update frequency
  useEffect(() => {

    function hasRatesChanged(newRates: ExchangeRates): boolean {
      return JSON.stringify(rates) !== JSON.stringify(newRates)
    }

    const intervalId = setInterval(() => {
      const newRates = randomRates()

      if (hasRatesChanged(newRates)) {
        setRates(newRates)
      }
    }, exchangeUpdInterval)

    return () => {
      clearInterval(intervalId)
    }
  }, [rates])

  
  const getRate = useCallback((currency: string): number => {
    return rates[currency]
  }, [rates])


  const calcExchangeSum: CalcExchangeSum = useCallback((fromSum, fromCncy, toCncy) => {
    console.log(getRate(toCncy));
    const result = Number(fromSum) * getRate(fromCncy) / getRate(toCncy)
    if (result === 0) return ''

    return String(result.toFixed(2))
  }, [getRate])

  return (
    <Provider value={{ calcExchangeSum, loading }}>
      {children}
    </Provider>
  )
}

function useExchange() {
  const context = useContext(ExchangeContext)
  if (context === undefined) {
    throw new Error('useExchange must be used with ExchangeProvider')
  }
  return context
}

// export default ExchangeContext

export { ExchangeProvider, Consumer as ExchangeConsumer, useExchange }
