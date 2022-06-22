import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import './singleComic.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';

const SingleComic = () => {
    const {id} = useParams()

    const [comics, setComics] = useState([])

    const {getComics, loading, error, clearError} = useMarvelService()

    useEffect(() => {
        updateComics()
    }, [id])

    const onComics = (comics) => {
        setComics(comics)
    }

    const updateComics = () => {

        clearError()

        getComics(id).then(onComics)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <ComicView comics={comics} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const ComicView = ({comics}) => {
    const {title, description, pageCount, thumbnail, language, price} = comics

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' >Back to all</Link>
        </div>
    )
} 

export default SingleComic;