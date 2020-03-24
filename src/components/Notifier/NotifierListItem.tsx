import React, { useCallback } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckIcon from '@material-ui/icons/Check'

import { Notification } from '../../api/storeapi'
import { calcNotifySum, exprOperator } from './utils'

type Dispatchers = {
  onClickRemoveNotification: (id: string) => void,
}


function NotifierListItem({
  id,
  changedToSum,
  conditionOperator,
  completed,
  completeSum,
  fromSum,
  fromCurrency,
  toSum,
  toCurrency,
  startTime,
  endTime,
  onClickRemoveNotification,
}: Notification & Dispatchers) {


  const formulaLabel = useCallback(() => {
    const fromValue = `${fromSum}(${fromCurrency})`
    const toValue = `${toSum}(${toCurrency})`

    const notifySum = calcNotifySum(changedToSum, toSum, conditionOperator)
    const calcFormula = `${changedToSum}(changed to)${exprOperator(conditionOperator)}${toSum} = (${notifySum}`

    const cndnOperatotStr = conditionOperator === 'gt' ? '>' : '<'
    const completeSumStr = completed ? ` => ${completeSum}(new conversion)` : ''

    return `${fromValue} -> ${toValue} => ${calcFormula} ${cndnOperatotStr} ${toSum})${completeSumStr}`

  }, [
    fromSum,
    fromCurrency,
    toSum,
    toCurrency,
    changedToSum,
    conditionOperator,
    completed,
    completeSum
  ])

  const timeLabel = useCallback(() => {
    return !endTime
      ? `Start: ${startTime}`
      : `Start: ${startTime} -> End: ${endTime}`
  }, [startTime, endTime])

  const handleRemove = useCallback(() => {
    onClickRemoveNotification(id)
  }, [id, onClickRemoveNotification])

  return (
    <ListItem>
      <ListItemText
        primary={formulaLabel()}
        secondary={timeLabel()}
      />
      <ListItemSecondaryAction>
        {!completed ? (
          <CircularProgress
            data-testid="notifier-list-item-progress"
            classes={{ root: 'notifier__spinner' }}
          />
        ) : (
          <CheckIcon
            data-testid="notifier-list-item-success"
            classes={{ root: 'notifier__success' }}
          />
        )}
        <IconButton onClick={handleRemove} edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default NotifierListItem
