import Map from './Map';
import SearchForm from './SearchForm';

const HeroSection = (props) => {
  const {
    t,
    listSearchResult,
    setListSearchResult,
    setFilter,
    isFetchingListing,
    setIsFetchingListing,
  } = props;
  return (
    <div className="real-estate-container__hero">
      <Map
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
        t={t}
      />
      <SearchForm
        listSearchResult={listSearchResult}
        setListSearchResult={setListSearchResult}
        setFilter={setFilter}
        isFetchingListing={isFetchingListing}
        setIsFetchingListing={setIsFetchingListing}
        t={t}
      />
    </div>
  );
};

export default HeroSection;
