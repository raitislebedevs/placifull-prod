import { useState, useEffect, Fragment } from 'react';
import { Container, Form, Button, Spinner, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SectionHeading, CustomFormControl } from 'components/common';
import { connect } from 'react-redux';
import useEmail from 'hooks/useEmail';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { infoCard } from '../Constants/infoCard';

const ContactForm = (props) => {
  const { t, user } = props;
  const [sendEmail] = useEmail(t);
  const infoCardMenu = infoCard(t);

  const handleSubmit = async (values) => {
    let payload = {
      to: 'support@placifull.com',
      from: values.name,
      replyTo: values.contactEmail,
      subject: values.subject,
      text: values.message,
    };
    try {
      await sendEmail(payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="contact-container__contact-form">
      <div className="contact-form__contact-wrapper">
        <SectionHeading className="contact-wrapper__heading">
          {t('contact:contact-form.contact.heading')}
        </SectionHeading>
        <address className="contact-wrapper__info-card">
          {infoCardMenu.map((item, idx, arr) => (
            <Fragment key={item.key}>
              <p className="wrapper__label">{item.label}</p>
              {item.type === 'link' ? (
                <p className="wrapper__text">
                  <a href="#">{item.description}</a>
                </p>
              ) : (
                <p className="wrapper__text">{item.description}</p>
              )}
              {idx !== arr.length - 1 && <br />}
            </Fragment>
          ))}
        </address>
      </div>
      <div className="contact-form__form-wrapper">
        <SectionHeading className="form-wrapper__heading">
          {t('contact:contact-form.form.heading')}
        </SectionHeading>
        <Formik
          initialValues={{
            name: user?.userInfo?.firstName
              ? `${user?.userInfo?.firstName} ${user?.userInfo?.lastName}`
              : '',
            contactEmail: user?.email || '',
            subject: '',
            message: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(57).required(),
            contactEmail: Yup.string().max(50).email().required(),
            subject: Yup.string().max(50).required(),
            message: Yup.string().max(300).required(),
          })}
          onSubmit={(value) => handleSubmit(value)}
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
            <Form className={'wrapper__form'} onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Group>
                    <CustomFormControl
                      onChange={handleChange}
                      id={'name'}
                      value={values.name}
                      onBlur={handleBlur}
                      isInvalid={Boolean(touched.name && errors.name)}
                      maxLength={'42'}
                      type="text"
                      autoComplete="current-text"
                      label={t('contact:contact-form.form.name')}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Group>
                    <CustomFormControl
                      onChange={handleChange}
                      id={'contactEmail'}
                      value={values.contactEmail}
                      isInvalid={Boolean(
                        touched.contactEmail && errors.contactEmail
                      )}
                      onBlur={handleBlur}
                      maxLength={'75'}
                      type="contactEmail"
                      autoComplete="current-text"
                      label={t('contact:contact-form.form.email')}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Group>
                    <CustomFormControl
                      onChange={handleChange}
                      id={'subject'}
                      value={values.subject}
                      isInvalid={Boolean(touched.subject && errors.subject)}
                      onBlur={handleBlur}
                      maxLength={'25'}
                      type="text"
                      label={t('contact:contact-form.form.subject')}
                      autoComplete="current-text"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <CustomFormControl
                      as="textarea"
                      rows={6}
                      id={'message'}
                      value={values.message}
                      valueLength={3000 - values.message?.length}
                      maxLength={'3000'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={Boolean(touched.message && errors.message)}
                      type="text"
                      style={{ height: 'auto' }}
                      label={t('contact:contact-form.form.message')}
                      autoComplete="current-text"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="form__button btn-block"
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon="envelope" className="button__icon" />
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon="envelope" className="button__icon" />
                    {t('contact:contact-form.form.submit')}
                  </>
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(ContactForm);
