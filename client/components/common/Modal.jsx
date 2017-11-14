import React from 'react';
import utils from './../../utils/utils';

export default class Modal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: props.open,
			background: null,
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	componentWillReceiveProps(props) {
		const { open, background } = props;
		const backgroundImage = new Image();
		if (background !== undefined) {
			backgroundImage.src = `https://image.tmdb.org/t/p/w1000${background}`;
			return backgroundImage.onload = (() => {
				this.setState({ open, background: backgroundImage.src });
			});
		}
		return this.setState({ open, background: null });
	}

	handleClick(e) {
		const [className] = e.target.classList;
		const overlayClick = className !== 'selected-movie-details' && className !== undefined;
		return overlayClick ?	this.setState({ open: false, background: null }) : null;
	}

	render() {
		const	body = document.querySelector('body');
		let open = '';
		body.classList.remove('no-scroll');
		if (this.state.open) {
			body.classList.add('no-scroll');
			open = 'open';
		}
		if (this.state.background) {
			return (
				<div className={'modal flex align-center'}>
					<div
						className={`modal-overlay ${open}`}
						style={{ 
							backgroundImage: `url(${this.state.background})`,
							backgroundRepeat: 'no-repeat',
							backgroundPosition: '50% 50%',
							backgroundSize: 'cover',
						}}
						onClick={ this.props.onClose }>
						<div className={'close'} onClick={ this.props.onClose }>
							<span className={'first'}>&nbsp;</span>
							<span className={'second'}>&nbsp;</span>
						</div>
					</div>
					{this.props.children}
				</div>
			)
		}
		return null;
	}
}