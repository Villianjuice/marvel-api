import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const  CharList = ({onCharSelected}) => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [newItemsLoading, setNewItemsLoading] = useState(false)
  const [offset, setOffset] = useState(300)
  const [charsEnded, setCharsEnded] = useState(false)
  
  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest()
  }, [])

  const onCharsLoaded = (newCharacters) => {
    let ended = false;

    if (newCharacters.length < 9) {
      ended = true;
    }

    setCharacters(characters => [...characters, ...newCharacters])
    setLoading(false)
    setNewItemsLoading(false)
    setOffset(prev => prev + 9)
    setCharsEnded(ended)
  };

  const onError = () => {
    setError(true)
    setLoading(false)
  };
  const onCharsLoading = () => {
    setNewItemsLoading(true)
  };

  const onRequest = (offset) => {
    onCharsLoading();
    marvelService.getAllCharacters(offset).then(onCharsLoaded).catch(onError);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();  
  };

  const getItems = (items) => {
    const characters = items.map(({ id, name, thumbnail }, i) => {
      let imgStyle = { objectFit: 'cover' };
      if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { objectFit: 'unset' };
      }
      return (
        <li
          tabIndex={0}
          ref={(el) => itemRefs.current[i] = el}
          onClick={() => {
            onCharSelected(id);
            focusOnItem(i); 
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              onCharSelected(id);
              focusOnItem(i);
            }
          }}
          className="char__item"
          key={id}>
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{characters}</ul>;
  }

    const items = getItems(characters);
    return (
      <div className="char__list">
        {loading ? <Spinner /> : null}
        {error ? <ErrorMessage /> : null}
        {!(loading || error) ? items : null}
        <button
          style={{ display: charsEnded ? 'none' : 'block' }}
          disabled={newItemsLoading}
          onClick={() => onRequest(offset)}
          className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }


CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
