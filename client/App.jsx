import React from 'react';
import axios from 'axios';
import utils from './utils/utils.js';
import TitleBlock from './components/TitleBlock.jsx';
import SearchForm from './components/SearchForm.jsx';
import SearchResults from './components/SearchResults.jsx';
import SelectedResult from './components/SelectedResult.jsx';
import Modal from './components/common/Modal.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import SearchTerms from './components/sidebar/SearchTerms.jsx';
import Favorites from './components/sidebar/Favorites.jsx';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			searchResults: [],
			selected: {},
			selectedSrc: '',
			pastFive: null,
			favorites: null,
			loading: false
		};
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleResultClick = this.handleResultClick.bind(this);
		this.handleSelectedLiked = this.handleSelectedLiked.bind(this);
		this.handleFavoriteClicked = this.handleFavoriteClicked.bind(this);
	}

	componentWillMount() {
		if (utils.storageCheck()) {
			const pastFive = JSON.parse(window.localStorage.getItem('pastFive')),
						favorites = JSON.parse(window.localStorage.getItem('favorites'));
			setTimeout(() => {
				this.setState({
					pastFive: pastFive,
					favorites: favorites
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

	handleResultClick(id,src,liked) {
		this.setState({
			selected: {},
			selectedSrc: src,
			loading: !this.state.loading
		});
		utils.openModal();
		axios.get(`http://www.omdbapi.com/?i=${id}&plot=full`)
		.then((response) => {
			const data = response.data;
			if (liked) {
				data.liked = true;
			}
			this.setState({
				loading: !this.state.loading,
				selected: data
			});
		});
	}

	handleSelectedLiked(title,liked) {
		if (utils.storageCheck()) {
			const favs = this.state.favorites,
						selected = this.state.selected;
			let newFavs;
			if (liked) {
				newFavs = utils.removeFavorite(title,favs);
				selected.liked = false;
			} else {
				newFavs = utils.setFavorite(title,favs);
				selected.liked = true;
			}
			window.localStorage.setItem('favorites',newFavs);
			return this.setState({
				selected: selected,
				favorites: JSON.parse(newFavs)
			});
		}
	}

	handleFavoriteClicked(title) {
		axios.get(`http://www.omdbapi.com/?t=${title}&plot=full`)
		.then((response) => {
			const data = response.data;
			data.liked = true;
			this.setState({
				selectedSrc: data.Poster,
				selected: data
			});
			utils.openModal();
		});
	}

	render() {
		return (
			<div className={'wrapper'}>
				<Sidebar>
					<Favorites favorites={this.state.favorites} onFavoriteClick={this.handleFavoriteClicked} />
					<SearchTerms searchTerms={this.state.pastFive} />
				</Sidebar>
				<TitleBlock copy="Where are you sitting tonight?" title="MovieCouch" />
				<SearchForm onSubmit={this.handleSearchSubmit} />
				<SearchResults results={this.state.searchResults} onClick={this.handleResultClick} favorites={this.state.favorites} />
				<Modal>
					<SelectedResult loading={this.state.loading} content={this.state.selected} src={this.state.selectedSrc} onHeartClick={this.handleSelectedLiked} favorites={this.state.favorites} />
				</Modal>
			</div>
		)
	}

}

