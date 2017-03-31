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
		const open = this.state.open;
		if (open) {
			return this.setState({
				open: false
			});
		}
		return this.setState({
			open: true
		});
	}

	render() {
		let open = '';
		if (this.state.open) {
			open = 'open';
		}
		return (
			<div className={`sidebar-container ${open}`}>
				<div className={'hamburger'} onClick={this.handleHamburgerClick}>
					<span className={'first'}>&nbsp;</span>
					<span className={'middle'}>&nbsp;</span>
					<span className={'last'}>&nbsp;</span>
				</div>
				<div className={'sidebar-content'}>
					{this.props.children}
				</div>
			</div>
		)
	}
}