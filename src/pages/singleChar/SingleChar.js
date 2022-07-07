import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleChar.scss';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const SingleChar = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [id]);

  const onCharLoaded = (comics) => {
    setData(comics);
  };

  const updateChar = () => {
    clearError();

    getCharacter(id).then(onCharLoaded).then(() => setProcess('confirmed'));
  };

  return (
    <>
      {setContent(process, CharView, data)}
    </>
  );
};

const CharView = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={name} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-comic__char-img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
      </div>
    </div>
  );
};

export default SingleChar;
