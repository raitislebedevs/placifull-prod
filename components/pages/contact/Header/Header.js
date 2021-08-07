import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageHeading } from 'components/common';

const Header = (props) => {
  const { t } = props;
  return (
    <Container className="contact-container__header">
      <PageHeading className="header__heading">
        {t('contact:header.heading')}
      </PageHeading>
      <div className="header__contact">
        <FontAwesomeIcon icon={['fab', 'whatsapp']} className="contact__icon" />
        <div className="contact__info">
          <div className="info__title">{t('contact:header.info.text')}</div>
          <div className="info__phone">{`+371 26 843 180`}</div>
        </div>
      </div>
    </Container>
  );
};

export default Header;
