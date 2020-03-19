import React from 'react'
import ConverterCurrency from './ConverterCurrency'
import './Converter.css'

type Props = {
  fromSum: string;
  fromCurrency: string;
  onChangeFromSum: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFromCurrency: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  toSum: string;
  toCurrency: string;
  onChangeToSum: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeToCurrency: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const Converter = ({
  fromSum,
  onChangeFromSum,
  fromCurrency,
  onChangeFromCurrency,
  toSum,
  onChangeToSum,
  toCurrency,
  onChangeToCurrency
}: Props) => (

<div className="converter__form">
  <ConverterCurrency
    testSumId="from-input"
    testCncyId="from-select"
    sum={fromSum}
    currency={fromCurrency}
    onChangeSum={onChangeFromSum}
    onChangeCurrency={onChangeFromCurrency}
  />
  <ConverterCurrency
    testSumId="to-input"
    testCncyId="to-select"
    sum={toSum}
    currency={toCurrency}
    onChangeSum={onChangeToSum}
    onChangeCurrency={onChangeToCurrency}
  />
</div>
)

export default Converter
