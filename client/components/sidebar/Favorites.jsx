import React from 'react';

function Favorites(props) {
	if (props.favorites) {
		let favorites = props.favorites.map((favorite,index) => {
			return (
				<div className={'favorite'} key={index}>
					<p>{favorite}</p>
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