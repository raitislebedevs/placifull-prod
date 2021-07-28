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
    <div className="job-search-container__hero">
      <Map
        t={t}
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
      />
      <SearchForm
        t={t}
        setFilter={setFilter}
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
        isFetchingListing={isFetchingListing}
        setIsFetchingListing={setIsFetchingListing}
      />
    </div>
  );
};

export default HeroSection;
