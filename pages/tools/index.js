import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { HeroTerms, Tools } from 'components/pages/tools';

const UserBoard = (props) => {
  const { t } = props;
  return (
    <div className="termsPage-container main-container">
      <Head>
        <title>{t('voting-board:title')}</title>

        <meta
          name="keywords"
          content="voting board, user input, user suggestions, user meaningful, meaningful life, balsošanas dēlis, lietotāja ieteikumi, lietotāja viedoklis"
        />
      </Head>
      <HeroTerms t={t} />
      <Tools t={t} />
    </div>
  );
};

UserBoard.getInitialProps = async () => ({
  namespacesRequired: ['voting-board', 'navbar', 'footer', 'error'],
});

UserBoard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(UserBoard);
