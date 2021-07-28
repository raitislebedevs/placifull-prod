import PropTypes from 'prop-types';
import { withTranslation } from 'i18n';
import { NotFoundPage } from 'components/pages/not-found';

const NotFound = (props) => {
  const { t } = props;
  return <NotFoundPage t={t} />;
};

NotFound.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('not-found')(NotFound);
