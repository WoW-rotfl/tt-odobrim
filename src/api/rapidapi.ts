import axios from 'axios'

export default (): Promise<{ [currency: string]: number }> => 
	axios.get('https://currency-value.p.rapidapi.com/global/currency_rates', {
		'headers': {
			'x-rapidapi-host': 'currency-value.p.rapidapi.com',
			'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
		}
	})
	.then(response => response.data.currency_rates)
