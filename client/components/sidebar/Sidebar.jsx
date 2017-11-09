import React from 'react';
import utils from './../../utils/utils.js';

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
		this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
	}

	handleHamburgerClick() {
		return this.state.open ? this.setState({ open: false }) : this.setState({ open: true });
	}

	render() {
		return (
			<div className={`sidebar-container ${this.state.open ? 'open' : ''}`}>
				<div className={'hamburger'} onClick={ this.handleHamburgerClick }>
					<span className={'first'}>&nbsp;</span>
					<span className={'middle'}>&nbsp;</span>
					<span className={'last'}>&nbsp;</span>
				</div>
				<div className={'sidebar-content'}>
					{ this.props.children }
				</div>
			</div>
		)
	}
}