import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Notifier from '../Notifier'

const getConvertionData = jest.fn()
  .mockReturnValue({
    fromSum: '100',
    fromCurrency: 'USD',
    toSum: '7000',
    toCurrency: 'RUB'
  })

function setup() {
  const utils = render(<Notifier getConvertionData={getConvertionData} />)

  return {
    ...utils
  }
}

function setupNotifyForm() {
  const utils = setup()

  const changedSumInput = utils.getByTestId('notifier-change-to-sum') as HTMLInputElement
  const exprOperatorSpan = utils.getByTestId('notifier-expr-operator') as HTMLSpanElement
  const curConversionInput = utils.getByTestId('notifier-current-conversion') as HTMLInputElement
  const cndnOperatorSelect = utils.getByTestId('notifier-condition-operator') as HTMLSelectElement
  const notifyBtn = utils.getByText('Notify').parentNode as HTMLButtonElement

  return {
    ...utils,
    changedSumInput,
    exprOperatorSpan,
    curConversionInput,
    cndnOperatorSelect,
    notifyBtn,
  }
}

test('NotifierForm when change condition operator should change expression operator', () => {
  const { cndnOperatorSelect, exprOperatorSpan } = setupNotifyForm()
  fireEvent.change(cndnOperatorSelect, { target: { value: 'lt' } })
  expect(exprOperatorSpan.innerHTML).toBe(' - ')
})


test('NotifierForm when changed amount filled notify btn should be active', () => {
  const { changedSumInput, notifyBtn } = setupNotifyForm()
  expect(notifyBtn.hasAttribute('disabled')).toBeTruthy()
  fireEvent.change(changedSumInput, { target: { value: '100' } })
  expect(notifyBtn.hasAttribute('disabled')).toBeFalsy()
})

test('new notification should be in document', () => {

})

test('notification should have \'finish\' status', () => {

})

test('notification should be removed', () => {

})