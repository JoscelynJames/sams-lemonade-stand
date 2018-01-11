import React, {Component} from 'react';
import './CheckAddress.css';
import Transactions from '../Transactions/Transactions';

class CheckAddress extends Component {
	constructor(props) {
		super(props);

		this.state = {
			address: '',
		};
	}

	handleInput() {
		let address = document.getElementsByClassName('adress-input')[0].value;
		this.setState({ address })
	}


	render() {
		return (
			<div className="form">
				<form>
					<input 
						onChange={() => this.handleInput()} 
						type="text" 
						className="adress-input" 
						placeholder="14EunREvgpgMZ4ivRbzLwMn4mH2k5FsWL2">
					</input>
					<div>
						<a href={`/transactions/${this.state.address}`} className="button" >Check Adress</a>
					</div>
				</form>
			</div>
		);
	}
}

export default CheckAddress;