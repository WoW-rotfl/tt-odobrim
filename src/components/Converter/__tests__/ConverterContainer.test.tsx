import React from 'react'
import axios from 'axios'
import { render, fireEvent, wait } from '@testing-library/react'
import { ExchangeProvider } from '../../../contexts/ExchangeContext'
import ConverterContainer from '../ConverterContainer'

jest.mock('axios')

function setup() {
  const rates = {
    USD: 1,
    EUR: 1.06938,
    GBP: 1.16207,
    JPY: 0.00905421,
    RUB: 0.0124567,
  }
  const response = { data: { 'currency_rates': rates } }
  const mockAxios = axios as jest.Mocked<typeof axios>
  mockAxios.get.mockResolvedValue(response)

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

test('render load spinner', async () => {
  const { getByTestId } = setup()
  expect(getByTestId('converter-spinner')).toBeInTheDocument()
  await wait()
})

test('fill fromSum should change toSum', async () => {
  const { fromInput, toInput } = await setupConverterInputs()
  const toSum = toInput.value
  fireEvent.change(fromInput, { target: { value: '100' } })
  expect(toInput.value).not.toBe(toSum)
  await wait()
})

test('fill toSum should change fromSum', async () => {
  const { fromInput, toInput } = await setupConverterInputs()
  const fromSum = fromInput.value
  fireEvent.change(toInput, { target: { value: '100' } })
  expect(fromInput.value).not.toBe(fromSum)
  await wait()
})

test('should swap currency if equal', async () => {
  const { fromSelect, toSelect } = await setupConverterInputs()
  fireEvent.change(fromSelect, { target: { value: 'USD' } })
  expect(toSelect.value).toBe('RUB')

  fireEvent.change(toSelect, { target: { value: 'RUB' } })
  expect(fromSelect.value).toBe('USD')
  await wait()
})

test('should recalculate toSum after change fromCurrency', async () => {
  const { fromInput, fromSelect, toInput } = await setupConverterInputs()
  fireEvent.change(fromInput, { target: { value: '100' } })
  const toSum = toInput.value
  fireEvent.change(fromSelect, { target: { value: 'USD' } })
  expect(toSum).not.toBe(toInput.value)
  await wait()
})