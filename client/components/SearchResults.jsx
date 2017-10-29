import React from 'react';

const SearchResults = (props) => {
	const titles = props.favorites ? props.favorites.map(fav => fav.title) : [];
	const results = props.results.map((result) => {
		if (props.favorites && titles.indexOf(result.title) > -1) {
			return(
				<div
					className={'search-result liked'}
					key={ result.id }
					onClick={ () => props.onClick(result.id ,result.poster_path,true) }>
					<div className={'result'} style={{background: `url(https://image.tmdb.org/t/p/w500${result.poster_path})`,backgroundPosition: '50% 50%',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}></div>
				</div>
			)
		}
		return (
			<div
				className={'search-result'}
				key={ result.id }
				onClick={ () => props.onClick(result.id,result.poster_path,false) }>
				<div className={'result'} style={{background: `url(https://image.tmdb.org/t/p/w500${result.poster_path})`,backgroundPosition: '50% 50%',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}></div>
			</div>
		)
	});
	return (
		<div className={'search-results flex flex-start'} style={{textAlign: 'center'}}>
			{ results }
		</div>
	)
}

export default (
	SearchResults
);