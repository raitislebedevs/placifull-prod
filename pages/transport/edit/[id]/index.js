import { withTranslation } from 'i18n';
import { useEffect } from 'react';
import { LoadingOverlay } from 'components/common';
import PropTypes from 'prop-types';
import { TransportListingService } from 'services';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { TransportEdit } from 'components//common/index';

const TransportEditing = (props) => {
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
      </Head>
      <div className="form__section">
        <TransportEdit t={t} item={listingItem} tags={tags} />
      </div>
    </div>
  );
};

TransportEditing.getInitialProps = async ({ query }) => {
  const { id } = query;
  try {
    const { data } = await TransportListingService.GET(id);
    let initialTags = [];
    data?.tags.map((item) => {
      initialTags.push(item.id);
    });

    return {
      listingItem: data,
      tags: initialTags,
      namespacesRequired: [
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
      ],
    };
  } catch {}
};

TransportEditing.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(TransportEditing);
