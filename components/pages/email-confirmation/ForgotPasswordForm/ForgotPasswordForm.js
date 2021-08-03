import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { FaRegEnvelope } from 'react-icons/fa';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ConnectionServices } from 'services';
import * as Cookies from 'js-cookie';

const ForgotPasswordForm = (props) => {
  let { t, isLogged, dispatch } = props;
  const router = useRouter();
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  const handleForgotPassword = async (payload) => {
    setErrorText('');
    setSuccessText('');
    const { data, error } = await ConnectionServices.FORGOT_PASSWORD(payload);
    if (data) {
      console.log(data);
      setSuccessText(t('forgot-password:form.success-text'));
      router.push('/');
    }
    if (error) {
      setErrorText(error);
    }
  };

  const token = Cookies.get('access_token');

  if (token) {
    router.push('/');
  }

  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={4}
      xl={4}
      className="forgot-password-form-container"
    >
      <div className="forgot-password-form__content">
        <div className="content__wrapper">
          <h4 className="card-title text-center">
            {t('forgot-password:heading')}
          </h4>
          <p className="wrapper__description">
            {t('forgot-password:description')}
          </p>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .max(255)
                .email(t('forgot-password:form.error.email-invalid'))
                .required(t('forgot-password:form.error.password-required')),
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
                        {t('forgot-password:form.email')}{' '}
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
                          placeholder={t(
                            'forgot-password:form.email-placeholder'
                          )}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {touched.identifier && errors.identifier}
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
                    <div className="success-text">{t(successText)}</div>
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
                          {t('forgot-password:form.submit')}
                        </>
                      ) : (
                        t('forgot-password:form.submit')
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
                        {t('forgot-password:form.account')}
                      </small>{' '}
                      <Link href="/sign-in">
                        <a className="text-dark font-weight-bold">
                          {t('forgot-password:sign-in')}
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

export default ForgotPasswordForm;
