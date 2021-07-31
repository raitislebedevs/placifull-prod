import { Details, Overview } from 'components/pages/profile';
import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { privateRouteMap, PrivateRoute } from 'components/PrivateRoute';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { useEffect, useState } from 'react';
import { set } from 'lodash';

const Profile = (props) => {
  const { t } = props;

  const [width, setWidth] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    setIsMobile(false);
    setIsSmall(false);
    if (width <= 990 && width > 768) return setIsMobile(true);
    if (width <= 768) {
      setIsMobile(true);
      return setIsSmall(true);
    }
  }, [width]);

  return (
    <div className="profile-container main-container">
      <Overview t={t} isMobile={isMobile} />
      <Details t={t} isMobile={isMobile} isSmall={isSmall} />
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
  withTranslation(['error', 'profile', 'common', 'job-common']),
  connect(privateRouteMap)
)(PrivateRoute(Profile));
