import React from 'react';
import utils from './../utils/utils.js';

function SelectedResult(props) {
	return (
		<div className={'selected-movie flex align-center'} style={{textAlign: 'center'}}>
			<div className={'selected-movie-image'}>
				<img src={props.src} />
			</div>
			<div className={'selected-movie-details'}>
				<h3>{props.content.Title}</h3>
				<p>{utils.checkContent(props.content.Year)}</p>
				<p>{utils.checkContent(props.content.Genre)}</p>
				<p>{utils.checkContent(props.content.Awards)}</p>
				<p>{utils.checkContent(props.content.Actors)}</p>
				<p>{utils.checkContent(props.content.Plot)}</p>
			</div>
		</div>
	);
}

export default (
	SelectedResult
);