import { useState, useEffect } from 'react';
import { Link } from 'i18n';
import { Row, Col, Button, Container, Spinner } from 'react-bootstrap';
import { TransportationCard } from 'components/common';
import Slider from 'react-slick';
import { TransportListingService } from 'services';

const sliderSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 4000,
  cssEase: 'ease',
  slidesToShow: 2,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TransportationSection = (props) => {
  const { t } = props;
  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const getRealEstate = async () => {
    try {
      setIsLoading(true);
      const result = await TransportListingService.FIND({
        _limit: limit,
        _start: skip,
      });
      const count = await TransportListingService.COUNT();
      setTotal(count.data);
      setItems(result.data);
      let randomShow = random(0, Math.ceil(total / limit));
      setSkip(randomShow);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRealEstate();
  }, [limit, skip]);
  return (
    <div className="home-container__transportation-section">
      <Container>
        <Row className="align-items-center transportation-section__row">
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
            className="transportation-section__left"
          >
            {isLoading ? (
              <div className="featured__items__loading">
                <Spinner
                  as="span"
                  animation="grow"
                  variant="danger"
                  size="lg"
                  role="status"
                />
              </div>
            ) : (
              <>
                <Slider {...sliderSettings}>
                  {items?.map((item, index) => (
                    <div key={index} className="left__slick-item">
                      <TransportationCard t={t} item={item} />
                    </div>
                  ))}
                </Slider>
              </>
            )}
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="transportation-section-title">
              <span className="section-title__badge">
                {t('transportation-section.badge')}
              </span>
              <h4 className="section-title__title">
                {t('transportation-section.head.line-1')}
              </h4>
              <p className="text-muted mx-auto mx-lg-left para-desc mb-0">
                {t('transportation-section.head.line-2')}
                <span className="text-primary font-weight-bold">
                  {' '}
                  {t('transportation-section.head.line-3')}{' '}
                </span>
                {t('transportation-section.head.line-4')}
              </p>
              <Link href={'/vehicles'}>
                <Button className="section-title__button">
                  {t('transportation-section.button')}
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TransportationSection;
