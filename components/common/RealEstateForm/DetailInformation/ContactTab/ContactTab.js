import { useState, useEffect } from 'react';
import {
  CustomFormControl,
  AutoCompleteInput,
  SelectInputSubmit,
} from 'components/common';
import { Row, Col, Form } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import PhoneInput from 'react-phone-input-2';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { GrInternetExplorer, GrLocation } from 'react-icons/gr';
const LeafletMap = dynamic(() => import('components/common/LeafletMap'), {
  ssr: false,
});
const ContactTab = (props) => {
  const {
    t,
    inputValues,
    handleOnChange,
    addressPosition,
    setAddressPosition,
    initialItem,
    initialCoordinates,
    initialAddress,
  } = props;
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [countryCode, setCountryCode] = useState();
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentCenter, setCurrentCenter] = useState({
    lat: initialItem?.latitude || 56.946285,
    lng: initialItem?.longitude || 24.105078,
  });
  const [debounceTimer, setDebounceTimer] = useState(0);
  const [timeOutDebounce, setTimeOutDebounce] = useState(0);

  let debounce = () => {
    return function debouncedFn() {
      setDebounceTimer(Date.now());
    };
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCountryCode(localStorage.getItem('countryCode') || 'lv');
    }
  }, []);
  useEffect(() => {
    if (initialItem?.phone) {
      handleOnChange({ target: { value: initialItem?.phone, id: 'phone' } });
    }
  }, [countryCode, initialItem?.phone]);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(timeOutDebounce);
      let timeout = setTimeout(() => {
        setSearchText(inputValues.address);
      }, 250);
      setTimeOutDebounce(timeout);
    }
  }, [debounceTimer]);

  useEffect(() => {
    if (inputValues.address) {
      debounce()();
    }
  }, [inputValues.address]);

  const handlePositionChange = (position) => {
    setAddressPosition(position);
  };

  const handleSearchResult = (results) => {
    setSearchResults(results);
  };

  const handleSelectSearchResult = (result, id) => {
    let payloadEvent = {
      target: {
        id: id,
        value: result.label,
      },
    };
    handleOnChange(payloadEvent);
    let positionPayload = {
      position: { lat: result.y, lng: result.x },
    };
    handlePositionChange(positionPayload);
    setCurrentCenter(positionPayload.position);
    setSearchResults([]);
    setSearchText('real-estate-submit:');
    setIsSearching(false);
  };

  const handleOnChangeAddress = (e) => {
    setIsSearching(true);
    handleOnChange(e);
  };

  const contactTimeOptions = [
    {
      value: 'anyTime',
      label: t('real-estate-common:contact-times.options.anyTime'),
      id: 'contactTimes',
    },
    {
      value: 'workingDays',
      label: t('real-estate-common:contact-times.options.workingDays'),
      id: 'contactTimes',
    },
    {
      value: 'officeHours',
      label: t('real-estate-common:contact-times.options.officeHours'),
      id: 'contactTimes',
    },
    {
      value: 'specificTimes',
      label: t('real-estate-common:contact-times.options.specificTimes'),
      id: 'contactTimes',
    },
  ];

  return (
    <div className="tabs__wrapper">
      <Row>
        <Col lg={12} className={'decorator__container'}>
          <Form.Group>
            <GrLocation />
            <AutoCompleteInput
              onChange={handleOnChangeAddress}
              value={inputValues.address}
              isSearching={isSearching}
              searchText={searchText}
              setSearchResults={setSearchResults}
              setSearchText={setSearchText}
              handleSelectSearchResult={handleSelectSearchResult}
              isLoadingSearch={isLoadingSearch}
              searchResults={searchResults}
              initialValue={initialAddress}
              inputValues={inputValues}
              id="address"
              type="text"
              label={
                <>
                  {t(
                    'real-estate-submit:form.detail-information.contact.address'
                  )}
                  <sup className={'mandatory__field'}>*</sup>
                </>
              }
              autoComplete="current-text"
            />
          </Form.Group>
        </Col>
        <Col lg={12}>
          <div className="wrapper__map">
            <LeafletMap
              currentCenter={currentCenter}
              setCurrentCenter={setCurrentCenter}
              initialCoordinates={initialCoordinates}
              zoom={10}
              id="addressPosition"
              searchText={searchText}
              isLoadingSearch={isLoadingSearch}
              handleSearchResult={handleSearchResult}
              setIsLoadingSearch={setIsLoadingSearch}
              currentPosition={addressPosition}
              setCurrentPosition={handlePositionChange}
            ></LeafletMap>
          </div>
        </Col>
        <Col lg={6} md={6} sm={6} className={'decorator__container'}>
          <Form.Group>
            <AiOutlinePhone className={'mandatory'} />
            <PhoneInput
              containerClass="phone__input__field"
              country={countryCode}
              enableSearch={true}
              id="phone"
              className="form-control"
              onChange={(e) =>
                handleOnChange({ target: { value: e, id: 'phone' } })
              }
              value={inputValues?.phone}
            />
          </Form.Group>
        </Col>

        <Col lg={6} md={6} sm={6} className={'decorator__container'}>
          <Form.Group>
            <AiOutlineMail />
            <CustomFormControl
              onChange={handleOnChange}
              value={inputValues.realEstateEmail}
              defaultValue={initialItem?.email}
              id="realEstateEmail"
              type="text"
              valueLength={75 - inputValues.realEstateEmail?.length || 75}
              maxLength={'75'}
              label={
                <>
                  {t(
                    'real-estate-submit:form.detail-information.contact.email'
                  )}
                  <sup className={'mandatory__field'}>*</sup>
                </>
              }
              autoComplete="current-text"
            />
          </Form.Group>
        </Col>
        <Col lg={6} md={6} sm={6}>
          <Form.Group>
            <SelectInputSubmit
              id="contactTimes"
              onChange={handleOnChange}
              options={contactTimeOptions}
              value={contactTimeOptions.filter(
                (option) => option.value === inputValues.contactTimes
              )}
              placeholder={
                <>
                  {t(
                    'real-estate-submit:form.detail-information.contact.contact-times.placeholder'
                  )}
                  <sup className={'mandatory__field'}>*</sup>
                </>
              }
            />
          </Form.Group>
        </Col>
        <Col lg={6} md={6} sm={6} className={'decorator__container'}>
          <Form.Group>
            <GrInternetExplorer />
            <CustomFormControl
              onChange={handleOnChange}
              value={inputValues.websiteLink}
              defaultValue={initialItem?.websiteLink}
              valueLength={250 - inputValues.websiteLink?.length}
              maxLength={'250'}
              id="websiteLink"
              type="text"
              label={t(
                'real-estate-submit:form.detail-information.contact.listing-website'
              )}
              autoComplete="current-text"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default ContactTab;
