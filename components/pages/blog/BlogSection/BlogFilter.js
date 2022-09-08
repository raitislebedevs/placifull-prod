import React from 'react';

function BlogFilter(props) {
  const [activeItem, setActiveItem] = useState(blogFilters[0]);

  const blogFilters = [
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
    {
      key: 4,
      title: t('blog:search.all'),
      filter: '',
    },
  ];
  return (
    <Row className="blog__filters">
      <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-1 pt-0 ">
        <div className="service__option nav nav-pills nav-justified justify-content-center flex-row rounded  p-3 mb-0">
          {blogFilters.map((item) => (
            <div className={`option__item mnav-item ml-1 mt-2`} key={item.key}>
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
  );
}

export default BlogFilter;
