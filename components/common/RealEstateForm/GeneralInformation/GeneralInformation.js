import { useEffect, useState } from 'react';
import {
  SectionHeading,
  CustomFormControl,
  SelectInputSubmit,
  CurrencyInput,
  CountryInput,
} from 'components/common';
import { Row, Col, Form } from 'react-bootstrap';
import fields from './fields';
import locationFields from './locationFields';
import NumberFormat from 'react-number-format';
import Datetime from 'react-datetime';

const GeneralInformation = (props) => {
  const {
    t,
    inputValues,
    handleOnChange,
    setInputValues,
    setsubmitCurrency,
    submitCurrency,
    item,
  } = props;

  useEffect(() => {
    let payload = {
      ...inputValues,
      price: '',
      rooms: '',
      area: '',
      bathCount: '',
      yearBuilt: '',
      tags: [],
    };
    setInputValues(payload);
  }, [inputValues.category]);

  const fieldsInput = fields(t);
  const [defaultValues, setDefaultValues] = useState({
    category: 'houses',
    action: 'rent',
  });
  const [selectOptions, setSelectOptions] = useState({
    country: [],
    city: [],
    state: [],
  });

  const autocompletFields = locationFields(t);
  const countryComponentIds = {
    country: 'country',
    city: 'city',
    state: 'state',
  };

  const dropdownHandleChange = (e) => {
    handleOnChange({ target: { value: e.target.value, id: e.target.id } });
  };

  const isRendeable = (category, action) => {
    if (category != null && inputValues['category'] == null)
      return category.includes(defaultValues.category);

    if (action != null && inputValues['action'] == null)
      return action.includes(defaultValues.action);

    if (category) return category.includes(inputValues['category']);
    if (action) return action.includes(inputValues['action']);

    return true;
  };

  return (
    <div className="form__section">
      <Row>
        <Col lg={4}>
          <SectionHeading>
            {t('real-estate-submit:form.general-information.heading')}
          </SectionHeading>
        </Col>
      </Row>
      <Row>
        <Col lg={10} md={8} sm={12}>
          <Form.Group>
            <CustomFormControl
              id={'name'}
              onChange={handleOnChange}
              value={inputValues['name'] || item?.name}
              type="text"
              label={
                <>
                  {t(
                    'real-estate-submit:form.general-information.input-fields.name'
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
              placeholder={t(
                'real-estate-submit:form.general-information.currency-input'
              )}
              currencyId={'currency'}
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
                    placeholder={item.label}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (
            item.type === 'conditionalSelect' &&
            isRendeable(item.category, item.action)
          ) {
            return (
              <Col lg={4} md={4} sm={6} key={item.key}>
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
          if (
            item.type === 'yearPicker' &&
            isRendeable(item.category, item.action)
          ) {
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
                    key={item.key}
                    inputProps={{ className: 'datetime', readOnly: true }}
                    value={inputValues[item.key]}
                    onChange={(e) =>
                      handleOnChange({ target: { value: e, id: item.key } })
                    }
                    timeFormat={false}
                    dateFormat={'YYYY'} //'YYYY'
                    closeOnClickOutside
                    closeOnSelect
                    customStyles={{
                      placeholderText: {
                        color: 'white',
                      },
                    }}
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
          if (item.type === 'text') {
            return (
              <Col lg={12} key={item.key}>
                <Form.Group>
                  <CustomFormControl
                    id={item.key}
                    onChange={handleOnChange}
                    value={inputValues[item.key]}
                    type="text"
                    label={item.label}
                    autoComplete="current-text"
                  />
                </Form.Group>
              </Col>
            );
          }
          if (item.type === 'textarea') {
            return (
              <Col lg={12} key={item.key}>
                <Form.Group>
                  <CustomFormControl
                    as="textarea"
                    rows={6}
                    id={item.key}
                    onChange={handleOnChange}
                    value={inputValues[item.key]}
                    type="text"
                    style={{ resize: 'vertical', height: 'auto' }}
                    label={item.label}
                    autoComplete="current-text"
                  />
                </Form.Group>
              </Col>
            );
          }
          if (
            item.type === 'number' &&
            isRendeable(item.category, item.action)
          ) {
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
                          value: e?.floatValue || 0,
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
                    append={item?.append}
                    placeholderClassName={item?.className}
                    prepend={item?.prepend}
                  />
                </Form.Group>
              </Col>
            );
          }
          if (
            item.type === 'currency' &&
            isRendeable(item?.category, item?.action)
          ) {
            return (
              <Col lg={4} md={4} sm={6} key={item.key}>
                <Form.Group>
                  <NumberFormat
                    customInput={CustomFormControl}
                    label={item.label}
                    id={item.key}
                    onValueChange={(e) => {
                      let payload = {
                        target: {
                          value: e?.floatValue || 0,
                          id: item.key,
                        },
                      };
                      handleOnChange(payload);
                    }}
                    autoComplete="current-text"
                    thousandSeparator={item.thousandSeparator}
                    decimalScale={item.decimalpoints}
                    allowNegative={false}
                    thousandsGroupStyle="thousand"
                    fixedDecimalScale={true}
                    isAllowed={(values) =>
                      values.value >= item.min && values.value <= item.max
                    }
                    prepend={
                      submitCurrency
                        ? { values: [submitCurrency] }
                        : { values: [t('real-estate-submit:form.no-currency')] }
                    }
                  />
                </Form.Group>
              </Col>
            );
          }

          if (
            item.type === 'dateTime' &&
            isRendeable(item.category, item.action)
          ) {
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
                    onChange={(e) =>
                      handleOnChange({ target: { value: e, id: item.key } })
                    }
                    timeFormat={false}
                    dateFormat={true}
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
                isMandatory={true}
              />
            );
          }
        })}
      </Row>
    </div>
  );
};

export default GeneralInformation;
