// implement AddMovie component here
import React from 'react';
import PropTypes from 'prop-types';
import TitleInput from './TitleInput';
import SubtitleInput from './SubtitleInput';
import ImageInput from './ImageInput';
import StorylineInput from './StorylineInput';
import RatingInput from './RatingInput';
import GenreInput from './GenreInput';

const INITIAL_STATE = {
  subtitle: '',
  title: '',
  imagePath: '',
  storyline: '',
  rating: 0,
  genre: 'action',
};

class AddMovie extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick = () => {
    const { onClick } = this.props;
    onClick(this.state);
    this.setState(INITIAL_STATE);
  }

  render() {
    const { subtitle, title, imagePath, storyline, rating, genre } = this.state;
    return (
      <div className="add-movie-area">
        <form data-testid="add-movie-form">
          <div>
            <TitleInput value={ title } onChange={ this.handleChange } />
            <SubtitleInput value={ subtitle } onChange={ this.handleChange } />
            <ImageInput value={ imagePath } onChange={ this.handleChange } />
          </div>
          <div>
            <StorylineInput value={ storyline } onChange={ this.handleChange } />
            <RatingInput value={ rating } onChange={ this.handleChange } />
            <GenreInput value={ genre } onChange={ this.handleChange } />
          </div>
        </form>
        <button type="submit" data-testid="send-button" onClick={ this.handleClick }>
          Adicionar filme
        </button>
      </div>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddMovie;
