import React from 'react';

function SearchForm(props) {
	return (
		<div className={'search-form'} style={{textAlign: 'center'}}>
			<form onSubmit={props.onSubmit}>
				<input type="text" />
				<button type="submit">SEARCH</button>
			</form>
		</div>
	)
}

export default (
	SearchForm
);