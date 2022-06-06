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
  };
  marvelService = new MarvelService();
  componentDidMount() {
    this.getCharacters();
  }

  onChars = (characters) => {
    this.setState({ characters, loading: false });
  };
  onError = () => {
    this.setState({ error: true, loading: false });
  };

  getCharacters() {
    this.marvelService
      .getAllCharacters()
      .then((data) => this.onChars(data))
      .catch(this.onError);
  }

  getItems(items) {
    const characters = items.map(({ id, name, thumbnail }) => {
			let imgStyle = {objectFit : 'cover'};
			if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = {objectFit : 'unset'}
			}
      return (
        <li className="char__item" key={id}>
          <img src={thumbnail} alt={name} style={imgStyle}/>
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{characters}</ul>;
  }

  render() {
    const { characters, loading, error } = this.state;
    const items = this.getItems(characters);
    return (
      <div className="char__list">
				{loading ? <Spinner /> : null}
				{error ? <ErrorMessage /> : null}
        {!(loading || error) ? items : null}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
