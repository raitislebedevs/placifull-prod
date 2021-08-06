import { useState, useEffect } from 'react';
import { Container, Spinner, Col } from 'react-bootstrap';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { TransportationCard, SelectInput } from 'components/common';
import ReactPaginate from 'react-paginate';
import { TransportListingService } from 'services';

const SearchResultSection = (props) => {
  const {
    t,
    listSearchResult,
    setListSearchResult,
    filter,
    setIsFetchingListing,
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
      label: t('transport:search-result.filters.sort-by.label'),
    },
    {
      value: 'price:asc',
      label: (
        <>
          {t('transport:search-result.filters.sort-by.options.price')}
          <FaLongArrowAltUp />
        </>
      ),
    },
    {
      value: 'price:desc',
      label: (
        <>
          {t('transport:search-result.filters.sort-by.options.price')}
          <FaLongArrowAltDown />
        </>
      ),
    },
    {
      value: 'maxSpeed:asc',
      label: (
        <>
          {t('transport:search-result.filters.sort-by.options.speed')}
          <FaLongArrowAltUp />
        </>
      ),
    },
    {
      value: 'maxSpeed:desc',
      label: (
        <>
          {t('transport:search-result.filters.sort-by.options.speed')}
          <FaLongArrowAltDown />
        </>
      ),
    },
    {
      value: 'distance:asc',
      label: (
        <>
          {t('transport:search-result.filters.sort-by.options.millage')}
          <FaLongArrowAltUp />
        </>
      ),
    },
    {
      value: 'distance:desc',
      label: (
        <>
          {t('transport:search-result.filters.sort-by.options.millage')}
          <FaLongArrowAltDown />
        </>
      ),
    },
    {
      value: 'insertDate:asc',
      label: (
        <>
          {t('transport:search-result.filters.sort-by.options.insert-date')}
          <FaLongArrowAltUp />
        </>
      ),
    },
    {
      value: 'insertDate:desc',
      label: (
        <>
          {t('transport:search-result.filters.sort-by.options.insert-date')}
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
    getTransport();
  }, [limit, skip, filter, sort]);

  const getTransport = async () => {
    try {
      setIsLoading(true);
      const { data } = await TransportListingService.FIND_FORM({
        _limit: limit,
        _start: skip,
        _where: filter,
        _sort: sort || 'insertDate:asc',
      });

      const count = await TransportListingService.COUNT_SEARCH({
        _where: filter,
      });

      setTotal(count.data);
      setIsLoading(false);
      if (count.data)
        TostifyCustomContainer(
          'success',
          t('common:toast.messages.success'),
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
    <div className="vehicles-container__search-result">
      <Container className="search-result__header">
        <Col lg={2} md={4} sm={12}>
          <SelectInput
            onChange={(e) => setLimit(e.value)}
            id="limit"
            defaultValue={limitOptions[0]}
            options={limitOptions}
            placeholder={t('common:items-per-page.label')}
          />
        </Col>
        <Col lg={2} md={4} sm={12}>
          <SelectInput
            onChange={(e) => setSort(e.value)}
            id="sort"
            defaultValue={sortOptions[0]}
            options={sortOptions}
            label={t('transport:search-result.filters.sort-by.label')}
          />
        </Col>
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
                <TransportationCard t={t} item={item} />
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
