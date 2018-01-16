import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from '../../index';
import './Transactions.css'
import loading from '../../loader.gif'
const devUrl = 'https://g-blockchain-info-api.herokuapp.com';

class Transactions extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			BTC_Exchange_Rate: 0,
			loading: true
		};
	}

	componentWillMount() {
		store.subscribe(() => {
			store.getState()
		})
		this.getExchangeRate();
	}

	getExchangeRate() {
		axios.get(`${devUrl}/ticker`)
			.then((res) => {
				this.setState({
					BTC_Exchange_Rate: res.data.USD.last,
				});
			});
	}

	addTransaction(addr, amount) {
		const data = `
		mutation addNewAddress { 
  		addTransaction(input: {
   		 amount: "${amount}", 
    		address: "${addr}"
  		}) { id } 
		}`

		axios.post(`https://stark-fjord-19348.herokuapp.com/graphql?query=${data}`)
		.catch(err => console.log(err))
	}

	transaction() {
		return (
			this.props.transactionArrays.map(address => {
				const addr = address.address
				return (
					<div className="addr container" key={addr}>
						<h2 className="heading">{addr}</h2>
						{address.txs.map((trans, i) => {
							return trans.out.map(tran => {
								if (tran.addr === addr) {
									this.addTransaction(tran.addr, tran.value)
										return (
											<TransactionCard
											key={i}
											address={addr}
											amount={tran.value}
											btcEnchange={this.state.BTC_Exchange_Rate} />
										)
									}
								})
							})}
						</div>
				)
			})
		)
	}

	render() {
		return (
			<div className="container">
				<h1 className="important">Current USD value of Bitcoin: ${this.state.BTC_Exchange_Rate}</h1>
				{this.props.loading 
					? < Loading />
					: this.transaction()
					}
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

const Loading = () => {
	return (
		<div className="loading">
			<img src={loading} alt="loading" />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		transactionArrays: state.transactions,
		loading: state.loading
	}
}

export default connect(mapStateToProps)(Transactions);