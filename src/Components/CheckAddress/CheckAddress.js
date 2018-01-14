import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

	fetchTransactions(addresses) {
		addresses.forEach((address) => {
			return this.props.fetchTransactions(address);
		})
	
		this.props.history.push('./transactions');
	}

	render() {
		return (
			<div className="form">
				<form>

					<div>
						<h3>Enter your public address or addresses here seperated by comma</h3>
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
