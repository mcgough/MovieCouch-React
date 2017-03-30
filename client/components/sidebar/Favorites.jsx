import React from 'react';

function Favorites(props) {
	if (props.favorites) {
		let favorites = props.favorites.map((favorite,index) => {
			return (
				<div className={'favorite'} key={index}>
					<p onClick={() => { props.onFavoriteClick(favorite) }} className={'favorite-title'} data-title={favorite}>{favorite}</p>
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
		null
	);
}

export default (
	Favorites
);