import { FiKey } from 'react-icons/fi';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ConnectionServices } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const ChangePassword = (props) => {
  const { t, user } = props;

  const handleChangePassword = async (values) => {
    let payload = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.confirmNewPassword,
    };
    const { data, error } = await ConnectionServices.CHANGE_PASSWORD(payload);
    if (data) {
      TostifyCustomContainer(
        'success',
        t('common:toast.messages.success'),
        t('profile:toast.password')
      );
      return true;
    }
    if (error) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('profile:toast.password-fail')
      );
      return false;
    }
  };

  return (
    <div className="right-content__profile">
      <div className="card-body">
        <Col xs={12} sm={12} md={12} lg={12} xl={12} className="pl-0">
          <h5 className="text-md-left mt-4">
            {t('profile:right-content.profile.password-form.text')}
          </h5>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            }}
            validationSchema={Yup.object().shape({
              currentPassword: Yup.string()
                .max(255)
                .required(
                  t(
                    'profile:right-content.profile.password-form.validation.current-password-required'
                  )
                ),
              newPassword: Yup.string()
                .max(255)
                .required(
                  t(
                    'profile:right-content.profile.password-form.validation.new-password-required'
                  )
                ),
              confirmNewPassword: Yup.string()
                .when('newPassword', {
                  is: (val) => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref('newPassword')],
                    t(
                      'profile:right-content.profile.password-form.validation.password-not-match'
                    )
                  ),
                })
                .required(
                  t(
                    'profile:right-content.profile.password-form.validation.confirm-password-required'
                  )
                ),
            })}
            onSubmit={async (value, { resetForm }) => {
              let result = await handleChangePassword(value);
              if (result) {
                resetForm();
              }
            }}
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
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Group>
                      <Form.Label>
                        {t(
                          'profile:right-content.profile.password-form.old-password'
                        )}
                      </Form.Label>
                      <div className="profile__input ">
                        <FiKey className="input__icon" size="20px" />
                        <Form.Control
                          type="password"
                          className="form-control input__text"
                          id="currentPassword"
                          onChange={handleChange}
                          value={values.currentPassword}
                          onBlur={handleBlur}
                          maxLength={'30'}
                          isInvalid={Boolean(
                            touched.currentPassword && errors.currentPassword
                          )}
                          placeholder={t(
                            'profile:right-content.profile.password-form.old-password'
                          )}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {touched.currentPassword && errors.currentPassword}
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Group>
                      <Form.Label>
                        {t(
                          'profile:right-content.profile.password-form.new-password'
                        )}
                      </Form.Label>
                      <div className="profile__input ">
                        <FiKey className="input__icon" size="20px" />
                        <Form.Control
                          type="password"
                          id="newPassword"
                          maxLength={'30'}
                          className="form-control input__text"
                          onChange={handleChange}
                          value={values.newPassword}
                          onBlur={handleBlur}
                          isInvalid={Boolean(
                            touched.newPassword && errors.newPassword
                          )}
                          placeholder={t(
                            'profile:right-content.profile.password-form.new-password'
                          )}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {touched.newPassword && errors.newPassword}
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Group>
                      <Form.Label>
                        {t(
                          'profile:right-content.profile.password-form.confirm-password'
                        )}
                      </Form.Label>
                      <div className="profile__input ">
                        <FiKey className="input__icon" size="20px" />
                        <Form.Control
                          type="password"
                          id="confirmNewPassword"
                          maxLength={'30'}
                          className="form-control input__text"
                          onChange={handleChange}
                          value={values.confirmNewPassword}
                          onBlur={handleBlur}
                          isInvalid={Boolean(
                            touched.confirmNewPassword &&
                              errors.confirmNewPassword
                          )}
                          placeholder={t(
                            'profile:right-content.profile.password-form.confirm-password'
                          )}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {touched.confirmNewPassword &&
                            errors.confirmNewPassword}
                        </Form.Control.Feedback>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-2">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                          />{' '}
                          {t(
                            'profile:right-content.profile.password-form.button-save'
                          )}
                        </>
                      ) : (
                        t(
                          'profile:right-content.profile.password-form.button-save'
                        )
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(ChangePassword);
