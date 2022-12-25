import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CreditAccounts } from 'components//pages/budgetPlanner/index';

const LoansDetail = (props) => {
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
      <CreditAccounts t={t} />
    </div>
  );
};

LoansDetail.getInitialProps = async () => ({
  namespacesRequired: ['blog', 'navbar', 'footer', 'error', 'budget'],
});

LoansDetail.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(LoansDetail);
