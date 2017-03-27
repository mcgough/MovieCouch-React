import React from 'react';

function SearchResults(props) {
	let results = props.results.map((result) =>
		<div className={'search-result'} key={result.imdbID} onClick={() => props.onClick(result.imdbID,result.Poster)}>
			<div className={'result'} style={{background: `url(${result.Poster})`,backgroundPosition: '50% 50%',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}></div>
		</div>
	)
	return (
		<div className={'search-results flex flex-start'} style={{textAlign: 'center'}}>
			{results}
		</div>
	)
}

export default (
	SearchResults
);