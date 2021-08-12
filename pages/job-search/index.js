import { withTranslation } from 'i18n';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  HeroSection,
  SearchResultSection,
  BlogSection,
} from 'components/pages/job-search';
import Head from 'next/head';

const JobSearch = (props) => {
  const [listSearchResult, setListSearchResult] = useState([]);
  const [isFetchingListing, setIsFetchingListing] = useState(false);
  const [filter, setFilter] = useState({});
  const { t } = props;
  return (
    <div className="job-search-container main-container">
      <Head>
        <title>{t('job-search:title')}</title>
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

// JobSearch.getInitialProps = async () => ({
//   namespacesRequired: [
//     'common',
//     'navbar',
//     'footer',
//     'blog',
//     'job-search',
//     'job-common',
//     'job-tags',
//   ],
// });

// JobSearch.propTypes = {
//   t: PropTypes.func.isRequired,
// };

export default withTranslation([
  'common',
  'navbar',
  'footer',
  'blog',
  'job-search',
  'job-common',
  'job-tags',
])(JobSearch);
