import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';

function ListingNavigation(props) {
  const { t, active } = props;
  return (
    <div>
      <Row>
        <Link href="/add-listing/real-estate">
          <Col lg={4} xl={4} md={4} sm={12} xs={12} className={'nav-tabs'}>
            <div className={`nav-link ${active === 'REAL_ESTATE' && 'active'}`}>
              <span> {t('add-listing:main-tab.tab-1')}</span>
            </div>
          </Col>
        </Link>
        <Link href="/add-listing/transport">
          <Col lg={4} xl={4} md={4} sm={12} xs={12} className={'nav-tabs'}>
            <div className={`nav-link ${active === 'TRANSPORT' && 'active'}`}>
              <span>{t('add-listing:main-tab.tab-2')}</span>
            </div>
          </Col>
        </Link>
        <Link href="/add-listing/job">
          <Col lg={4} xl={4} md={4} sm={12} xs={12} className={'nav-tabs'}>
            <div className={`nav-link ${active === 'JOB' && 'active'}`}>
              <span>{t('add-listing:main-tab.tab-3')}</span>
            </div>
          </Col>
        </Link>
      </Row>
    </div>
  );
}

export default ListingNavigation;
