import React from 'react';
import axios from 'axios';
import utils from './utils/utils.js';
import TitleBlock from './components/TitleBlock.jsx';
import SearchForm from './components/SearchForm.jsx';
import SearchResults from './components/SearchResults.jsx';
import SelectedResult from './components/SelectedResult.jsx';
import Modal from './components/common/Modal.jsx';
import SearchTerms from './components/sidebar/SearchTerms.jsx';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			searchResults: [],
			selected: {},
			selectedSrc: '',
			pastFive: null,
			loading: false
		};
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleResultClick = this.handleResultClick.bind(this);
	}

	componentWillMount() {
		if (utils.storageCheck()) {
			const pastFive = JSON.parse(window.localStorage.getItem('pastFive'));
			setTimeout(() => {
				this.setState({
					pastFive: pastFive
				});
			});
		}
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
			if (utils.storageCheck() && results.length > 0) {
				const arr = this.state.pastFive,
							newArr = utils.setSearchTerms(searchTerm, arr);
				window.localStorage.setItem('pastFive', newArr);
				this.setState({
					pastFive: JSON.parse(newArr)
				});
			}
		});
	}

	handleResultClick(id,src) {
		this.setState({
			selected: {},
			selectedSrc: src,
			loading: !this.state.loading
		});
		$('body').addClass('no-scroll');
		$('.modal-overlay').addClass('open');
		axios.get(`http://www.omdbapi.com/?i=${id}&plot=full`)
		.then((response) => {
			const data = response.data;
			this.setState({
				loading: !this.state.loading,
				selected: data
			});
		});
	}

	render() {
		return (
			<div className={'wrapper'}>
				<SearchTerms searchTerms={this.state.pastFive} />
				<TitleBlock copy="Where are you sitting tonight?" title="MovieCouch" />
				<SearchForm onSubmit={this.handleSearchSubmit} />
				<SearchResults results={this.state.searchResults} onClick={this.handleResultClick} />
				<Modal>
					<SelectedResult loading={this.state.loading} content={this.state.selected} src={this.state.selectedSrc} />
				</Modal>
			</div>
		)
	}

}

