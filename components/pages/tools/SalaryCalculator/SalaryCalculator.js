import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { CustomFormControl } from 'components/common';
import { CurrencyInput } from 'components/common';
import { formatNumber } from 'utils/standaloneFunctions';
import Flags from 'country-flag-icons/react/3x2';
import { useState } from 'react';
import { SelectInputSubmit } from 'components//common/index';
import { calculateSalary } from './calculateSalary';

function SalaryCalculator(props) {
  const { t } = props;
  const [submitCurrency, setSubmitCurrency] = useState('');
  const [totals, setTotals] = useState({ children: 0 });
  const [countryList, setCountryListy] = useState([
    {
      value: 'lv',
      label: 'Latvija',
      id: 'country',
    },
  ]);

  const [inputValues, setInputValues] = useState({});
  const handleOnChange = (event) => {
    const value = event?.target?.value ?? event?.value ?? event;
    const id = event?.target?.id ?? event?.id;
    setInputValues({ ...inputValues, [id]: value });
  };
  const dropdownHandleChange = (e) => {
    handleOnChange({ target: { value: e.target.value, id: e.target.id } });
  };
  const handleSalaryCalculation = (e) => {
    let salaryData = calculateSalary(inputValues);
    setTotals(salaryData);
  };

  return (
    <Container className="tools_container">
      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={8}
          xl={8}
          className={'feature_suggestion'}
        >
          <h3 className={'suggestion_title'}>{t('tools:salary.heading')}</h3>
          <div className={'separator'}></div>
          <Row className={'suggestion__text'}>
            <Col lg={4} md={4} sm={4}>
              <Form.Group>
                <NumberFormat
                  customInput={CustomFormControl}
                  label={t('tools:salary.bruto')}
                  id={'salary'}
                  onValueChange={(e) => {
                    let payload = {
                      target: {
                        value: e?.floatValue || 0,
                        id: 'salary',
                      },
                    };
                    handleOnChange(payload);
                  }}
                  dropdownHandleChange={dropdownHandleChange}
                  autoComplete="current-text"
                  decimalScale={2}
                  allowNegative={false}
                  thousandsGroupStyle="thousand"
                  fixedDecimalScale={true}
                  isAllowed={(values) =>
                    values.value >= 0 && values.value <= 99999999999999999999999
                  }
                  inputValues={inputValues}
                  prepend={
                    submitCurrency
                      ? { values: [submitCurrency] }
                      : { values: [t('tools:mortgage.no-currency')] }
                  }
                />
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={4}>
              <Form.Group>
                <CurrencyInput
                  handleOnChange={handleOnChange}
                  setCurrency={setSubmitCurrency}
                  placeholder={t('tools:form.currency')}
                  currencyId={'currency'}
                />
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={6}>
              <Form.Group>
                <SelectInputSubmit
                  id={'country'}
                  onChange={handleOnChange}
                  maxLength={10}
                  value={countryList.filter(
                    (option) => option.value === inputValues['country']
                  )}
                  options={countryList}
                  placeholder={'Country'}
                  isSearchable={true}
                />
              </Form.Group>
            </Col>
            <Col lg={3} md={3} sm={3}>
              <Form.Group>
                <NumberFormat
                  customInput={CustomFormControl}
                  label={t('tools:salary.children')}
                  id={'children'}
                  onValueChange={(e) => {
                    let payload = {
                      target: {
                        value: e?.floatValue || 0,
                        id: 'children',
                      },
                    };
                    handleOnChange(payload);
                  }}
                  dropdownHandleChange={dropdownHandleChange}
                  autoComplete="current-text"
                  decimalScale={0}
                  allowNegative={false}
                  thousandsGroupStyle="thousand"
                  fixedDecimalScale={true}
                  isAllowed={(values) =>
                    values.value >= 0 && values.value <= 99999999999999999999999
                  }
                  inputValues={inputValues}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col xs={12} sm={12} md={12} lg={4} xl={4} className={'info'}>
          <div>
            <div className={'payment__info'}>
              <span>{t('tools:salary.net')}:</span>
              <span className={'amount'}>
                {submitCurrency} {formatNumber(totals?.salary?.toFixed(2))}
              </span>
            </div>
            <div className={'payment__info'}>
              <span>{t('tools:salary.potential')}:</span>
              <span className={'amount'}>
                {submitCurrency} {formatNumber(totals?.benefit?.toFixed(2))}
              </span>
            </div>
          </div>

          <div className={'tool_button'} onClick={handleSalaryCalculation}>
            {t('tools:mortgage.submit')}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SalaryCalculator;
