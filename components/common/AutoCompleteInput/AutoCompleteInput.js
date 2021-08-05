import { useRef, useEffect } from 'react';
import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import CustomFormControl from '../CustomFormControl';

const AutoCompleteInput = (props) => {
  const {
    isSearching,
    setSearchResults,
    handleSelectSearchResult,
    isLoadingSearch,
    searchResults,
    setSearchText,
    searchText,
    t,
    ...rest
  } = props;
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchResults([]);
        setSearchText('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef}>
      <CustomFormControl
        {...rest}
        valueLength={100 - searchText?.length}
        maxLength={'100'}
      />
      {rest.value && searchText && isSearching ? (
        <div className="auto-complete-container">
          {!isLoadingSearch ? (
            <>
              {searchResults && searchResults.length > 0 ? (
                <>
                  {searchResults.slice(0, 5).map((item, index) => (
                    <div
                      onClick={() => handleSelectSearchResult(item, rest.id)}
                      className="auto-complete-container__result-wrapper"
                      key={index}
                    >
                      {item.label}
                    </div>
                  ))}
                </>
              ) : (
                <div className="auto-complete-container__result-wrapper">
                  {t('common:elements.loading-right')}
                </div>
              )}
            </>
          ) : (
            <div className="auto-complete-container__result-wrapper">
              {t('common:elements.no-results')}
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

AutoCompleteInput.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

AutoCompleteInput.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(AutoCompleteInput);
