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
		}
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
				})
		});

	}

	getExchangeRate(addresses) {
		axios.get(`${devUrl}/ticker`)
			.then((res) => {
				this.setState({
					BTC_Exchange_Rate: res.data.USD.last,
					addresses,
				})
			})
	}

	checkTransaction(address, transaction) {
		 return transaction.map(txs => {
			return txs['out'].filter(t => {
				if (t.addr === address) {
					return this.setState({ 
						incomingTrans: [...this.state.incomingTrans, t] 
					})
				}
			})
		})
	}

	render() {
		return (
			<div>
				<h1>Current USD value of Bitcoin: ${this.state.BTC_Exchange_Rate}</h1>
				{/* <h2>Transactions for {this.props.match.params.address} :</h2>
				{this.state.addresses.map((address, i) => {
					console.log(address)
						return (
						<section key={i}>
							<h4>Bitcoin Sent: {address.total_sent / 100000000}</h4>
								<h4>USD Sent: ${((address.total_sent / 100000000 )* this.state.BTC_Exchange_Rate).toFixed(2)}</h4>
						</section>
						)
				})} */}
			</div>
		)
	}
}

export default Transactions;