import { Routes, Route } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
import { CharPage, ComicsPage, NoMatchPage } from '../../pages';
import SingleComic from '../../pages/singleComic/SingleComic';


const App = () => {
  

  return (
    <div className="app">
      <AppHeader />
      <main>
        <Routes >
          <Route path='/' element={<CharPage />}/>
          <Route path='/comics' element={<ComicsPage />}/>
          <Route path='/comics/:id' element={< SingleComic/>}/>
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
        
        
      </main>
    </div>
  );
};

export default App;
