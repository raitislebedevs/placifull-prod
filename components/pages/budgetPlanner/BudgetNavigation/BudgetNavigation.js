import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';

function BudgetNavigation(props) {
  const { t, active } = props;
  return (
    <div>
      <Row>
        <Link href="/budget/accounts">
          <Col lg={4} xl={4} md={4} sm={12} xs={12} className={'nav-tabs'}>
            <div className={`nav-link ${active === 'ACCOUNTS' && 'active'}`}>
              <span> {t('budget:main-tab.tab-1')}</span>
            </div>
          </Col>
        </Link>
        <Link href="/budget/loans">
          <Col lg={4} xl={4} md={4} sm={12} xs={12} className={'nav-tabs'}>
            <div className={`nav-link ${active === 'LOANS' && 'active'}`}>
              <span>{t('budget:main-tab.tab-2')}</span>
            </div>
          </Col>
        </Link>
        <Link href="/budget/investment">
          <Col lg={4} xl={4} md={4} sm={12} xs={12} className={'nav-tabs'}>
            <div className={`nav-link ${active === 'INVESTMENT' && 'active'}`}>
              <span>{t('budget:main-tab.tab-3')}</span>
            </div>
          </Col>
        </Link>
      </Row>
    </div>
  );
}

export default BudgetNavigation;
