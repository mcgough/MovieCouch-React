import React from 'react';

function SearchTerms(props) {
	if (props.searchTerms) {
		let searchTerms = props.searchTerms.map((term,index) => {
			return (
				<div className={'term'} key={index}>
					<p>{term}</p>
				</div>
			)
		});
		return (
			<section className={'search-terms'}>
				<h3>Past 5 Searches</h3>
				{searchTerms}
			</section>
		)
	}
	return null;

}

export default (
	SearchTerms
);