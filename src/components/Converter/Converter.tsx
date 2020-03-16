import React, { useCallback } from 'react'
import { Typography, Link } from '@material-ui/core'
import ConverterCurrency from './ConverterCurrency'
import useConverter from './useConverter'
import { useExchange } from '../../ExchangeContext'
import CircularProgress from '@material-ui/core/CircularProgress'
import './Converter.css'

// type State = typeof initialState


const Converter = () => {
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

   const handleFromCurrencyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFromCurrency(e.target.value)
    },
    [setFromCurrency]
  )

  const handleFromSumChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFromSum(e.target.value)
    },
    [setFromSum]
  )


  const handleToCurrencyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setToCurrency(e.target.value)
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
      <CircularProgress />
    ) : (
      <div className="converter">
        <Typography variant="h4">Converter behavior from <Link target="_blank" href="https://www.google.com/search?newwindow=1&sxsrf=ALeKk01lf6r_zFK6BOSuhNJVgYC6zPZCkg%3A1584382524619&ei=PMJvXp6xJdGFrwTJyLboAg&q=%D1%80%D1%83%D0%B1%D0%BB%D0%B8+%D0%B2+%D0%B4%D0%BE%D0%BB%D0%BB%D0%B0%D1%80%D1%8B&oq=%D1%80%D1%83%D0%B1%D0%BB%D0%B8+%D0%B2+%D0%B4%D0%BE%D0%BB%D0%BB%D0%B0%D1%80%D1%8B&gs_l=psy-ab.3..35i39i70i258j0l9.77961.80840..81696...0.1..0.73.956.15......0....1..gws-wiz.......0i71j35i39j0i67j0i10i1i67j0i131.TGvL12SiPIA&ved=0ahUKEwiev8XszJ_oAhXRwosKHUmkDS0Q4dUDCAs&uact=5">google converter</Link></Typography>
        <Typography variant="subtitle1" >Formula: (fromSum * rate.fromCurrency) / rate.toCurrency</Typography>
        <div className="converter__form">
          <ConverterCurrency
            sum={fromSum}
            currency={fromCurrency}
            onChangeSum={handleFromSumChange}
            onChangeCurrency={handleFromCurrencyChange}
          />
          <ConverterCurrency
            sum={toSum}
            currency={toCurrency}
            onChangeSum={handleToSumChange}
            onChangeCurrency={handleToCurrencyChange}
          />
        </div>
      </div>
    )
  )
}

export default Converter
