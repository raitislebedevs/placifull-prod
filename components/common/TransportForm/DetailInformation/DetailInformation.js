import { useState, useEffect } from 'react';
import { SectionHeading } from 'components/common';
import { Tabs, Tab } from 'react-bootstrap';
import ContactTab from './ContactTab';
import FeaturesTab from './FeaturesTab';
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
    handleFeatureItemCheckbox,
    addressPosition,
    setAddressPosition,
    tagOptions,
    setTagOptions,
    initialItem,
    initialCoordinates,
    initialAddress,
  } = props;

  useEffect(() => {
    handleGetTags();
  }, []);

  const handleGetTags = async () => {
    setIsLoadingTag(true);
    let filter = { _limit: 200, _sort: 'name:asc', type: 'transport' };
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
        {t('transport-submit:form.detail-information.heading')}
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
              {t('transport-submit:form.detail-information.contact.heading')}
            </span>
          }
        >
          <ContactTab
            addressPosition={addressPosition}
            setAddressPosition={setAddressPosition}
            inputValues={inputValues}
            initialItem={initialItem}
            initialCoordinates={initialCoordinates}
            handleCheckBoxChange={handleCheckBoxChange}
            handleOnChange={handleOnChange}
            initialAddress={initialAddress}
            t={t}
          />
        </Tab>
        <Tab
          eventKey="features"
          title={
            <span>
              {t('transport-submit:form.detail-information.features.heading')}
            </span>
          }
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
