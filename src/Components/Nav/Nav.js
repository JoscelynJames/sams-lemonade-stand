import React, { Component } from 'react';
import lemon from '../../low_poly_lemon.png';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import resetState from '../../store/actions/ResetState';
import './Nav.css'

class Nav extends Component {

	handleClick() {
		this.props.history.push('/');
		this.props.resetState()
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

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		resetState,
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(Nav);