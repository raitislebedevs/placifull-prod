import {
  CustomFormControl,
  AutoCompleteInput,
  SelectInputSubmit,
} from 'components/common';
import { Row, Col, Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { GrInternetExplorer, GrLocation } from 'react-icons/gr';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(import('components/common/LeafletMap'), {
  ssr: false,
});

const ContactTab = (props) => {
  const {
    t,
    inputValues,
    handleOnChange,
    addressPosition,
    setAddressPosition,
  } = props;
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentCenter, setCurrentCenter] = useState({
    lat: 56.946285,
    lng: 24.105078,
  });
  const [debounceTimer, setDebounceTimer] = useState(0);
  const [timeOutDebounce, setTimeOutDebounce] = useState(0);

  const contactTimeOptions = [
    {
      value: 'anyTime',
      label: t('job-common:contact-times.options.any-time'),
      id: 'jobContactTimes',
    },
    {
      value: 'workingDays',
      label: t('job-common:contact-times.options.working-days'),
      id: 'jobContactTimes',
    },
    {
      value: 'officeHours',
      label: t('job-common:contact-times.options.office-hours'),
      id: 'jobContactTimes',
    },
    {
      value: 'specificTimes',
      label: t('job-common:contact-times.options.specific-times'),
      id: 'jobContactTimes',
    },
  ];

  /// *********** This is for map and autocomplete search ************//
  let debounce = () => {
    return function debouncedFn() {
      setDebounceTimer(Date.now());
    };
  };

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(timeOutDebounce);
      let timeout = setTimeout(() => {
        setSearchText(inputValues.officeAddress);
      }, 500);
      setTimeOutDebounce(timeout);
    }
  }, [debounceTimer]);

  useEffect(() => {
    if (inputValues.officeAddress) {
      debounce()();
    }
  }, [inputValues.officeAddress]);

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
    setSearchText('job-submit:');
    setIsSearching(false);
  };

  const handleOnChangeAddress = (e) => {
    setIsSearching(true);
    handleOnChange(e);
  };

  /*** End of Map component Functions***/

  return (
    <div className="tabs__wrapper">
      <Row>
        <Col lg={12} className={'decorator__container'}>
          <Form.Group>
            <GrLocation />
            <AutoCompleteInput
              onChange={handleOnChangeAddress}
              value={inputValues.officeAddress}
              isSearching={isSearching}
              searchText={searchText}
              setSearchResults={setSearchResults}
              setSearchText={setSearchText}
              handleSelectSearchResult={handleSelectSearchResult}
              isLoadingSearch={isLoadingSearch}
              searchResults={searchResults}
              id="officeAddress"
              type="text"
              label={
                <>
                  {t('job-submit:form.detail-information.contact.address')}{' '}
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
            <AiOutlinePhone />
            <PhoneInput
              containerClass="phone__input__field"
              country={'lv'}
              enableSearch={true}
              id="jobPhone"
              className="form-control"
              onChange={(e) =>
                handleOnChange({ target: { value: e, id: 'jobPhone' } })
              }
              value={inputValues.phone}
            />
          </Form.Group>
        </Col>
        <Col lg={6} md={6} sm={6} className={'decorator__container'}>
          <Form.Group>
            <AiOutlineMail />
            <CustomFormControl
              onChange={handleOnChange}
              value={inputValues.jobEmail}
              id="jobEmail"
              valueLength={75 - inputValues.jobEmail?.length}
              maxLength={'75'}
              type="text"
              label={
                <>
                  {t('job-submit:form.detail-information.contact.email')}{' '}
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
              id="jobContactTimes"
              onChange={handleOnChange}
              options={contactTimeOptions}
              placeholder={
                <>
                  {t('job-common:contact-times.label')}{' '}
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
              value={inputValues.jobListingWebsite}
              id="jobListingWebsite"
              valueLength={250 - inputValues.jobListingWebsite?.length}
              maxLength={'250'}
              type="text"
              label={t(
                'job-submit:form.detail-information.contact.listing-website'
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
