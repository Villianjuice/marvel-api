import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import './singleComic.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';
import { Helmet } from 'react-helmet';
import setContent from '../../utils/setContent';

const SingleComic = () => {
  const { id } = useParams();

  const [comics, setComics] = useState([]);

  const { getComics, loading, error, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateComics();
  }, [id]);

  const onComics = (comics) => {
    setComics(comics);
  };

  const updateComics = () => {
    clearError();

    getComics(id).then(onComics).then(() => setProcess('confirmed'))
  };

  return (
    <>
      {setContent(process, ComicView, comics)}
    </>
  );
};

const ComicView = ({ data }) => {
  const { title, description, pageCount, thumbnail, language, price } = data;

  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={title} />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount} pages</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics">Back to all</Link>
    </div>
  );
};

export default SingleComic;
