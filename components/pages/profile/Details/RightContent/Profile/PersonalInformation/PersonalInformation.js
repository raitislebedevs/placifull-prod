import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { FiUserCheck, FiMessageCircle, FiPhone } from 'react-icons/fi';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserInfoServices } from 'services';
import { setUser } from 'actions';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const PersonalInformation = (props) => {
  const { t, user, dispatch } = props;

  const handleUpdateProfile = async (values) => {
    //We Set the value for the Payload, values which will be sent to Strapi API
    let payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      description: values.description,
      socialLinks: {
        facebookUrl: values.facebookUrl,
        youtubeUrl: values.youtubeUrl,
        instagramUrl: values.instagramUrl,
        twitterUrl: values.twitterUrl,
      },
    };
    //Here we actually send the Payload to Update_me Function, which is stored in
    const { data, error } = await UserInfoServices.UPDATE_ME(payload);
    if (data) {
      TostifyCustomContainer(
        'success',
        t('common:toast.messages.success'),
        t('profile:toast.succes')
      );
      dispatch(
        setUser({
          ...user,
          userInfo: data,
        })
      );
    }

    if (error) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('profile:toast.fail')
      );
    }
  };

  return (
    <div className="right-content__profile">
      <div className="card-body">
        <h5 className="text-md-left">
          {t('profile:right-content.profile.personal-details.heading')}
        </h5>
        <Formik
          //We initilize the FormIK values to be set to '', for warning issues, so that it treats it as strings.
          initialValues={{
            firstName: user?.userInfo?.firstName || '',
            lastName: user?.userInfo?.lastName || '',
            email: user?.email || '',
            phone: user?.userInfo?.phone || '',
            description: user?.userInfo?.description || '',
            facebookUrl: user?.userInfo?.socialLinks?.facebookUrl || '',
            youtubeUrl: user?.userInfo?.socialLinks?.facebookUrl || '',
            instagramUrl: user?.userInfo?.socialLinks?.facebookUrl || '',
            twitterUrl: user?.userInfo?.socialLinks?.facebookUrl || '',
          }}
          //Validation is set up for each object, what happens if it is not validated?
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .max(255)
              .required(
                t('profile:right-content.profile.validation.first-name')
              ),
            lastName: Yup.string()
              .max(255)
              .required(
                t('profile:right-content.profile.validation.last-name')
              ),
          })}
          onSubmit={(value) => handleUpdateProfile(value)}
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
              <Row
                className="mt-4"
                itemScope
                itemType="https://schema.org/Person"
              >
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Group>
                    <Form.Label>
                      {t(
                        'profile:right-content.profile.personal-details.labels.first-name'
                      )}
                    </Form.Label>
                    <div className="profile__input">
                      <AiOutlineUser className="input__icon" size="20px" />
                      <Form.Control
                        itemProp="givenName"
                        name="firstName"
                        id="firstName"
                        type="text"
                        className="input__text"
                        onChange={handleChange}
                        maxLength={'33'}
                        value={values.firstName}
                        onBlur={handleBlur}
                        isInvalid={Boolean(
                          touched.firstName && errors.firstName
                        )}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {touched.firstName && errors.firstName}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Group>
                    <Form.Label>
                      {t(
                        'profile:right-content.profile.personal-details.labels.last-name'
                      )}
                    </Form.Label>
                    <div className="profile__input">
                      <FiUserCheck className="input__icon" size="20px" />
                      <Form.Control
                        itemProp="familyName"
                        name="lastName"
                        id="lastName"
                        type="text"
                        maxLength={'33'}
                        className="form-control input__text"
                        onChange={handleChange}
                        value={values.lastName}
                        onBlur={handleBlur}
                        isInvalid={Boolean(touched.lastName && errors.lastName)}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>
                        {touched.lastName && errors.lastName}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Group>
                    <Form.Label>
                      {t(
                        'profile:right-content.profile.personal-details.labels.email'
                      )}
                    </Form.Label>
                    <div className="profile__input">
                      <AiOutlineMail className="input__icon" size="20px" />
                      <Form.Control
                        itemProp="email"
                        name="email"
                        id="email"
                        type="email"
                        readOnly
                        value={values.email}
                        className="form-control input__text"
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Form.Group>
                    <Form.Label>
                      {t(
                        'profile:right-content.profile.personal-details.labels.phone-number'
                      )}
                    </Form.Label>
                    <div className="profile__input" itemProp="telephone">
                      <FiPhone className="input__icon" size="20px" />
                      <Form.Control
                        name="phone"
                        id="phone"
                        type="text"
                        className="form-control input__text"
                        maxLength={'23'}
                        onChange={handleChange}
                        value={values.phone}
                        onBlur={handleBlur}
                        placeholder={t(
                          'profile:right-content.profile.personal-details.labels.phone-number'
                        )}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Form.Group>
                    <Form.Label>
                      {t(
                        'profile:right-content.profile.personal-details.labels.about-me-heading'
                      )}
                    </Form.Label>
                    <div className="profile__input form-control-container">
                      <FiMessageCircle className="input__icon" size="20px" />
                      <Form.Control
                        name="description"
                        rows={5}
                        itemProp="description"
                        id="description"
                        type="text"
                        as="textarea"
                        maxLength={'2000'}
                        style={{ height: 'auto' }}
                        className="form-control input__text"
                        onChange={handleChange}
                        value={values.description}
                        onBlur={handleBlur}
                        placeholder={t(
                          'profile:right-content.profile.personal-details.labels.about-me'
                        )}
                      />
                      <>
                        <div className={'max__length__counter'}>
                          {2000 - values.description?.length}
                        </div>
                      </>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-4">
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
                          'profile:right-content.profile.personal-details.button-save'
                        )}
                      </>
                    ) : (
                      t(
                        'profile:right-content.profile.personal-details.button-save'
                      )
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(PersonalInformation);
