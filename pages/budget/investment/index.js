import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Investment = (props) => {
  const { t } = props;
  return (
    <div className="submit-container main-container">
      <Head>
        <title>{t('blog:title')}</title>
        <meta
          name="keywords"
          content="nekustamie īpašumi, transports, blogs, darbs, padoms darba meklējumos, padoms dzīvokļa iegādē, padoms mājas iegādē, kā sakrāt mājai, real estate, job, transportation, blog, advice moving abroad, advice job hunting, advice buying a hous"
        />
      </Head>
      {/* <DepositAccounts t={t} /> */}
    </div>
  );
};

Investment.getInitialProps = async () => ({
  namespacesRequired: ['blog', 'navbar', 'footer', 'error'],
});

Investment.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Investment);
