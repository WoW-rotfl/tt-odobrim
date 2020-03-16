import React from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

type Props = {
  sum: string;
  onChangeSum: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currency: string;
  onChangeCurrency: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const getCurrencies = (): string[] => ([
  'RUB',
  'USD',
  'EUR',
  'JPY',
  'GBP'
]);

const ConverterCurrency = ({ sum, onChangeSum, currency, onChangeCurrency }: Props) => (
  <div className="converter__currency">
    <TextField
      classes={{ root: 'converter__input' }}
      type="number"
      onChange={onChangeSum}
      value={sum}
      inputProps={{ min: 0 }}
    />
    <TextField
      select
      value={currency}
      onChange={onChangeCurrency}
    >
      {getCurrencies().map(cncy => (
        <MenuItem key={cncy} value={cncy}>{cncy}</MenuItem>
      ))}
    </TextField>
  </div>
);

export default ConverterCurrency;
