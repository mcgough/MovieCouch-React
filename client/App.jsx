import React from 'react';
import axios from 'axios';
import _ from './utils/utils';
import TitleBlock from './components/TitleBlock.jsx';
import SearchForm from './components/SearchForm.jsx';
import SearchResults from './components/SearchResults.jsx';
import SelectedResult from './components/SelectedResult.jsx';
import Modal from './components/common/Modal.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import SearchTerms from './components/sidebar/SearchTerms.jsx';
import Favorites from './components/sidebar/Favorites.jsx';
import Notification from './components/common/Notification.jsx';
import apiKey from './api/keys';
import services from './services/services';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchResults: [],
			selected: {},
			selectedSrc: '',
			pastFive: [],
			favorites: [],
			loading: false,
			modal: false,
			sidebar: false,
			notification: { status: '', copy: '' },
		};
		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.handleResultClick = this.handleResultClick.bind(this);
		this.handleSelectedLiked = this.handleSelectedLiked.bind(this);
		this.handleFavoriteClicked = this.handleFavoriteClicked.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.createImagePromise = this.createImagePromise.bind(this);
	}

	componentWillMount() {
		if (_.storageCheck()) {
			const pastFive = JSON.parse(localStorage.getItem('pastFive')) || [];
			const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
			return setTimeout(() => {
				this.setState({ pastFive, favorites });
			});
		}
	}

	createImagePromise(src) {
		return new Promise((resolve, reject) => {
			let image = new Image();
			image.src = `https://image.tmdb.org/t/p/w300${src}`;
			image.onload = (() => { resolve(image); });
		});
	}
	async handleSearchSubmit(searchTerm) {
		const response = await axios.get(services.searchQuery(searchTerm));
		const searchResults = response.data.results.filter(movie => movie.poster_path);
		if (searchResults.length) {
			const loadedImages = searchResults.map(result => this.createImagePromise(result.poster_path));
			let { pastFive } = this.state;
			pastFive = _.setSearchTerms(searchTerm, pastFive);
			localStorage.setItem('pastFive', JSON.stringify(pastFive));
			await Promise.all(loadedImages);
			return this.setState(Object.assign({}, this.state, {
				searchResults,
				pastFive,
				selected: {},
				selectedSrc: '',
				modal: false,
			}));
		}
		return this.setState({
			notification: {
				copy: `No movies were found with the title "${searchTerm}"`,
				status: 'danger'
			},
			searchResults: [],
			selected: {},
			selectedSrc: '',
			modal: false
		});
	}
	async handleResultClick(id, src, liked) {
		this.setState({
			selected: {},
			selectedSrc: src,
			loading: !this.state.loading
		});
		const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
		const { data } = response;
		data.liked = liked ? true : false;
		return this.setState({ loading: !this.state.loading, selected: data, modal: true });
	}
	handleSelectedLiked(movieData, liked) {
		if (_.storageCheck()) {
			let selected = Object.assign({}, this.state.selected);
			let notification = Object.assign({}, this.state.notification);
			let favorites = this.state.favorites.slice();
			if (liked) {
				favorites = favorites.filter(movie => movie.title !== movieData.title);
				selected.liked = false;
				notification.status = 'danger';
				notification.copy = `${movieData.title} IS NOT a FAVORITE`;
			} else {
				favorites.unshift(movieData);
				selected.liked = true;
				notification.status = 'success';
				notification.copy = `${movieData.title} IS now a FAVORITE`;
			}
			localStorage.setItem('favorites',JSON.stringify(favorites));
			return this.setState({
				selected,
				favorites,
				notification,
			});
		}
	}
	async handleFavoriteClicked(id) {
		const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
		const { data } = response;
		return this.setState({
			selectedSrc: data.poster_path,
			selected: Object.assign({}, data, { liked: true }),
			modal: true
		});
	}
	handleModalClose() {
		return this.setState(Object.assign({}, this.state, { modal: false, selected: {} }));
	}

	render() {
		return (
			<div className={'wrapper'}>
				<Sidebar open={ this.state.sidebar }>
					<Favorites
						favorites={ this.state.favorites }
						onFavoriteClick={ this.handleFavoriteClicked } />
					<SearchTerms searchTerms={ this.state.pastFive } />
				</Sidebar>
				<main>
					<TitleBlock copy="" title="MovieCouch" />
					<SearchForm onSubmit={ this.handleSearchSubmit } />
					<SearchResults
						results={ this.state.searchResults }
						images={ this.state.loadedImages }
						onClick={ this.handleResultClick }
						favorites={ this.state.favorites } />
				</main>
				<Modal
					open={ this.state.modal }
					onClose={ this.handleModalClose }
					background={ this.state.selected.backdrop_path }>
					<SelectedResult 
						loading={ this.state.loading } 
						content={ this.state.selected } 
						src={ this.state.selectedSrc } 
						onHeartClick={ this.handleSelectedLiked } 
						favorites={ this.state.favorites } />
				</Modal>
				<Notification alert={this.state.notification} />
			</div>
		)
	}

}

