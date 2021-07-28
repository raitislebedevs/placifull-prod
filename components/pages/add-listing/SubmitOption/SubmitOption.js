import { JobPost, TransportPost, RealEstatePost } from 'components/common';
import { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

const SubmitOption = (props) => {
  const [tabKey, setTabKey] = useState('real-estate');
  const { t } = props;

  return (
    <div className="form__section">
      <Tabs
        className="section__tabs-navbar"
        activeKey={tabKey}
        onSelect={(k) => setTabKey(k)}
      >
        <Tab
          eventKey="real-estate"
          title={<span> {t('add-listing:main-tab.tab-1')}</span>}
        >
          <RealEstatePost t={t} />
        </Tab>
        <Tab
          eventKey="transport"
          title={<span>{t('add-listing:main-tab.tab-2')}</span>}
        >
          <TransportPost t={t} />
        </Tab>
        <Tab
          eventKey="job-submit"
          title={<span>{t('add-listing:main-tab.tab-3')}</span>}
        >
          <JobPost t={t} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default SubmitOption;
