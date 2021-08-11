import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import priceOptions from './priceOptions';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Link from 'next/link';
import { DISCOUNTS_GREEN, DISCOUNTS_RED } from 'constants/purchasePrice';

function PaymentDetailModal(props) {
  const { t, isLogged } = props;
  if (isLogged) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t('price-section.modal.no-user.title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4> {t('price-section.modal.no-user.header')}</h4>
          <p>{t('price-section.modal.no-user.body')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Link href={'/sign-in'}>
            <Button onClick={props.onHide}>
              {' '}
              {t('price-section.modal.no-user.log')}
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t('price-section.modal.post.title')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('price-section.modal.post.body')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Link href={'/add-listing'} scroll={true}>
            <Button onClick={props.onHide}>
              {t('price-section.modal.post.post')}
            </Button>
          </Link>
          <Link href={'/profile'}>
            <Button onClick={props.onHide}>
              {t('price-section.modal.post.purchase')}
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }
}

const PriceSection = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { t } = props;
  const [currentOption, setCurrentOption] = useState(0);
  const priceOffers = priceOptions(t);

  const listOption = [
    {
      key: 0,
      option: 'Real Estate',
      label: t('price-section.prices.price-1.name'),
      discount: DISCOUNTS_RED.REAL_ESATE,
      increase: DISCOUNTS_GREEN.REAL_ESATE,
    },
    {
      key: 1,
      option: 'Transportation',
      label: t('price-section.prices.price-2.name'),
      discount: DISCOUNTS_RED.TRANSPORT,
      increase: DISCOUNTS_GREEN.TRANSPORT,
    },
    {
      key: 2,
      option: 'Jobs',
      label: t('price-section.prices.price-3.name'),
      discount: DISCOUNTS_RED.JOBS,
      increase: DISCOUNTS_GREEN.JOBS,
    },
    {
      key: 3,
      option: 'Others',
      label: t('price-section.prices.price-4.name'),
      discount: DISCOUNTS_RED.REAL_ESATE,
      increase: DISCOUNTS_GREEN.REAL_ESATE,
    },
  ];

  return (
    <>
      <div id={'pricing-panel'} className="home-container__price-section">
        <Container>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="price-section__head"
            >
              <div className="head__title">
                {DISCOUNTS_RED.ALL !== 0 && (
                  <h1>
                    <Badge pill variant="danger" className={'badge__item'}>
                      {DISCOUNTS_RED.ALL}% {t('price-section.off')}
                    </Badge>
                  </h1>
                )}
                {DISCOUNTS_GREEN.ALL !== 0 && (
                  <h1>
                    <Badge pill variant="success" className={'badge__item'}>
                      {DISCOUNTS_GREEN.ALL}% {t('price-section.off')}
                    </Badge>
                  </h1>
                )}
                {t('price-section.head.line-1')}
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="price-section__nav-pills"
            >
              <div className="nav-pills__wrapper">
                <ul className="wrapper__list-option">
                  {listOption.map((option) => (
                    <li
                      className={`nav-item list-option__item d-inline-block ${
                        option.key === currentOption
                          ? 'list-option__active'
                          : ''
                      }`}
                      key={option.key}
                    >
                      <div
                        className="nav-link badge-container"
                        onClick={() => setCurrentOption(option.key)}
                      >
                        {option.label}
                        <>
                          {option.discount ? (
                            <Badge
                              pill
                              variant="danger"
                              className={'badge__item'}
                            >
                              {option.discount}% {t('price-section.off')}
                            </Badge>
                          ) : option.increase ? (
                            <Badge
                              pill
                              variant="success"
                              className={'badge__item'}
                            >
                              {option.increase}% {t('price-section.off')}
                            </Badge>
                          ) : (
                            ''
                          )}
                        </>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="price-section__wrapper-option"
            >
              <div className="wrapper-option__list-option">
                <div className="list-option__list-card">
                  <Row>
                    {priceOffers
                      .filter((option) => option.key === currentOption)[0]
                      .content.map((content, idx) => (
                        <Col
                          xs={12}
                          sm={12}
                          md={4}
                          lg={4}
                          xl={4}
                          className="mt-4 pt-2"
                          key={idx}
                        >
                          <div
                            className={`list-card__item ${
                              idx === 1 ? 'active' : ''
                            }`}
                          >
                            <div className="card-body py-5">
                              <h6
                                className={`item__name ${
                                  idx === 1 ? 'item__active' : ''
                                }`}
                              >
                                {content.name}
                              </h6>
                              <div className="d-flex mb-4">
                                <span className="h4 mb-0 mt-2">€ </span>
                                <span className="price h1 mb-0">
                                  {content.cost.price}
                                </span>
                                {content.cost.time && (
                                  <span className="h4 align-self-end mb-1">
                                    /{content.cost.time}
                                  </span>
                                )}
                              </div>
                              <ul className="list-unstyled mb-0 pl-0">
                                {content.services.map((service) => (
                                  <li className="text-muted mb-0" key={service}>
                                    <span className="text-primary h5 mr-2">
                                      <FontAwesomeIcon
                                        icon="check-circle"
                                        size="sm"
                                      />
                                    </span>
                                    {service}
                                  </li>
                                ))}
                              </ul>
                              <Button
                                className="mt-4"
                                onClick={() => setModalShow(true)}
                              >
                                {content.text}
                              </Button>
                            </div>
                          </div>
                        </Col>
                      ))}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <PaymentDetailModal
        t={t}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="position-relative-bottom">
        <div className="shape-bottom">
          <svg viewBox="0 0 2880 48" fill="none">
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export const mapStateToProps = (state) => ({
  isLogged: state.connectionReducer.isLogged,
});

export default compose(connect(mapStateToProps))(PriceSection);
