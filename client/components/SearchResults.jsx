import React from 'react';

const createImagePromise = (src) => {
	return new Promise((resolve, reject) => {
		let image = new Image();
		image.src = `https://image.tmdb.org/t/p/w300${src}`;
		image.onload = (() => { resolve(image); });
	});
};

const SearchResults = (props) => {
	if (props.results.length) {
		const favoriteTitles = props.favorites ? props.favorites.map(fav => fav.title) : [];
		const results = props.results.map((result) => {
			const resultStyle = {
				background: `url(https://image.tmdb.org/t/p/w500${result.poster_path})`,
				backgroundPosition: '50% 50%',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'						
			};
			if (favoriteTitles.indexOf(result.title) > -1) {
				return (
					<div
						className={'search-result liked'}
						key={ result.id }
						onClick={ () => props.onClick(result.id, result.poster_path, true) }>
						<div className={'result'} style={ resultStyle }></div>
					</div>
				)
			}
			return (
				<div
					className={'search-result'}
					key={ result.id }
					onClick={ () => props.onClick(result.id, result.poster_path, false) }>
					<div className={'result'} style={ resultStyle }></div>
				</div>
			)
		});
		return (
			<div className={'search-results'} style={{ textAlign: 'center' }}>
				{ results }
			</div>
		)
	} else {
		return null;
	}
}

export default (
	SearchResults
);