import Map from './Map';
import SearchForm from './SearchForm';

const HeroSection = (props) => {
  const {
    t,
    setFilter,
    polygon,
    polygonCreated,
    setIsFetchingListing,
    polygonsDeleted,
    isFetchingListing,
    listSearchResult,
    setListSearchResult,
  } = props;
  return (
    <div className="vehicles-container__hero">
      <Map
        t={t}
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
        polygonCreated={polygonCreated}
        polygonsDeleted={polygonsDeleted}
      />
      <SearchForm
        t={t}
        setFilter={setFilter}
        polygon={polygon}
        isFetchingListing={isFetchingListing}
        setIsFetchingListing={setIsFetchingListing}
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
      />
    </div>
  );
};

export default HeroSection;
