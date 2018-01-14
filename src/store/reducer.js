const initalState = {
	transactions: []
}

const reducer = (state = initalState, action) => {
	if (action.type === 'FETCH_TRANSACTIONS_SUCCESS') {
		return {
			...state,
			transactions: [...state.transactions, action.body.data.txs]
		};
	}

	return state;
}

export default reducer;