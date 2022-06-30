import { useState } from 'react';
import CharInfo from '../../components/charInfo/CharInfo';
import CharList from '../../components/charList/CharList';
import CharSearchForm from '../../components/charSearchForm/CharSearchForm';
import ErrorBoundary from '../../components/errorBoundary/ErrorBoundary';
import RandomChar from '../../components/randomChar/RandomChar';

import decoration from '../../resources/img/vision.png';

export default function CharPage() {
  const [charSelected, setCharSelected] = useState(null);

  const onCharSelected = (id) => {
    setCharSelected(id);
  };
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charSelected={charSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
}
