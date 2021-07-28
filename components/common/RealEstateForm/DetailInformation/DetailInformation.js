import { useState, useEffect } from 'react';
import { SectionHeading } from 'components/common';
import { Tabs, Tab } from 'react-bootstrap';
import ContactTab from './ContactTab';
import FeaturesTab from './FeaturesTab';
import UltilitiesTab from './UltilitiesTab';
import { TagServices } from 'services';
import TostifyCustomContainer from 'components/common/TostifyCustomContainer';

const DetailInformation = (props) => {
  const [tabKey, setTabKey] = useState('contact');
  const [isLoadingTag, setIsLoadingTag] = useState(false);
  const [realEstateTags, setRealEstateTags] = useState([]);
  const [landTags, setlandTags] = useState([]);
  const [agentTags, setAgentTags] = useState([]);

  const {
    t,
    inputValues,
    handleOnChange,
    handleCheckBoxChange,
    handleFeatureItemCheckbox,
    addressPosition,
    setAddressPosition,
    submitCurrency,
    tagOptions,
    setTagOptions,
  } = props;

  useEffect(() => {
    initilizeTags();
  }, []);

  useEffect(() => {
    handleGetTags();
  }, [inputValues.category]);

  const handleGetTags = async () => {
    setIsLoadingTag(true);
    setTagOptions(realEstateTags);
    if (inputValues.category === 'land') setTagOptions(landTags);
    if (inputValues.category === 'agents') setTagOptions(agentTags);

    inputValues.tags = [];
    setIsLoadingTag(false);
  };

  const initilizeTags = async () => {
    try {
      let filter = { _limit: 200, _sort: 'name:asc', type: 'realEstate' };
      const realEstateData = await TagServices.FIND(filter);
      setRealEstateTags(realEstateData.data);

      filter = { _limit: 200, _sort: 'name:asc', type: 'land' };
      const landData = await TagServices.FIND(filter);
      setlandTags(landData.data);

      filter = { _limit: 200, _sort: 'name:asc', type: 'agent' };
      const agentData = await TagServices.FIND(filter);
      setAgentTags(agentData.data);
    } catch (error) {
      TostifyCustomContainer('error', 'Something went wrong on Tag Fields');
    }
  };

  return (
    <div className="form__section detail__section">
      <SectionHeading>
        {t('real-estate-submit:form.detail-information.heading')}
      </SectionHeading>
      {inputValues.category !== 'agents' ? (
        <Tabs
          className="section__tabs-navbar"
          activeKey={tabKey}
          onSelect={(k) => setTabKey(k)}
        >
          <Tab
            eventKey="contact"
            title={
              <span>
                {t(
                  'real-estate-submit:form.detail-information.contact.heading'
                )}
              </span>
            }
          >
            <ContactTab
              addressPosition={addressPosition}
              setAddressPosition={setAddressPosition}
              inputValues={inputValues}
              handleCheckBoxChange={handleCheckBoxChange}
              handleOnChange={handleOnChange}
              t={t}
            />
          </Tab>
          <Tab
            eventKey="features"
            title={<span>{t('real-estate-common:features.heading')}</span>}
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
          {inputValues.category !== 'land' && (
            <Tab
              eventKey="ultilities"
              title={<span>{t('real-estate-common:utilities.heading')}</span>}
            >
              <UltilitiesTab
                inputValues={inputValues}
                handleOnChange={handleOnChange}
                submitCurrency={submitCurrency}
                t={t}
              />
            </Tab>
          )}
        </Tabs>
      ) : (
        <ContactTab
          addressPosition={addressPosition}
          setAddressPosition={setAddressPosition}
          inputValues={inputValues}
          handleCheckBoxChange={handleCheckBoxChange}
          handleOnChange={handleOnChange}
          t={t}
        />
      )}
    </div>
  );
};

export default DetailInformation;
