import React from 'react';
import { Helmet } from 'react-helmet';

import AppBanner from '../../components/appBanner/AppBanner';
import ComicsList from '../../components/comicsList/ComicsList';

export default function ComicsPage  ()  {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Comics list"
        />
        <title>Comics list</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  );
};
