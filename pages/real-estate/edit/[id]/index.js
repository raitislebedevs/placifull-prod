import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { RealEstateListingServices } from 'services';
import { useRouter } from 'next/router';
import { RealEstateEdit } from 'components/common';

const RealEstateEditListing = (props) => {
  const { t, listingItem } = props;
  const router = useRouter();

  if (!listingItem) {
    router.push('/404');
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
        'real-estate-common',
        'real-estate-submit',
        'real-estate-tags',
        'navbar',
        'footer',
        'tags',
      ],
    };
  } catch {}
};

RealEstateEditListing.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation([
  'payment',
  'common',
  'add-listing',
  'real-estate-common',
  'real-estate-submit',
  'real-estate-tags',
  'real-estate-validation',
])(RealEstateEditListing);
