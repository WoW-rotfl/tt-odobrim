import React, { useCallback } from 'react'
import { Typography, Link } from '@material-ui/core'
import Converter from './Converter'
import useConverter from './useConverter'
import { useExchange } from '../../contexts/ExchangeContext'
import CircularProgress from '@material-ui/core/CircularProgress'
import './Converter.css'

type GetConverterData = () => { fromSum: string, fromCurrency: string, toSum: string, toCurrency: string }

type Props = typeof defaultProps

const defaultProps = {
  afterConverter: (getConverterData: GetConverterData) => {}
}

const ConverterContainer = ({ afterConverter }: Props) => {
  const {
    setFromCurrency,
    setFromSum,
    setToCurrency,
    setToSum,
    fromCurrency,
    fromSum,
    toCurrency,
    toSum,
   } = useConverter()

  const { loading } = useExchange()

  const getConverterData = useCallback(() => ({
    fromSum,
    fromCurrency,
    toSum,
    toCurrency
  }), [fromSum, fromCurrency, toSum, toCurrency])

  const handleFromCurrencyChange: MaterialSelect = useCallback(
    (e) => {
      setFromCurrency((e.target.value as string))
    },
    [setFromCurrency]
  )

  const handleFromSumChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFromSum(e.target.value)
    },
    [setFromSum]
  )


  const handleToCurrencyChange: MaterialSelect = useCallback(
    (e) => {
      setToCurrency((e.target.value as string))
    },
    [setToCurrency]
  )

  const handleToSumChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setToSum(e.target.value)
    },
    [setToSum]
  )
  
  return (
    loading ? (
      <CircularProgress data-testid="converter-spinner" classes={{ root: 'converter__loader' }} />
    ) : (
      <div className="converter">
        <Typography variant="h4"><Link target="_blank" href="https://www.google.com/search?newwindow=1&sxsrf=ALeKk02FAeISmBwFfwoZ7whJu6ETy71uOA%3A1584996202592&ei=ah95XsP-IoGyrgT_9oXgCw&q=rubles+to+usd&oq=rubles&gs_l=psy-ab.3.1.0j0i203l5j0i10i203j0j0i203j0.1926.3140..5132...0.2..0.93.442.6......0....1..gws-wiz.......0i71j35i39j0i131j0i67j0i131i67j0i131i10i67.KmAMvxYFozg">Google currency converter</Link> behavior implemented</Typography>
        <Typography variant="subtitle1" >Rapid API Formula: (fromSum * rates[fromCurrency]) / rates[toCurrency]</Typography>
        <Converter
          fromSum={fromSum}
          fromCurrency={fromCurrency}
          onChangeFromCurrency={handleFromCurrencyChange}
          onChangeFromSum={handleFromSumChange}
          toSum={toSum}
          toCurrency={toCurrency}
          onChangeToCurrency={handleToCurrencyChange}
          onChangeToSum={handleToSumChange}
        />
        {afterConverter(getConverterData)}
      </div>
    )
  )
}

ConverterContainer.defaultProps = defaultProps

export default ConverterContainer
