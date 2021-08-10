import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import RedirectPage from 'components/pages/redirect';
import Head from 'next/head';

const Redirect = (props) => {
  const { t, provider } = props;

  return (
    <div>
      <Head>
        <title>Redirecting You</title>
      </Head>

      <RedirectPage t={t} provider={provider} />
    </div>
  );
};

Redirect.getInitialProps = async ({ query }) => {
  return {
    provider: query.provider,
    namespacesRequired: ['common', 'redirect', 'navbar', 'footer'],
  };
};

Redirect.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('redirect')(Redirect);
