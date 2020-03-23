import React from 'react'
import {
  render,
  fireEvent,
  getByLabelText,
  getByTestId,
  findByTestId,
} from '@testing-library/react'

import Notifier from '../Notifier'
import { ExchangeProvider } from '../../../contexts/ExchangeContext'
import { ConditionOperator } from '../../../api/storeapi'

afterAll(() => localStorage.setItem('notifications', ''))

const getConvertionData = jest.fn()
  .mockReturnValue({
    fromSum: '100',
    fromCurrency: 'USD',
    toSum: '7000',
    toCurrency: 'RUB'
  })

function setup() {
  const utils = render(
    <ExchangeProvider>
      <Notifier getConvertionData={getConvertionData} />
    </ExchangeProvider>
  )

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
  const notifySumInput = utils.getByTestId('notifier-notify-sum') as HTMLInputElement
  const notifyBtn = utils.getByText('Notify').parentNode as HTMLButtonElement

  return {
    ...utils,
    changedSumInput,
    exprOperatorSpan,
    curConversionInput,
    cndnOperatorSelect,
    notifySumInput,
    notifyBtn,
  }
}

function createListItem(
  changedToSum: string,
  conditionOperator: ConditionOperator = 'gt'
) {

  const {
    changedSumInput,
    notifyBtn,
    cndnOperatorSelect,
    ...utils
  } = setupNotifyForm()

  fireEvent.change(changedSumInput, { target: { value: changedToSum } })
  fireEvent.click(notifyBtn)
  fireEvent.change(cndnOperatorSelect, { target: { value: conditionOperator } })

  const regexpStr = `${changedToSum}\\(changed to\\)`
  const regexp = new RegExp(regexpStr)
  const itemLabel = utils.getByText(regexp)
  const item = itemLabel.parentNode!.parentNode!.parentNode as HTMLLIElement

  return {
    ...utils,
    item,
  }
}

test('NotifierForm calculate notify sum', () => {
  const { changedSumInput, notifySumInput } = setupNotifyForm()
  fireEvent.change(changedSumInput, { target: { value: '100' } })
  expect(notifySumInput.value).toBe('7100')
})

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


test('New notification should be in document', () => {
  const { item } = createListItem('100')
  expect(item).toBeInTheDocument()
})

test('Notification should have \'progress\' state', () => {
  const { item } = createListItem('1000')
  expect(getByTestId(item, 'notifier-list-item-progress')).toBeInTheDocument()
})

test('Notification should have \'success\' state', async () => {
  const { item } = createListItem('1')
  const successIcon = await findByTestId(item, 'notifier-list-item-success')
  expect(successIcon).toBeInTheDocument()
})

test('Notification should be removed', () => {
  const { item } = createListItem('52')
  const deleteBtn = getByLabelText(item, 'delete')
  fireEvent.click(deleteBtn)
  expect(item).not.toBeInTheDocument()
})