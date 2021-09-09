import { withTranslation } from 'i18n';
import { useEffect } from 'react';
import { LoadingOverlay, JobEdit } from 'components/common';
import { VacancyListingService } from 'services';
import { useRouter } from 'next/router';
import Head from 'next/head';

const VacancyDetail = (props) => {
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
        <title>{listingItem?.positionHeader}</title>
      </Head>
      <div className="form__section">
        <JobEdit t={t} item={listingItem} tags={tags} />
      </div>
    </div>
  );
};

VacancyDetail.getInitialProps = async ({ query }) => {
  const { id } = query;
  try {
    const { data } = await VacancyListingService.GET(id);
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
        'navbar',
        'footer',
        'add-listing',
        'job-tags',
        'job-submit',
        'job-common',
        'job-detail',
        'validation',
      ],
    };
  } catch {
    listingItem = {};
  }
};

// VacancyDetail.propTypes = {
//   t: PropTypes.func.isRequired,
// };

export default withTranslation()(VacancyDetail);
