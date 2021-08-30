import Map from './Map';
import SearchForm from './SearchForm';

const HeroSection = (props) => {
  const {
    t,
    listSearchResult,
    setListSearchResult,
    setFilter,
    polygon,
    polygonCreated,
    isFetchingListing,
    polygonsDeleted,
    setIsFetchingListing,
  } = props;
  return (
    <div className="real-estate-container__hero">
      <Map
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
        polygonCreated={polygonCreated}
        polygonsDeleted={polygonsDeleted}
        t={t}
      />
      <SearchForm
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
        setFilter={setFilter}
        polygon={polygon}
        isFetchingListing={isFetchingListing}
        setIsFetchingListing={setIsFetchingListing}
        t={t}
      />
    </div>
  );
};

export default HeroSection;
