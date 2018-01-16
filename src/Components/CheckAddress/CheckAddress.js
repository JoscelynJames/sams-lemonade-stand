import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import fetchTransactions from '../../store/actions/FetchTransactionsAction';
import './CheckAddress.css';

class CheckAddress extends Component {
	constructor(props) {
		super(props);

		this.state = {
			addresses: [],
		};
	}

	handleInput() {
		let addresses = document.getElementsByClassName('adress-input')[0].value.split(',');
		this.setState({ addresses });
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

	fetchTransactions(addresses) {
		addresses.forEach((address) => {
			this.addToDatabase(address)
			return this.props.fetchTransactions(address);
		})
		
		this.props.history.push('./transactions');
	}

	render() {
		return (
			<div className="form">
				<form>

					<div>
						<h3>Enter public address, if more than one seperate by commas</h3>
					</div>

					<div>
						<input 
							onChange={() => this.handleInput()} 
							type="text" 
							className="adress-input" 
							placeholder="14EunREvgpgMZ4ivRbzLwMn4mH2k5FsWL2">
						</input>
					</div>

					<div className="button-container">
						<a onClick={() => this.fetchTransactions(this.state.addresses)} className="button" >Check Adress</a>
					</div>

				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		fetchTransactions,
	}, dispatch)
}
// test addresses 
// 1CVM9S4udKbpAAukTR5YMJi2FEqZHRdJdC, 1HzBaXgBZd9q8o7s6ZfEimQe6sxjtiJDC5, 1Gr7LgKdyMZ3pGbmxFyXC2L61PpALokX7U <--- lots of trans

export default connect(null, mapDispatchToProps)(CheckAddress);
