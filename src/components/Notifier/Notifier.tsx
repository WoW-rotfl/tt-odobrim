import React, { useCallback, useState } from 'react'
import NotifierForm from './NotifierForm'
import NotifierList from './NotifierList'
import storeapi, { ConditionOperator } from '../../api/storeapi'
import { removeItemById } from '../../utils';

import './Notifier.css'

type Props ={
  getConvertionData: () => {
    fromCurrency: string;
    fromSum: string;
    toCurrency: string;
    toSum: string;
  };
  conversiionId?: string;
}

function Notifier({ getConvertionData, conversiionId }: Props) {
  const {
    fromSum,
    fromCurrency,
    toSum,
    toCurrency,
  } = getConvertionData()
  const [
    notifications,
    setNotifications
  ] = useState(storeapi.getNotifications())

  const handleAddNotification = useCallback((
    changedToSum: string,
    conditionOperator: ConditionOperator
  ) => {

    const newNotification = storeapi.createNotification({
      changedToSum,
      conditionOperator,
      fromSum,
      fromCurrency,
      toSum,
      toCurrency,
    })

    setNotifications({
      [newNotification.id]: newNotification,
      ...notifications
    })

  }, [
    fromSum,
    fromCurrency,
    toSum,
    toCurrency,
    notifications
  ])

  const handleRemoveNotification = useCallback((id: string) => {
    storeapi.removeNotification(id)
    setNotifications({ ...removeItemById(id, notifications) })
  }, [notifications])

  const handleCompleteNotification = useCallback((
    id: string,
    completeSum: string
  ) => {
    
    const notification = storeapi.completeNotification(id, completeSum)
    setNotifications({ ...notifications, [id]: notification })

  }, [notifications])

  return (
    <div className="notifier">
      <NotifierForm
        currentConversion={toSum}
        onClickNotifyBtn={handleAddNotification}
      />
      <div className="notifier__notifications">
        <NotifierList
          notifications={Object.values(notifications)}
          onClickRemoveNotification={handleRemoveNotification}
          onCompleteNotification={handleCompleteNotification}
        />
      </div>
    </div>
  )
}

export default Notifier
