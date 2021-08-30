import { useState, useEffect } from 'react';
import {
  SectionHeading,
  CustomFormControl,
  SelectInputSubmit,
  CurrencyInput,
  CountryInput,
} from 'components/common';
import { Row, Col, Form } from 'react-bootstrap';
import fields from './fields';
import NumberFormat from 'react-number-format';
import locationFields from './locationFields';
import LanguageService from 'services/languageService';
import RichText from 'components/common/RichText';

const GeneralInformation = (props) => {
  const {
    t,
    inputValues,
    handleOnChange,
    setInputValues,
    setsubmitCurrency,
    submitCurrency,
  } = props;

  const fieldsInput = fields(t);

  const [selectOptions, setSelectOptions] = useState({
    jobCountry: [],
    jobCity: [],
    jobState: [],
  });
  const [pureText, setPureText] = useState('');
  const [languages, setLanguages] = useState();
  const autocompletFields = locationFields(t);
  const countryComponentIds = {
    country: 'jobCountry',
    city: 'jobCity',
    state: 'jobState',
  };

  const onLanguageChange = (event) => {
    var languageList = [];

    event?.forEach((element) => {
      languageList.push(element?.value);
    });

    handleOnChange({ id: event[0]?.id, languageList });
  };

  const getlanguages = async () => {
    let englishName = [];
    let nativeName = [];
    try {
      const result = await LanguageService.FIND({
        _limit: 300,
      });

      result?.data.forEach((element) => {
        englishName.push({
          value: element?.name,
          label: element?.name,
          id: 'languagesEnglish',
        });
        nativeName.push({
          value: element?.nativeName,
          label: element?.nativeName,
          id: 'languagesNative',
        });
      });
      setLanguages({ englishName, nativeName });
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getlanguages();
  }, []);

  return (
    <div className="form__section">
      <Row>
        <Col lg={4}>
          <SectionHeading>
            {t('job-submit:form.general-information.heading')}
          </SectionHeading>
        </Col>
      </Row>
      <Row>
        <Col lg={5} md={5} sm={12}>
          <Form.Group>
            <CustomFormControl
              onChange={handleOnChange}
              value={inputValues.companyName}
              id="companyName"
              type="text"
              valueLength={50 - inputValues.companyName?.length}
              maxLength={'50'}
              label={
                <>
                  {t('job-submit:form.company')}
                  <sup className={'mandatory__field'}>*</sup>
                </>
              }
              autoComplete="current-text"
            />
          </Form.Group>
        </Col>
        <Col lg={5} md={5} sm={12}>
          <Form.Group>
            <CustomFormControl
              onChange={handleOnChange}
              value={inputValues.title}
              id="title"
              type="text"
              valueLength={75 - inputValues.companyName?.length}
              maxLength={'75'}
              label={
                <>
                  {t('job-submit:form.job-title.placeholder')}
                  <sup className={'mandatory__field'}>*</sup>
                </>
              }
              autoComplete="current-text"
            />
          </Form.Group>
        </Col>
        <Col lg={2} md={2} sm={12}>
          <Form.Group>
            <CurrencyInput
              handleOnChange={handleOnChange}
              setCurrency={setsubmitCurrency}
              currencyId={'jobCurrency'}
              isMandatory={true}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {fieldsInput.map((item) => {
          if (item.type === 'select') {
            return (
              <Col lg={4} md={4} sm={6} key={item.key}>
                <Form.Group>
                  <SelectInputSubmit
                    id={item.key}
                    onChange={handleOnChange}
                    maxLength={10}
                    options={item.options}
                    placeholder={item.label}
                    isSearchable={true}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'selectLarge') {
            return (
              <Col lg={6} md={6} sm={6} key={item.key}>
                <Form.Group>
                  <SelectInputSubmit
                    id={item.key}
                    onChange={handleOnChange}
                    options={item.options}
                    placeholder={item.label}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'textarea') {
            return (
              <Col lg={12} key={item.key}>
                <Form.Group>
                  <div className="rich__text">
                    <div className={`label`}> {item.label}</div>
                    <RichText
                      name={item.key}
                      rows={17}
                      id={item.key}
                      type="text"
                      as="textarea"
                      setPureText={setPureText}
                      handleOnChange={handleOnChange}
                      maxLength={'5000'}
                      className="form-control input__text"
                      initialValue={item.label}
                    />
                    <>
                      <div className={'max__length__counter'}>
                        {5000 - inputValues[item.key]?.length}
                      </div>
                    </>
                  </div>
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'number') {
            return (
              <Col lg={4} md={4} sm={6} key={item.key}>
                <Form.Group>
                  <CustomFormControl
                    customInput={Form.Control}
                    id={item.key}
                    value={inputValues[item.key]}
                    label={item.label}
                    onChange={handleOnChange}
                    autoComplete="current-text"
                    thousandSeparator={true}
                    allowNegative={false}
                    isAllowed={(values) =>
                      values.value >= item.min && values.value <= item.max
                    }
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'languagesNative') {
            return (
              <Col lg={12} key={item.key}>
                <Form.Group>
                  <SelectInputSubmit
                    id={item.type}
                    maxLength={15}
                    onChange={onLanguageChange}
                    options={languages?.nativeName}
                    placeholder={item.placeholder}
                    isMulti={true}
                    isSearchable={true}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'languagesEnglish') {
            return (
              <Col lg={12} key={item.key}>
                <Form.Group>
                  <SelectInputSubmit
                    id={item.type}
                    maxLength={15}
                    onChange={onLanguageChange}
                    options={languages?.englishName}
                    placeholder={item.placeholder}
                    isMulti={true}
                    isSearchable={true}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'currency') {
            return (
              <Col lg={4} md={4} sm={6} key={item.key}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={item.label}
                    id={item.key}
                    value={inputValues[item.key]}
                    onChange={handleOnChange}
                    autoComplete="current-text"
                    thousandSeparator={true}
                    decimalScale={item.decimalpoints}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= item.min && values.value <= item.max
                    }
                    prepend={{ values: [submitCurrency] }}
                  />
                </Form.Group>
              </Col>
            );
          }

          if (item.type === 'autocomplete') {
            return (
              <CountryInput
                key={item.key}
                autoComplete={autocompletFields}
                inputValues={inputValues}
                handleOnChange={handleOnChange}
                setInputValues={setInputValues}
                inputIds={countryComponentIds}
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
              />
            );
          }
        })}
      </Row>
    </div>
  );
};

export default GeneralInformation;
