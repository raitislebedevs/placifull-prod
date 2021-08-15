import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { HeroTerms, TermSection } from 'components/pages/terms';

const Terms = (props) => {
  const { t } = props;
  return (
    <div className="termsPage-container">
      <Head>
        <title>{t('terms:title')}</title>
        <meta
          name="description"
          content="Straight forward terms and conditions. We try to make it simple and straight to the point."
        />
        <meta
          name="keywords"
          content="referral code, opportunities, prices, privacy policy, terms and conditions, how to use placifull, use placifull, listing, promoted listings, promoted"
        />
      </Head>
      <HeroTerms t={t} />
      <TermSection t={t} />
    </div>
  );
};

Terms.getInitialProps = async () => ({
  namespacesRequired: ['common', 'navbar', 'footer', 'error', 'terms'],
});

Terms.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Terms);
