import { withTranslation } from 'i18n';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { HeroSection, SearchResultSection } from 'components/pages/real-estate';
import Head from 'next/head';

const RealEstate = (props) => {
  const [listSearchResult, setListSearchResult] = useState([]);
  const [filter, setFilter] = useState({});
  const [polygon, setPolygon] = useState([]);
  const [isFetchingListing, setIsFetchingListing] = useState(false);
  const { t } = props;

  const polygonCreated = (e) => {
    console.log(e.layer.editing.latlngs[0]);
    if (e.layer.editing?.latlngs.length > 0) {
      setPolygon(e.layer.editing?.latlngs[0]);
    }
    console.log(polygon);
  };
  return (
    <div className="real-estate-container main-container">
      <Head>
        <title>{t('real-estate:title')}</title>
      </Head>
      <HeroSection
        t={t}
        setFilter={setFilter}
        polygon={polygon}
        listSearchResult={listSearchResult}
        isFetchingListing={isFetchingListing}
        setListSearchResult={setListSearchResult}
        setIsFetchingListing={setIsFetchingListing}
        polygonCreated={polygonCreated}
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
