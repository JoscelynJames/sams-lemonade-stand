import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchTransactions from '../../store/actions/FetchTransactionsAction';
import axios from 'axios';
import store from '../../index';
import './Transactions.css'
import TransactionCard from './components/TransactionCard';
import loading from '../../loader.gif';
const devUrl = 'https://g-blockchain-info-api.herokuapp.com';

export class Transactions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			BTC_Exchange_Rate: 0,
			loading: true
		};
	}

	componentDidMount() {
		const addresses = this.props.match.params.addr.split(',');
		addresses.forEach((address) => {
			this.addToDatabase(address)
			return this.props.fetchTransactions(address);
		})
		this.getExchangeRate()
	}


	addToDatabase(address) {
		var data = `mutation addNewAddress {
			addAddress(input: { address: "${address}" }) {
				id
			}
		}`

		axios.post(`https://stark-fjord-19348.herokuapp.com/graphql?query=${data}`)
			.catch(err => console.log(err))
	}

	static Loading = () => {
		return (
			<div className="loading">
				<img src={loading} alt="loading" />
			</div>
		)
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
		const data = (`
			mutation addNewAddress { 
				addTransaction(input: {
				amount: "${amount}", 
					address: "${addr}"
				}) { id } 
			}
		`)

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
						{
							address.txs.map((trans, i) => {
								return trans.out.map(tran => {
									if (tran.addr === addr) {
										this.addTransaction(tran.addr, tran.value)
										return (
											<TransactionCard
												key={i}
												address={addr}
												amount={tran.value}
												btcEnchange={this.state.BTC_Exchange_Rate}
											/>
										)
									}
								})
							})
						}
					</div>
				)
			})
		)
	}

	render() {
		return (
			<div className="container">
				<h1 className="important">Current USD value of Bitcoin: ${this.state.BTC_Exchange_Rate}</h1>
				{this.props.loading ? Transactions.Loading() : this.transaction()}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		transactionArrays: state.transactions,
		loading: state.loading
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		fetchTransactions,
	}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Transactions);