import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { HeroTerms, VotingBoard } from 'components/pages/voting-board';

const UserBoard = (props) => {
  const { t } = props;
  return (
    <div className="termsPage-container main-container">
      <meta
        name="keywords"
        content="voting board, balsošanas dēlis, user imput, user suggestions, lietotāja ieteikumi"
      />
      <Head>
        <title>{t('voting-board:title')}</title>
      </Head>
      <HeroTerms t={t} />
      <VotingBoard t={t} />
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
