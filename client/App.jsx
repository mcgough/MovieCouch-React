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
import Notification from './components/common/Notification.jsx';

export default class App extends React.Component {

	constructor() {
		super();
		this.state = {
			searchResults: [],
			selected: {},
			selectedSrc: '',
			pastFive: null,
			favorites: null,
			loading: false,
			modal: false,
			notification: {
				status: '',
				copy: ''
			}
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
			return setTimeout(() => {
				this.setState({
					pastFive: pastFive,
					favorites: favorites
				});
			});
		}
	}

	handleSearchSubmit(e) {
		e.preventDefault();
		const input = document.querySelector('.search-form input');
		axios.get(`https://www.omdbapi.com/?s=${input.value}&type=movie`)
		.then((response) => {
			const results = utils.filterResults(response.data.Search);
			if (results.length > 0) {
				if (utils.storageCheck()) {
					const arr = this.state.pastFive,
								newArr = utils.setSearchTerms(input.value, arr);
					window.localStorage.setItem('pastFive', newArr);
					this.setState({
						searchResults: results,
						selected: {},
						selectedSrc: '',
						pastFive: JSON.parse(newArr),
						modal: false
					});
				} else {
					this.setState({
						searchResults: results,
						selected: {},
						selectedSrc: ''
					});
				}

			} else {
				this.setState({
					notification: {
						copy: `No movies were found with the title "${input.value}"`,
						status: 'danger'
					},
					searchResults: [],
					selected: {},
					selectedSrc: '',
					modal: false
				});
			}
			return input.value = '';
		});
	}

	handleResultClick(id,src,liked) {
		this.setState({
			selected: {},
			selectedSrc: src,
			loading: !this.state.loading
		});
		this.setState({
			modal: true
		});
		axios.get(`https://www.omdbapi.com/?i=${id}&plot=full`)
		.then((response) => {
			const data = response.data;
			if (liked) {
				data.liked = true;
			}
			return this.setState({
				loading: !this.state.loading,
				selected: data
			});
		});
	}

	handleSelectedLiked(title,liked) {
		if (utils.storageCheck()) {
			const favs = this.state.favorites,
						selected = this.state.selected,
						notification = this.state.notification;
			let newFavs;
			if (liked) {
				newFavs = utils.removeFavorite(title,favs);
				selected.liked = false;
				notification.status = 'danger';
				notification.copy = `${title} IS NOT a FAVORITE`;
			} else {
				newFavs = utils.setFavorite(title,favs);
				selected.liked = true;
				notification.status = 'success';
				notification.copy = `${title} IS now a FAVORITE`;
			}
			window.localStorage.setItem('favorites',newFavs);
			return this.setState({
				selected: selected,
				favorites: JSON.parse(newFavs),
				notification: notification
			});
		}
	}

	handleFavoriteClicked(title) {
		axios.get(`https://www.omdbapi.com/?t=${title}&plot=full`)
		.then((response) => {
			const data = response.data;
			data.liked = true;
			return this.setState({
				selectedSrc: data.Poster,
				selected: data,
				modal: true
			});
		});
	}

	render() {
		return (
			<div className={'wrapper'}>
				<Sidebar>
					<Favorites favorites={this.state.favorites} onFavoriteClick={this.handleFavoriteClicked} />
					<SearchTerms searchTerms={this.state.pastFive} />
				</Sidebar>
				<TitleBlock copy="" title="MovieCouch" />
				<SearchForm onSubmit={this.handleSearchSubmit} />
				<SearchResults results={this.state.searchResults} onClick={this.handleResultClick} favorites={this.state.favorites} />
				<Modal open={this.state.modal}>
					<SelectedResult loading={this.state.loading} content={this.state.selected} src={this.state.selectedSrc} onHeartClick={this.handleSelectedLiked} favorites={this.state.favorites} />
				</Modal>
				<Notification alert={this.state.notification}/>
			</div>
		)
	}

}

