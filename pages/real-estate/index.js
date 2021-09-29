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
    let polygonData = e.layer.editing?.latlngs;
    if (polygonData.length > 0) {
      let index = polygonData.length - 1;
      let data = polygonData[index];
      let searchArea = [];
      data[index].forEach((el) => {
        let polygonPoint = [el?.lat, el?.lng];
        searchArea.push(polygonPoint);
      });

      setPolygon(searchArea);
    }
  };

  const polygonsDeleted = () => {
    setPolygon([]);
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
        polygonsDeleted={polygonsDeleted}
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
    'real-estate-detail',
    'real-estate-common',
    'real-estate-tags',
  ],
});

RealEstate.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(RealEstate);
