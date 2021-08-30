import Map from './Map';
import SearchForm from './SearchForm';

const HeroSection = (props) => {
  const {
    t,
    setFilter,
    setIsFetchingListing,
    polygon,
    polygonCreated,
    isFetchingListing,
    polygonsDeleted,
    listSearchResult,
    setListSearchResult,
  } = props;
  return (
    <div className="job-search-container__hero">
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
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
        isFetchingListing={isFetchingListing}
        setIsFetchingListing={setIsFetchingListing}
      />
    </div>
  );
};

export default HeroSection;
