import React from 'react';

export default class SearchForm extends React.Component {
	constructor(props) {
		super();
		this.state = {
			input: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ input: e.target.value });
	}

	render() {
		return (
			<div className={ 'search-form' } style={ { textAlign: 'center' } }>
				<form onSubmit={ e => (
					e.preventDefault(),
					this.props.onSubmit(this.state.input),
					this.state.input = '' )}>
					<input 
						type="text"
						value={ this.state.input }
						onChange={ this.handleChange }
						placeholder="Search by Title" />
					<button type="submit">SEARCH</button>
				</form>
			</div>			
		)
	}
};