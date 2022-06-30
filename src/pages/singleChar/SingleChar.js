import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import './singleChar.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';

const SingleChar = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const { getCharacter, loading, error, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [id]);

  const onCharLoaded = (comics) => {
    setData(comics);
  };

  const updateChar = () => {
    clearError();

    getCharacter(id).then(onCharLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <CharView data={data} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const CharView = ({ data }) => {
    const {name, description, thumbnail} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    )
};

export default SingleChar;
