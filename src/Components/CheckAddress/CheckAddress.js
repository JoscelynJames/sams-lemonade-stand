import React, {Component} from 'react';
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

	handleClick(addresses) {
		this.props.history.push(`./transactions/${addresses}`);
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
						<a onClick={() => this.handleClick(this.state.addresses)} className="button" >Check Adress</a>
					</div>
				</form>
			</div>
		);
	}
}

export default CheckAddress;
