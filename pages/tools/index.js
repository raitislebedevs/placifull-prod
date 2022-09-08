import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { HeroTerms, Tools } from 'components/pages/tools';

const UserBoard = (props) => {
  const { t } = props;
  return (
    <div className="termsPage-container main-container">
      <Head>
        <title>{t('tools:title')}</title>
        <meta
          name="keywords"
          content="mortgage calculator, interest calculator, amortization schedule"
        />
      </Head>
      <HeroTerms t={t} />
      <Tools t={t} />
    </div>
  );
};

UserBoard.getInitialProps = async () => ({
  namespacesRequired: ['tools', 'common', 'navbar', 'footer', 'error'],
});

UserBoard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(UserBoard);
