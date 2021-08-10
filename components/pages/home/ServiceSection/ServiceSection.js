import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillBook,
} from 'react-icons/ai';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { CustomFormControl } from 'components/common';
import { JobApplication } from 'services';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

const ServiceSection = (props) => {
  const { t, user } = props;
  const services = [
    {
      key: 0,
      url: 'https://placifull-static.s3.eu-central-1.amazonaws.com/listing_opts.jpg',
      title: t('service-section.services.service-1.name'),
      content: t('service-section.services.service-1.description'),
      learnMore: (
        <div className="learn__more" onClick={() => setListingLearnMore(true)}>
          {t('service-section.services.service-1.open-modal')}
          <FontAwesomeIcon
            icon="arrow-right"
            className="dropdown-icon text-primary"
          />
        </div>
      ),
    },
    {
      key: 1,
      url: 'https://placifull-static.s3.eu-central-1.amazonaws.com/help_us_improve.jpg',
      title: t('service-section.services.service-2.name'),
      content: t('service-section.services.service-2.description'),
      learnMore: (
        <div className="learn__more" onClick={() => setHelpusImprove(true)}>
          {t('service-section.services.service-2.open-modal')}
          <FontAwesomeIcon
            icon="arrow-right"
            className="dropdown-icon text-primary"
          />
        </div>
      ),
    },
    {
      key: 2,
      url: 'https://placifull-static.s3.eu-central-1.amazonaws.com/like_share.jpg',
      title: t('service-section.services.service-3.name'),
      content: t('service-section.services.service-3.description'),
      learnMore: (
        <div className={'about__us__icons'}>
          <div className="instagram">
            <AiFillInstagram />
          </div>
          <div className="facebook">
            <AiFillFacebook />
          </div>
          <div className="twitter">
            <AiFillTwitterSquare />
          </div>
        </div>
      ),
    },
    {
      key: 3,
      url: 'https://placifull-static.s3.eu-central-1.amazonaws.com/make_us_better.jpg',
      title: t('service-section.services.service-4.name'),
      content: t('service-section.services.service-4.description'),
      learnMore: (
        <div className="learn__more" onClick={() => setImproveQuality(true)}>
          {t('service-section.services.service-4.open-modal')}
          <FontAwesomeIcon
            icon="arrow-right"
            className="dropdown-icon text-primary"
          />
        </div>
      ),
    },
    {
      key: 4,
      url: 'https://placifull-static.s3.eu-central-1.amazonaws.com/career.jpg',
      title: t('service-section.services.service-5.name'),
      content: t('service-section.services.service-5.description'),
      learnMore: (
        <div
          className="learn__more"
          onClick={() => setcarrrearOpportunities(true)}
        >
          {t('service-section.services.service-5.open-modal')}
          <FontAwesomeIcon
            icon="arrow-right"
            className="dropdown-icon text-primary"
          />
        </div>
      ),
    },
  ];

  const [listingLearnMore, setListingLearnMore] = useState(false);
  const [helpusImprove, setHelpusImprove] = useState(false);
  const [improveQuality, setImproveQuality] = useState(false);
  const [carrrearOpportunities, setcarrrearOpportunities] = useState(false);

  const [applyForJob, setapplyForJob] = useState(false);
  const [activeItem, setActiveItem] = useState(services[0]);

  /*Modal constant for the about us links start here */
  const LearnMoreListingOpportunity = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {' '}
            <AiFillBook />{' '}
            {t('service-section.services.service-1.modal.header')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {t('service-section.services.service-1.modal.description')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>
            {' '}
            {t('service-section.services.service-1.modal.close-button')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const HelpUsImprove = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {' '}
            <AiFillBook />{' '}
            {t('service-section.services.service-2.modal.header')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {t('service-section.services.service-2.modal.description')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Link href={'/contact'}>
            <Button onClick={props.onHide}>
              {t('service-section.services.service-2.modal.contact-button')}
            </Button>
          </Link>
          <Button onClick={props.onHide}>
            {t('service-section.services.service-2.modal.close-button')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const ImproveQuality = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {' '}
            <AiFillBook />
            {t('service-section.services.service-4.modal.header')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {t('service-section.services.service-4.modal.description')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Link href={'/contact'}>
            <Button onClick={props.onHide}>
              {t('service-section.services.service-4.modal.contact-button')}
            </Button>
          </Link>
          <Button onClick={props.onHide}>
            {t('service-section.services.service-4.modal.close-button')}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const CarrrearOpportunities = (props) => {
    return (
      <div>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {' '}
              <AiFillBook />{' '}
              {t('service-section.services.service-5.modal.header')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p> {t('service-section.services.service-5.modal.description')}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-success"
              onClick={() => handleJobSecondModal()}
            >
              {t('service-section.services.service-5.modal.contact-button')}
            </Button>
            <Button variant="outline-danger" onClick={props.onHide}>
              {t('service-section.services.service-5.modal.close-button')}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  const ApplyForJob = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {' '}
            <AiFillBook />{' '}
            {t('service-section.services.service-5.modal-apply.form.header')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm />
        </Modal.Body>
      </Modal>
    );
  };

  const SignupForm = () => {
    return (
      <Col
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="register-form-container"
      >
        <Formik
          initialValues={{
            firstName: user?.userInfo?.firstName || '',
            lastName: user?.userInfo?.lastName || '',
            email: user?.email || '',
            phone: user?.userInfo?.phone || '',
            applyText: '',
            dreamJob: '',
            salaryExpectation: '',
            positionName: '',
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().max(75).email().required(),
            firstName: Yup.string().max(50).required(),
            lastName: Yup.string().max(50).required(),
            phone: Yup.string().max(23).required(),
            applyText: Yup.string().max(750).required(),
            dreamJob: Yup.string().max(500).required(),
            salaryExpectation: Yup.number().required().positive().integer(),
            positionName: Yup.string().max(50).required(),
          })}
          onSubmit={(value) => handleApplyJob(value)}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="">
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="">
                  <Form.Group>
                    <div className="items__input">
                      <CustomFormControl
                        onChange={handleChange}
                        value={values.firstName}
                        onBlur={handleBlur}
                        maxLength={'33'}
                        isInvalid={Boolean(
                          touched.firstName && errors.firstName
                        )}
                        id="firstName"
                        type="text"
                        className="input__text"
                        label={t(
                          'service-section.services.service-5.modal-apply.form.firstName'
                        )}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="">
                  <Form.Group>
                    <div className="items__input">
                      <CustomFormControl
                        onChange={handleChange}
                        value={values.lastName}
                        maxLength={'33'}
                        onBlur={handleBlur}
                        isInvalid={Boolean(touched.lastName && errors.lastName)}
                        id="lastName"
                        type="text"
                        className="input__text"
                        label={t(
                          'service-section.services.service-5.modal-apply.form.lastName'
                        )}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="">
                  <Form.Group>
                    <div className="items__input">
                      <CustomFormControl
                        onChange={handleChange}
                        value={values.email}
                        maxLength={'75'}
                        onBlur={handleBlur}
                        isInvalid={Boolean(touched.email && errors.email)}
                        id="email"
                        type="text"
                        className="input__text"
                        label={t(
                          'service-section.services.service-5.modal-apply.form.email'
                        )}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className="">
                  <Form.Group>
                    <div className="items__input">
                      <CustomFormControl
                        onChange={handleChange}
                        value={values.phone}
                        onBlur={handleBlur}
                        maxLength={'23'}
                        isInvalid={Boolean(touched.phone && errors.phone)}
                        id="phone"
                        type="text"
                        className="input__text"
                        label={t(
                          'service-section.services.service-5.modal-apply.form.phone'
                        )}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {touched.phone && errors.phone}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                  <Form.Group>
                    <div className="items__input">
                      <CustomFormControl
                        onChange={handleChange}
                        as="textarea"
                        rows={6}
                        type="text"
                        valueLength={500 - values.applyText?.length}
                        maxLength={'500'}
                        style={{ resize: 'vertical', height: 'auto' }}
                        value={values.dreamJob}
                        onBlur={handleBlur}
                        isInvalid={Boolean(touched.dreamJob && errors.dreamJob)}
                        id="dreamJob"
                        type="text"
                        className="input__text"
                        label={t(
                          'service-section.services.service-5.modal-apply.form.dreamJob'
                        )}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="">
                  <Form.Group>
                    <div className="items__input">
                      <CustomFormControl
                        onChange={handleChange}
                        as="textarea"
                        rows={6}
                        type="text"
                        valueLength={500 - values.applyText?.length}
                        maxLength={'500'}
                        style={{ resize: 'vertical', height: 'auto' }}
                        value={values.applyText}
                        onBlur={handleBlur}
                        isInvalid={Boolean(
                          touched.applyText && errors.applyText
                        )}
                        id="applyText"
                        type="text"
                        className="input__text"
                        label={t(
                          'service-section.services.service-5.modal-apply.form.applyText'
                        )}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} className="">
                  <Form.Group>
                    <div className="items__input">
                      <CustomFormControl
                        onChange={handleChange}
                        value={values.positionName}
                        onBlur={handleBlur}
                        maxLength={'75'}
                        isInvalid={Boolean(
                          touched.positionName && errors.positionName
                        )}
                        id="positionName"
                        type="text"
                        className="input__text"
                        label={t(
                          'service-section.services.service-5.modal-apply.form.positionName'
                        )}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} className="">
                  <Form.Group>
                    <div className="items__input">
                      <CustomFormControl
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={Boolean(
                          touched.positionName && errors.positionName
                        )}
                        label={t(
                          'service-section.services.service-5.modal-apply.form.salary'
                        )}
                        id="salaryExpectation"
                        value={values.salaryExpectation}
                        type="text"
                        maxLength={6}
                        prepend={{ values: ['€'] }}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  className="wrapper__items mb-0"
                >
                  <Button
                    className="btn-block"
                    type="submit"
                    id="applyForJob"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                        />{' '}
                        {t('form.submit')}
                      </>
                    ) : (
                      t(
                        'service-section.services.service-5.modal-apply.form.apply'
                      )
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    );
  };
  /*Modal Constants end here */

  const handleJobSecondModal = () => {
    setcarrrearOpportunities(false);
    setapplyForJob(true);
  };

  const handleApplyJob = async (values) => {
    try {
      let payload = {
        email: values.email,
        phone: values.phone,
        applyText: values.applyText,
        dreamJob: values.dreamJob,
        salaryExpectation: values.salaryExpectation,
        positionName: values.positionName,
        firstName: values.firstName,
        lastName: values.lastName,
      };

      const { data, error } = await JobApplication.CREATE(payload);
      if (error) throw error?.message;
    } catch (e) {
      toast.error(e);
    }
    setapplyForJob(false);
  };

  return (
    <div id="about-us">
      <div className="home-container__service-section">
        <Container>
          <Row className="service-section__title">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="section-title text-center text-md-center">
                <h3 className="title mb-4 font-weight-bold">
                  {t('service-section.head.line-1')}
                </h3>
                <p className="text-muted mb-0 para-desc">
                  {t('service-section.head.line-2')}{' '}
                  <span className="text-primary font-weight-bold">
                    {t('service-section.head.line-3')}
                  </span>{' '}
                  {t('service-section.head.line-4')}
                </p>
              </div>
            </Col>
          </Row>
          <Row className="service-section__service">
            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-1 pt-0 ">
              <div className="service__option nav nav-pills nav-justified justify-content-center flex-row rounded  p-3 mb-0">
                {services.map((item) => (
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
          <Row className="service-section__service">
            <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-2 pt-2">
              <div className="tab-content">
                <div className="service__content tab-pane fade bg-white show active p-4 rounded shadow">
                  <Row>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <img
                        src={activeItem.url}
                        className="img-fluid rounded shadow"
                        alt="Service Url"
                      />
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      className="service__contentText"
                    >
                      <div className="mt-4">
                        <h5>{activeItem.title}</h5>
                        <p className="text-muted my-3">{activeItem.content}</p>
                        <div>{activeItem.learnMore}</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <LearnMoreListingOpportunity
          show={listingLearnMore}
          onHide={() => setListingLearnMore(false)}
        />
        <HelpUsImprove
          show={helpusImprove}
          onHide={() => setHelpusImprove(false)}
        />
        <ImproveQuality
          show={improveQuality}
          onHide={() => setImproveQuality(false)}
        />
        <CarrrearOpportunities
          show={carrrearOpportunities}
          onHide={() => setcarrrearOpportunities(false)}
        />
        <ApplyForJob show={applyForJob} onHide={() => setapplyForJob(false)} />
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(ServiceSection);
