import React, { Component } from 'react';
import axios from 'axios';
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
			<div>
				<h1>Current USD value of Bitcoin: ${this.state.BTC_Exchange_Rate}</h1>
				{this.state.addresses.map(address => {
					return (
						<div key={address}>
							<h2>Transactions for {address}</h2>
							{this.state.incomingTrans.map((trans, i) => {
								if (trans.addr === address) {
									return <TransactionCard key={i} address={address} amount={trans.value} btcEnchange={this.state.BTC_Exchange_Rate}/>
								}
							})}
						</div>
					)
				})}
			</div>
		)
	}
}

const TransactionCard = (props) => {
	return (
		<div>
			<h3>amount traded in BTC: {props.amount / 100000000}</h3>
			<h3>amount traded in USD: ${((props.amount / 100000000) * props.btcEnchange).toFixed(2)}</h3>
		</div>
	)
}

export default Transactions;