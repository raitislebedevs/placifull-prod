import { RealEstatePost } from 'components/common';
import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const RealEstateSubmit = (props) => {
  const { t } = props;

  return (
    <div className="form__section">
      <Row>
        <Link href="/add-listing/real-estate">
          <Col lg={4} xl={4} md={4} sm={12} xs={12} className={'nav-tabs'}>
            <div className={'nav-link active'}>
              <span> {t('add-listing:main-tab.tab-1')}</span>
            </div>
          </Col>
        </Link>
        <Link href="/add-listing/transport">
          <Col lg={4} xl={4} md={4} sm={12} xs={12} className={'nav-tabs'}>
            <div className={'nav-link '}>
              <span>{t('add-listing:main-tab.tab-2')}</span>
            </div>
          </Col>
        </Link>
        <Link href="/add-listing/job">
          <Col lg={4} xl={4} md={4} sm={12} xs={12} className={'nav-tabs'}>
            <div className={'nav-link '}>
              <span>{t('add-listing:main-tab.tab-3')}</span>
            </div>
          </Col>
        </Link>
      </Row>
      <RealEstatePost t={t} />
    </div>
  );
};

export default RealEstateSubmit;
