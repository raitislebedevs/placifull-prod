import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Slider from 'react-slick';
import { RealEstateCard } from 'components/common';
import RealEstateListingServices from 'services/realEstateListingServices';
import { random } from 'utils/standaloneFunctions';
import Image from 'next/image';

const noRealEstate =
  'https://placifull-static.s3.eu-central-1.amazonaws.com/RealEstate.webp';

const RealEstateSection = (props) => {
  const { t } = props;

  const limit = 9;
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRealEstate = async () => {
    try {
      setIsLoading(true);
      const filter = {
        isPromotable: true,
      };
      const result = await RealEstateListingServices.FIND({
        _limit: limit,
        _start: skip,
        _where: filter,
      });
      const count = await RealEstateListingServices.COUNT();
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
  }, [limit]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    cssEase: 'ease',
    slidesToShow: total === 1 ? 1 : 2,
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

  return (
    <>
      <Container
        id={'promoted-section'}
        className="home-container__real-estate-section"
      >
        <Row className="align-items-center">
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <div className="real-estate-section__left">
              <span className="left-badge">
                {t('real-estate-section.badge')}
              </span>
              <h4 className="left-title">
                {t('real-estate-section.head.line-1')}
              </h4>
              <p className="text-muted mx-auto mx-lg-left para-desc mb-0">
                {t('real-estate-section.head.line-2')}
                <span className="text-primary font-weight-bold">
                  {' '}
                  {t('real-estate-section.head.line-3')}{' '}
                </span>
                {t('real-estate-section.head.line-4')}
              </p>
              <Link href={'/real-estate'}>
                <Button className="left-button">
                  {t('real-estate-section.button')}
                </Button>
              </Link>
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={8}
            xl={8}
            className="real-estate-section__right"
          >
            {' '}
            <div className="real-estate__list-items">
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
                  {items?.length === 0 ? (
                    <div className={'listings__not__placed'}>
                      <Image
                        src={noRealEstate}
                        id="realEstate"
                        alt="RealEstate"
                        width={516}
                        height={300}
                        quality={100}
                      />
                    </div>
                  ) : (
                    <>
                      <Slider {...sliderSettings}>
                        {items?.map((item, index) => (
                          <div key={index} className="right__slick-item">
                            <RealEstateCard t={t} item={item} />
                          </div>
                        ))}
                      </Slider>
                    </>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RealEstateSection;
