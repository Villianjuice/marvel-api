import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';

import decoration from '../../resources/img/vision.png';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const App = () => {
  const [charSelected, setCharSelected] = useState(null);

  const onCharSelected = (id) => {
    setCharSelected(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          {/* <ErrorBoundary> 
              <CharList onCharSelected={onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charSelected={charSelected} />
            </ErrorBoundary> */}
        </div>
        <AppBanner />
        <ComicsList />
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
