import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { FiKey } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ConnectionServices, UserServices } from 'services';
import { loginSuccess } from 'actions';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { LoadingOverlay } from 'components/common';
import TostifyCustomContainer from 'components//common/TostifyCustomContainer/TostifyCustomContainer';

const SigninForm = (props) => {
  const { t, isLoadingUser, dispatch, user, isLoadingRouter } = props;
  const router = useRouter();
  const [errorText, setErrorText] = useState('');

  const handleSignin = async (payload) => {
    setErrorText('');
    try {
      const { data, error } = await ConnectionServices.LOGIN(payload);
      if (data) {
        TostifyCustomContainer(
          'success',
          t('common:toast.messages.success'),
          t('signin:form.success')
        );
        setTimeout(() => {
          dispatch(loginSuccess(data?.user));
          Cookies.set('access_token', data?.jwt);
          router.push('/profile');
        }, 1000);
      }

      if (error) {
        setErrorText(error);
      }
    } catch (error) {
      setErrorText(t('error:server-not-reached'));
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
      lg={5}
      xl={4}
      className="signin-form-container"
    >
      <div className="signin-form__content">
        <div className="content__wrapper">
          <h4 className="card-title text-center">{t('signin:heading')}</h4>
          <Formik
            initialValues={{
              identifier: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              identifier: Yup.string()
                .max(255)
                .email(t('signin:form.error.email-invalid'))
                .required(t('signin:form.error.email-required')),
              password: Yup.string()
                .max(255)
                .required(t('signin:form.error.password-required')),
            })}
            onSubmit={(value) => handleSignin(value)}
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
                        {t('signin:form.your-email')}{' '}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="items__input">
                        <AiOutlineUser className="input__icon" size="20px" />
                        <Form.Control
                          onChange={handleChange}
                          value={values.identifier}
                          onBlur={handleBlur}
                          isInvalid={Boolean(
                            touched.identifier && errors.identifier
                          )}
                          id="identifier"
                          type="email"
                          className="input__text"
                          placeholder={t('signin:form.email')}
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
                    <Form.Group>
                      <Form.Label>
                        {t('signin:form.password')}{' '}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="items__input">
                        <FiKey className="input__icon" size="20px" />
                        <Form.Control
                          onChange={handleChange}
                          value={values.password}
                          onBlur={handleBlur}
                          isInvalid={Boolean(
                            touched.password && errors.password
                          )}
                          id="password"
                          type="password"
                          className="form-control input__text"
                          placeholder={t('signin:form.password')}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
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
                    <div className="d-flex justify-content-between">
                      <Form.Group controlId="remember">
                        <Form.Check
                          id="rememberMe"
                          type="checkbox"
                          label={t('signin:form.remember-me')}
                        />
                      </Form.Group>
                      <p className="forgot-pass mb-0">
                        <Link href="/forgot-password">
                          <a className="text-dark font-weight-bold">
                            {t('signin:form.forgot-password')}
                          </a>
                        </Link>
                      </p>
                    </div>
                  </Col>
                  <Col
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className="wrapper__items"
                  >
                    <div className="error-text">{t(`error:${errorText}`)}</div>
                    <Button
                      className="btn-block"
                      id="signIn"
                      type="submit"
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
                          {t('signin:form.submit')}
                        </>
                      ) : (
                        t('signin:form.submit')
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
                    {/* <h6>{t('signin:heading-texts.or-login')}</h6>
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6} xl={6} className="mt-3">
                        <Button
                          variant="outline-secondary"
                          className="items__button-social"
                          id="facebookSignIn"
                          onClick={() => {
                            handleSigninProvider('facebook');
                          }}
                        >
                          <FaFacebook
                            size="20px"
                            className="button-social button-social--facebook"
                          />{' '}
                          <p>{t('signin:heading-texts.facebook')}</p>
                        </Button>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6} xl={6} className="mt-3">
                        <Button
                          variant="outline-secondary"
                          className="items__button-social btn"
                          id="googleSigIn"
                          onClick={() => {
                            handleSigninProvider('google');
                          }}
                        >
                          <FcGoogle size="20px" className="button-social" />
                          <p>{t('signin:heading-texts.google')}</p>
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
                        {t('signin:form.not-account')}
                      </small>{' '}
                      <Link href="/register">
                        <a className="text-dark font-weight-bold">
                          {t('signin:form.sign-up')}
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

export const mapStateToProps = (state) => ({
  isLogged: state.connectionReducer.isLogged,
  user: state.connectionReducer.user,
  isLoadingUser: state.connectionReducer.isLoadingUser,
  isLoadingRouter: state.connectionReducer.isLoadingRouter,
});

export default connect(mapStateToProps)(SigninForm);
