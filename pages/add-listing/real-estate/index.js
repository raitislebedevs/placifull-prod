import { RealEstateSubmit } from 'components/pages/add-listing';
import { withTranslation } from 'i18n';
import { privateRouteMap, PrivateRoute } from 'components/PrivateRoute';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Head from 'next/head';

const AddRealEstate = (props) => {
  const { t } = props;
  return (
    <div className="submit-container main-container">
      <Head>
        <title>{t('real-estate-submit:title')}</title>
      </Head>
      <hr />
      <RealEstateSubmit t={t} />
    </div>
  );
};

// AddRealEstate.getInitialProps = async () => ({
//   namespacesRequired: [
//     'payment',
//     'common',
//     'navbar',
//     'footer',
//     'validation',
//     'add-listing',
//     'real-estate-common',
//     'real-estate-submit',
//     'real-estate-tags',
//     'real-estate-detail',
//   ],
// });

// AddRealEstate.propTypes = {
//   t: PropTypes.func.isRequired,
// };

export default compose(
  withTranslation([
    'payment',
    'common',
    'navbar',
    'footer',
    'validation',
    'add-listing',
    'real-estate-common',
    'real-estate-submit',
    'real-estate-tags',
    'real-estate-detail',
  ]),
  connect(privateRouteMap)
)(PrivateRoute(AddRealEstate));
