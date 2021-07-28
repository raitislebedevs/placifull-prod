import Map from './Map';
import SearchForm from './SearchForm';

const HeroSection = (props) => {
  const {
    t,
    setFilter,
    setIsFetchingListing,
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
      />
      <SearchForm
        t={t}
        setFilter={setFilter}
        isFetchingListing={isFetchingListing}
        setIsFetchingListing={setIsFetchingListing}
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
      />
    </div>
  );
};

export default HeroSection;
