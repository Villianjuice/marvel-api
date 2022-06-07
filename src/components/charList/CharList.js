import PropTypes from 'prop-types' 
import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
    newItemsLoading: false,
    offset: 300,
    charsEnded: false
  };
  marvelService = new MarvelService();
  componentDidMount() {
    this.onRequest();
  }

  onCharsLoaded = (newCharacters) => {
    let ended = false
    if (newCharacters.length < 9) {
      ended = true
    }
    this.setState(({characters, offset}) => (
      {
        characters: [...characters, ...newCharacters],
        loading: false,
        newItemsLoading: false,
        offset: offset + 9,
        charsEnded: ended
      }
    ));
  };
  onError = () => {
    this.setState({ error: true, loading: false });
  };
  onCharsLoading = () => {
    this.setState({ newItemsLoading: true });
  };
  onRequest = (offset) => {
    this.onCharsLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  getItems(items) {
    const characters = items.map(({ id, name, thumbnail }) => {
      let imgStyle = { objectFit: 'cover' };
      if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'unset' };
      }
      return (
        <li onClick={() => this.props.onCharSelected(id)} className="char__item" key={id}>
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{characters}</ul>;
  }

  render() {
    const { characters, loading, error, newItemsLoading, offset, charsEnded } = this.state;
    const items = this.getItems(characters);
    return (
      <div className="char__list">
        {loading ? <Spinner /> : null}
        {error ? <ErrorMessage /> : null}
        {!(loading || error) ? items : null}
        <button
          style={{display: charsEnded ? 'none' : 'block'}}
          disabled={newItemsLoading}
          onClick={() => this.onRequest(offset)}
          className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList;
