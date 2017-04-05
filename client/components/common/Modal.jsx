import React from 'react';
import utils from './../../utils/utils.js';

export default class Modal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: props.open
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({
			open: props.open
		});
	}

	handleClick(e) {
		const classNames = e.target.classList;
		console.log(classNames[0]);
		if (classNames[0] !== 'selected-movie-details' && classNames[0] !== undefined) {
			this.setState({
				open: false,
				working: true
			});

		}
	}

	render() {
		const openState = this.state.open;
		let open = '';
		if (openState) {
			open = 'open';
		}
		return (
			<div className={`modal-overlay flex align-center ${open}`} onClick={this.handleClick}>
				<div className={'close'} onClick={this.handleClick}>
					<span className={'first'}>&nbsp;</span>
					<span className={'second'}>&nbsp;</span>
				</div>
				{this.props.children}
			</div>
		)
	}
}