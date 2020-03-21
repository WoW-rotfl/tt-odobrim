import React, { useCallback } from 'react'
import NotifierForm from './NotifierForm'
import useNotifier, { ConditionOperator } from './useNotifier';

type Props ={
  getConvertionData: () => {
    fromCurrency: string;
    fromSum: string;
    toCurrency: string;
    toSum: string;
  };
}

function Notifier({ getConvertionData }: Props) {
  const { toSum } = getConvertionData()

  const [
    { changedToSum, conditionOperator },
    { setChangedToSum, setConditionOperator }
  ] = useNotifier();

  const handleChangeToSum = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedToSum(e.target.value)
  }, [setChangedToSum])

  const handleChangeCndnOp: MaterialSelect = useCallback((e) => {
    setConditionOperator(e.target.value as ConditionOperator)
  }, [setConditionOperator])


  return (
    <div className="notifier">
      <NotifierForm
        changedAmount={changedToSum}
        conditionOperator={conditionOperator}
        onChangeAmount={handleChangeToSum}
        onChangeConditionOperator={handleChangeCndnOp}
        currentConversion={toSum}
      />
    </div>
  )
}

export default Notifier
