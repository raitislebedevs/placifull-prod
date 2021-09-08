import { useState } from 'react';
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
import Datetime from 'react-datetime';
import RichText from 'components/common/RichText';

const GeneralInformation = (props) => {
  const {
    t,
    inputValues,
    setInputValues,
    handleOnChange,
    setsubmitCurrency,
    submitCurrency,
    initilizedValues,
    initialValues,
    initialRichText,
    initialItem,
  } = props;
  const fieldsInput = fields(t);
  const [pureText, setPureText] = useState('');
  const dropdownHandleChange = (e) => {
    handleOnChange({ target: { value: e.target.value, id: e.target.id } });
  };
  const [selectOptions, setSelectOptions] = useState({
    transportCountry: [],
    transportCity: [],
    transportState: [],
  });
  const autocompletFields = locationFields(t);
  const countryComponentIds = {
    country: 'transportCountry',
    city: 'transportCity',
    state: 'transportState',
  };

  return (
    <div className="form__section">
      <Row>
        <Col lg={4}>
          <SectionHeading>
            {t('transport-submit:form.general-information.heading')}
          </SectionHeading>
        </Col>
      </Row>
      <Row>
        <Col lg={10} md={8} sm={12} key={'transport-name'}>
          <Form.Group>
            <CustomFormControl
              id={'transportName'}
              onChange={handleOnChange}
              value={inputValues['transportName']}
              defaultValue={initialItem?.name}
              type="text"
              valueLength={75 - inputValues?.transportName?.length || 75}
              maxLength={'75'}
              label={
                <>
                  {t(
                    'transport-submit:form.general-information.input-fields.name'
                  )}
                  <sup className={'mandatory__field'}>*</sup>
                </>
              }
              autoComplete="current-text"
            />
          </Form.Group>
        </Col>
        <Col lg={2} md={4} sm={12}>
          <Form.Group>
            <CurrencyInput
              handleOnChange={handleOnChange}
              setCurrency={setsubmitCurrency}
              initialSelect={inputValues?.currency}
              placeholder={t('transport-submit:form.currency')}
              currencyId={'transportCurrency'}
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
                    options={item.options}
                    value={item.options.filter(
                      (option) => option.value === inputValues[item.key]
                    )}
                    maxLength={7}
                    placeholder={item.label}
                    isSearchable={true}
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
                      maxLength={'25000'}
                      className="form-control input__text"
                      initialValue={initialRichText || ''}
                    />
                    <>
                      <div className={'max__length__counter'}>
                        {25000 - inputValues[item.key]?.length || 25000}
                      </div>
                    </>
                  </div>
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'productionYear') {
            return (
              <Col
                lg={4}
                md={4}
                sm={6}
                key={item.key}
                className={'decorator__container'}
              >
                <Form.Group>
                  {item?.decorator}
                  <Datetime
                    inputProps={{ className: 'datetime', readOnly: true }}
                    value={inputValues[item.key]}
                    initialValue={
                      initilizedValues && initilizedValues?.productionYear
                    }
                    onChange={(e) =>
                      handleOnChange({ target: { value: e, id: item.key } })
                    }
                    timeFormat={false}
                    dateFormat={'YYYY-MM'}
                    closeOnClickOutside
                    closeOnSelect
                    renderInput={(props) => {
                      return (
                        <Form.Control
                          {...props}
                          id={item.key}
                          label={item.label}
                          placeholder={item.label}
                        />
                      );
                    }}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'number') {
            return (
              <Col
                lg={4}
                md={4}
                sm={6}
                key={item.key}
                className={'decorator__container'}
              >
                <Form.Group>
                  {item?.decorator}
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={item.label}
                    id={item.key}
                    defaultValue={
                      typeof initilizedValues == 'undefined'
                        ? null
                        : typeof initilizedValues[item.key] == 'undefined'
                        ? null
                        : initilizedValues[item.key]
                    }
                    onValueChange={(e) => {
                      let payload = {
                        target: {
                          value: e.floatValue,
                          id: item.key,
                        },
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    thousandSeparator={item.thousandSeparator}
                    decimalScale={item.decimalpoints}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= item.min && values.value <= item.max
                    }
                    inputValues={inputValues}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    append={item?.append}
                    placeholderClassName={item?.className}
                    prepend={item?.prepend}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'yearNumber') {
            return (
              <Col
                lg={4}
                md={4}
                sm={6}
                key={item.key}
                className={'decorator__container'}
              >
                <Form.Group>
                  {item?.decorator}
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={item.label}
                    id={item.key}
                    onValueChange={(e) => {
                      let payload = {
                        target: {
                          value: e.floatValue,
                          id: item.key,
                        },
                      };
                      handleOnChange(payload);
                    }}
                    dropdownHandleChange={dropdownHandleChange}
                    autoComplete="current-text"
                    decimalScale={item.decimalpoints}
                    allowNegative={false}
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= item.min && values.value <= item.max
                    }
                    inputValues={inputValues}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    append={item?.append}
                    placeholderClassName={item?.className}
                    prepend={item?.prepend}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'numberColSix') {
            return (
              <Col lg={6} md={4} sm={6} key={item.key}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    id={item.key}
                    value={inputValues[item.key]}
                    label={item.label}
                    defaultValue={
                      typeof initilizedValues[item.key] === 'undefined'
                        ? null
                        : initilizedValues[item.key]
                    }
                    onChange={handleOnChange}
                    autoComplete="current-text"
                    thousandSeparator={true}
                    allowNegative={false}
                    isAllowed={(values) =>
                      values.value >= item.min && values.value <= item.max
                    }
                    prefix={item.prefix}
                    suffix={item.suffix}
                    append={item?.append}
                    prepend={item?.prepend}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'text') {
            return (
              <Col lg={4} md={4} sm={6} key={item.key}>
                <Form.Group>
                  <CustomFormControl
                    id={item.key}
                    onChange={handleOnChange}
                    value={inputValues[item.key]}
                    defaultValue={
                      typeof initilizedValues == 'undefined'
                        ? null
                        : typeof initilizedValues[item.key] == 'undefined'
                        ? null
                        : initilizedValues[item.key]
                    }
                    type="text"
                    valueLength={35 - inputValues[item.key]?.length}
                    maxLength={'35'}
                    label={item.label}
                    autoComplete="current-text"
                    prefix={item.prefix}
                    suffix={item.suffix}
                    append={item?.append}
                    prepend={item?.prepend}
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
                    defaultValue={initilizedValues?.transportPrice}
                    onValueChange={(e) => {
                      let payload = {
                        target: {
                          value: e.floatValue,
                          id: item.key,
                        },
                      };
                      handleOnChange(payload);
                    }}
                    autoComplete="current-text"
                    thousandSeparator={true}
                    decimalScale={item.decimalpoints}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= item.min && values.value <= item.max
                    }
                    prefix={item.prefix}
                    suffix={item.suffix}
                    prepend={
                      submitCurrency
                        ? { values: [submitCurrency] }
                        : { values: [t('transport-submit:form.no-currency')] }
                    }
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
                initialValues={initialValues}
              />
            );
          }
        })}
      </Row>
    </div>
  );
};

export default GeneralInformation;
