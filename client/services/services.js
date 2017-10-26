import apiKey from './../api/keys';

const services = {
  searchQuery(searchTerm) {
    return `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}&language=en-US&page=1&include_adult=false`;
  },
};

export default services;