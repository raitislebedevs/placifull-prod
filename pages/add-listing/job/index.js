import { JobSubmit } from 'components/pages/add-listing';
import { withTranslation } from 'i18n';
import { privateRouteMap, PrivateRoute } from 'components/PrivateRoute';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

const AddVacancy = (props) => {
  const { t } = props;
  return (
    <div className="submit-container main-container">
      <hr />
      <JobSubmit t={t} />
    </div>
  );
};

// AddVacancy.getInitialProps = async () => ({
//   namespacesRequired: [
//     'payment',
//     'common',
//     'common',
//     'navbar',
//     'footer',
//     'add-listing',
//     'job-tags',
//     'job-submit',
//     'job-common',
//     'job-detail',
//     'validation',
//   ],
// });

// AddVacancy.propTypes = {
//   t: PropTypes.func.isRequired,
// };

export default compose(
  withTranslation([
    'payment',
    'common',
    'common',
    'navbar',
    'footer',
    'add-listing',
    'job-tags',
    'job-submit',
    'job-common',
    'job-detail',
    'validation',
  ]),
  connect(privateRouteMap)
)(PrivateRoute(AddVacancy));
