import { withTranslation } from 'i18n';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  HeroSection,
  SearchResultSection,
  BlogSection,
} from 'components/pages/real-estate';
import Head from 'next/head';

const RealEstate = (props) => {
  const [listSearchResult, setListSearchResult] = useState([]);
  const [filter, setFilter] = useState({});
  const [isFetchingListing, setIsFetchingListing] = useState(false);
  const { t } = props;
  return (
    <div className="real-estate-container main-container">
      <Head>
        <title>{t('real-estate:title')}</title>
      </Head>
      <HeroSection
        t={t}
        setFilter={setFilter}
        listSearchResult={listSearchResult}
        isFetchingListing={isFetchingListing}
        setListSearchResult={setListSearchResult}
        setIsFetchingListing={setIsFetchingListing}
      />
      <SearchResultSection
        t={t}
        filter={filter}
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
        setIsFetchingListing={setIsFetchingListing}
      />
      {/* <BlogSection t={t} /> */}
    </div>
  );
};

RealEstate.getInitialProps = async () => ({
  namespacesRequired: [
    'common',
    'navbar',
    'footer',
    'blog',
    'real-estate',
    'real-estate-common',
    'real-estate-tags',
  ],
});

RealEstate.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(RealEstate);
