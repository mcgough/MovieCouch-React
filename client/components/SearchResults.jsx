import React from 'react';

function SearchResults(props) {
	let results = props.results.map((result) => {
		if (props.favorites !== null && props.favorites.indexOf(result.Title) > -1) {
			return(
				<div className={'search-result liked'} key={result.imdbID} onClick={() => props.onClick(result.imdbID,result.Poster,true)}>
					<div className={'result'} style={{background: `url(${result.Poster})`,backgroundPosition: '50% 50%',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}></div>
				</div>
			)
		}
		return (
			<div className={'search-result'} key={result.imdbID} onClick={() => props.onClick(result.imdbID,result.Poster,false)}>
				<div className={'result'} style={{background: `url(${result.Poster})`,backgroundPosition: '50% 50%',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}></div>
			</div>
		)
	});
	return (
		<div className={'search-results flex flex-start'} style={{textAlign: 'center'}}>
			{results}
		</div>
	)
}

export default (
	SearchResults
);