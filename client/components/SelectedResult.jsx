import React from 'react';
import Loading from './common/Loading.jsx';
import utils from './../utils/utils.js';
import _ from 'lodash';

function SelectedResult(props) {
	const empty = _.isEmpty(props.content);
	if (!empty) {
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
	return (
		<div className={'selected-movie flex align-center'} style={{textAlign: 'center'}}>
			<div className={'selected-movie-image'}>
				<img src={props.src} />
			</div>
			<Loading />
		</div>
	);

}

export default (
	SelectedResult
);