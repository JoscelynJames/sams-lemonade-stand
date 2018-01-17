import React from 'react';

const TransactionCard = (props) => {
	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	const btc = props.amount / 100000000;
	const usd = (btc * props.btcEnchange).toFixed(2)
	return (
		<div className="trans container">
			<h3 className="amount">Amount in BTC: {btc}</h3>
			<h3 className="amount">Amount in USD: ${numberWithCommas(usd)}</h3>
		</div>
	)
}

export default TransactionCard;