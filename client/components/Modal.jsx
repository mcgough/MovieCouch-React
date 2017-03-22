import React from 'react';
import utils from './../utils/utils.js';

export default class Modal extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		const el = e.target;
		if ($(el).hasClass('modal-overlay') || $(el).hasClass('close') || $(el).parent().hasClass('close')) {
			$('.modal-overlay').removeClass('open');
			$('body').removeClass('no-scroll');
		}
	}

	render() {
		return (
			<div className={'modal-overlay flex align-center'} onClick={this.handleClick}>
				<div className={'close'} onClick={this.handleClick}>
					<span className={'first'}>&nbsp;</span>
					<span className={'second'}>&nbsp;</span>
				</div>
				{this.props.children}
			</div>
		)
	}
}