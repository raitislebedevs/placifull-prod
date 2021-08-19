import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import {
  HeroSection,
  SearchResultSection,
  BlogSection,
} from 'components/pages/transport';
import { useState } from 'react';
import Head from 'next/head';

const Transport = (props) => {
  const [listSearchResult, setListSearchResult] = useState([]);
  const [filter, setFilter] = useState({});
  const [isFetchingListing, setIsFetchingListing] = useState(false);
  const { t } = props;
  return (
    <div className="vehicles-container main-container">
      <Head>
        <title>{t('transport:title')}</title>

        <meta
          name="keywords"
          content="boat buy, buy boat, sell car, buy car, rent car, car rent, plane buy, rent plane, rent a donkey, buy girraffe"
        />
      </Head>
      <HeroSection
        t={t}
        listSearchResult={listSearchResult}
        isFetchingListing={isFetchingListing}
        setListSearchResult={setListSearchResult}
        setIsFetchingListing={setIsFetchingListing}
        setFilter={setFilter}
      />
      <SearchResultSection
        t={t}
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
        setIsFetchingListing={setIsFetchingListing}
        filter={filter}
      />
      {/* <BlogSection t={t} /> */}
    </div>
  );
};

Transport.getInitialProps = async () => ({
  namespacesRequired: [
    'blog',
    'common',
    'navbar',
    'footer',
    'transport',
    'transport-common',
    'transport-tags',
  ],
});

Transport.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Transport);
