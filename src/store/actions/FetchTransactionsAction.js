import axios from 'axios';
const devUrl = 'https://g-blockchain-info-api.herokuapp.com';

function fetchTransactionsSuccess(body) {
	return {
		type: 'FETCH_TRANSACTIONS_SUCCESS',
		body,
	};
}

export default function fetchTransactions(addresses) {
	return (dispatch) => {
		return axios.get(`${devUrl}/rawaddr/${addresses}`)
			.then(res => {
				return dispatch(fetchTransactionsSuccess(res));
			})			
			.catch(err => console.log(err));
	};
}