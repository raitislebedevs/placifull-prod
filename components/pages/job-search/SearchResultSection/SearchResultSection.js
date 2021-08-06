import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { VacancyListingService } from 'services';
import { JobCard, SelectInput } from 'components/common';
import ReactPaginate from 'react-paginate';
import TostifyCustomContainer from 'components//common/TostifyCustomContainer/TostifyCustomContainer';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

const SearchResultSection = (props) => {
  const {
    t,
    listSearchResult,
    setListSearchResult,
    setIsFetchingListing,
    filter,
  } = props;
  const limitOptions = [
    {
      value: '9',
      label: t('common:items-per-page.label'),
    },
    {
      value: '9',
      label: t('common:items-per-page.options.nine'),
    },
    {
      value: '18',
      label: t('common:items-per-page.options.eighteen'),
    },
    {
      value: '36',
      label: t('common:items-per-page.options.thirty-six'),
    },
    {
      value: '72',
      label: t('common:items-per-page.options.seventy-two'),
    },
  ];

  const sortOptions = [
    {
      value: 'insertDate:asc',
      label: <>{t('job-search:search-result.filters.sort-by.label')}</>,
    },
    {
      value: 'hourlySalaryTo:asc',
      label: (
        <>
          {t('job-search:search-result.filters.sort-by.options.hourly-salary')}
          <FaLongArrowAltUp />
        </>
      ),
    },
    {
      value: 'hourlySalaryTo:desc',
      label: (
        <>
          {t('job-search:search-result.filters.sort-by.options.hourly-salary')}
          <FaLongArrowAltDown />
        </>
      ),
    },
    {
      value: 'monthlySalaryFrom:asc',
      label: (
        <>
          {t('job-search:search-result.filters.sort-by.options.monthly-salary')}
          <FaLongArrowAltUp />
        </>
      ),
    },
    {
      value: 'monthlySalaryFrom:desc',
      label: (
        <>
          {t('job-search:search-result.filters.sort-by.options.monthly-salary')}
          <FaLongArrowAltDown />
        </>
      ),
    },
    {
      value: 'annualSalaryFrom:asc',
      label: (
        <>
          {t('job-search:search-result.filters.sort-by.options.annual-salary')}
          <FaLongArrowAltUp />
        </>
      ),
    },
    {
      value: 'annualSalaryFrom:desc',
      label: (
        <>
          {t('job-search:search-result.filters.sort-by.options.annual-salary')}
          <FaLongArrowAltDown />
        </>
      ),
    },
    {
      value: 'insertDate:asc',
      label: (
        <>
          {t('job-search:search-result.filters.sort-by.options.insert-date')}
          <FaLongArrowAltUp />
        </>
      ),
    },
    {
      value: 'insertDate:desc',
      label: (
        <>
          {t('job-search:search-result.filters.sort-by.options.insert-date')}
          <FaLongArrowAltDown />
        </>
      ),
    },
  ];

  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState('');
  const [sort, setSort] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getJobListings();
  }, [limit, skip, filter, sort]);

  const getJobListings = async () => {
    try {
      setIsLoading(true);
      const { data } = await VacancyListingService.FIND_FORM({
        _limit: limit,
        _start: skip,
        _where: filter,
        _sort: sort || 'insertDate:asc',
      });

      const count = await VacancyListingService.COUNT_SEARCH({
        _where: filter,
      });
      setTotal(count.data);
      setIsLoading(false);
      if (count.data)
        TostifyCustomContainer(
          'success',
          `${t('common:toast.search-results.found')} ${count.data} ${t(
            'common:toast.search-results.items'
          )}`
        );

      if (data && data.length > 0) {
        setListSearchResult(data || []);
        setIsLoading(false);
        setIsFetchingListing(false);
        return;
      }

      TostifyCustomContainer(
        'info',
        t('common:toast.messages.info'),
        `${t('common:toast.not-found')}`
      );
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      TostifyCustomContainer('error', t('common:toast.messages.error'), e);
      setIsLoading(false);
    }
    setIsFetchingListing(false);
  };
  const handlePageChange = (page) => {
    let selected = page.selected;
    let skip = Math.ceil(selected * limit);
    setSkip(skip);
  };

  return (
    <div className="job-search-container__search-result">
      <Container className="search-result__header">
        <SelectInput
          onChange={(e) => setLimit(e.value)}
          id="limit"
          defaultValue={limitOptions[0]}
          options={limitOptions}
          placeholder={t('common:items-per-page.label')}
        />
        <SelectInput
          onChange={(e) => setSort(e.value)}
          id="sort"
          defaultValue={sortOptions[0]}
          options={sortOptions}
          placeholder={t('job-search:search-result.filters.sort-by.label')}
        />
      </Container>
      <Container className="search-result__items">
        {isLoading ? (
          <div className="items__loading">
            <Spinner
              as="span"
              animation="grow"
              variant="danger"
              size="md"
              role="status"
            />
          </div>
        ) : (
          <>
            {listSearchResult.map((item) => (
              <div className="items__wrapper" key={item.id}>
                <JobCard t={t} item={item} />
              </div>
            ))}{' '}
          </>
        )}
      </Container>
      <div className="search-result__paginate">
        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageCount={Math.ceil(total / limit)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={4}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'page-item'}
          activeClassName={'page-item active'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          pageClassNam={'page-item'}
          pageLinkClassName={'page-link'}
        />
      </div>
    </div>
  );
};

export default SearchResultSection;
