import { useState, useEffect, Fragment } from 'react';
import { Container, Form, Button, Spinner, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SectionHeading, CustomFormControl } from 'components/common';
import { connect } from 'react-redux';
import useEmail from 'hooks/useEmail';

const ContactForm = (props) => {
  const { t, user } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [sendEmail] = useEmail(t);
  const [inputValues, setInputValues] = useState({
    name: user?.userInfo?.firstName
      ? `${user?.userInfo?.firstName} ${user?.userInfo?.lastName}`
      : '',
    contactEmail: user?.email || '',
    subject: '',
    message: '',
  });

  const infoCardMenu = [
    {
      key: 'location',
      label: t('contact:contact-form.contact.items.item-1.label'),
      description: 'Latvija, Rīga',
      type: 'text',
    },
    {
      key: 'phone',
      label: t('contact:contact-form.contact.items.item-2.label'),
      description: '+371 2222222222',
      type: 'text',
    },
    {
      key: 'email',
      label: t('contact:contact-form.contact.items.item-3.label'),
      description: 'support@placifull.com',
      type: 'link',
    },
    {
      key: 'customer-care',
      label: t('contact:contact-form.contact.items.item-4.label'),
      description: 'customercare@placifull.com',
      type: 'link',
    },
  ];

  const handleOnChange = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let payload = {
      to: 'placifull@placifull.com',
      from: inputValues.name,
      replyTo: inputValues.contactEmail,
      subject: inputValues.subject,
      text: inputValues.message,
    };
    await sendEmail(payload);
    setIsLoading(false);
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
        <Form className="wrapper__form" onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
              <Form.Group>
                <CustomFormControl
                  onChange={handleOnChange}
                  id={'name'}
                  value={inputValues.name}
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
                  onChange={handleOnChange}
                  id={'contactEmail'}
                  value={inputValues.contactEmail}
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
                  onChange={handleOnChange}
                  id={'subject'}
                  value={inputValues.subject}
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
                  value={inputValues.message}
                  valueLength={3000 - inputValues.subject?.length}
                  maxLength={'3000'}
                  onChange={handleOnChange}
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
            disabled={isLoading}
            className="form__button btn-block"
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon="envelope" className="button__icon" />
                <Spinner as="span" animation="border" size="sm" role="status" />
              </>
            ) : (
              <>
                {' '}
                <FontAwesomeIcon
                  icon="envelope"
                  className="button__icon"
                />{' '}
                {t('contact:contact-form.form.submit')}
              </>
            )}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(ContactForm);
