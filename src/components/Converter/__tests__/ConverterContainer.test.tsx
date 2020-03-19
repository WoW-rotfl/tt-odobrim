import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ExchangeProvider } from '../../../ExchangeContext'
import ConverterContainer from '../ConverterContainer'


function setup() {
  const utils = render(
    <ExchangeProvider>
      <ConverterContainer />
    </ExchangeProvider>
  )
  
  return {
    ...utils
  }
}

async function setupConverterInputs() {
  const utils = setup()
  const fromInput = await utils.findByTestId('from-input') as HTMLInputElement
  const fromSelect = await utils.findByDisplayValue('RUB') as HTMLSelectElement
  const toInput = await utils.findByTestId('to-input') as HTMLInputElement
  const toSelect = await utils.findByDisplayValue('USD') as HTMLSelectElement
  return {
    fromInput,
    fromSelect,
    toInput,
    toSelect,
  }
}

test('render load spinner', () => {
  const { getByTestId } = setup()
  expect(getByTestId('converter-spinner')).toBeInTheDocument()
})

test('fill fromSum should change toSum', async () => {
  const { fromInput, toInput } = await setupConverterInputs()
  const toSum = toInput.value
  fireEvent.change(fromInput, { target: { value: '100' } })
  expect(toInput.value).not.toBe(toSum)
})

test('fill toSum should change fromSum', async () => {
  const { fromInput, toInput } = await setupConverterInputs()
  const fromSum = fromInput.value
  fireEvent.change(toInput, { target: { value: '100' } })
  expect(fromInput.value).not.toBe(fromSum)
})

test('should swap currency if equal', async () => {
  const { fromSelect, toSelect } = await setupConverterInputs()
  fireEvent.change(fromSelect, { target: { value: 'USD' } })
  expect(toSelect.value).toBe('RUB')

  fireEvent.change(toSelect, { target: { value: 'RUB' } })
  expect(fromSelect.value).toBe('USD')
})

test('should recalculate toSum after change fromCurrency', async () => {
  const { fromInput, fromSelect, toInput } = await setupConverterInputs()
  fireEvent.change(fromInput, { target: { value: '100' } })
  const toSum = toInput.value
  fireEvent.change(fromSelect, { target: { value: 'USD' } })
  expect(toSum).not.toBe(toInput.value)
})