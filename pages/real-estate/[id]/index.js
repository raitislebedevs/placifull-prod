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
} from 'components/pages/real-estate-id';
import { RealEstateListingServices } from 'services';
import { useRouter } from 'next/router';
import Head from 'next/head';

const RealEstateDetail = (props) => {
  const { t, listingItem } = props;
  const router = useRouter();

  useEffect(() => {
    if (!listingItem) {
      router.push('/404');
    }
    if (!listingItem?.isPublished) {
      router.push('/real-estate');
    }
  }, []);

  if (!listingItem) {
    return <LoadingOverlay />;
  }

  return (
    <div className="real-estate-detail-container main-container">
      <Head>
        <title>{listingItem?.name}</title>
        <meta
          property="og:url"
          content={`https://placifull.com/real-estate/${listingItem?.id}`}
          key="ogurl"
        />
        <meta
          property="og:image"
          content={
            listingItem?.listingGallery.length > 0
              ? listingItem?.listingGallery[0].url
              : ''
          }
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content={'Placifull.com'}
          key="ogsitename"
        />
        <meta property="og:title" content={listingItem?.name} key="ogtitle" />
        <meta
          property="og:description"
          content={listingItem?.name}
          key="ogdesc"
        />
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

RealEstateDetail.getInitialProps = async ({ query }) => {
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

RealEstateDetail.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(RealEstateDetail);
