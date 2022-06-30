import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';

const CharPage = lazy(() => import('../../pages/charPage/CharPage'));
const ComicsPage = lazy(() => import('../../pages/comicsPage/ComicsPage'));
const SingleComic = lazy(() => import('../../pages/singleComic/SingleComic'));
const NoMatchPage = lazy(() => import('../../pages/noMatchPage/NoMatchPage'));

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<CharPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:id" element={<SingleComic />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
