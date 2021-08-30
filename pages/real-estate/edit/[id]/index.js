import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { LoadingOverlay } from 'components/common';
import { RealEstateListingServices } from 'services';
import { useRouter } from 'next/router';
import { RealEstateEdit } from 'components/common';
import { useEffect } from 'react';

const RealEstateEditListing = (props) => {
  const { t, listingItem } = props;
  const router = useRouter();

  useEffect(() => {
    if (!listingItem) {
      router.push('/404');
    }
  }, []);

  if (!listingItem) {
    return <LoadingOverlay />;
  }
  return (
    <div className="submit-container main-container">
      <div className="form__section">
        <RealEstateEdit t={t} item={listingItem} />
      </div>
    </div>
  );
};

RealEstateEditListing.getInitialProps = async ({ query }) => {
  const { id } = query;
  try {
    const { data } = await RealEstateListingServices.GET(id);
    return {
      listingItem: data,
      namespacesRequired: [
        'common',
        'navbar',
        'footer',
        'validation',
        'real-estate-common',
        'real-estate-submit',
        'real-estate-tags',
        'real-estate-detail',
      ],
    };
  } catch {}
};

RealEstateEditListing.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(RealEstateEditListing);
