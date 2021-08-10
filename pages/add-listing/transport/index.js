import { TransportSubmit } from 'components/pages/add-listing';
import { withTranslation } from 'i18n';
import { privateRouteMap, PrivateRoute } from 'components/PrivateRoute';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Head from 'next/head';

const AddTransport = (props) => {
  const { t } = props;
  return (
    <div className="submit-container main-container">
      <Head>
        <title>Transports</title>
      </Head>
      <hr />
      <TransportSubmit t={t} />
    </div>
  );
};

// AddTransport.getInitialProps = async () => ({
//   namespacesRequired: [
//     'payment',
//     'common',
//     'common',
//     'navbar',
//     'footer',
//     'add-listing',
//     'transport-tags',
//     'transport-submit',
//     'transport-common',
//     'transport-detail',
//     'validation',
//   ],
// });

// AddTransport.propTypes = {
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
    'transport-tags',
    'transport-submit',
    'transport-common',
    'transport-detail',
    'validation',
  ]),
  connect(privateRouteMap)
)(PrivateRoute(AddTransport));
