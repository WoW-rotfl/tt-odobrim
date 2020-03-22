import React, { useCallback } from 'react'
import NotifierForm from './NotifierForm'
import NotifierList from './NotifierList'
import useNotifier, { ConditionOperator } from './useNotifier';

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
    {
      changedToSum,
      conditionOperator,
      notifications,
    },
    {
      setChangedToSum,
      setConditionOperator,
      addNotification,
    }
  ] = useNotifier()

  const handleChangeToSum = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedToSum(e.target.value)
  }, [setChangedToSum])

  const handleChangeCndnOp: MaterialSelect = useCallback((e) => {
    setConditionOperator(e.target.value as ConditionOperator)
  }, [setConditionOperator])

  const handleAddNotification = useCallback(() => {
    addNotification({
      changedToSum,
      conditionOperator,
      fromSum,
      fromCurrency,
      toSum,
      toCurrency,
    })
  }, [
    addNotification,
    changedToSum,
    conditionOperator,
    fromSum,
    fromCurrency,
    toSum,
    toCurrency
  ])

  return (
    <div className="notifier">
      <NotifierForm
        changedAmount={changedToSum}
        conditionOperator={conditionOperator}
        onChangeAmount={handleChangeToSum}
        onChangeConditionOperator={handleChangeCndnOp}
        currentConversion={toSum}
        onClickNotifyBtn={handleAddNotification}
      />
      <div className="notifier__notifications">
        <NotifierList notifications={notifications} />
      </div>
    </div>
  )
}

export default Notifier
