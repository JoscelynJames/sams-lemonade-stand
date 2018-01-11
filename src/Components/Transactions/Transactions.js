import React, { Component } from 'react';
import axios from 'axios';
const devUrl = 'https://g-blockchain-info-api.herokuapp.com/';


class Transactions extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			
		 }
	}

	componentDidMount() {
		axios.get(`${devUrl}rawaddr/${this.props.match.params.address}`)
			.then((res) => {
				console.log(res.data);
			})
	}
	
	render() {
		return (
			<div>
				<h1>This is transactions</h1>
			</div>
		)
	}
}

export default Transactions;