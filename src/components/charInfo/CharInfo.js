import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
  marService = new MarvelService();
  state = {
    char: null,
    loading: false,
    error: false,
  };
  componentDidMount() {
    this.updateChar();
  }
  componentDidUpdate(prevProp) {
    if (this.props.charSelected !== prevProp.charSelected) {
      this.updateChar();
    }
  }
  onChar = (char) => {
    this.setState({ char, loading: false });
  };
  onError = () => {
    this.setState({ error: true, loading: false });
  };
  onCharLoad = () => {
    this.setState({ loading: true });
  };
  updateChar() {
    const { charSelected } = this.props;
    if (!charSelected) {
      return;
    }

    this.onCharLoad();

    this.marService
      .getCharacter(charSelected)
      .then((char) => {
        this.onChar(char);
      })
      .catch(this.onError);
  }
  render() {
    const { char, loading, error } = this.state;

    const skeleton = char || loading || error ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {spinner}
        {errorMessage}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
	let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length ? (comics.map((item, i) => (
					<li key={i} className="char__comics-item">{item.name}</li>
				))) : 'There is no comucs for this character'}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charSelected: PropTypes.number
}

export default CharInfo;
