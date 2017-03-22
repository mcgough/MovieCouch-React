import React from 'react';

function SearchResults(props) {
	let results = props.results.map((result) =>
		<div className={'search-result'} key={result.imdbID} onClick={() => props.onClick(result.imdbID,result.Poster)}>
			<img src={result.Poster} />
		</div>
	)
	return (
		<div className={'search-results flex'} style={{textAlign: 'center'}}>
			{results}
		</div>
	)
}

export default (
	SearchResults
);