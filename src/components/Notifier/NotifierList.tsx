import React, { useEffect } from 'react'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'

import NotifierListItem from './NotifierListItem'
import { Notification } from '../../api/storeapi'
import { calcNotifySum } from './utils'
import { useExchange, CalcExchangeSum } from '../../contexts/ExchangeContext'

type Props = {
  notifications: Notification[],
  onClickRemoveNotification: (id: string) => void,
  onCompleteNotification: (id: string, completeSum: string) => void,
}

function hasComplete({
  fromSum,
  fromCurrency,
  toSum,
  toCurrency,
  changedToSum,
  conditionOperator,
}: Notification, calcExchangeSum: CalcExchangeSum) {

  const newConversionResult = Number(calcExchangeSum(fromSum, fromCurrency, toCurrency))
  const notifySum = calcNotifySum(changedToSum, toSum, conditionOperator)
  
  return [
    conditionOperator === 'gt'
      ? newConversionResult > notifySum
      : newConversionResult < notifySum,
    newConversionResult
  ]
}

const NotifierList= ({
  notifications,
  onClickRemoveNotification,
  onCompleteNotification,
}: Props) => {
  const { calcExchangeSum } = useExchange()

  useEffect(() => {
    notifications.forEach((notification) => {

      const [isComplete, completeSum] = hasComplete(
        notification,
        calcExchangeSum
      )

      if (!notification.completed && isComplete) {
        onCompleteNotification(notification.id, String(completeSum))
      }

    })
  }, [calcExchangeSum, notifications, onCompleteNotification])

  return notifications.length ? (
    <>
      <Typography variant="h5">Notifications:</Typography>
      <List>
        {notifications.map(notification => (
          <NotifierListItem
            key={notification.id}
            onClickRemoveNotification={onClickRemoveNotification}
            {...notification}
          />
        ))}
      </List>
    </>
  ) : null
}

export default NotifierList