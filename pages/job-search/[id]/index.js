import { withTranslation } from 'i18n';
import { useEffect } from 'react';
import { LoadingOverlay } from 'components/common';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import {
  Header,
  RightSection,
  LeftSection,
  ExtraSection,
  MapHeader,
} from 'components/pages/job-id';
import { VacancyListingService } from 'services';
import { useRouter } from 'next/router';
import Head from 'next/head';

const VacancyDetail = (props) => {
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
    <div className="job-detail-container main-container">
      <Head>
        <title>{listingItem?.name}</title>
      </Head>
      <MapHeader listingItem={listingItem} t={t} />
      <Container fluid>
        <Header listingItem={listingItem} t={t} />
        <Row>
          <Col lg={8}>
            <LeftSection listingItem={listingItem} t={t} />
          </Col>
          <Col lg={4}>
            <RightSection listingItem={listingItem} t={t} />
          </Col>
        </Row>
        <ExtraSection listingItem={listingItem} t={t} />
      </Container>
    </div>
  );
};

VacancyDetail.getInitialProps = async ({ query }) => {
  const { id } = query;
  try {
    const { data } = await VacancyListingService.GET(id);
    return {
      listingItem: data,
      // namespacesRequired: [
      //   'common',
      //   'navbar',
      //   'footer',
      //   'job-tags',
      //   'job-detail',
      //   'job-common',
      //   'job-application',
      // ],
    };
  } catch {
    listingItem = {};
  }
};

// VacancyDetail.propTypes = {
//   t: PropTypes.func.isRequired,
// };

export default withTranslation([
  'common',
  'navbar',
  'footer',
  'job-tags',
  'job-detail',
  'job-common',
  'job-application',
])(VacancyDetail);
