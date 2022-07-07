import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = ({charSelected}) => {
  const [char, setChar] = useState(null) 
  const {getCharacter, clearError, process, setProcess} = MarvelService();
  
  useEffect(() => {
    updateChar();
  }, [charSelected])

  const onChar = (char) => {
    setChar(prev => char)
  };

  const updateChar = () => {
    if (!charSelected) {
      return;
    }
    clearError()
    getCharacter(charSelected)
      .then((char) => {
        onChar(char);
      })
      .then(() => setProcess('confirmed'))
  }

    return (
      <div className="char__info">
        {setContent(process, View, char)}
      </div>
    );
  
}

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;
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
