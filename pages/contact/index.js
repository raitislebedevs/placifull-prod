import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { Header, Map, ContactForm } from 'components/pages/contact';

const Contact = (props) => {
  const { t } = props;
  return (
    <div className="contact-container main-container">
      <Header t={t} />
      <Map t={t} />
      <ContactForm t={t} />
    </div>
  );
};

Contact.getInitialProps = async () => ({
  namespacesRequired: ['contact', 'common', 'navbar', 'footer'],
});

Contact.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Contact);
