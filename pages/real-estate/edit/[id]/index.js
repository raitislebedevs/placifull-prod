import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { LoadingOverlay } from 'components/common';
import { RealEstateListingServices } from 'services';
import { useRouter } from 'next/router';
import { RealEstateEdit } from 'components/common';
import { useEffect } from 'react';
import Head from 'next/head';

const RealEstateEditListing = (props) => {
  const { t, listingItem, tags } = props;
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
      <Head>
        <title>{listingItem?.name}</title>

        <meta
          name="keywords"
          content="edit listing, real estate, rent apartment, buy apartment, sell house, buy house, pirkt māju, pārdod māju"
        />
      </Head>

      <div className="form__section">
        <RealEstateEdit t={t} item={listingItem} tags={tags} />
      </div>
    </div>
  );
};

RealEstateEditListing.getInitialProps = async ({ query }) => {
  const { id } = query;
  try {
    const { data } = await RealEstateListingServices.GET(id);

    let initialTags = [];
    data?.tags.map((item) => {
      initialTags.push(item.id);
    });

    return {
      listingItem: data,
      tags: initialTags,
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

export default withTranslation([
  'common',
  'navbar',
  'footer',
  'validation',
  'real-estate-common',
  'real-estate-submit',
  'real-estate-tags',
  'real-estate-detail',
])(RealEstateEditListing);
