import React, { Component } from 'react';
import axios from 'axios';
import './Transactions.css'
const devUrl = 'https://g-blockchain-info-api.herokuapp.com';

class Transactions extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			BTC_Exchange_Rate: 0,
			addresses: [],
			incomingTrans: [],
		};
	}

	componentWillMount() {
		const addresses = this.props.match.params.addresses.split('|');

		this.getTransactions(addresses);
		this.getExchangeRate(addresses);
	}
	
	getTransactions(addresses) {
		addresses.forEach(address => {
			axios.get(`${devUrl}/rawaddr/${address}`)
				.then((res) => {
				this.checkTransaction(address, res.data.txs)
				});
		});
	}

	getExchangeRate(addresses) {
		axios.get(`${devUrl}/ticker`)
			.then((res) => {
				this.setState({
					BTC_Exchange_Rate: res.data.USD.last,
					addresses,
				});
			});
	}

	checkTransaction(address, transactions) {
		 return transactions.map(transaction => {
			return transaction['out'].filter(t => {
				if (t.addr === address) {
					return this.setState({ 
						incomingTrans: [...this.state.incomingTrans, t] 
					});
				}
			});
		});
	}

	render() {
		return (
			<div className="container">
				<h1 className="important">Current USD value of Bitcoin: ${this.state.BTC_Exchange_Rate}</h1>
				{this.state.addresses.map(address => {
					return (
						<div className="addr container" key={address}>
							<h2 className="heading">{address}</h2>
							{this.state.incomingTrans.map((trans, i) => {
								if (trans.addr === address) {
									return (
									<TransactionCard 
										key={i} 
										address={address} 
										amount={trans.value} 
										btcEnchange={this.state.BTC_Exchange_Rate}/>
									)
								}
							})}
						</div>
					)
				})}
			</div>
		)
	}
}

const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TransactionCard = (props) => {
	const btc = props.amount / 100000000;
	const usd = (btc * props.btcEnchange).toFixed(2)
	return (
		<div className="trans container">
			<h3 className="amount">Amount in BTC: {btc}</h3>
			<h3 className="amount">Amount in USD: ${numberWithCommas(usd)}</h3>
		</div>
	)
}

export default Transactions;