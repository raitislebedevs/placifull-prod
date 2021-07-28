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
} from 'components/pages/transport-id';
import { TransportListingService } from 'services';
import { useRouter } from 'next/router';
import Head from 'next/head';

const TransportDetail = (props) => {
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
    <div className="transport-detail-container main-container">
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

TransportDetail.getInitialProps = async ({ query }) => {
  const { id } = query;
  try {
    const { data } = await TransportListingService.GET(id);
    return {
      listingItem: data,
      namespacesRequired: [
        'common',
        'navbar',
        'footer',
        'validation',
        'transport-common',
        'transport-tags',
        'transport-detail',
      ],
    };
  } catch {}
};

TransportDetail.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(TransportDetail);
