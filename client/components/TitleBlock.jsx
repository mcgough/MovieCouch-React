import React from 'react';

const TitleBlock = (props) => {
	return (
		<div className={ 'title-block' } style={{ textAlign: 'center' }}>
			<h1>{ props.title }</h1>
			<h3>{ props.copy || '' }</h3>
		</div>
	)
}

export default (
	TitleBlock
);