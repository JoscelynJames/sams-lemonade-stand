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
		let address = document.getElementsByClassName('adress-input')[0].value.replace(/, /g, "/");
		console.log(address)
		this.setState({ address })
	}


	render() {
		return (
			<div className="form">
				<form>
					<h3>Enter up to 2 public addresses here seperated by a comma</h3>
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

// test addresses 
// 1CVM9S4udKbpAAukTR5YMJi2FEqZHRdJdC, 1HzBaXgBZd9q8o7s6ZfEimQe6sxjtiJDC5, 1Gr7LgKdyMZ3pGbmxFyXC2L61PpALokX7U <--- lots of trans

export default CheckAddress;