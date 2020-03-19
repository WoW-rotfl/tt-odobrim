import React from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'

type Props = {
  testSumId: string;
  testCncyId: string;
  sum: string;
  onChangeSum: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currency: string;
  onChangeCurrency: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
};

const getCurrencies = (): string[] => ([
  'RUB',
  'USD',
  'EUR',
  'JPY',
  'GBP'
]);

const ConverterCurrency = ({ testSumId, sum, onChangeSum, currency, onChangeCurrency }: Props) => (
  <div className="converter__currency">
    <TextField
      classes={{ root: 'converter__input' }}
      type="number"
      onChange={onChangeSum}
      value={sum}
      inputProps={{ min: 0, 'data-testid': testSumId }}
    />
    <Select
      native
      value={currency}
      onChange={onChangeCurrency}
    >
      {getCurrencies().map(cncy => (
        <option key={cncy} value={cncy}>{cncy}</option>
      ))}
    </Select>
  </div>
);

export default ConverterCurrency;
