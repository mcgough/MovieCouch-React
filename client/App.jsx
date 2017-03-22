import React from 'react';
import axios from 'axios';
import utils from './utils/utils.js';
import TitleBlock from './components/TitleBlock.jsx';
import SearchForm from './components/SearchForm.jsx';
import SearchResults from './components/SearchResults.jsx';
import SelectedResult from './components/SelectedResult.jsx';
import Modal from './components/Modal.jsx';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			searchResults: [],
			selected: {},
			selectedSrc: ''
		};
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleResultClick = this.handleResultClick.bind(this);
	}

	componentWillMount() {
		//___MAYBE ADD SOME FUNCTIONALITY HERE e.g. prev searches or selected movies
	}

	handleSearchSubmit(e) {
		e.preventDefault();
		const searchTerm = document.querySelector('.search-form input').value;
		axios.get(`http://www.omdbapi.com/?s=${searchTerm}&type=movie`)
		.then((response) => {
			const results = utils.filterResults(response.data.Search);
			this.setState({
				searchResults: results,
				selected: {}
			});
			if ( results.length > 0 && typeof(Storage) !== undefined) {
				window.localStorage.setItem('prevSearch',searchTerm);
			}
		});
	}

	handleResultClick(id,src) {
		this.setState({
			selected: {},
			selectedSrc: src
		});
		$('body').addClass('no-scroll');
		$('.modal-overlay').addClass('open');
		axios.get(`http://www.omdbapi.com/?i=${id}&plot=full`)
		.then((response) => {
			const data = response.data;
			this.setState({
				selected: data
			});
		});
	}

	render() {
		return (
			<div className={'wrapper'}>
				<TitleBlock copy="Where are you sitting tonight?" title="MovieCouch" />
				<SearchForm onSubmit={this.handleSearchSubmit} />
				<SearchResults results={this.state.searchResults} onClick={this.handleResultClick} />
				<Modal>
					<SelectedResult content={this.state.selected} src={this.state.selectedSrc} />
				</Modal>
			</div>
		)
	}

}

