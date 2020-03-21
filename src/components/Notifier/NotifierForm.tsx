import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import { ConditionOperator } from './useNotifier'


type Props = {
  currentConversion: string;
  changedAmount: string;
  conditionOperator: ConditionOperator;
  onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeConditionOperator: MaterialSelect;
}

function NotifierForm({
  currentConversion,
  changedAmount,
  conditionOperator,
  onChangeAmount,
  onChangeConditionOperator
}: Props) {

  const calcNotifySum = useCallback(() => {
    const result = conditionOperator === 'gt'
      ? Number(changedAmount) + Number(currentConversion)
      : Number(changedAmount) - Number(currentConversion)
    return Math.abs(result)
  }, [conditionOperator, changedAmount, currentConversion])

  return (
    <div className="notifier">
      <Typography variant="h6">Notify me if convertion result changed to:</Typography>
      <TextField
        type="number"
        variant="outlined"
        label="Change amount"
        onChange={onChangeAmount}
        value={changedAmount}
        inputProps={{ 'data-testid': 'notifier-change-to-sum' }}
      />
      <span data-testid="notifier-expr-operator">
        {conditionOperator === 'gt'
          ?  ' + '
          :  ' - '
        }
      </span>
      <TextField
        variant="outlined"
        label="Current conversion"
        inputProps={{
          readOnly: true,
          'data-testid':'notifier-current-conversion'
        }}
        value={currentConversion}
      />
      <span> = </span>
      <TextField
        variant="outlined"
        label="Notify result"
        inputProps={{
          readOnly: true,
          'data-testid': 'notifier-notify-sum'
        }}
        value={calcNotifySum()}
      />
      <Select
        native
        variant="outlined"
        defaultValue={conditionOperator}
        onChange={onChangeConditionOperator}
        inputProps={{ 'data-testid': 'notifier-condition-operator' }}
        
      >
        <option value="gt">{"<"}</option>
        <option value="lt">{">"}</option>
      </Select>
      <TextField
        variant="outlined"
        label="Current conversion"
        inputProps={{
          readOnly: true,
          'data-testid': 'notifier-current-coversion-compare'
        }}
        value={currentConversion}
      />
      <Button disabled={!changedAmount} variant="contained" color="primary">Notify</Button>
    </div>
  )
}

export default NotifierForm