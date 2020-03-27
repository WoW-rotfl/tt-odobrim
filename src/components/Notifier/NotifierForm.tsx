import React, { useState, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { ConditionOperator } from '../../api/storeapi'
import { calcNotifySum, exprOperator } from './utils'

type Props = {
  currentConversion: string;
  onClickNotifyBtn: (
    changedAmount: string,
    conditionOperator: ConditionOperator
  ) => void;
}

function NotifierForm({
  currentConversion,
  onClickNotifyBtn,
}: Props) {
  const [changedAmount, setChangedAmount] = useState('')
  const [conditionOperator, setConditionOperator] = useState<ConditionOperator>('gt')

  const handleChangeChangedAmount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedAmount(e.target.value)
  }, [setChangedAmount])

  const handleChangeCndnOp: MaterialSelect = useCallback((e) => {
    setConditionOperator(e.target.value as ConditionOperator)
  }, [setConditionOperator])

  const handleClickNotifyBtn = useCallback(() => {
    setChangedAmount('');
    setConditionOperator('gt')
    onClickNotifyBtn(changedAmount, conditionOperator)
  }, [changedAmount, conditionOperator, onClickNotifyBtn])

  return (
    <div className="notifier__form">
      <Typography
        classes={{ root: 'notifier__title' }}
        variant="h6"
      >
        Notify me if convertion result changed to:
      </Typography>
      <Typography
        classes={{ root: 'notifier__subtitle' }}
        variant="subtitle1"
      >
        To test the notification pending and success state, fill the form and wait: converter from: 100000(RUB), to currency: USD, change amount: 15
      </Typography>
      <TextField
        type="number"
        variant="outlined"
        label="Change amount"
        onChange={handleChangeChangedAmount}
        value={changedAmount}
        inputProps={{ 'data-testid': 'notifier-change-to-sum' }}
      />
      <span data-testid="notifier-expr-operator">
        {exprOperator(conditionOperator)}
      </span>
      <TextField
        variant="outlined"
        label="Current conversion"
        inputProps={{
          disabled: true,
          'data-testid':'notifier-current-conversion'
        }}
        value={currentConversion}
      />
      <span> = </span>
      <TextField
        variant="outlined"
        label="Notify result"
        inputProps={{
          disabled: true,
          'data-testid': 'notifier-notify-sum'
        }}
        value={changedAmount ? calcNotifySum(changedAmount, currentConversion, conditionOperator) : ''}
      />
      <Select
        classes={{ root: 'notifier__condition' }}
        native
        variant="outlined"
        defaultValue={conditionOperator}
        onChange={handleChangeCndnOp}
        inputProps={{ 'data-testid': 'notifier-condition-operator' }}
        
      >
        <option value="gt">{">"}</option>
        <option value="lt">{"<"}</option>
      </Select>
      <TextField
        variant="outlined"
        label="Current conversion"
        inputProps={{
          disabled: true,
          'data-testid': 'notifier-current-coversion-compare'
        }}
        value={currentConversion}
      />
      <Button
        classes={{ root: 'notifier__btn' }}
        onClick={handleClickNotifyBtn}
        disabled={!changedAmount || !currentConversion}
        variant="contained"
        color="primary">
          Notify
      </Button>
    </div>
  )
}

export default NotifierForm
