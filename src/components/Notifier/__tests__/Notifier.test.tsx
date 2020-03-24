import React, {  } from 'react'
import rapidapi from '../../../api/rapidapi'
import {
  render,
  fireEvent,
  getByLabelText,
  getByTestId,
  findByTestId,
  wait,
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

jest.mock('../../../api/rapidapi')

function setup() {
  const rates = {
    USD: 1,
    EUR: 1.06938,
    GBP: 1.16207,
    JPY: 0.00905421,
    RUB: 0.0124567,
  }

  const mockedRapidapi = rapidapi as jest.Mock
  mockedRapidapi.mockResolvedValue(rates)

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
    debug,
    changedSumInput,
    notifyBtn,
    cndnOperatorSelect,
    ...utils
  } = setupNotifyForm()

  fireEvent.change(changedSumInput, { target: { value: changedToSum } })
  fireEvent.change(cndnOperatorSelect, { target: { value: conditionOperator } })
  fireEvent.click(notifyBtn)

  const regexpStr = `${changedToSum}\\(changed to\\)`
  const regexp = new RegExp(regexpStr)
  const itemLabel = utils.getByText(regexp)
  const item = itemLabel.parentNode!.parentNode!.parentNode as HTMLLIElement

  return {
    ...utils,
    item,
  }
}

test('NotifierForm calculate notify sum', async () => {
  const { changedSumInput, notifySumInput } = setupNotifyForm()

  fireEvent.change(changedSumInput, { target: { value: '100' } })
  expect(notifySumInput.value).toBe('7100')
  await wait()
})

test('NotifierForm when change condition operator should change expression operator', async () => {
  const { cndnOperatorSelect, exprOperatorSpan } = setupNotifyForm()
  fireEvent.change(cndnOperatorSelect, { target: { value: 'lt' } })
  expect(exprOperatorSpan.innerHTML).toBe(' - ')
  await wait()
})


test('NotifierForm when changed amount filled notify btn should be active',async () => {
  const { changedSumInput, notifyBtn } = setupNotifyForm()
  expect(notifyBtn.hasAttribute('disabled')).toBeTruthy()
  fireEvent.change(changedSumInput, { target: { value: '100' } })
  expect(notifyBtn.hasAttribute('disabled')).toBeFalsy()
  await wait()
})


test('New notification should be in document', async () => {
  const { item } = createListItem('100')
  expect(item).toBeInTheDocument()
  await wait()
})

test('Notification should have \'progress\' state', async () => {
  const { item } = createListItem('1000')
  expect(getByTestId(item, 'notifier-list-item-progress')).toBeInTheDocument()
  await wait()
})

test('Notification should have \'success\' state', async () => {
  const { item } = createListItem('1')
  const successIcon = await findByTestId(item, 'notifier-list-item-success')
  expect(successIcon).toBeInTheDocument()
  await wait()
})

test('Notification should be removed', async () => {
  const { item } = createListItem('52')
  const deleteBtn = getByLabelText(item, 'delete')
  fireEvent.click(deleteBtn)
  expect(item).not.toBeInTheDocument()
  await wait()
})