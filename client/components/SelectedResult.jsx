import React from 'react';
import Loading from './common/Loading.jsx';
import HeartSVG from './common/HeartSVG.jsx';
import utils from './../utils/utils.js';
import _ from 'lodash';

const SelectedResult = (props) => {
	const empty = _.isEmpty(props.content);
	if (!empty) {
		const genres = props.content.genres.map(genre => <li key={genre.id}>{ genre.name }</li>);
		return (
			<div className={ 'selected-movie flex' } style={{ textAlign: 'center', zIndex: '100' }}>
				<div className={ 'selected-movie-image' }>
					<img src={ `https://image.tmdb.org/t/p/w300${props.content.poster_path}` } style={{ width:'70%', borderRadius: '5px' }}/>
				</div>
				<div className={'selected-movie-details'}>
					<HeartSVG
						liked={ props.content.liked }
						title={ props.content.title }
						movieId={ props.content.id }
						onHeartClick={ props.onHeartClick } />
					<h3>{ props.content.title }</h3>
					<p>{ props.content.overview }</p>
					<div className={ 'sub-details' }>
						<p>{ props.content.release_date }</p>
						<ul>{ genres }</ul>
						<p>{ props.content.Actors }</p>
						<p>{ props.content.Awards }</p>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className={'selected-movie flex align-center'} style={{ textAlign: 'center' }}>
			<div className={'selected-movie-image'}>
				<img src={ props.src } />
			</div>
			<Loading />
		</div>
	);

}

export default (
	SelectedResult
);