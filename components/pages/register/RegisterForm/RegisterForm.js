import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col, FormCheck, Spinner } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { FiKey } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { FaRegEnvelope } from 'react-icons/fa';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ConnectionServices } from 'services';
import { LoadingOverlay } from 'components/common';
import { connect } from 'react-redux';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { referralCode } from 'utils/standaloneFunctions';

const RegisterForm = (props) => {
  const { t, isLoadingUser, dispatch, user, isLoadingRouter } = props;
  const router = useRouter();
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  const handleRegister = async (values) => {
    setErrorText('');
    let payload = {
      username: values.email,
      email: values.email,
      password: values.password,
      confirmed: false,
      userInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      curriculumVitae: {
        PersonalDetails: {
          cvFirstName: values.firstName,
          cvLasttName: values.lastName,
          cvPersonalEmail: values.email,
        },
      },
      referralProgram: {
        referralCode: referralCode(),
      },
    };

    try {
      const { data, error } = await ConnectionServices.REGISTER(payload);
      if (data) {
        TostifyCustomContainer(
          'success',
          t('common:toast.messages.success'),
          t('register:success-text')
        );
        setTimeout(() => {
          router.push('/sign-in');
        }, 1500);
      }
      if (error) {
        setErrorText(error);
        console.log(error);
      }
    } catch (error) {
      setErrorText(error);
    }
  };

  const handleSigninProvider = (provider) => {
    ConnectionServices.REDIRECT_PROVIDER(provider);
  };

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user]);

  if (isLoadingUser || isLoadingRouter) {
    return <LoadingOverlay />;
  }

  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={4}
      xl={4}
      className="register-form-container"
    >
      <div className="register-form__content">
        <div className="content__wrapper">
          <h4 className="card-title text-center">{t('register:heading')}</h4>
          <Formik
            initialValues={{
              acceptTerms: false,
              email: '',
              password: '',
              confirmPassword: '',
              firstName: '',
              lastName: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .max(255)
                .email(t('register:form.error.email-invalid'))
                .required(t('register:form.error.email-required')),
              password: Yup.string()
                .max(255)
                .required(t('register:form.error.password-required')),
              firstName: Yup.string()
                .max(255)
                .required(t('register:form.error.first-name-required')),
              lastName: Yup.string()
                .max(255)
                .required(t('register:form.error.last-name-required')),
              confirmPassword: Yup.string()
                .when('password', {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    t('register:form.error.password-not-match')
                  ),
                })
                .required(t('register:form.error.confirm-password-required')),
              acceptTerms: Yup.bool().oneOf([true]),
            })}
            onSubmit={(value) => handleRegister(value)}
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
              <div itemScope itemType="https://schema.org/Person">
                <Form onSubmit={handleSubmit}>
                  <Row className="mt-4">
                    <Col
                      md={6}
                      lg={6}
                      xl={6}
                      xs={6}
                      sm={6}
                      className="wrapper__items"
                    >
                      <Form.Group>
                        <Form.Label>
                          {t('register:form.first-name')}{' '}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="items__input">
                          <AiOutlineUser className="input__icon" size="20px" />
                          <div itemProp="givenName">
                            <Form.Control
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
                              placeholder={t('register:form.first-name')}
                            />
                          </div>
                          <Form.Control.Feedback
                            id={'firstName-tooltip'}
                            type="invalid"
                            tooltip
                          >
                            {touched.firstName && errors.firstName}
                          </Form.Control.Feedback>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col
                      md={6}
                      lg={6}
                      xl={6}
                      xs={6}
                      sm={6}
                      className="wrapper__items"
                    >
                      <Form.Group>
                        <Form.Label>
                          {t('register:form.last-name')}{' '}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="items__input">
                          <AiOutlineUser className="input__icon" size="20px" />
                          <div itemProp="familyName">
                            <Form.Control
                              onChange={handleChange}
                              value={values.lastName}
                              onBlur={handleBlur}
                              maxLength={'33'}
                              isInvalid={Boolean(
                                touched.lastName && errors.lastName
                              )}
                              id="lastName"
                              type="text"
                              className="input__text"
                              placeholder={t('register:form.last-name')}
                            />
                          </div>
                          <Form.Control.Feedback
                            id={'lastName-tooltip'}
                            type="invalid"
                            tooltip
                          >
                            {touched.lastName && errors.lastName}
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
                      <Form.Group>
                        <Form.Label>
                          {t('register:form.your-email')}{' '}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="items__input">
                          <FaRegEnvelope className="input__icon" size="20px" />
                          <div itemProp="email">
                            <Form.Control
                              onChange={handleChange}
                              value={values.email}
                              onBlur={handleBlur}
                              maxLength={'50'}
                              isInvalid={Boolean(touched.email && errors.email)}
                              id="email"
                              type="text"
                              className="input__text"
                              placeholder={t('register:form.email')}
                            />
                          </div>
                          <Form.Control.Feedback
                            id={'email-tooltip'}
                            type="invalid"
                            tooltip
                          >
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
                      <Form.Group>
                        <Form.Label>
                          {t('register:form.password')}{' '}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="items__input">
                          <FiKey className="input__icon" size="20px" />
                          <Form.Control
                            onChange={handleChange}
                            value={values.password}
                            maxLength={'33'}
                            onBlur={handleBlur}
                            isInvalid={Boolean(
                              touched.password && errors.password
                            )}
                            id="password"
                            type="password"
                            className="form-control input__text"
                            placeholder={t('register:form.password')}
                          />
                          <Form.Control.Feedback
                            id={'password-tooltip'}
                            type="invalid"
                            tooltip
                          >
                            {touched.password && errors.password}
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
                      <Form.Group>
                        <Form.Label>
                          {t('register:form.confirm-password')}{' '}
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <div className="items__input">
                          <FiKey className="input__icon" size="20px" />
                          <Form.Control
                            onChange={handleChange}
                            value={values.confirmPassword}
                            onBlur={handleBlur}
                            maxLength={'33'}
                            isInvalid={Boolean(
                              touched.confirmPassword && errors.confirmPassword
                            )}
                            id="confirmPassword"
                            type="password"
                            className="form-control input__text"
                            placeholder={t('register:form.confirm-password')}
                          />
                          <Form.Control.Feedback
                            id={'confirmPassword-tooltip'}
                            type="invalid"
                            tooltip
                          >
                            {touched.confirmPassword && errors.confirmPassword}
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
                      <div className="d-flex justify-content-between">
                        <Form.Group controlId="terms">
                          <FormCheck>
                            <div className="items__input">
                              <FormCheck.Input
                                onChange={handleChange}
                                value={values.confirmPassword}
                                onBlur={handleBlur}
                                type="checkbox"
                                id="acceptTerms"
                                value={values.acceptTerms}
                              />
                              <FormCheck.Label>
                                {t('register:form.terms-text')}{' '}
                                <Link href="/terms">
                                  <a className="font-weight-bold">
                                    {t('register:form.terms-link')}
                                  </a>
                                </Link>
                              </FormCheck.Label>
                              <div
                                id={'acceptTerms-tooltip'}
                                className="text-danger"
                              >
                                {!Boolean(
                                  touched.acceptTerms && errors.acceptTerms
                                ) || t('register:form.error.accept-terms')}
                              </div>
                            </div>
                          </FormCheck>
                        </Form.Group>
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className="wrapper__items mb-0"
                    >
                      <div className="success-text">{t(successText)}</div>
                      <div className="error-text">
                        {t(`error:${errorText}`)}
                      </div>
                      <Button
                        className="btn-block"
                        type="submit"
                        id="registerNewUser"
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
                            {t('register:form.submit')}
                          </>
                        ) : (
                          t('register:form.submit')
                        )}
                      </Button>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      className="wrapper__items mt-4 text-center"
                    >
                      {/* <h6>{t('authentication:heading-texts.or-signup')}</h6>
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6} xl={6} className="mt-3">
                        <Button
                          variant="outline-secondary"
                          className="items__button-social"
                          id="facebookSignup"
                          onClick={() => {
                            handleSigninProvider('facebook');
                          }}
                        >
                          <FaFacebook
                            size="20px"
                            className="button-social button-social--facebook"
                          />{' '}
                          <p>{t('authentication:heading-texts.facebook')}</p>
                        </Button>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6} xl={6} className="mt-3">
                        <Button
                          variant="outline-secondary"
                          id="googleSignup"
                          className="items__button-social btn"
                          onClick={() => {
                            handleSigninProvider('google');
                          }}
                        >
                          <FcGoogle size="20px" className="button-social" />
                          <p>{t('authentication:heading-texts.google')}</p>
                        </Button>
                      </Col>
                    </Row> */}
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
                          {t('register:account')}
                        </small>{' '}
                        <Link href="/sign-in">
                          <a className="text-dark font-weight-bold">
                            {t('register:sign-in')}
                          </a>
                        </Link>
                      </p>
                    </Col>
                  </Row>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </Col>
  );
};

export const mapStateToProps = (state) => ({
  isLogged: state.connectionReducer.isLogged,
  user: state.connectionReducer.user,
  isLoadingUser: state.connectionReducer.isLoadingUser,
  isLoadingRouter: state.connectionReducer.isLoadingRouter,
});

export default connect(mapStateToProps)(RegisterForm);
