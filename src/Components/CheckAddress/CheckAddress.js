import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CheckAddress.css';
const devUrl = 'https://g-blockchain-info-api.herokuapp.com/';

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

	handleAdress(e) {
		e.preventDefault();
		axios.get(`${devUrl}rawaddr/${this.state.address}`)
			.then((res) => {
				console.log(res.data);
			})
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
						<button onClick={(e) => this.handleAdress(e)}>Check Adress</button>
					</div>
				</form>
			</div>
		);
	}
}

export default CheckAddress;