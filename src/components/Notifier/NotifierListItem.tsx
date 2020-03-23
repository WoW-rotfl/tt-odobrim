import React, { useCallback } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckIcon from '@material-ui/icons/Check'

import useNotifier from './useNotifier'
import { Notification } from '../../api/storeapi'
import { calcNotifySum, exprOperator } from './utils'
import { useExchange } from '../../contexts/ExchangeContext'


function NotifierListItem({
  id,
  changedToSum,
  conditionOperator,
  completed,
  fromSum,
  fromCurrency,
  toSum,
  toCurrency,
  startTime,
  endTime,
}: Notification) {
  const { calcExchangeSum } = useExchange()
  const [, { completeNotification, removeNotification }] = useNotifier()


  const formulaLabel = useCallback(() => {
    const fromValue = `${fromSum}(${fromCurrency})`
    const toValue = `${toSum}(${toCurrency})`

    const notifySum = calcNotifySum(changedToSum, toSum, conditionOperator)
    const calcFormula = `(${changedToSum}(changed to)${exprOperator(conditionOperator)}${toSum} = ${notifySum})`

    return `${fromValue} -> ${toValue} => ${calcFormula} ${conditionOperator} ${fromSum}`
  }, [
    fromSum,
    fromCurrency,
    toSum,
    toCurrency,
    changedToSum,
    conditionOperator,
  ])

  const timeLabel = useCallback(() => {
    return !endTime
      ? `Start: ${startTime}`
      : `Start: ${startTime} -> End: ${endTime}`
  }, [startTime, endTime])

  const hasComplete = useCallback(() => {
    const newConversionResult = Number(calcExchangeSum(fromSum, fromCurrency, toCurrency))
    const notifySum = calcNotifySum(changedToSum, toSum, conditionOperator)
    return conditionOperator === 'gt'
    ? newConversionResult > notifySum
    : newConversionResult < notifySum

  }, [
    calcExchangeSum,
    fromSum,
    fromCurrency,
    toSum,
    toCurrency,
    changedToSum,
    conditionOperator,
  ])

  let isComplete = completed
  if (!completed && hasComplete()) {
    completeNotification(id)
    isComplete = true
  }

  const handleRemove = useCallback(() => {
    removeNotification(id)
  }, [id, removeNotification])

  return (
    <ListItem>
      <ListItemText
        primary={formulaLabel()}
        secondary={timeLabel()}
      />
      <ListItemSecondaryAction>
        {isComplete
          ? <CircularProgress />
          : <CheckIcon />
        }
        <IconButton onClick={handleRemove} edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default NotifierListItem
