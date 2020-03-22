import { ConditionOperator } from "./useNotifier";

function calcNotifySum(changedAmount: string, conversionResult: string, conditionOperator: ConditionOperator): number {
  const result = conditionOperator === 'gt'
  ? Number(changedAmount) + Number(conversionResult)
  : Number(changedAmount) - Number(conversionResult)
  return Math.abs(result)
}

function exprOperator(conditionOperator: ConditionOperator): string {
   return conditionOperator === 'gt'
    ?  ' + '
    :  ' - '
}

export { calcNotifySum, exprOperator }
