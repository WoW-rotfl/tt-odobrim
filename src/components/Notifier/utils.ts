import { ConditionOperator } from '../../api/storeapi';

function calcNotifySum(changedAmount: string, conversionResult: string, conditionOperator: ConditionOperator): number {
  const result = conditionOperator === 'gt'
  ? Number(changedAmount) + Number(conversionResult)
  : Number(changedAmount) - Number(conversionResult)
  return Number(Math.abs(result).toFixed(2))
}

function exprOperator(conditionOperator: ConditionOperator): string {
   return conditionOperator === 'gt'
    ?  ' + '
    :  ' - '
}

export { calcNotifySum, exprOperator }
