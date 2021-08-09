import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import { FiKey } from 'react-icons/fi';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ConnectionServices } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const ResetPasswordForm = (props) => {
  let { t, code } = props;
  const router = useRouter();
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  const handleResetPassword = async (payload) => {
    payload.code = code;
    setErrorText('');
    setSuccessText('');
    const { data, error } = await ConnectionServices.RESET_PASSWORD(payload);
    if (data) {
      TostifyCustomContainer(
        'success',
        t('common:toast.messages.success'),
        t('reset-password:success-text')
      );
      setSuccessText(t('reset-password:success-text'));
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000);
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
      className="forgot-password-form-container"
    >
      <div className="forgot-password-form__content">
        <div className="content__wrapper">
          <h4 className="card-title text-center">
            {t('reset-password:heading')}
          </h4>
          <p className="wrapper__description">
            {t('reset-password:description')}
          </p>
          <Formik
            initialValues={{
              passwordConfirmation: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .max(255)
                .required(t('reset-password:form.error.new-password-required')),
              passwordConfirmation: Yup.string()
                .when('password', {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    t('reset-password:form.error.password-not-match')
                  ),
                })
                .required(
                  t('reset-password:form.error.confirm-password-required')
                ),
            })}
            onSubmit={(value) => handleResetPassword(value)}
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
                        {t('reset-password:form.password')}{' '}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="items__input">
                        <FiKey className="input__icon" size="20px" />
                        <Form.Control
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={Boolean(
                            touched.password && errors.password
                          )}
                          value={values.password}
                          name="password"
                          id="password"
                          type="password"
                          className="input__text"
                          placeholder={t(
                            'reset-password:form.password-placeholder'
                          )}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {touched.password && errors.password}
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        {t('reset-password:form.confirmPassword')}{' '}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="items__input">
                        <FiKey className="input__icon" size="20px" />
                        <Form.Control
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={Boolean(
                            touched.passwordConfirmation &&
                              errors.passwordConfirmation
                          )}
                          value={values.passwordConfirmation}
                          name="passwordConfirmation"
                          id="passwordConfirmation"
                          type="password"
                          className="input__text"
                          placeholder={t(
                            'reset-password:form.confirmPassword-placeholder'
                          )}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {touched.passwordConfirmation &&
                            errors.passwordConfirmation}
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
                          {t('reset-password:form.submit')}
                        </>
                      ) : (
                        t('reset-password:form.submit')
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
                        {t('reset-password:account')}
                      </small>{' '}
                      <Link href="/sign-in">
                        <a className="text-dark font-weight-bold">
                          {t('reset-password:form.sign-in')}
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

export default ResetPasswordForm;
