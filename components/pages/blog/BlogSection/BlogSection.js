import React, { useState } from 'react';
import { withTranslation } from 'i18n';
import { Container, Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineFieldTime, AiOutlineEye } from 'react-icons/ai';

const blog = '/static/images/blog.jpg';

const BlogSection = (props) => {
  const { t } = props;
  const blogFilters = [
    {
      key: 0,
      title: t('blog:search.real-estate'),
    },
    {
      key: 1,
      title: t('blog:search.transport'),
    },
    {
      key: 2,
      title: t('blog:search.job'),
    },
    {
      key: 3,
      title: t('blog:search.other'),
    },
    {
      key: 4,
      title: t('blog:search.all'),
    },
  ];
  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(189);
  const [sort, setSort] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState(blogFilters[0]);

  const handlePageChange = (page) => {
    let selected = page.selected;
    let skip = Math.ceil(selected * limit);
    setSkip(skip);
  };

  return (
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
      <div className={'blog__section'}>
        <Row>
          <Col lg={4} md={4} sm={4} xs={4} className={'blog__item'}>
            <Row>
              <div className={'blog__image__container'}>
                <img src={blog} className="blog__image" alt="Company Logo" />
              </div>
            </Row>
            <Row className={'header__container'}>
              <h1 className={'blog__header'}>
                {' '}
                First Blog Post in this awsome website
              </h1>
            </Row>
            <Row className={'paragraph__container'}>
              <p className={'blog__paragraph'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Nulla posuere sollicitudin aliquam ultrices sagittis orci a
                scelerisque purus. Nunc eget lorem dolor sed viverra ipsum nunc.{' '}
                <span>[...]</span>
              </p>
            </Row>
            <Row className={'info__container'}>
              <span className={'blog__creation__date'}>
                {' '}
                <AiOutlineFieldTime className={'blog__icon'} /> Today
              </span>
              <span className={'blog__author'}>
                <BsPerson className={'blog__icon'} /> Raitis Lebedevs
              </span>
            </Row>
            <Row className={'footer__container'}>
              <span className={'blog__button'}>
                {' '}
                {t('blog:blog-item.button')}
              </span>
              <span className={'blog__viewed'}>
                {' '}
                <AiOutlineEye /> (876)
              </span>
            </Row>
          </Col>
        </Row>
      </div>
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
  );
};

export default withTranslation('blog')(BlogSection);
