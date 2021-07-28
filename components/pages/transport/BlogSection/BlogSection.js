import { Container, Row, Col } from 'react-bootstrap';
import { SubPageHeading } from 'components/common';
import fakeItems from './fakeItems';
import moment from 'moment';
const BlogSection = (props) => {
  const { t } = props;

  const items = fakeItems;

  return (
    <Container className="vehicles-container__blog">
      <SubPageHeading className="blog__heading">
        {t('blog:search.heading')}
      </SubPageHeading>
      <div className="blog__items">
        <Row>
          {items.map((item) => (
            <Col lg={4} key={item.id}>
              <div className="items__item-wrapper" key={item.id}>
                <div className="item-wrapper__title">
                  <a href={item.link}>{item.title}</a>
                </div>
                <div className="item-wrapper__date">
                  {moment(item.date).format('DD.MM.YYYY')}
                </div>
                <div className="item-wrapper__description">
                  {item.description}
                </div>
                <div className="item-wrapper__see-more">
                  <a href={item.link}>{t('blog:search.see-more')} →</a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default BlogSection;
