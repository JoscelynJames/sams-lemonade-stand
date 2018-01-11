import React, { Component } from 'react';
import axios from 'axios';
const devUrl = 'https://g-blockchain-info-api.herokuapp.com/';

class Transactions extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			address: '',
			totalSentInBTC: 0,
			BTC_Exchange_Rate: 0,
		}
	}

	componentDidMount() {
		axios.get(`${devUrl}multiaddr?active=${this.props.match.params.address}`)
			.then((res) => {
				console.log(res.data);
				this.setState({ address: res.data.addresses[0].address, totalSentInBTC: res.data.addresses[0].total_sent / 100000000 })
			})

		axios.get(`${devUrl}ticker`)
			.then((res) => {
				console.log(res.data.USD)
				this.setState({ BTC_Exchange_Rate: res.data.USD.last })
			})
	}
	
	render() {
		return (
			<div>
				<h1>Current USD value of Bitcoin: ${this.state.BTC_Exchange_Rate}</h1>
				<section>
					<h1>Transactions for {this.state.address} :</h1>
					<h4>Bitcoin Sent: {this.state.totalSentInBTC}</h4>
					<h4>USD Sent: ${(this.state.totalSentInBTC * this.state.BTC_Exchange_Rate).toFixed(2)}</h4>
				</section>
			</div>
		)
	}
}

export default Transactions;