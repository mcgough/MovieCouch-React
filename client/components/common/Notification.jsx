import React from 'react';

export default class Notification extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notification: {
				copy: props.alert.copy,
				status: props.alert.status
			}
		};
		this.handleNotificationTimeout = this.handleNotificationTimeout.bind(this);
	}

	componentWillReceiveProps(props) {
		const notificationState = this.state.notification,
					notificationProps = props.alert;
		if (notificationState.copy !== notificationProps.copy) {
			this.setState({
				notification: {
					copy: props.alert.copy,
					status: props.alert.status
				}
			});
			this.handleNotificationTimeout(props);

		}
	}

	handleNotificationTimeout(props) {
		setTimeout(() => {
			this.setState({
				notification: {
					copy: props.alert.copy,
					status: ''
				}
			});
		},1000);
	}

	render() {
		if (this.state.status !== '') {
			return (
				<div className={`notification ${this.state.notification.status}`}>
					<p>{this.state.notification.copy}</p>
				</div>
			);
		}
		return null
	}
}