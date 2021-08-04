import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { HeroTerms, VotingBoard } from 'components/pages/voting-board';

const UserBoard = (props) => {
  const { t } = props;
  return (
    <div className="termsPage-container main-container">
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
