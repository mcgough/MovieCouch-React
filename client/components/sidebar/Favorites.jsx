import React from 'react';

function Favorites(props) {
	if (props.favorites !== null && props.favorites.length > 0) {
		let favorites = props.favorites.map((favorite,index) => {
			return (
				<div className={'favorite'} key={index}>
					<p onClick={() => { props.onFavoriteClick(favorite.id) }} className={'favorite-title'} data-title={favorite.title}>{favorite.title}</p>
				</div>
			)
		});
		return (
			<section className={'favorites'}>
				<h3>Favorites</h3>
				{favorites}
			</section>
		);
	}
	return (
		<section className={'favorites'}>
			<h3>Favorites</h3>
			<p>- No Movies Favorited -</p>
		</section>
	);
}

export default (
	Favorites
);