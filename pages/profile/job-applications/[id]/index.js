import { useState, useEffect } from 'react';
import { withTranslation } from 'i18n';
import PropTypes from 'prop-types';
import { VacancyListingService } from 'services';
import { KanBanBoard } from 'components/common';
import { resetServerContext } from 'react-beautiful-dnd';
import { LoadingOverlay } from 'components/common';
import { useRouter } from 'next/router';
import Head from 'next/head';

const KanBoard = (props, query) => {
  const { t, kanBanItems, kanBanId, kanBanListing } = props;
  const [items, setItems] = useState(kanBanItems);
  const router = useRouter();

  useEffect(() => {
    if (!kanBanListing) {
      router.push('/404');
    }
  }, []);

  if (!kanBanListing) {
    return <LoadingOverlay />;
  }

  return (
    <div>
      <Head>
        <title>{t('kanban:title')}</title>
      </Head>
      <KanBanBoard
        t={t}
        id={kanBanId}
        kanBanListing={kanBanListing}
        kanBanItems={items}
        companyLogo={kanBanListing?.companyLogo?.url}
        setKanBanItems={setItems}
      />
    </div>
  );
};

KanBoard.getInitialProps = async ({ query }) => {
  //without this function dragable Id is not recognised. Somethign regards SSR
  resetServerContext();
  const { id } = query;
  try {
    const { error, data } = await VacancyListingService.GET(id);
    return {
      kanBanItems: data?.Applicants,
      kanBanId: id,
      kanBanListing: data,
    };
  } catch (error) {
    console.log(error);
  }
};

export default withTranslation([
  'common',
  'navbar',
  'footer',
  'kanban',
  'job-common',
])(KanBoard);
