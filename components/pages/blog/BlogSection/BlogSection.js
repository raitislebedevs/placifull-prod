import React, { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { BlogItem, SelectInput, ToggleNav } from 'components//common/index';
import useBlogPosts from 'hooks/useBlogPosts';
import { blogFilters } from './Constants/blogFilters';
import { limitOptions } from './Constants/limitOptions';
import { languagesFilter } from './Constants/languagesFilter';

const BlogSection = (props) => {
  const { t } = props;
  const filters = blogFilters(t);
  const limits = limitOptions(t);
  const languages = languagesFilter(t);

  const [limit, setLimit] = useState(9);
  const [skip, setSkip] = useState(0);
  const [language, setLanguage] = useState('');
  const [activeItem, setActiveItem] = useState(filters[0]);
  const [isLoading, total, items] = useBlogPosts(
    activeItem,
    limit,
    language,
    skip
  );
  const onLanguageChange = (e) => {
    setLanguage(e.value, language);
  };

  const handlePageChange = (page) => {
    let selected = page.selected;
    let skip = Math.ceil(selected * limit);
    setSkip(skip);
  };

  return (
    <Container className="blog-container">
      <ToggleNav
        toggles={filters}
        activeToggle={activeItem}
        setActiveToggle={setActiveItem}
      />
      <Container>
        <Row className="search-result__header">
          <Col lg={4} md={4} sm={4} xs={6}>
            <div className={'filter__option'}>
              <SelectInput
                onChange={(e) => {
                  setLimit(e.value);
                }}
                id="limit"
                defaultValue={limits[0]}
                options={limits}
                placeholder={t('common:items-per-page.label')}
              />
            </div>
          </Col>
          <Col lg={4} md={4} sm={4} xs={6}>
            <div className={'filter__option'}>
              <SelectInput
                onChange={onLanguageChange}
                id="language"
                defaultValue={languages[0]}
                options={languages}
                placeholder={'Language'}
              />
            </div>
          </Col>
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
          {items.map((item) => (
            <Col lg={4} md={6} sm={12} xs={12} key={item?.id}>
              <BlogItem t={t} item={item} />
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
          pageRangeDisplayed={2}
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

export default BlogSection;
