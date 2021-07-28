import { Details, Overview } from 'components/pages/profile';
import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { privateRouteMap, PrivateRoute } from 'components/PrivateRoute';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { useEffect, useState } from 'react';

const Profile = (props) => {
  const { t } = props;

  const [width, setWidth] = useState(1000);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 990 ? width : false;
  return (
    <div className="profile-container main-container">
      <Overview t={t} isMobile={isMobile} />
      <Details t={t} isMobile={isMobile} />
    </div>
  );
};

// Profile.getInitialProps = async () => ({
//   namespacesRequired: ['profile', 'common', 'job-common'],
// });

// Profile.propTypes = {
//   t: PropTypes.func.isRequired,
// };

export default compose(
  withTranslation(['profile', 'common', 'job-common']),
  connect(privateRouteMap)
)(PrivateRoute(Profile));
