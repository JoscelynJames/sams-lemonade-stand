import React, { Component } from 'react';
import lemon from '../../low_poly_lemon.png';
import './Nav.css'

class Nav extends Component {

	handleClick() {
		this.props.history.push('./');
	}

	render() {
		return (
			<div className="nav">
				<div>
					<img className="lemon" src={lemon} alt="" />
				</div>

				<div className="name">
					<h3 onClick={() => this.handleClick()} >Sam's Lemonade</h3>
				</div>

			</div>
		)
	}
}

export default Nav;