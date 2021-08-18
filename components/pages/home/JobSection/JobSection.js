import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Slider from 'react-slick';
import { JobCard } from 'components/common';
import VacancyListingService from 'services/vacancyListingService';
import { random } from 'utils/standaloneFunctions';

const JobSection = (props) => {
  const { t } = props;
  const noJobs =
    'https://placifull-static.s3.eu-central-1.amazonaws.com/Jobs.png';
  const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let randomShow = random(0, Math.ceil(total / limit));

  const getRealEstate = async (skipSize) => {
    try {
      setIsLoading(true);
      const filter = {
        isPromotable: true,
      };
      const result = await VacancyListingService.FIND({
        _limit: limit,
        _start: skip,
        _where: filter,
      });
      const count = await VacancyListingService.COUNT();

      setTotal(count.data);
      setItems(result.data);
      setSkip(skipSize);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRealEstate(randomShow);
  }, [limit, skip]);

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
      <div className="home-container__job-section">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
              <div className="job-section__left">
                <span className="left-badge">{t('job-section.badge')}</span>
                <h4 className="left-title">{t('job-section.head.line-1')} </h4>
                <p className="text-muted mx-auto mx-lg-left para-desc mb-0">
                  {t('job-section.head.line-2')}{' '}
                  <span className="text-primary font-weight-bold">
                    {' '}
                    {t('job-section.head.line-3')}{' '}
                  </span>
                  {t('job-section.head.line-4')}
                </p>
                <Link href={'/job-search'}>
                  <Button className="left-button">
                    {t('job-section.button')}
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
              className="job-section__right"
            >
              {' '}
              <div className="job__list-items">
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
                        <img
                          src={noJobs}
                          id="logo"
                          className="mx-auto d-block item__picture"
                          alt="Transport"
                        />
                      </div>
                    ) : (
                      <>
                        <Slider {...sliderSettings}>
                          {items?.map((item, index) => (
                            <div key={index} className="right__slick-item">
                              <JobCard t={t} item={item} />
                            </div>
                          ))}{' '}
                        </Slider>{' '}
                      </>
                    )}
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default JobSection;
