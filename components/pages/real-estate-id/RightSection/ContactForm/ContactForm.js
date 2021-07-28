import { useState } from 'react';
import { SubPageHeading } from 'components/common';
import { Form, Button, Spinner } from 'react-bootstrap';
import { formatPhoneNumber } from 'utils/standaloneFunctions';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { CommonServices } from 'services';
import validation from './validation';
import { connect } from 'react-redux';

const ContactForm = (props) => {
  const { t, listingItem, user } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    fullName: user?.userInfo?.firstName
      ? `${user?.userInfo?.firstName} ${user?.userInfo?.lastName}`
      : '',
    phoneNumber: user?.userInfo?.phone || '',
    emailId: user?.email || '',
    message: '',
  });

  const handleOnChange = (event) => {
    const value = event.target.value;
    const id = event.target.id;
    setInputValues({ ...inputValues, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!listingItem?.email) {
      setIsLoading(false);
      TostifyCustomContainer('error', t('common:toast.no-email'));
      return TostifyCustomContainer(
        'error',
        t('common:toast.contact-directly')
      );
    }

    const { errors } = await validation(inputValues, t);
    if (errors) {
      errors.forEach((element) => {
        TostifyCustomContainer('info', element);
      });
      setIsLoading(false);
      return;
    }

    try {
      let payload = {
        to: 'raitis.lebedevs@gmail.com', //listingItem.email,
        from: 'Placifull Team <placifull@placifull.com>',
        replyTo: inputValues.emailId,
        subject: `${inputValues.fullName}[${inputValues.phoneNumber}] is interested in ${listingItem.name}`,
        text: inputValues.message,
      };
      const { data, error } = await CommonServices.SEND_EMAIL(payload);
      if (error) throw error?.message;

      TostifyCustomContainer('success', t('common:toast.email-send'));
    } catch (e) {
      TostifyCustomContainer('error', t('common:toast.not-send'));
      TostifyCustomContainer('error', t('common:toast.contact-directly'));
    }

    setIsLoading(false);
  };

  const facebookLink = () => {
    if (listingItem?.socialLinks?.facebookLink)
      return (
        <p>
          {' '}
          <a href={`${listingItem?.socialLinks?.facebookLink}`}>
            {t('common:social.facebook')}
          </a>
        </p>
      );
  };
  const instagramLink = () => {
    if (listingItem?.socialLinks?.instagramLink)
      return (
        <p>
          {' '}
          <a href={`${listingItem?.socialLinks?.instagramLink}`}>
            {t('common:social.instagram')}
          </a>
        </p>
      );
  };

  const youtubeLink = () => {
    if (listingItem?.socialLinks?.youtubeLink)
      return (
        <p>
          {' '}
          <a href={listingItem?.socialLinks?.youtubeLink}>
            {t('common:social.youtube')}
          </a>
        </p>
      );
  };

  const twitterLink = () => {
    if (listingItem?.socialLinks?.twitterLink)
      return (
        <p>
          <a href={listingItem?.socialLinks?.twitterLink}>
            {t('common:social.twitter')}
          </a>
        </p>
      );
  };

  return (
    <div className="contact__form">
      <SubPageHeading className="contact-form__heading">
        {t('real-estate-detail:contact-form.heading')}
      </SubPageHeading>
      <div className="contact__information text-center">
        {facebookLink()} {instagramLink()} {youtubeLink()} {twitterLink()}
        <p className="info">{listingItem?.email}</p>
        <p>+ {formatPhoneNumber(listingItem?.phone)}</p>
        <p className="info">{listingItem?.websiteLink}</p>
      </div>
      <Form className="contact-form__form" onSubmit={handleSubmit}>
        <div className="form__title">
          {t('real-estate-detail:contact-form.form.heading')}
        </div>
        <Form.Group>
          <Form.Control
            id={'fullName'}
            onChange={handleOnChange}
            value={inputValues.fullName}
            type="text"
            autoComplete="current-text"
            placeholder={t('real-estate-detail:contact-form.form.fullName')}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            id={'phoneNumber'}
            onChange={handleOnChange}
            value={inputValues.phoneNumber}
            type="text"
            autoComplete="current-text"
            placeholder={t('real-estate-detail:contact-form.form.phoneNumber')}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            id={'emailId'}
            onChange={handleOnChange}
            value={inputValues.emailId}
            type="emailId"
            autoComplete="current-text"
            placeholder={t('real-estate-detail:contact-form.form.email')}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={7}
            id={'message'}
            style={{ height: 'auto !important' }}
            onChange={handleOnChange}
            value={inputValues.message}
            type="message"
            placeholder={t('real-estate-detail:contact-form.form.message')}
            autoComplete="current-text"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          size="lg"
          disabled={isLoading}
          className="form__button btn-block"
        >
          {isLoading ? (
            <Spinner as="span" animation="border" size="sm" role="status" />
          ) : (
            <>{t('real-estate-detail:contact-form.form.submit')}</>
          )}
        </Button>
      </Form>
    </div>
  );
};
export const mapStateToProps = (state) => ({
  user: state.connectionReducer.user,
});

export default connect(mapStateToProps)(ContactForm);
