const initalState = {
	transactions: [],
	loading: true
}

const reducer = (state = initalState, action) => {
	if (action.type === 'FETCH_TRANSACTIONS_SUCCESS') {
		return {
			...state,
			transactions: [...state.transactions, action.body.data]
		};
	}

	if (action.type === 'SET_LOADING_STATE') {
		return {
			...state,
			loading: action.body
		}
	}

	return state;
}

export default reducer;