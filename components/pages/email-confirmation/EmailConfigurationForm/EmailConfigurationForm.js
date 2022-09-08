import { useState } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { FaRegEnvelope } from 'react-icons/fa';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ConnectionServices } from 'services';
const envelope =
  'https://placifull-static.s3.eu-central-1.amazonaws.com/envelope.webp';

const EmailConfigurationForm = (props) => {
  let { t } = props;
  //const router = useRouter();
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  const handleForgotPassword = async (payload) => {
    setErrorText('');
    setSuccessText('');
    const { data, error } = await ConnectionServices.SEND_EMAIL_CONFIRMATION(
      payload
    );
    if (data) {
      setSuccessText(t('email-confirmed:form.success-text'));
      //router.push('/sign-in');
    }
    if (error) {
      setErrorText(error);
    }
  };

  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={4}
      xl={4}
      className="email-confirmation-form-container"
    >
      <div className="email-confirmation-form__content">
        <div className="content__wrapper">
          <div className={'envelope__container'}>
            <img src={envelope} className="envelope__avatar" alt="envelope" />
          </div>
          <h4 className="card-title text-center">
            {t('email-confirmed:heading')}
          </h4>
          <p className="wrapper__description">
            {t('email-confirmed:description')}
          </p>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .max(255)
                .email(t('email-confirmed:form.error.email-invalid'))
                .required(t('email-confirmed:form.error.email-required')),
            })}
            onSubmit={(value) => handleForgotPassword(value)}
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
                <Row className="mt-4">
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className="wrapper__items"
                  >
                    <Form.Group>
                      <Form.Label>
                        {t('email-confirmed:form.heading')}{' '}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="items__input">
                        <FaRegEnvelope className="input__icon" size="20px" />
                        <Form.Control
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={Boolean(touched.email && errors.email)}
                          value={values.email}
                          name="email"
                          id="email"
                          type="email"
                          className="input__text"
                          placeholder={t('email-confirmed:form.placeholder')}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {touched.email && errors.email}
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className="wrapper__items"
                  >
                    <div className="success-text">
                      {t(`email-confirmed:${successText}`)}
                    </div>
                    <div className="error-text">{t(`error:${errorText}`)}</div>
                    <Button type="submit" className="btn-block">
                      {isSubmitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                          />{' '}
                          {t('email-confirmed:form.submit')}
                        </>
                      ) : (
                        t('email-confirmed:form.submit')
                      )}
                    </Button>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className="text-center"
                  >
                    <p className="mb-0 mt-3">
                      <small className="text-dark mr-2">
                        {t('email-confirmed:form.confirmed')}
                      </small>{' '}
                      <Link href="/sign-in">
                        <a className="text-dark font-weight-bold">
                          {t('email-confirmed:form.sign-in')}
                        </a>
                      </Link>
                    </p>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Col>
  );
};

export default EmailConfigurationForm;
