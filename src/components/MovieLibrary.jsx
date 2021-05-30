// implement AddMovie component here
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    const { movies } = this.props;

    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      moviesList: movies,
    };
  }

  textChange = (event) => {
    console.log(event.target.value);
    this.setState({
      searchText: event.target.value,
    });
  }

  markedChange = (event) => {
    this.setState({
      bookmarkedOnly: event.target.checked,
    });
  }

  genreChange = (event) => {
    this.setState({
      selectedGenre: event.target.value,
    });
  }

  filterFavorites = (arr) => {
    const { bookmarkedOnly } = this.state;
    return arr.filter(({ bookmarked }) => bookmarked === bookmarkedOnly);
  }

  filterGenre = (arr) => {
    const { selectedGenre } = this.state;
    return arr.filter(({ genre }) => genre === selectedGenre);
  }

  filterText = (arr) => {
    const { searchText } = this.state;
    return arr.filter(({ title, subtitle, storyline }) => title.includes(searchText)
      || subtitle.includes(searchText) || storyline.includes(searchText));
  }

  addNewMovie = (newMovie) => {
    this.setState((prevState) => ({
      moviesList: [...prevState.moviesList, newMovie],
    }));
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;
    let { moviesList } = this.state;
    if (bookmarkedOnly) moviesList = this.filterFavorites(moviesList);
    if (selectedGenre) moviesList = this.filterGenre(moviesList);
    if (searchText) moviesList = this.filterText(moviesList);
    return (
      <div>
        <h2 className="title-movie-library"> My awesome movie library </h2>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.textChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.markedChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.genreChange }
        />
        <MovieList movies={ moviesList } />
        <AddMovie onClick={ this.addNewMovie } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieLibrary;
