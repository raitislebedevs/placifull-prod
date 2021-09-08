import { useState, useEffect } from 'react';
import { SectionHeading } from 'components/common';
import { Tabs, Tab } from 'react-bootstrap';
import ContactTab from './ContactTab';
import FeaturesTab from './FeaturesTab';
import SalaryTab from './SalaryTab';
import { TagServices } from 'services';
import { toast } from 'react-toastify';

const DetailInformation = (props) => {
  const [tabKey, setTabKey] = useState('contact');
  const [isLoadingTag, setIsLoadingTag] = useState(false);

  const {
    t,
    inputValues,
    handleOnChange,
    handleCheckBoxChange,
    submitCurrency,
    handleFeatureItemCheckbox,
    addressPosition,
    setAddressPosition,
    tagOptions,
    setTagOptions,
    initialCoordinates,
    initialAddress,
    initialItem,
  } = props;

  useEffect(() => {
    handleGetTags();
  }, []);

  const handleGetTags = async () => {
    setIsLoadingTag(true);
    let filter = { _limit: 200, _sort: 'name:asc', type: 'job' };
    let { data, error } = await TagServices.FIND(filter);
    if (error) {
      toast.error(error);
    }
    if (data) {
      setTagOptions(data);
    }
    setIsLoadingTag(false);
  };

  return (
    <div className="form__section">
      <SectionHeading>
        {t('job-submit:form.detail-information.heading.contact')}
      </SectionHeading>
      <Tabs
        className="section__tabs-navbar"
        activeKey={tabKey}
        onSelect={(k) => setTabKey(k)}
      >
        <Tab
          eventKey="contact"
          title={
            <span>
              {t('job-submit:form.detail-information.contact.heading')}
            </span>
          }
        >
          <ContactTab
            addressPosition={addressPosition}
            setAddressPosition={setAddressPosition}
            inputValues={inputValues}
            handleCheckBoxChange={handleCheckBoxChange}
            handleOnChange={handleOnChange}
            initialItem={initialItem}
            initialAddress={initialAddress}
            initialCoordinates={initialCoordinates}
            t={t}
          />
        </Tab>

        <Tab
          eventKey="salary"
          title={<span>{t('job-common:salary.heading')}</span>}
        >
          <SalaryTab
            inputValues={inputValues}
            handleCheckBoxChange={handleCheckBoxChange}
            handleOnChange={handleOnChange}
            submitCurrency={submitCurrency}
            initialItem={initialItem}
            t={t}
          />
        </Tab>

        <Tab
          eventKey="features"
          title={<span>{t('job-common:features.heading')}</span>}
        >
          <FeaturesTab
            inputValues={inputValues}
            tagOptions={tagOptions}
            isLoadingTag={isLoadingTag}
            handleFeatureItemCheckbox={handleFeatureItemCheckbox}
            handleOnChange={handleOnChange}
            t={t}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailInformation;
