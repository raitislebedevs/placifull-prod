import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineFieldTime, AiOutlineEye } from 'react-icons/ai';
import { BlogService } from 'services';
import Link from 'next/link';
import { formatDate } from 'utils/standaloneFunctions';
import { SelectInput } from 'components//common/index';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

const BlogSection = (props) => {
  const { t } = props;
  const blogFilters = [
    {
      key: 4,
      title: t('blog:search.all'),
      filter: '',
    },
    {
      key: 0,
      title: t('blog:search.real-estate'),
      filter: 'realEstate',
    },
    {
      key: 1,
      title: t('blog:search.transport'),
      filter: 'transport',
    },
    {
      key: 2,
      title: t('blog:search.job'),
      filter: 'job',
    },
    {
      key: 3,
      title: t('blog:search.other'),
      filter: 'other',
    },
  ];

  const limitOptions = [
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

  const languages = [
    {
      value: 'english',
      label: 'English',
    },
    {
      value: 'latvian',
      label: 'Latviešu',
    },
  ];

  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState('');
  const [sort, setSort] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [activeItem, setActiveItem] = useState(blogFilters[0]);

  const handlePageChange = (page) => {
    let selected = page.selected;
    let skip = Math.ceil(selected * limit);
    setSkip(skip);
  };

  const getBlogPosts = async () => {
    try {
      setIsLoading(true);
      const result = await BlogService.FIND({
        _limit: limit,
        _start: skip,
        _where: {
          blogType_contains: activeItem.filter,
        },
      });

      const count = await BlogService.COUNT({
        _where: {
          blogType: activeItem.filter,
        },
      });

      setTotal(count.data);
      setItems(result.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBlogPosts();
  }, [activeItem]);

  const onSortChange = (e) => {
    setSort(e.value);
  };

  return (
    <>
      <Container className="blog-container">
        <Row className="blog__filters">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-1 pt-0 ">
            <div className="service__option nav nav-pills nav-justified justify-content-center flex-row rounded  p-3 mb-0">
              {blogFilters.map((item) => (
                <div
                  className={`option__item mnav-item ml-1 mt-2`}
                  key={item.key}
                >
                  <div
                    className={`nav-link rounded ${
                      activeItem.key === item.key ? 'active' : ''
                    }`}
                    onClick={() => setActiveItem(item)}
                  >
                    <div className="text-center py-1">
                      <h6 className="mb-0">{item.title}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Container>
          <Row className="search-result__header">
            <Col lg={4} md={4} sm={4} xs={12}>
              <div className={'filter__option'}>
                <SelectInput
                  onChange={(e) => {
                    setLimit(e.value);
                    setSkip(0);
                  }}
                  id="limit"
                  defaultValue={limitOptions[0]}
                  options={limitOptions}
                  placeholder={t('common:items-per-page.label')}
                />
              </div>
            </Col>
            <Col lg={4} md={4} sm={4} xs={12}>
              <div className={'filter__option'}>
                <SelectInput
                  onChange={onSortChange}
                  id="language"
                  defaultValue={languages[0]}
                  options={languages}
                  placeholder={'Language'}
                />
              </div>
            </Col>
            {/* <Col lg={4} md={4} sm={4} xs={12}>
              <div className={'filter__option'}>
                <SelectInput
                  onChange={onSortChange}
                  id="sort"
                  defaultValue={sortOptions[0]}
                  options={sortOptions}
                  placeholder={t(
                    'real-estate:search-result.filters.sort-by.label'
                  )}
                />
              </div>
            </Col> */}
          </Row>
        </Container>
        {isLoading ? (
          <div className="blog__items__loading">
            <Spinner
              as="span"
              animation="border"
              variant="danger"
              size="md"
              role="status"
            />
          </div>
        ) : (
          <Row className={'blog__section'}>
            {' '}
            {items.map((item) => (
              <Col lg={4} md={6} sm={12} xs={12} key={item?.id}>
                <div className={'blog__item'}>
                  <div>
                    <div className={'blog__image__container'}>
                      <img
                        src={item?.gallery?.url}
                        className="blog__image"
                        alt="Company Logo"
                      />
                    </div>
                  </div>
                  <div className={'header__container'}>
                    <h1 className={'blog__header'}>{item?.header}</h1>
                  </div>
                  <div className={'paragraph__container'}>
                    <p className={'blog__paragraph'}>
                      {item?.blogInformationText?.substring(0, 275)}
                      <span>{` [...]`}</span>
                    </p>
                  </div>
                  <div className={'info__container'}>
                    <span className={'blog__creation__date'}>
                      {' '}
                      <AiOutlineFieldTime className={'blog__icon'} />{' '}
                      {formatDate(item.insertDate, t)}
                    </span>
                    <span className={'blog__author'}>
                      <BsPerson className={'blog__icon'} /> {item.author}
                    </span>
                  </div>
                  <div className={'footer__container'}>
                    <Link href={`/blog/${item?.id}`}>
                      <span className={'blog__button'} onClick={''}>
                        {t('blog:blog-item.button')}
                      </span>
                    </Link>
                    <span className={'blog__viewed'}>
                      {' '}
                      <AiOutlineEye /> ({item?.popularity?.views})
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
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
      </Container>
    </>
  );
};

export default BlogSection;
