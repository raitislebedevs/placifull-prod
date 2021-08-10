import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { HeroTerms, TermSection } from 'components/pages/terms';

const Terms = (props) => {
  const { t } = props;
  return (
    <div className="termsPage-container">
      <Head>
        <title>Terms</title>
      </Head>
      <HeroTerms t={t} />
      <TermSection t={t} />
    </div>
  );
};

Terms.getInitialProps = async () => ({
  namespacesRequired: ['common', 'navbar', 'footer', 'error'],
});

Terms.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Terms);
